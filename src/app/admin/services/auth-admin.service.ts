import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { }

  logout() {
    localStorage.removeItem('token');

    google.accounts.id.revoke('luis.mendoza0321@gmail.com', () => {
        this.router.navigateByUrl('auth/login');
    });

  }


}
