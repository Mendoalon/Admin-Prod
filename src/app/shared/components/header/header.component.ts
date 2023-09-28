import { AuthService } from './../../../auth/services/auth.service';
import { AuthAdminService } from './../../../admin/services/auth-admin.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.intefaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public usuario: Usuario;

  constructor(
    private authAdminService: AuthAdminService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.usuario = authService.usuario;
  }

  logout(): void {
    this.authAdminService.logout();
  }

  buscar(termino: string): void {
    if( termino.length ===0){
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);

  }


}

