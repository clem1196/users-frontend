<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" hidden id="detail" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#detailModal">
            Launch demo modal
        </button>

        <!-- Modal -->
        <div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title fs-5" id="detailModalLabel">{{ title }}</h5>
                        <button @click="props.closeFormDelete?.call" type="button" class="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        {{ ask }}
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary btn-sm" @click="_deleteUsers">Si</button>
                        <button class="btn btn-light btn-sm" @click="props.closeFormDelete?.call" data-bs-dismiss="modal">No</button>
                    </div>
                    <p v-if="message.success" class="alert alert-success mt-2" role="alert">
                        <i class="bi-check-circle-fill m-1">{{ message.success }}</i>
                    </p>
                    <p v-if="message.err" class="alert alert-danger mt-2" role="alert">
                        <i class="bi-exclamation-triangle-fill m-1">{{ message.err }}</i>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { _role, _user } from '../../interface/userInterface';
import { deleteUsers } from '../services/Data';
import { loggedIn } from '../services/Authorization';


//props
const props = defineProps({
    title: { type: String, default: 'Eliminar' },
    closeFormDelete: { type: Function },
    deleteId: { type: Number, default: 0 }
})
const ask=ref('Realmente deseas eliminar esto?')
//messages
const message = reactive({
    success: '',
    err: ''

})

onMounted(async () => {    
    doClick()

})
const doClick = () => {
    const detail: HTMLElement | null = document.getElementById('detail')
    if (detail !== null) {
        detail.click()
    }
}
const _deleteUsers=async()=>{
    try {
        const res=await deleteUsers(props.deleteId)
        if (res?.data.results.affected===1) {
            if (res?.data.loginAgain===false) {
                message.success=res.data.Message
                message.err=''
                location.replace('/dashboard')
            }else{
                message.success=res.data.Message
                message.err=''
                const deleteData=await loggedIn()
                deleteData?.logout()
            }
        }
    } catch (error:any) {
        message.err=error.response.data.Message
        message.success=''
        console.log(error.response.data.Message)
    }
}

</script>

<style scoped></style>