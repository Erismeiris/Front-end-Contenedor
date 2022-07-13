import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { AppRoutingModule } from '../app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { ViewBultosComponent } from './view-bultos/view-bultos.component';
import { ViewContenedorComponent } from './view-contenedor/view-contenedor.component';
import { CrearContenedorComponent } from './crear-contenedor/crear-contenedor.component';
import { CrearBultoComponent } from './crear-bulto/crear-bulto.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { ControlUsuariosComponent } from './control-usuarios/control-usuarios.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ViewBultosComponent,
    ViewContenedorComponent,
    CrearContenedorComponent,
    CrearBultoComponent,
    PerfilUsuarioComponent,
    ControlUsuariosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule
  ],
  exports: [
    DashboardComponent,
    
  ]
})
export class PagesModule { }
