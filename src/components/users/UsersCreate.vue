<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" hidden id="add" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#exampleModal">
            Launch demo modal
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h5>
                        <button @click="props.closeFormCreate?.call" type="button" class="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <form @submit.prevent="_postUsers" @keyup="_validData">

                            <!--fullName-->
                            <div class="mb-1">
                                <label for="formFullname" class="form-label">Nombre</label>
                                <input v-model="dataObject.fullName"  id="formFullname" type="text"
                                    class="form-control form-control-sm">
                                    <small v-if="fields.validFullName==='OK'" class="text-success">
                                        {{ fields.validFullName }}
                                    </small>                                   
                                    <small v-else class="text-danger">
                                        {{ fields.validFullName }}
                                    </small>
                            </div>
                            <!--dni-->
                            <div class="mb-1">
                                <label for="formDni" class="form-label">Dni</label>
                                <input v-model="dataObject.dni"  id="formDni" type="text"
                                    class="form-control form-control-sm">
                                    <small v-if="fields.validDni==='OK'" class="text-success">
                                        {{ fields.validDni }}
                                    </small>
                                    
                                    <small v-else class="text-danger">
                                        {{ fields.validDni }}
                                    </small>
                            </div>
                            <!--email-->
                            <div class="mb-1">
                                <label for="formEmail" class="form-label">Email</label>
                                <input v-model="dataObject.email"  id="formEmail" type="email"
                                    class="form-control form-control-sm">
                                    <small v-if="fields.validEmail==='OK'" class="text-success">
                                        {{ fields.validEmail }}
                                    </small>
                                    
                                    <small v-else class="text-danger">
                                        {{ fields.validEmail }}
                                    </small>
                            </div>
                            <!--password-->
                            <div class="mb-1">
                                <label for="formPassword" class="form-label">Password</label>
                                <input v-model="dataObject.password" id="formPassword" type="password"
                                    class="form-control form-control-sm">
                                    <small v-if="fields.validPassword==='OK'" class="text-success">
                                        {{ fields.validPassword }}
                                    </small>
                                    
                                    <small v-else class="text-danger">
                                        {{ fields.validPassword }}
                                    </small>
                            </div>
                            <!--repeat_password-->
                            <div class="mb-1">
                                <label for="formRepeat_Password" class="form-label">Confirm Password</label>
                                <input v-model="dataObject.repeat_password" id="formRepeat_Password"
                                    type="password" class="form-control form-control-sm">
                                    <small v-if="dataObject.password.length>0&&
                                        dataObject.password===dataObject.repeat_password" 
                                        class="text-success">
                                        OK
                                    </small>
                                    
                                    <small v-else class="text-danger">
                                        Las contraseñas no coinciden
                                    </small>
                            </div>
                            <!--urlImage-->
                            <div class="mb-1">
                                <label for="formUrlImage" class="form-label">UrlImage</label>
                                <input v-model="dataObject.urlImage" id="formUrlImage" type="text"
                                    class="form-control form-control-sm">
                                    <small v-if="fields.validUrlImage==='OK'" class="text-success">
                                        {{ fields.validUrlImage }}
                                    </small>
                                    <small v-else-if="fields.validUrlImage==='Opcional'" class="text-warning">
                                        {{ fields.validUrlImage }}
                                    </small>
                                    <small v-else class="text-danger">
                                        {{ fields.validUrlImage }}
                                    </small>
                            </div>
                            <!--role-->
                            <div v-if="isLoading" class="mb-1">
                                <label for="formRole" class="form-label">Rol</label>
                                <input v-model="dataObject.roles" id="formRole" type="text"
                                    class="form-control form-control-sm">
                                <select @click="_validData" v-model="dataObject.roles" name="select" id="formSelect" class="form-select form-select-sm">
                                    <option v-for="r in role" :value="r.roleName">{{ r.roleName }}</option>
                                </select>    
                                <small v-if="fields.validRoles==='OK'" class="text-success">
                                    {{ fields.validRoles }}
                                </small>                                
                                <small v-else class="text-danger">
                                    {{ fields.validRoles }}
                                </small>                       
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Save</button>
                                <button type="button" class="btn btn-light" @click="props.closeFormCreate?.call"
                                    data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </form>
                        <p v-if="message.success" class="alert alert-success mt-2" role="alert">
                            <i class="bi-check-circle-fill m-1">{{message.success}}</i>
                        </p>
                        <p v-if="message.err" class="alert alert-danger mt-2" role="alert">
                            <i class="bi-exclamation-triangle-fill m-1">{{message.err}}</i>
                        </p>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref} from 'vue';
import { _role } from '../../interface/userInterface';
import { getAll, postUsers } from '../services/Data';
import { dniPost, emailPost, fullNamePost, passwordPost, rolesPost, urlImagePost } from '../services/Validation';

//props
const props = defineProps({
    title: { type: String, default: 'Create Users' },
    closeFormCreate: {
        type: Function
    }
})
//model
const dataObject = reactive({
    email: '',
    password: '',
    repeat_password: '',
    fullName: '',
    dni: '',
    urlImage: '',
    roles: ''
})

//fields validate
const fields=reactive({
    validEmail:'',
    validPassword:'',
    validFullName:'',
    validDni:'',
    validUrlImage:'',
    validRoles:'',

})
//role
let role: Array<_role> = reactive([])
//messages
const message = reactive({
    success: '',
    err: ''
})
//loading
const isLoading=ref(false)
onMounted(async () => {
    const rolesData = await getAll()
    if (rolesData?.statusText === 'OK') {
        role = rolesData?.data.roleList        
    }  
    isLoading.value=true 
    doClick()
    _validData()
})
const doClick = () => {
    const add: HTMLElement | null = document.getElementById('add')
    if (add !== null) {
        add.click()
    }
}

//validate
const _validData=async()=>{
    fields.validEmail=await emailPost(dataObject.email)
    fields.validPassword=await passwordPost(dataObject.password)
    fields.validFullName=await fullNamePost(dataObject.fullName)
    fields.validDni=await dniPost(dataObject.dni)
    fields.validUrlImage=await urlImagePost(dataObject.urlImage)
    fields.validRoles=await rolesPost(dataObject.roles)
}
//post

const _postUsers = async () => {
    try {
        const res = await postUsers(dataObject)
        if (res?.statusText === 'Created') {
            message.success = res?.data.Message
            message.err = ''
            location.replace('/dashboard')
        }
    } catch (error: any) {
        message.err = error.response.data.Message
        message.success = ''
    }
}
</script>

<style scoped></style>