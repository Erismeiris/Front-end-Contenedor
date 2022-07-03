import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Validators, FormBuilder} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email'|| ''),[ Validators.required, Validators.email]],
    password:['', Validators.required],
    remember:[false],
     })

     constructor( private fb: FormBuilder,
      private usuarioService: UsuarioService,
      private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    
    this.usuarioService.login(this.loginForm.value)
    .subscribe( resp => {
    
    if( this.loginForm.get('remember')?.value ){
      localStorage.setItem('email', this.loginForm.controls['email'].value);
    } else {
      localStorage.removeItem('email');
           }
    // Navegar al dashboard
     this.router.navigateByUrl('/')
     
  }, (err) => {
    //Si sucede un error, se mostrará usando los servicios de Swal

    Swal.fire('Error', err.error.msg, 'error')
  }) 
  

  }

}
