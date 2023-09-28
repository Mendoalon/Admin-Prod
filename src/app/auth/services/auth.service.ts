import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario.intefaces';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly base_url = environment.base_url;

  public usuario!: Usuario;

  constructor(private http: HttpClient) { }


  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role || 'USER_ROLE';
  }

  obtenerImagen(): Observable<any> {
    const token = localStorage.getItem('token') || '';

    if (this.usuario.img) {
      return of(this.usuario.img);
    }

    const url = `${this.base_url}/usuarios/no-image`;

    return this.http.get(url, {
      headers: {
        'x-token': token
      },
      responseType: 'blob'
    }).pipe(
      tap(resp =>console.log(resp)),
      catchError(() => {
        console.log('hola');

        const urlRespaldo = '../../../assets/images/no-img.jpg';
        return of(urlRespaldo);
      })
    );
  }

  guardarLocalStorage(token: string, menu: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu) );
  }

  crearUsuario(formData: RegisterForm): Observable<any> {

    return this.http.post(`${this.base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      )

  }


  login(formData: any): Observable<any> {
    return this.http.post(`${this.base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      )
  }

  loginGoogle(token: string): Observable<any> {
    return this.http.post(`${this.base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      )
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${this.base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map((resp: any) => {
        const { email, google, nombre, role, img, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      }),

      catchError(error => {
        return of(false);
      })
    );

  }



}
