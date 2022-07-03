import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { pipe, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,
              private router: Router) {

  }
   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.usuarioService.validarToken() 
      .pipe(
        tap(estAuntenticado => {
         if(!estAuntenticado){
           this.router.navigateByUrl('/login');
         }
        })
      );
       }

}
