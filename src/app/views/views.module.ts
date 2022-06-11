import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './pages/auth/auth.module';
import { AppsModule } from './pages/apps/apps.module';
import { AppAuthModule } from './pages/apps/app-auth.module';
import { EventsComponent } from './shared/common/events.component';
import { ExamcourseComponent } from './shared/common/examcourse.component';
import { MyAccountComponent } from './shared/common/account/my-account/my-account.component';
import { MatModule } from '../mat-module/mat.module';
import { PaymentDialogComponent } from './shared/common/dialog/payment-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseDialogComponent } from './shared/common/dialog/course-dialog.component';
import { CommonDialogComponent } from './shared/common/dialog/common-dialog.component';





@NgModule({
  declarations: [EventsComponent, ExamcourseComponent, MyAccountComponent, PaymentDialogComponent, CourseDialogComponent, CommonDialogComponent],
  imports: [
    CommonModule, AuthModule, AppsModule, AppAuthModule, MatModule, FormsModule, ReactiveFormsModule
  ]
})
export class ViewsModule { }
