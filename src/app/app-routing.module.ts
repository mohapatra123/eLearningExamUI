import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'apps', loadChildren: () => import('./views/pages/apps/apps.module').then(m => m.AppsModule)},
  {path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
