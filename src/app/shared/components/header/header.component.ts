import { AuthService } from './../../../auth/services/auth.service';
import { AuthAdminService } from './../../../admin/services/auth-admin.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.intefaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public usuario: Usuario;

  constructor(private authAdminService: AuthAdminService,
    private authService: AuthService
  ) {
    this.usuario = authService.usuario;
  }

  logout(): void {
    this.authAdminService.logout();
  }


}

