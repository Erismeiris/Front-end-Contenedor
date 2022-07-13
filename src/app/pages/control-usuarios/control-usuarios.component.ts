import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { CargarUsuarios } from '../../interfaces/cargar-usuarios.interfaces';
import { BusquedadService } from 'src/app/services/busquedad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-control-usuarios',
  templateUrl: './control-usuarios.component.html',
  styleUrls: ['./control-usuarios.component.css']
})
export class ControlUsuariosComponent implements OnInit {

  public totalDeUsuarios:number = 0;

  public usuarios: Usuario[] = [];

  public usuariosTemporales: Usuario[] = [];

  public cargando: boolean = true;

  constructor( private usuariosServices: UsuarioService,
               private busquedaService: BusquedadService  ) { }

  ngOnInit(): void {
    this.cargarUsuarios()
    
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuariosServices.cargarUsuarios()
    .subscribe( (resp)=>{
      this.usuarios = resp.usuarios;
      this.usuariosTemporales = resp.usuarios;
      this.totalDeUsuarios = this.usuarios.length;
      this.cargando = false;
    })

  }

   buscar( termino: string):any{

    if(termino.length === 0){
      return this.usuarios = [...this.usuariosTemporales]
    }

    this.busquedaService.buscar( termino)
    .subscribe( resp => {
      this.usuarios = resp
    })

   }

   eliminarUsuario( usuario: Usuario){
if (usuario._id === this.usuariosServices.uid) {
  Swal.fire('Error', 'No se puede borrar a sí mismo', 'error')
  
}else{

    Swal.fire({
      title: `¿Seguro que deseas eliminar al usuario ${usuario.nombre}?`,
      text: "NO se podrá revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
       this.usuariosServices.eliminarUsuario(usuario)
      .subscribe( resp => {
       Swal.fire(
        'Deleted!',
         `El usuario ${usuario.nombre} fue eliminado`,
         'success'
        );
        this.cargarUsuarios();
       })
      }
    })
  }
   }

   editarUsuario(){
    
   }

   cambiarRole(usuario:Usuario){
       this.usuariosServices.actualizarRoleUsuario(usuario)
       .subscribe( resp => {
        console.log(resp);
        
       })
   }
  

}
