<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-dark primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/"><i class="bi-house-fill"></i></a>
        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
          <ul class="navbar-nav me-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <a class="nav-link active" href="/" aria-current="page">Home
                <span class="visually-hidden">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about">About</a>
            </li>
            <li v-if="employee===true" class="nav-item">
              <a class="nav-link" href="/dashboard">DashBoard</a>
            </li>            
          </ul> 
          <div v-if="logged" class="d-flex myFlex">
            <ul class="navbar-nav">
              <span class="welcome">{{email}}</span>
              <li class="nav-item dropdown">
                <a href="#" class="welcome" title="options" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="./assets/user.png" height="40" width="35" style="border-radius: 50%;"></a>
                <ul class="dropdown-menu dropdown-menu-lg-end mt-3">
                  <li>
                    <a class="dropdown-item" @click="openModalLogout" type="button"><i class="bi-row">Salir</i></a>
                  </li>
                  <hr class="dropdown-divider">
                  <li>
                    <a href="/login" class="dropdown-item"><i class="bi-row">Ingresar con otra cuenta</i></a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>           
          
          <div v-else class="d-flex myFlex">
            <ul class="navbar-nav">
              <a href="/login"></a>
              <a href="/login" class="navbar-brand" type="button">
                <i class="bi-power">Log In</i>
              </a>
              
            </ul>
          </div>     
        </div>
      </div>
    </nav>
    <LogOut v-if="showModalLogout" :close-form-logout="closeModalLogout"></LogOut>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { loggedIn } from './components/services/Authorization';
import LogOut from './components/auth/logOut.vue';

let logged=ref(false)
let admin=ref(false)
let employee=ref(false)
let email=ref('')
//modal logout
const showModalLogout=ref(false)

onMounted(async()=>{
  const result=await loggedIn()
  if (result!==null) {
    logged.value=result.isLoggedIn
    admin.value=result.isAdministrator
    employee.value=result.isEmployee
    email.value=result.user.email

    await result.expireToken()
  }
})

//open modal

const openModalLogout=()=>{
  showModalLogout.value=true
}

const closeModalLogout=()=>{
  showModalLogout.value=false
}

</script>

<style></style>
