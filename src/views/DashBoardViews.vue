<template>
    <div class="fluid" id="fluidDash" @mousemove="changeTextBtn">
        <div class="d-flex align-items-start">
            <div class="nav flex-column nav-pills me-3 mynav" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button class="nav-link btnLink active" id="v-pills-users-tab" data-bs-toggle="pill" name="Users"
                    data-bs-target="#v-pills-users" type="button" role="tab" aria-controls="v-pills-users"
                    aria-selected="true"> <i class="bi-person-fill"></i><span class="m-2">Users</span>
                </button>
                <button class="nav-link btnLink" id="v-pills-profile-tab" data-bs-toggle="pill" name="Profile"
                    data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile"
                    aria-selected="false"><i class="bi-person-lines-fill"></i><span class="m-2">Profile</span></button>
                
                <button class="nav-link btnLink" id="v-pills-messages-tab" data-bs-toggle="pill" name="Messages"
                    data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages"
                    aria-selected="false"><i class="bi-chat-dots-fill"></i><span class="m-2">Messages</span>
                </button>
                <button class="nav-link btnLink" id="v-pills-settings-tab" data-bs-toggle="pill" name="Settings"
                    data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings"
                    aria-selected="false"><i class="bi-gear-fill"></i><span class="m-2">Sttings</span>
                </button>
            </div>
            <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="v-pills-users" role="tabpanel"
                    aria-labelledby="v-pills-users-tab" tabindex="0">
                    <UsersAll></UsersAll>
                </div>
                <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"
                    tabindex="0">Este es el contenido de profile</div>                
                <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab"
                    tabindex="0">Este es el contenido de messages</div>
                <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab"
                    tabindex="0">Este es el contenido de settings</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import UsersAll from '../components/users/UsersAll.vue';

onMounted(()=>{
    //actualiza el tamaño de la ventana y ejecuta la función changeTextBtn
    window.addEventListener('resize', changeTextBtn)
})

const changeTextBtn=()=>{
    let widthWindows: HTMLElement|null=document.getElementById('fluidDash')
    let sizeWindows: number=0
    if (widthWindows!==null) {
        //obtenemos el ancho de la ventana actual
        sizeWindows=widthWindows.clientWidth
    }
    //tamaño del contenido
    let fluid: HTMLCollection=document.getElementsByClassName('fluid')
    for (let index = 0; index < fluid.length; index++) {
        const element:any = fluid[index];
        if (sizeWindows<485) {
            element.style='font-size:10px;'
            
        }else if (sizeWindows>484&&sizeWindows<621) {
            element.style='font-size:12px;'
        }else if (sizeWindows>620&&sizeWindows<821) {
            element.style='font-size:13px;'
        }else if (sizeWindows>820&&sizeWindows<1041) {
            element.style='font-size:14px;'
        }else{
            element.style='font-size:16px'
        }        
    }
    //tamaño de los botones detalles, editar, eliminar
    let btn_size:HTMLCollection=document.getElementsByClassName('btn btn-action')
    for (let index = 0; index < btn_size.length; index++) {
        const element:any = btn_size[index];
        if (sizeWindows<485) {
            element.style=`font-size:10px; padding: 0.1rem; padding-top:0rem; padding-bottom:0rem `
        }else if (sizeWindows>484&&sizeWindows<621) {
            element.style=`font-size:12px; padding-left: 0.2rem; padding-right:0.2rem; padding-top:0.1rem; padding-bottom:0.1rem `
        }else if (sizeWindows>620&&sizeWindows<1041) {
            element.style=`font-size:14px; padding-left: 0.3rem; padding-right:0.3rem; padding-top:0.1rem; padding-bottom:0.1rem `
        }else {
            element.style=`font-size:15px; padding-left: 0.4rem; padding-right:0.4rem; padding-top:0.1rem; padding-bottom:0.1rem `
        }
        
    }
    //tamaño de los iconos del panel y su titulo
    let btnLink:HTMLCollection=document.getElementsByClassName('nav-link btnLink')
    for (let index = 0; index < btnLink.length; index++) {
        const element : any= btnLink[index];
        if (sizeWindows<485) {
            element.innerHTML=element.innerHTML.split("<span")[0]+"</i>"
            element.title=element.name
            element.style="padding:3%;"

        }else if(sizeWindows>484&&sizeWindows<621){
            element.innerHTML=element.innerHTML.split("<span")[0]+"</i>"
            element.style="padding:4%"
            element.title=element.name
        }else if(sizeWindows>620&&sizeWindows<841){
            element.innerHTML=element.innerHTML.split("<span")[0]+"<span class='m-1'>"+element.name+ "</span></i>"
            element.style="font-size:14px; padding:5%"
            element.title=''
        }else if(sizeWindows>840&&sizeWindows<1041){
            element.innerHTML=element.innerHTML.split("<span")[0]+"<span class='m-1'>"+element.name+ "</span></i>"
            element.style="font-size:15px; padding:5%"
            element.title=''
        }else {
            element.innerHTML=element.innerHTML.split("<span")[0]+"<span class='m-1'>"+element.name+ "</span></i>"
            element.style="font-size:16px; padding:5%"
            element.title=''
        }
        //tamaño del panel
        let mynav:HTMLCollection=document.getElementsByClassName('nav mynav')
        for (let index = 0; index < mynav.length; index++) {
            const element: any = mynav[index];
            if (sizeWindows<621) {
                element.title=element.name
                element.style="font-size:14px; align-items:stretch; width:100px"
            }else{
                element.title=''
                element.style="font-size: 16px; align-items: flex-start;"
            }            
        }
    }
    //tamaño de la fuente de la paginación
    let navPagination:HTMLCollection=document.getElementsByClassName('page-link')
    for (let index = 0; index < navPagination.length; index++) {
        const element:any = navPagination[index];
        if (sizeWindows<485) {
            element.style="font-size: 10px;"
        }else if(sizeWindows>484&&sizeWindows<621){
            element.style="font-size:11px;"
        }else if(sizeWindows>620&&sizeWindows<1041){
            element.style="font-size:12px;"
        }else {
            element.style="font-size:14px;"
        }
    }
}

</script>

<style></style>