<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" hidden id="edit" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#editModal">
            Launch demo modal
        </button>

        <!-- Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title fs-5" id="editModalLabel">{{ title }}</h5>
                        <button @click="props.closeFormEdit?.call" type="button" class="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <form @submit.prevent="_putUsers" @keyup="_validData">

                            <!--fullName-->
                            <div class="mb-1">
                                <label for="formFullname" class="form-label">Nombre</label>
                                <input v-model="currentData.fullName" id="formFullname" type="text"
                                    class="form-control form-control-sm">
                                <small v-if="fields.validFullName === 'OK'" class="text-success">
                                    {{ fields.validFullName }}
                                </small>
                                <small v-else class="text-danger">
                                    {{ fields.validFullName }}
                                </small>
                            </div>
                            <!--dni-->
                            <div class="mb-1">
                                <label for="formDni" class="form-label">Dni</label>
                                <input v-model="currentData.dni" id="formDni" type="text"
                                    class="form-control form-control-sm">
                                <small v-if="fields.validDni === 'OK'" class="text-success">
                                    {{ fields.validDni }}
                                </small>

                                <small v-else class="text-danger">
                                    {{ fields.validDni }}
                                </small>
                            </div>
                            <!--email-->
                            <div class="mb-1">
                                <label for="formEmail" class="form-label">Email</label>
                                <input v-model="currentData.email" id="formEmail" type="email"
                                    class="form-control form-control-sm">
                                <small v-if="fields.validEmail === 'OK'" class="text-success">
                                    {{ fields.validEmail }}
                                </small>

                                <small v-else class="text-danger">
                                    {{ fields.validEmail }}
                                </small>
                            </div>
                            <!--password-->
                            <div class="mb-1">
                                <label for="formPassword" class="form-label">Password</label>
                                <input v-model="currentData.password" id="formPassword" type="password"
                                    class="form-control form-control-sm">
                                <small v-if="fields.validPassword === 'OK'" class="text-success">
                                    {{ fields.validPassword }}
                                </small>

                                <small v-else class="text-danger">
                                    {{ fields.validPassword }}
                                </small>
                            </div>

                            <!--urlImage-->
                            <div class="mb-1">
                                <label for="formUrlImage" class="form-label">UrlImage</label>
                                <input v-model="currentData.urlImage" id="formUrlImage" type="text"
                                    class="form-control form-control-sm">
                                <small v-if="fields.validUrlImage === 'OK'" class="text-success">
                                    {{ fields.validUrlImage }}
                                </small>
                                <small v-else-if="fields.validUrlImage === 'Opcional'" class="text-warning">
                                    {{ fields.validUrlImage }}
                                </small>
                                <small v-else class="text-danger">
                                    {{ fields.validUrlImage }}
                                </small>
                            </div>
                            <!--roles-->
                            <div class="mb-1">
                                <input
                                    v-if="currentData.index !== null && (currentData.index === 0 || currentData.index > 0)"
                                    v-model="dataObject.roles" id="roles" type="text"
                                    class="form-control form-control-sm" disabled>
                                <input v-else v-model="dataObject.roles" id="roles" type="text"
                                    class="form-control form-control-sm">
                                <small v-if="currentData.index !== null && currentData.index >= 0"></small>
                                <small v-else>
                                    <small v-if="fields.validRoles === 'OK'"
                                        class="text-success">{{ fields.validRoles }}</small>
                                    <small v-else class="text-danger">{{ fields.validRoles }}</small>
                                </small>
                            </div>
                            <!--campos para reemplazar, agregar y elimnar-->
                            <div>
                                <input v-model="currentData.index" type="number" class="form-select-sm"
                                    id="inputRolesHidden" disabled hidden>
                                    <div>
                                        <!--Remplazar o eliminar-->
                                        <label for="" class="col-form-label-sm m-2">Remplazar</label>
                                        <select v-if="userRole.length>0" v-model="currentData.index" class="form-select-sm">
                                            <option id="selectedReplace" selected></option>
                                            <option v-for="(ur, i) in userRole" :key="ur['role_id'] " :value="i">
                                                {{ ur['roleName'] }}
                                            </option>
                                        </select>
                                        <select v-else disabled></select>

                                        <!--Por-->
                                        <label for="" class="col-form-label-sm m-2">Por:</label>
                                        <select v-if="currentData.index!==null && parseInt(currentData.index)>=0"
                                             v-model="currentData.roles" id="selectedBy" name="form-select" class="form-select-sm">
                                            <option selected></option>
                                            <option v-for="nr in newRole" :key="nr['role_id']" :value="nr['roleName']">
                                                {{ nr['roleName'] }}
                                            </option>
                                        </select>
                                        <select v-else disabled></select>
                                    </div>

                                    <div>
                                        <!--Agregar-->
                                        <label for="" class="col-form-label-sm m-2">Desea agregar?:</label>
                                        <select v-if="userRole.length>0"
                                             v-model="currentData.index" class="form-select-sm">
                                            <option id="selectedAdd" selected></option>
                                            <option :value="userRole.length">Si</option>
                                        </select>
                                        <select v-else disabled></select>
                                    </div>
                            </div>
                            <div v-if="returnToLog===false" class="modal-footer">
                                <button v-if="
                                dataObject.email!==currentData.email||
                                dataObject.password!==currentData.password||
                                dataObject.fullName!==currentData.fullName||
                                dataObject.dni!==currentData.dni||
                                dataObject.urlImage!==currentData.urlImage||
                                dataObject.roles!==currentData.roles
                                " type="submit" class="btn btn-primary"> 
                                Save
                            </button>
                                <button v-else type="submit" class="btn btn-primary" disabled>Save</button>
                                <button type="button" class="btn btn-light" @click="props.closeFormEdit?.call"
                                    data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </form>
                        <p v-if="message.success" class="alert alert-success mt-2" role="alert">
                            <i class="bi-check-circle-fill m-1">{{ message.success }}</i>
                        </p>
                        <p v-if="message.warning" class="alert alert-warning mt-2" role="alert">
                            <i class="bi-exclamation-triangle-fill m-1">{{ message.warning }}</i>
                            <a href="/login" class="btn btn-secondary">OK</a>
                        </p>
                        <p v-if="message.err" class="alert alert-danger mt-2" role="alert">
                            <i class="bi-exclamation-triangle-fill m-1">{{ message.err }}</i>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { _role } from '../../interface/userInterface';
