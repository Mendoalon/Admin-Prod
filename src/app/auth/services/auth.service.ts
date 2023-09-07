import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of, tap } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly base_url = environment.base_url;


  constructor(private http: HttpClient) { }

  crearUsuario(formData: RegisterForm): Observable<any> {

    return this.http.post(`${this.base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )

  }
  

  login(formData: any): Observable<any> {
    return this.http.post(`${this.base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  loginGoogle(token: string): Observable<any> {
    return this.http.post(`${this.base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${this.base_url}/login/renew`,{
      headers:{
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) =>{
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError( error =>{
        return of(false);
      })
    );

  }


}
