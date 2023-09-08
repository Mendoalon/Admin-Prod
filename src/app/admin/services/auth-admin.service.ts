import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
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

  logout() {
    localStorage.removeItem('token');

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

  get uid(): string {
    return this.authService.usuario.uid || '';
  }


}
