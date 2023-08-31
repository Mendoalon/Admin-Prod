import { Component, OnInit } from '@angular/core';
import { elements } from 'chart.js';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {


  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();

  }


  changeTheme(thema: string): void {
    this.settingsService.changeTheme(thema);

  }



}
