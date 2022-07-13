import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { RegisterForm, LoginForm } from '../interfaces/login-form.interfaces';
import { profileForm } from '../interfaces/profileForm';
import { Usuario } from '../models/usuario.model'; 
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interfaces';



const base_url = environment.base_url;



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario?:Usuario;
  constructor(private http: HttpClient,
               private router: Router) { }

    get token(): string {
      return localStorage.getItem('token') || ''
    } 
    get headers(){
      return { headers: {
        'x-token': this.token
      }}
    }

    get uid():string{
      return this.usuario?._id || '';
    }

  crearUsuario(formData: RegisterForm) {
     return this.http.post(`${base_url}/usuarios`, formData)

  }

  // *******login******//
  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
        .pipe(
        tap((resp: any) => {
           localStorage.setItem('token', resp.token)
         
        })
      )
  }


  // *******Validar Token ********//
validarToken():Observable <boolean>{
 

 return this.http.get(`${base_url}/login/renew`, this.headers).pipe(
  tap( (resp:any) => {
    const {nombre, ci, pasaporte, direccionParticular, email, rol, _id } = resp.usuarioDB
    this.usuario = new Usuario(nombre, email, pasaporte, ci, direccionParticular, rol, _id);
    localStorage.setItem('token', resp.token);
  }),
  map( resp => true),
  
  catchError( error => of(false))

 );
}

// ******** logout******//

logout(){
  localStorage.removeItem('token')
}

//***** actualizar usuario ******//

actualizarUsuario( data: profileForm){

  data = {
    ...data,
    rol: this.usuario?.rol || ''
  }
  return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers)
  }

 
cargarUsuarios(){
  const url = `${base_url}/usuarios/`;

  return this.http.get<CargarUsuarios>(url, this.headers)
  .pipe(
    delay(1000)
  )
}

eliminarUsuario(usuario:Usuario ){

  const url = `${base_url}/usuarios/${usuario._id}`
  return this.http.delete(url, this.headers) 
}


actualizarRoleUsuario( data: Usuario){
  const uid = data._id
 
  return this.http.put(`${base_url}/usuarios/${uid}`, data, this.headers)

  }
 


}