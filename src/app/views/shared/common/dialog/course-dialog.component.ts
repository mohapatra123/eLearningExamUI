import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule }  from '@angular/forms';
import { PaymentService }  from 'src/app/core/services/payment/payment.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';

export interface DialogData {
  courseId: number;
  courseName: string;
  description: string;
  module: string[];
  duration: string;
  price: number;
}

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent implements OnInit {

  paymentForm: FormGroup;
  paymentData: any;
  userData: any;
  isPaymentDone: boolean = false;
  message: string = '';

  constructor(
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _formBuilder: FormBuilder, private _authService: AuthService,
    private _router: Router
  ) {}

  dialogResult: any = {status: 1, message: ''}

  ngOnInit(): void {
  }  

  onNoClick(): void {
    this.dialogResult = {status: 0, message: ''}
    this.dialogRef.close(this.dialogResult);
  } 
  
  Submit(){
    this._router.navigate(['/contactus']);
    this.dialogRef.close(this.dialogResult);
  }
}
