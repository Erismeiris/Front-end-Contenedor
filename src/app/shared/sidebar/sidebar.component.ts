import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/services/side-bar.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public usuario?:Usuario;

  menuItems: any[];

  constructor( private sidebarService: SideBarService,
              private usuarioService: UsuarioService) {
     
    this.menuItems = sidebarService.menu
    this.usuario = usuarioService.usuario
    
   }

  ngOnInit(): void {
  }

}
