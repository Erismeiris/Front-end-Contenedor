import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formSubmitted = false;

  public registerForm = this.fb.group({
    nombre:['Erismeiris', Validators.required],
    email: ['eris@gmail.com', [Validators.required, Validators.email]],
    ci: [11111111111,Validators.required],
    pasaporte:['E349685',Validators.required],
    password:['123456', Validators.required],
    password2:['123456', Validators.required],
    direccionParticular:'',
    rol:'admin'
    }, {Validators: this.passwordsIguales('password','password2')})

 
    constructor( private fb: FormBuilder,
                  private usuarioService: UsuarioService,
                  private router: Router) { }
  ngOnInit(): void {
  }

  crearUsuario(){
    this.formSubmitted = true
      
    if(this.registerForm.invalid){
      return
    }

    //Reaizar el posteo
    this.usuarioService.crearUsuario( this.registerForm.value)
    .subscribe( resp => {
      this.router.navigateByUrl('/login')

    }, (err) => {
      // Manejar error con sweet alert 2. nota. Debe ser instalado previamente
      Swal.fire('Error', err.error.msg, 'error')
  
    })
   }
  
   validarCI(){
    const ci = this.registerForm.get('ci')?.value
    if ( ci < 10000000000 || ci > 99999999999 ) {
      return true
    } else {
      return false
    }
   }
  
   contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
  
    if((pass1 !== pass2) && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }
  
   //Mostar si campo no válido, solo nombre y email
   campoNoValido(campo:string):boolean{
    if( this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true
    }else {
     return false
    }
  
    }
  
    passwordsIguales(pass1Name:string, pass2Name:string){
      return (formGroup: FormGroup) =>{
          const pass1Control = formGroup.get(pass1Name);
          const pass2Control = formGroup.get(pass2Name);
  
  
          if(pass1Control?.value === pass2Control?.value){
            pass2Control?.setErrors(null)
          }else{
            pass2Control?.setErrors({noEsIgual: true})
  
          }
      }
  
  }

}
