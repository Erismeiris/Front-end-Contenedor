import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { RegisterForm, LoginForm } from '../interfaces/login-form.interfaces';
import { profileForm } from '../interfaces/profileForm';
import { Usuario } from '../models/usuario.model'; 


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
 

 return this.http.get(`${base_url}/login/renew`, {
  headers:{'x-token': this.token}
 }).pipe(
  tap( (resp:any) => {
    const {nombre, ci, pasaporte, direccionParticular, email, password, rol, _id } = resp.usuarioDB
    this.usuario = new Usuario(nombre, email, password,pasaporte, ci, direccionParticular, rol, _id);
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

//***** actualizar uduario ******//

actualizarUsuario( data: profileForm){

  data = {
    ...data,
    rol: this.usuario?.rol || ''
  }
  return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
    headers: {
      'x-token': this.token
    }
  })
  }

 



}