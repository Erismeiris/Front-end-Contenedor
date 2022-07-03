

export interface RegisterForm{
    nombre:string,
    email:string,
    ci:number,
    pasaporte:string,
    direccionParticular:string,
    password:string,
    rol:string

   
}


export interface LoginForm{
    email:string,
    password:string,
    remember: boolean
}


