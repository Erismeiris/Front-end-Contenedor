import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';


const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class BusquedadService {

  constructor( private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || ''
  } 

  get headers(){
    return { headers: {
      'x-token': this.token
    }}
  }

  buscar(termino:string ){
    const url = `${base_url}/busqueda/${termino}`;
    return this.http.get<any[]>(url, this.headers)
    .pipe(
      map( (resp: any) => resp.usuarios)
    )
  }
}
