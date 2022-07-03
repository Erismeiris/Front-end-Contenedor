
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  menu:any[]=[
      {title:'Crear Bulto', url: 'crear-bulto' },
      {title:'Crear Contenedor', url: 'crear-contenedor' },
      {title:'Ver Bultos', url: 'ver-bultos' },
      {title:'Ver Contenedor', url: 'ver-contenedor'},
      {title:'Perfil de Usuario', url: 'perfil'},
      ]
  
  

  constructor() { }
}
