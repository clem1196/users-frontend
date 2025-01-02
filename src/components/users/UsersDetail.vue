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
                        <button @click="props.closeFormDetail?.call" type="button" class="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <ul v-if="isLoading" v-for="user in users" :key="user.user_id">
                            <li>Correo: {{ ' ' + user.email }}</li>
                            <li>Nombre: {{ ' ' + user.fullName }}</li>
                            <li>Dni: {{ ' ' + user.dni }}</li>
                            <li>Imagen: <a target="_blank" :href="user.urlImage"><i class="bi-link"
                                        title="Ver/descargar">
                                    </i>{{ ' ' + user.email }}</a>
                            </li>
                            <li>
                                <span v-for="role in user.roles" :key="role.role_id">
                                    <span>Role: {{ ' ' + role.roleName + ' ' }}</span>
                                </span>
                            </li>
                            <li>Ultimo Acceso: {{ ' ' + user.last_access }}</li>
                            <li>Creado: {{ ' ' + user.created }}</li>
                            <li>Actualizado: {{ ' ' + user.updated }}</li>

                        </ul>
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
import { getUserOne } from '../services/Data';


//props
const props = defineProps({
    title: { type: String, default: 'Detalles de usuario' },
    closeFormDetail: { type: Function },
    detailId: { type: Number, default: 0 }
})
let users: Array<_user> = reactive([])
//cargando
const isLoading = ref(false)
//messages
const message = reactive({
    success: '',
    err: ''

})

onMounted(async () => {
    const userData = await getUserOne(props.detailId)
    if (userData?.statusText === 'OK') {
        users = userData?.data.user
    }
    isLoading.value = true
    doClick()

})
const doClick = () => {
    const detail: HTMLElement | null = document.getElementById('detail')
    if (detail !== null) {
        detail.click()
    }
}


</script>

<style scoped></style>