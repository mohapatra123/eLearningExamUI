import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatModule } from '../../../mat-module/mat.module';
import { AuthGuard } from '../../../core/guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  children:[
    {
      path: 'dashboard', component: DashboardComponent 
    }
  ]
}]

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule, RouterModule.forRoot(routes), FormsModule, MatModule, FlexLayoutModule
  ]
})
export class AppAuthModule { }
