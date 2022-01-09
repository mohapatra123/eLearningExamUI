import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule } from '@angular/forms';
import { MatModule } from '../../../mat-module/mat.module';
import { Routes } from '@angular/router';
import { AuthlayoutComponent } from '../../shared/authlayout/authlayout.component';
import { AboutusComponent } from '../../shared/common/aboutus.component';
import { ContactUsComponent } from '../../shared/common/contact-us.component';
import { ServicesComponent } from '../../shared/common/services.component';
import { HomeComponent } from '../../shared/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: AuthlayoutComponent,
    children:[
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, data: { returnUrl: window.location.pathname } },
      { path: 'signup', component: SignupComponent }      
    ]
  }
]

@NgModule({
  declarations: [AuthlayoutComponent, LoginComponent, SignupComponent, ResetPasswordComponent],
  imports: [
    CommonModule, FormsModule, MatModule
  ]
})
export class AuthModule { }
