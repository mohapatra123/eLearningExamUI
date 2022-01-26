import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './pages/auth/auth.module';
import { AppsModule } from './pages/apps/apps.module';
import { AppAuthModule } from './pages/apps/app-auth.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule, AuthModule, AppsModule, AppAuthModule
  ]
})
export class ViewsModule { }