import { getAll, getUserOne,  putUsers } from '../services/Data';
import {  dniPut,  emailPut,  fullNamePut,  passwordPut,  rolesPut,  urlImagePut } from '../services/Validation';

//props
const props = defineProps({
    title: { type: String, default: 'Edit Users' },
    closeFormEdit: { type: Function },
    editId: { type: Number, default: 0 }
})
//model datos del usuario que vamos editar
const dataObject = reactive({
    email: '',
    password: '',
    fullName: '',
    dni: '',
    urlImage: '',
    roles: '',
})
//model datos actuales del usuario que vamos editar
const currentData = reactive({
    email: '',
    password: '',
    fullName: '',
    dni: '',
    urlImage: '',
    roles: '',
    index: null
})

//fields validate
const fields = reactive({
    validEmail: '',
    validPassword: '',
    validFullName: '',
    validDni: '',
    validUrlImage: '',
    validRoles: '',

})
//volver a iniciar sesión
const returnToLog = ref(false)
//roles
let role = reactive([])
let userRole = reactive([])
let newRole = reactive([])
//messages
const message = reactive({
    success: '',
    err: '',
    warning: ''
})

onMounted(async () => {
    const usersRoleData = await getAll()
    if (usersRoleData?.statusText === 'OK') {
        //obtiene todos los roles
        role = usersRoleData?.data.roleList
        //obtiene los roles asignados al usuario que vamos editar
        const userOne = await getUserOne(props.editId)
        userRole = userOne?.data.user[0].roles
        const _roles: any = []
        userOne?.data.user[0].roles.forEach((element: { roleName: string }) => {
            _roles.push(element.roleName)           
        })
        //guarda los datos del usuario a editar
        dataObject.email = userOne?.data.user[0].email
        dataObject.password = userOne?.data.user[0].password
        dataObject.fullName = userOne?.data.user[0].fullName
        dataObject.dni = userOne?.data.user[0].dni
        dataObject.urlImage = userOne?.data.user[0].urlImage
        dataObject.roles = _roles
        

        //datos actuales
        currentData.email = userOne?.data.user[0].email
        currentData.password = userOne?.data.user[0].password
        currentData.fullName = userOne?.data.user[0].fullName
        currentData.dni = userOne?.data.user[0].dni
        currentData.urlImage = userOne?.data.user[0].urlImage   
        if (currentData.index===null) {
            currentData.roles=userOne?.data.user[0].roles
        } else{
            currentData.roles = _roles
        }    
        

        //obtiene los roles que no estan asignadas al usuario que vamos editar
        const res = role.reduce((previous: any, current: any) => {
            const item = userRole.find(
                (x: _role) => x.roleName === current.roleName && x.role_id === current.role_id
            )
            if (!item) previous = [...previous, current]
            return previous
        }, [])
        newRole = res
    }

    doClick()
    _validData()
})
const doClick = () => {
    const edit: HTMLElement | null = document.getElementById('edit')
    if (edit !== null) {
        edit.click()
    }
}

//validate
const _validData = async () => {
    fields.validEmail = await emailPut(currentData.email, dataObject.email, props.editId)
    fields.validPassword = await passwordPut(currentData.password, dataObject.password)
    fields.validFullName = await fullNamePut(currentData.fullName, dataObject.fullName)
    fields.validDni = await dniPut(currentData.dni, dataObject.dni, props.editId)
    fields.validUrlImage = await urlImagePut(currentData.urlImage, dataObject.urlImage)
    fields.validRoles = await rolesPut(currentData.roles, dataObject.roles)
}
//put

const _putUsers = async () => {
    try {
        const res = await putUsers(props.editId, currentData)
        if (res?.statusText === 'Created') {
            returnToLog.value = res?.data.loginAgain
            if (returnToLog.value === true) {
                message.warning = res?.data.Message
            } else {
                message.success = res?.data.Message
                message.err = ''
                location.replace('/dashboard')
            }
        } else {
            console.log({ error: res?.data })
        }
    } catch (error: any) {
        message.err = error.response.data.Message
        message.success = ''
        console.log(error.response.data.Message)
    }
}
</script>

<style scoped></style>