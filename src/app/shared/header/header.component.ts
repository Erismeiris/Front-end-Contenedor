import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  constructor(private usuarioServices: UsuarioService,
    private router: Router) { }

 logout(){
  this.usuarioServices.logout();
  this.router.navigateByUrl('login')
 }

}
