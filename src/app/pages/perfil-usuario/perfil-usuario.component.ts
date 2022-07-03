import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {


  public profileForm!: FormGroup;
  public usuario?:Usuario;

  constructor( private fb: FormBuilder,
    private usuarioService: UsuarioService) {
      this.usuario = usuarioService.usuario
     }

  ngOnInit(): void {
   this.profileForm = this.fb.group({
    nombre:[this.usuario?.nombre, Validators.required],
    email: [this.usuario?.email, [Validators.required, Validators.email]],
    ci: [this.usuario?.ci,Validators.required],
    pasaporte:[this.usuario?.pasaporte,Validators.required],
    password:['123456', Validators.required],
    direccionParticular:[this.usuario?.direccionParticular, Validators.required],
      })
  }


  actualizarPerfil(){
    this.usuarioService.actualizarUsuario(this.profileForm.value)
    .subscribe( resp => {
       const { nombre, ci, pasaporte, direccionParticular, email} = this.profileForm.value;
       this.usuario!.nombre = nombre;
       this.usuario!.ci = ci;
       this.usuario!.pasaporte = pasaporte;
       this.usuario!.direccionParticular = direccionParticular;
       this.usuario!.email = email;
      
      Swal.fire('Guardado', 'Los cambios fueron guardados', 'success')
    }, (err) =>{
      Swal.fire('Error', err.error.msg, 'error');
      
    })
  }

}
