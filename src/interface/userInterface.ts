export interface _role {
    role_id: number
    roleName: string
    created: string
    updated: string
}

export interface _user {
    user_id: number
    email: string
    password: string
    fullName: string
    dni: string
    urlImage: string
    last_access: string
    created: string
    updated: string
    roles: Array<_role>
}