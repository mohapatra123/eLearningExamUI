import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../../../mat-module/mat.module';
import { Routes, RouterModule} from '@angular/router';
import { AuthlayoutComponent } from '../../shared/authlayout/authlayout.component';
import { AboutusComponent } from '../../shared/common/aboutus.component';
import { ContactUsComponent } from '../../shared/common/contact-us.component';
import { ServicesComponent } from '../../shared/common/services.component';
import { HomeComponent } from '../../shared/home/home.component';

import {MatTabsModule} from '@angular/material/tabs';

const routes: Routes = [
  {
    path: '',    
    children:[
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }      
    ]
  }
]

@NgModule({
  declarations: [AuthlayoutComponent, LoginComponent, SignupComponent, ResetPasswordComponent],
  imports: [
    CommonModule, FormsModule, MatModule, RouterModule.forRoot(routes), ReactiveFormsModule, MatTabsModule, NgbModule
  ]
})
export class AuthModule { }
