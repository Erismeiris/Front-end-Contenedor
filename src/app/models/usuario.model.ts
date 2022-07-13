
 export class Usuario {
    constructor(
        public nombre: string,
        public email:string,
        public pasaporte?:string,
        public ci?:number,
        public direccionParticular?:string,
        public rol?:string,
        public _id?: string
    ) { }

} 

