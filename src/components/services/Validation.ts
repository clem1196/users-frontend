import { _user } from "../../interface/userInterface";
import { getAll, getUserOne } from "./Data";

//Expresiones regulares
const emailRegex =
    /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
const passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
const roleNameRegex = /^[a-zA-Z]{3,16}$/;
const fullNameRegex = /^[a-zA-Z-\s]{3,64}$/;

//CREATE
export const emailPost = async (email: string) => {
    const users = await getAll()
    const usersField = users?.data.userList.filter((element: any) => element.email === email)
    if (email === undefined || email.length === 0) {
        return "The 'email' es requerido"
    } else if (await usersField.length > 0) {
        return "El email ya existe"
    } else if (!emailRegex.test(email)) {
        return "El email no es válido"
    } else {
        return "OK"
    }
}

export const passwordPost = async (password: string) => {
    if (password === undefined || password.length === 0) {
        return "El password es requerido"
    } else if (!passwordRegex.test(password)) {
        return `El password debe tener entre 8 y 16 caracteres y al menos un mayúscula, 
        un minúscula y un número`
    } else {
        return "OK"
    }
}

export const fullNamePost = async (fullName: string) => {
    if (fullName === undefined || fullName.length === 0) {
        return "El nombre es requerido"
    } else if (!fullNameRegex.test(fullName)) {
        return "El nombre debe tener mínimo 3 y maxímo 64 caracteres solo letras y espacios"
    } else {
        return "OK"
    }
}

export const dniPost = async (dni: string) => {
    const users = await getAll()
    const usersField = users?.data.userList.filter((element: any) => element.dni === dni)
    if (dni === undefined || dni.length === 0) {
        return "El dni es requerido"
    } else if (await usersField.length > 0) {
        return "El dni ya existe"
    } else if (dni.length !==8) {
        return "El dni debe tener 8 caracteres numericos"
    } else {
        return "OK"
    }
}

export const urlImagePost = async (urlImage: string) => {
    if (urlImage === undefined || urlImage.length === 0) {
        return "Opcional"
    } else {
        return "OK"
    }
}

export const rolesPost = async (roles: string) => {
    if (roles === undefined || roles.length === 0) {
        return "El rol es requerido"
    } else if (roles.length > 0 && !roleNameRegex.test(roles)) {
        return "Ingrese un rol mínimo 3 y máxino 16 letras"
    } else {
        return "OK"
    }
}

//PUT
export const emailPut = async (email: string, new_email: string, id: number) => {
    const users = await getAll()
    const userOne = await getUserOne(id)
    const usersField = await users?.data.userList.filter((element: _user) => element.email === email)
    const userField = await userOne?.data.user.filter((element: _user) => element.email === email)
    if (email === new_email) {
        return ""
    } else if (email === undefined || email.length === 0) {
        return "El email es requerido"
    } else if (usersField.length !== userField.length) {
        return "El email ya existe"
    } else if (!emailRegex.test(email)) {
        return "El email no es válido"
    } else {
        return "OK"
    }

}
export const passwordPut = async (password: string, new_password:string) => {
    if (password===new_password) {
        return ""
    }else if (password === undefined || password.length === 0) {
        return "El password es requerido"
    } else if (!passwordRegex.test(password)) {
        return `El password debe tener entre 8 y 16 caracteres y al menos un mayúscula, 
        un minúscula y un número`
    } else {
        return "OK"
    }
}
export const fullNamePut = async (fullName: string, new_fullName: string) => {
    if (fullName===new_fullName) {
        return ""
    }else if (fullName === undefined || fullName.length === 0) {
        return "El nombre es requerido"
    } else if (!fullNameRegex.test(fullName)) {
        return "El nombre debe tener mínimo 3 y maxímo 64 caracteres solo letras y espacios"
    } else {
        return "OK"
    }
}
export const dniPut = async (dni: string, new_dni: string, id:number) => {
    const users = await getAll()
    const userOne = await getUserOne(id)
    const usersField = await users?.data.userList.filter((element: _user) => element.dni.toLowerCase() === dni.toLowerCase())
    const userField = await userOne?.data.user.filter((element: _user) => element.dni.toLowerCase() === dni.toLowerCase())
    if (dni===new_dni) {
        return ""
    }else if (dni === undefined || dni.length === 0) {
        return "El dni es requerido"
    } else if (usersField.length!==userField.length) {
        return "El dni ya existe"
    } else if (dni.length !==8) {
        return "El dni debe tener 8 caracteres numericos"
    } else {
        return "OK"
    }
}
export const urlImagePut = async (urlImage: string, new_urlImage:string) => {
    if (urlImage===new_urlImage) {
        return ""
    }else if (urlImage === undefined || urlImage.length === 0) {
        return "Opcional"
    } else {
        return "OK"
    }
}

export const rolesPut = async (roles: string, new_roles: string) => {
    if (typeof roles==="object"||roles===new_roles) {
        return ""
    }else if (roles === undefined || roles.length === 0) {
        return "El rol es requerido"
    } else if (roles===""|| (roles.length > 0 && !roleNameRegex.test(roles))) {
        return "Ingrese un rol mínimo 3 y máxino 16 letras"
    } else {
        return "OK"
    }
}
