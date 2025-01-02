<template>
    <div v-if="isLoading" class="fluid mt-2">
        <div class="text-center"><h5>{{ title }}</h5></div>
        <!--form-->
        <div class="d-flex justify-content-between mb-2 bg-light">
            <div class="icon-add">
                <a @click="openModalCreate" title="Create Users">
                    <i class="bi-person-fill-add"></i>
                </a>
            </div>
            <div class="p-2">
                <form v-if="filter === true" @keyup="getSearchUsers">
                    <i class="bi-search"></i>
                    <input v-model="text" type="search" name="inputSearch" id="searchId"
                        class="form-control form-control-sm search">
                </form>
            </div>
            <div class="icon-print"><a @click="printPage" type="button"><i class="bi-printer-fill" title="Print"></i></a></div>
        </div>
        <!--Table-->
        <div class="scale-table">
            <div class="table-responsive">
                <table class="table table-hover text-center table-bordered">
                    <thead>
                        <tr>
                            <th class="bg-light">
                                <i class="bi-filter"></i>
                                <button @click="sortId" class="btn btn-action">Id</button>
                            </th>
                            <th class="bg-light">
                                <i class="bi-filter"></i>
                                <button @click="sortEmail" class="btn btn-action">Email</button>
                            </th>
                            <th class="bg-light">
                                <i class="bi-filter"></i>
                                <button @click="sortRoles" class="btn btn-action">Roles</button>
                            </th>
                            <th v-if="isHidden" class="bg-light" id="th-noPrint">
                                <button class="btn btn-action ">Action</button>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="search in searchUsers" :key="search.user_id">
                            <td>{{ search.user_id }}</td>
                            <td>{{ search.email }}</td>
                            <td>
                                <span v-for="role in search.roles" :key="role.role_id">
                                    <span>{{ role.roleName + ' ' }}</span>
                                </span>
                            </td>
                            <td v-if="isHidden" id="td-noPrint">
                                <button @click="openModalDeatil(search.user_id)" class="btn btn-primary btn-action" title="Detail">
                                    <i class="bi-card-list"></i></button>
                                <small class="barra-white">|</small>
                                <button @click="openModalEdit(search.user_id)" class="btn btn-warning btn-action" title="Edit">
                                    <i class="bi-pencil-fill"></i></button>
                                <small class="barra-white">|</small>
                                <button @click="openModalDelete(search.user_id)" class="btn btn-danger btn-action" title="Delete">
                                    <i class="bi-trash-fill"></i></button>
                            </td>
                        </tr>
                    </tbody>
                    <!--Messages-->
                    <small v-if="success.length > 0" class="text-success">{{ success }}</small>
                    <small v-if="err.length > 0" class="text-danger">{{ err }}</small>
                </table>
            </div>
            <!--pagination-->
            <nav aria-label="Page navigation">
                <ul v-if="pagination" class="pagination justify-content-end">
                    <li class="page-item disabled">
                        <button class="page-link">Pages</button>

                    </li>
                    <!--First page-->
                    <li v-if="currentPage >= 2" @click="getFirstPage" class="page-item">
                        <button class="page-link" type="button">Primero</button>
                    </li>
                    <li @click="getFirstPage" class="page-item disabled">
                        <button class="page-link" type="button">Primero</button>
                    </li>
                    <!--Atras-->
                    <li v-if="currentPage >= 2" @click="getPrevious" class="page-item">
                        <button class="page-link" type="button"><i class="bi-chevron-left"></i></button>
                    </li>
                    <li v-else @click="getPrevious" class="page-item disabled">
                        <button class="page-link" type="button"><i class="bi-chevron-left"></i></button>
                    </li>
                    <!--Pages-->
                    <li v-for="pag in totalPages()" :key="pag" @click="getDataPages(pag)" class="page-item"
                        :class="isActive(pag)">
                        <button v-if="currentPage - 1 < pag && pag < currentPage + 3" class="page-link" type="button">
                            {{ pag }}
                        </button>
                    </li>
                    <!--Siguiente-->
                    <li v-if="currentPage < totalPages()" @click="getNext" class="page-item">
                        <button v-if="currentPage < totalPages()" class="page-link" type="button"><i
                                class="bi-chevron-right"></i></button>
                    </li>
                    <li v-else @click="getNext" class="page-item disabled">
                        <button class="page-link" type="button"><i class="bi-chevron-right"></i></button>
                    </li>
                    <!--Last page-->
                    <li v-if="currentPage < totalPages()" @click="getLastPage" class="page-item">
                        <button class="page-link" type="button">Ultimo</button>
                    </li>
                    <li v-else @click="getLastPage" class="page-item disabled">
                        <button class="page-link" type="button">Ultimo</button>
                    </li>
                    <!--Total-->
                    <li class="page-item disabled">
                        <button class="page-link">Total: {{ users.length }}</button>

                    </li>

                </ul>

            </nav>
            <!--modals-->
            <AccessError v-if="showModalUnauthorized" :close-form-unauthorized="closeModalUnAuthorized"></AccessError>
            <UsersDelete v-if="showModalDelete" :close-form-delete="closeModalDelete" :delete-id="idSelected"></UsersDelete>
            <UsersDetail v-if="showModalDetail" :close-form-detail="closeModalDetail" :detail-id="idSelected"></UsersDetail>
            <UsersCreate v-if="showModalCreate" :close-form-create="closeModalCreate"></UsersCreate>
            <UsersEdit v-if="showModalEdit" :close-form-edit="closeModalEdit" :edit-id="idSelected"></UsersEdit>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { _role, _user } from '../../interface/userInterface';
