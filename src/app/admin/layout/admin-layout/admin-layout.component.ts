import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { SidebarService } from '../../services/sidebar.service';

declare function customInitFunctions(): void;;

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit {
  public fechaActual: number = new Date().getFullYear();

  constructor(
                private settingsService: SettingsService,
                private sidebarService: SidebarService
                ) { }

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
  }



}


