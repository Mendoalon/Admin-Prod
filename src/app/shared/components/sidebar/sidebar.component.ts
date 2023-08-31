import { Component } from '@angular/core';
import { SidebarService } from 'src/app/admin/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItem: any[];

  constructor(private sidebarService: SidebarService){
    this.menuItem = this.sidebarService.menu;
  }





}
