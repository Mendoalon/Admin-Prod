import { AuthAdminService } from './../../../admin/services/auth-admin.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor( private AuthAdminService: AuthAdminService){

  }

  logout(): void {
    this.AuthAdminService.logout();
  }

}
