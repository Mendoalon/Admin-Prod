import { Component } from '@angular/core';
import { SidebarService } from 'src/app/admin/services/sidebar.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/interfaces/usuario.intefaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public usuario: Usuario;
  menuItem: any[];

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService
  ) {
    this.menuItem = this.sidebarService.menu;
    this.usuario = authService.usuario;
  }





}
