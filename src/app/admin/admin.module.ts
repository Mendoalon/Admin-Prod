import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

//Componentes
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { PromiseComponent } from './pages/promise/promise.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuariosComponent } from './pages/mantenimientos/usuarios/usuarios.component';
import { ModalImagenComponent } from './components/modal-imagen/modal-imagen.component';
import { HospitalesComponent } from './pages/mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './pages/mantenimientos/medicos/medicos.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { MedicoComponent } from './pages/mantenimientos/medicos/medico/medico.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';





@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    AdminLayoutComponent,
    AccountSettingsComponent,
    PromiseComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    ModalImagenComponent,
    HospitalesComponent,
    MedicosComponent,
    ImagenPipe,
    MedicoComponent,
    BusquedaComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule
  ]
})
export class AdminModule { }
