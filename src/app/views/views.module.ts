import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './pages/auth/auth.module';
import { AppsModule } from './pages/apps/apps.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, AuthModule, AppsModule
  ]
})
export class ViewsModule { }
