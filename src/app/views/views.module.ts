import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './pages/auth/auth.module';
import { AppsModule } from './pages/apps/apps.module';
import { AppAuthModule } from './pages/apps/app-auth.module';
import { EventsComponent } from './shared/common/events.component';
import { ExamcourseComponent } from './shared/common/examcourse.component';
import { MyAccountComponent } from './shared/common/account/my-account/my-account.component';
import { MatModule } from '../mat-module/mat.module';




@NgModule({
  declarations: [EventsComponent, ExamcourseComponent, MyAccountComponent],
  imports: [
    CommonModule, AuthModule, AppsModule, AppAuthModule, MatModule
  ]
})
export class ViewsModule { }
