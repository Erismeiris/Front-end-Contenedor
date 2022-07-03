import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-contenedor',
  templateUrl: './crear-contenedor.component.html',
  styleUrls: ['./crear-contenedor.component.css']
})
export class CrearContenedorComponent implements OnInit {


 containers:any = [
    {name:33.2, string:"Standard 1 (33.2m"},
    {name:67.7, string:"Standard 2 (67.7m"},
    {name:76.4, string:"Standard High Cube (76.4m"},
    
 ]
  
  constructor( private fb: FormBuilder) { }
  
  public contenedorForm = this.fb.group({
    containerType:[0, Validators.required],
    nombre: ['', Validators.required],
    creadoPor:['',Validators.required],
     })

  ngOnInit(): void {
  }
  
  
  crearContenedor(){
    console.log(this.contenedorForm.value)
   
   }
   
   
    
  

}
