import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearBultoComponent } from './crear-bulto/crear-bulto.component';
import { CrearContenedorComponent } from './crear-contenedor/crear-contenedor.component';
import { ViewBultosComponent } from './view-bultos/view-bultos.component';
import { ViewContenedorComponent } from './view-contenedor/view-contenedor.component';
import { UsuarioGuard } from '../guard/usuario.guard';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { ControlUsuariosComponent } from './control-usuarios/control-usuarios.component';


const routes:Routes=[
  {path:'dashboard', component:PagesComponent,
 canActivate:[UsuarioGuard],
    children:[
    {path:'', component:DashboardComponent}, 
    {path:'crear-bulto', component:CrearBultoComponent },
    {path:'crear-contenedor', component:CrearContenedorComponent},
    {path:'ver-bultos', component:ViewBultosComponent},
    {path:'ver-contenedor', component:ViewContenedorComponent},
    {path:'perfil', component:PerfilUsuarioComponent},
    {path:'control-usuario', component:ControlUsuariosComponent},
    
  ]
}
]


@NgModule({
 
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
