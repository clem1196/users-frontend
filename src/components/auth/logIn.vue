<template>
    <div class="container">
        <h2 class="mt-2">Login</h2>

        <form @submit.prevent="onSubmit" class="mt-4">
            <div class="mb-3">
                <label for="emailId" class="form-label">Email</label>
                <input v-model="email" required autofocus type="email" class="form-control" name="email" id="emailId" aria-describedby="emailHelpId"
                    placeholder="abc@mail.com" />
                <small id="emailHelpId" class="form-text">
                    <p v-if="err==='el usuario no existe'" class="text-danger">{{err}}</p>
                </small>
            </div>

            <div class="mb-3">
                <label for="passwordId" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" name="password" id="passwordId" placeholder="password" />
                <small v-if="err==='La contraseña es incorrecto'" id="passwordHelpId" class="text-danger">
                     {{err}}
                </small>                
            </div>

            <button class="btn btn-primary m-2" type="submit" value="submit">Submit</button>
            <a @click="navigation" class="btn btn-light m-2">Cancelar</a>
        </form>

    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router=useRouter()
const emit=defineEmits(['submit'])
const email=ref('')
const password=ref('')
const err=ref('')
const success=ref('')

const onSubmit=async()=>{
    try {
        let login ={
            email:email.value,
            password:password.value
        }
        emit('submit')
        const result=await axios({
            method: "POST",
            url:'http://localhost:3000/login',
            data:login
        })
        if (result.statusText==="OK") {
            localStorage.setItem('token', JSON.stringify(result.data.token))
            success.value=result.data.Message
            err.value=''
            location.replace('/dashboard')
        }
    } catch (error: any) {
        err.value=error.response.data.Message
        success.value=''
        console.log(error)
        
    }
}
const navigation=()=>{
    router.back()
}
</script>

<style scoped></style>