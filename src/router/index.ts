import { createRouter, createWebHistory } from "vue-router";
import { loggedIn } from "../components/services/Authorization";

export const router=createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:"/",
            name:"home",
            component: ()=> import  ("../views/HomeViews.vue")

        },
        {
            path:"/about",
            name:"about",
            component: ()=> import ("../views/AboutViews.vue")

        },
        {
            path:"/dashboard",
            name:"DashBoard",
            component: ()=> import  ("../views/DashBoardViews.vue")

        },
        {
            path:"/login",
            name:"LogIn",
            component: ()=> import  ("../components/auth/logIn.vue")

        },
        {
            path:"/logout",
            name:"logOut",
            component: ()=> import  ("../components/auth/logOut.vue")

        }
    ]
})

//guards
router.beforeEach(async (to, from)=>{
    const auth=await loggedIn()
    //restringe si no iniciaste sesión
    if (
        to.path!=="/"&&
        to.path!=="/about"&&
        to.path!=="/login"&&
        !(auth?.isLoggedIn)
    ) {
        return ({path:"/login"})
    }
})