import { getAll } from '../services/Data';
import UsersCreate from './UsersCreate.vue';
import { loggedIn } from '../services/Authorization';
import UsersEdit from './UsersEdit.vue';
import UsersDetail from './UsersDetail.vue';
import UsersDelete from './UsersDelete.vue';
import AccessError from '../errors/AccessError.vue';

defineProps({
    title: { type: String, default: 'Users' }
})

//all
let users: Array<_user> = reactive([])
//pagination
const currentPage = ref(1)
const rows = ref(5)
const pagination = ref(true)
//search
const filter = ref(true)
let searchUsers: Array<_user> = reactive([])
const text = ref('')
//Messages
const err = ref('')
const success = ref('')
const sortValue = ref(true)
//roles
let admin = ref(false)
let employee = ref(false)
//modals
const showModalCreate = ref(false)
const showModalEdit = ref(false)
const showModalDetail = ref(false)
const showModalDelete = ref(false)
const showModalUnauthorized = ref(false)
//id
let idSelected = ref(0)
//cargando
const isLoading = ref(false)
//print
const isHidden=ref(true)

onMounted(async () => {
    const usersData = await getAll()
    const rolData = await loggedIn()
    if (usersData?.statusText === 'OK') {
        users = usersData?.data.userList
    }
    if (rolData !== null) {
        admin.value = rolData.isAdministrator
        employee.value = rolData.isEmployee
    }
    console.log(usersData?.data.userList)
    isLoading.value = true
    getDataPages(currentPage.value)
})
//modal create
const openModalCreate = () => {
    if (admin.value===true) {
        showModalCreate.value = true
    }else{
        showModalUnauthorized.value=true
    }
}
const closeModalCreate = () => {
    if (admin.value===true) {
        showModalCreate.value = false
    }else{
      showModalUnauthorized.value=false  
    }
}
//modal edit
const openModalEdit = (userid: number) => {
    if (admin.value === true) {
        idSelected.value = userid
        showModalEdit.value = true
    } else {
        showModalUnauthorized.value = true
    }
}
const closeModalEdit = () => {
    if (admin.value === true) {
        showModalEdit.value = false
    } else {
        showModalUnauthorized.value = false
    }
}
//modal detalles
const openModalDeatil = (userid: number) => {
    if (employee.value === true) {
        idSelected.value = userid
        showModalDetail.value = true
    } else {
        showModalUnauthorized.value = true
    }
}
const closeModalDetail = () => {
    if (employee.value === true) {
        showModalDetail.value = false
    } else {
        showModalUnauthorized.value = false
    }
}
//modal eliminar
const openModalDelete = (userid: number) => {
    if (admin.value === true) {
        idSelected.value = userid
        showModalDelete.value = true
    } else {
        showModalUnauthorized.value = true
    }
}
const closeModalDelete = () => {
    if (admin.value === true) {
        showModalDelete.value = false
    } else {
        showModalUnauthorized.value = false
    }
}
//modal Unauthorized
const closeModalUnAuthorized = () => {
    showModalUnauthorized.value = false
}

