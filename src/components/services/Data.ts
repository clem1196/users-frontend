import axios from "axios";
import { loggedIn } from "./Authorization";




//all
export const getAll = async () => {
    const res = await loggedIn()
    const token = res?.token
    if (token) {
        const result: any = await axios({
            method: "GET",
            url: "http://localhost:3000/users/",
            headers: {
                Authorization: JSON.parse(res.token)
            }
        })
        return result
    }
}
//one
export const getUserOne = async (id: number) => {
    const res = await loggedIn()
    const token = res?.token
    if (token) {
        const result: any = await axios({
            method: "GET",
            url: "http://localhost:3000/users/" + id,
            headers: {
                Authorization: JSON.parse(res.token)
            }
        })
        return result
    }
}
//create
export const postUsers = async (dataObject: object) => {
    const res = await loggedIn()
    const token = res?.token
    if (token) {
        const result: any = await axios({
            method: "POST",
            url: "http://localhost:3000/users",
            data: dataObject,
            headers: {
                Authorization: JSON.parse(res.token)
            }
        })
        return result
    }
}
//edit
export const putUsers = async (id: number, dataObject: object) => {
    const res = await loggedIn()
    const token = res?.token
    if (token) {
        const result: any = await axios({
            method: "PUT",
            url: "http://localhost:3000/users/" + id,
            data: dataObject,
            headers: {
                Authorization: JSON.parse(res.token)
            }
        })
        return result
    }
}
//delete
export const deleteUsers = async (id: number) => {
    const res = await loggedIn()
    const token = res?.token
    if (token) {
        const result: any = await axios({
            method: "DELETE",
            url: "http://localhost:3000/users/" + id,
            headers: {
                Authorization: JSON.parse(res.token)
            }
        })
        return result
    }
}



