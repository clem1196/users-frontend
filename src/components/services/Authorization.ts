import { _role } from "../../interface/userInterface"

export const loggedIn= async()=>{
    const token: string|null=localStorage.getItem('token')
    let isLoggedIn:boolean=false
    let isAdministrator: boolean=false
    let isEmployee:boolean=false

    if (token!==null) {
        isLoggedIn=true
        const listRoles:Array<string>=[]
        const result=JSON.parse(window.atob(token.split('.')[1])).role 
        result.forEach((element:_role)=>{
            listRoles.push(element.roleName)
        })
        
        //admin
        const ad=listRoles.filter((element)=>element==='admin')
        if (ad.length>0) {
            isAdministrator=true
        }

        //employee
        const em=listRoles.filter((element)=>element==='employee'|| element==='admin')
        if (em.length>0) {
            isEmployee=true
        }
        //obteniendo el email desde el token
        const user=await JSON.parse(window.atob(token.split('.')[1]))

        //cerrar sesión
        const logout=async ()=>{
            localStorage.removeItem('token')
            localStorage.clear()
            return location.replace('/')
        }
        //caducar token

        const expireToken=async ()=>{
            const Exp=await JSON.parse(window.atob(token.split('.')[1])).exp 
            if (Date.now()>=Exp*1000) {
                alert("Sesión caducada, inicie nuevamente sesión")
                await logout()
            }
        }
        return{
            token,
            isLoggedIn,
            isAdministrator,
            isEmployee,
            user,
            logout,
            expireToken
        }

    } else{
        console.log('Aún no ha iniciado sesión')
        return null
    }
}