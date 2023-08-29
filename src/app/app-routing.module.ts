import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './admin/pages/nopagefound/nopagefound.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)

  },
  {
    path: 'dashboard',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: '**',
    component: NopagefoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
