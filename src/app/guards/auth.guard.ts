import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
     ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.authService.validarToken()
      .pipe(
        tap( estaAutenticado =>{
          if( !estaAutenticado ){
            this.router.navigateByUrl('/auth/login');
          }

        })
      )
  }

}
