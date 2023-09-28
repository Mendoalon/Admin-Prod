import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, delay, map } from 'rxjs';
import { CargarUsuario } from 'src/app/auth/interfaces/cargar-usuarios.interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/interfaces/usuario.intefaces';
import { environment } from 'src/environments/environment';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
  private readonly base_url = environment.base_url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService,
  ) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.authService.usuario.uid || '';
  }

  get headers(): any {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  logout(): any {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');


    google.accounts.id.revoke('luis.mendoza0321@gmail.com', () => {
      this.router.navigateByUrl('auth/login');
    });

  }

  actualizarPerfil(data: { email: string; nombre: string; role: string }): Observable<any> {
    // Comprueba si this.authService.usuario.role está definido antes de asignarlo
    if (this.authService.usuario && this.authService.usuario.role) {
      data = {
        ...data,
        role: this.authService.usuario.role
      };
    }

    return this.http.put(`${this.base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      },
    });
  }

  cargarUusarios(desde: number = 0) {
    const url = `${this.base_url}/usuarios?desde=${desde}`

    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: any) => {
          const usuarios = resp.usuarios.map(
            (user: any) => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
          );

          return {
            total: resp.total,
            usuarios
          }
        })
      )
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${this.base_url}/usuarios/${usuario.uid}`

    return this.http.delete(url, this.headers);

  }

  guardarUsuario(usuario: Usuario): Observable<any> {

    return this.http.put(`${this.base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }


}