//print
const printPage= async ()=>{
isHidden.value=false
let thNoprint:HTMLElement|null=await document.getElementById('th-noPrint')
if (thNoprint!==null) {
    if (thNoprint.hidden=false) {
        thNoprint.hidden=true
    }else{
        thNoprint.hidden=false
    }
}
let tdNoprint:HTMLElement|null=await document.getElementById('td-noPrint')
if (tdNoprint!==null) {
    if (tdNoprint.hidden=false) {
        tdNoprint.hidden=true
    }else{
        tdNoprint.hidden=false
    }
}
isHidden.value=false
window.print()
isHidden.value=true
}

//SORT

const sortId = () => {
    isLoading.value = false
    const asc = (a: _user, b: _user) => {
        return a.user_id - b.user_id
    }
    const desc = (a: _user, b: _user) => {
        return b.user_id - a.user_id
    }

    isLoading.value = true
    if (sortValue.value) {
        sortValue.value = false
        return searchUsers.sort(asc)
    } else {
        sortValue.value = true
        return searchUsers.sort(desc)
    }
}
const sortEmail = () => {
    isLoading.value = false
    const asc = (a: _user, b: _user) => {
        return a.email.localeCompare(b.email)
    }
    const desc = (a: _user, b: _user) => {
        return b.email.localeCompare(a.email)
    }

    isLoading.value = true
    if (sortValue.value) {
        sortValue.value = false
        return searchUsers.sort(asc)
    } else {
        sortValue.value = true
        return searchUsers.sort(desc)
    }
}
const sortRoles = () => {
    isLoading.value = false
    const asc = (a: _user, b: _user) => {
        return a.roles[0].roleName.localeCompare(b.roles[0].roleName)
    }
    const desc = (a: _user, b: _user) => {
        return b.roles[0].roleName.localeCompare(a.roles[0].roleName)
    }

    isLoading.value = true
    if (sortValue.value) {
        sortValue.value = false
        return searchUsers.sort(asc)
    } else {
        sortValue.value = true
        return searchUsers.sort(desc)
    }
}

//SEARCH
const getSearchUsers = () => {
    isLoading.value = false
    if (text.value.length === 0) {
        getDataPages(1)
    } else {
        const filterItems = (query: string) => {
            return users.filter(
                (user: _user) =>
                    (user.user_id !== null && user.user_id.toString().indexOf(query) > -1) ||
                    (user.email !== null && user.email.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
                    (user.roles !== undefined && user.roles?.filter((r: _role) => r.roleName.indexOf(query) > -1)[0]) ||
                    (user.last_access !== null && user.last_access.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
                    (user.created !== null && user.created.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
                    (user.updated !== null && user.updated.toLowerCase().indexOf(query.toLowerCase()) > -1)
            )
        }
        if (filterItems(text.value).length > 0) {
            searchUsers = filterItems(text.value)
            pagination.value = false
            success.value = searchUsers.length + ' ' + 'registros(s) encontrados(s)'
            err.value = ''
            success.value
        } else {
            searchUsers = []
            pagination.value = false
            success.value = ''
            err.value = 'No se encontraron registros'
        }
    }
    isLoading.value = true
}

//PAGINATION

//active
const isActive = (numPage: number) => {
    return numPage === currentPage.value ? 'active' : ''
}
//total pages
const totalPages = () => {
    return Math.ceil(users.length / rows.value)
}

//numero de paginas
const getDataPages = async (numPage: number) => {
    searchUsers = []
    text.value = ''
    err.value = ''
    success.value = ''
    pagination.value = true
    currentPage.value = numPage
    if (searchUsers.length > 0) {
        let init = numPage * rows.value - rows.value
        let end = numPage * rows.value
        searchUsers.slice(init, end)
    } else {
        let init = numPage * rows.value - rows.value
        let end = numPage * rows.value
        searchUsers = users.slice(init, end)
    }
}

//First page
const getFirstPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
    getDataPages(1)
}
//Atrás
const getPrevious = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
    getDataPages(currentPage.value)
}
//Siguiente
const getNext = () => {
    if (currentPage.value < totalPages()) {
        currentPage.value++
    }
    getDataPages(currentPage.value)
}
//Ultimo
const getLastPage = () => {
    if (currentPage.value < totalPages()) {
        currentPage.value++
    }
    getDataPages(totalPages())
}
</script>

<style></style>