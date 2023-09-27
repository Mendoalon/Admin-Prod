import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { PromiseComponent } from './pages/promise/promise.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuariosComponent } from './pages/mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './pages/mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './pages/mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './pages/mantenimientos/medicos/medico/medico.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
      {path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'} },
      {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica1'} },
      {path: 'account-setting', component: AccountSettingsComponent, data: {titulo: 'Account-setting'} },
      {path: 'promesa', component: PromiseComponent, data: {titulo: 'Promesas'} },
      {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'} },
      {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'} },

      //Mantenimientos.
      {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios de aplicacion'} },
      {path: 'hospitales', component: HospitalesComponent , data: {titulo: 'Hosptales de aplicacion'} },
      {path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos de aplicacion'} },
      {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Informacion medico'} },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
