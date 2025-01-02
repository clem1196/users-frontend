<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" hidden id="log" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Logout</h1>
                        <button @click="props.closeFormLogout?.call" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Realmente desea salir del sistema?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="getLogout">Si</button>
                        <button type="button" class="btn btn-light" @click="props.closeFormLogout?.call" data-bs-dismiss="modal">No</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { loggedIn } from '../services/Authorization';

//pros

const props=defineProps({
    title:{type:String, default: 'Logout'},
    closeFormLogout:{
        type: Function
    }
})


onMounted(async()=>{
darClick()
})

const darClick=()=>{
    const log: HTMLElement|null=document.getElementById('log')
    if (log!==null) {
        log.click()
    }

}

const getLogout=async()=>{
    const result=await loggedIn()
    await result?.logout()
}

</script>

<style scoped></style>