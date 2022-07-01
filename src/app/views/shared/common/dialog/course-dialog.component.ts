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
  module: any[];
  duration: string;
  sellingPrice: number;
  retailPrice: number;
  availability: string;
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
    private _router: Router, private _paymentService: PaymentService
  ) {}

  dialogResult: any = {status: 1, message: ''}

  ngOnInit(): void {
    this.userData = JSON.parse(this._authService.getLocalStorage('userInfo'));
    this.paymentForm = this._formBuilder.group({
      TransactionId: ['', [Validators.required]]
    }); 
    this.paymentData = { 
      transaction_id: '',
      email_id: this.userData.eMail,
      status: 21,
      amount: this.data.sellingPrice,  
      category_name: null,    
      category_selected: null,      
      courses_name: null,
      courses_selected: null,      
      sub_category_name: null,
      sub_category_selected: null,
      featured_course_id: this.data.courseId,
      featured_course_name: this.data.courseName,
      availability: this.data.availability
    }
  }  

  onNoClick(): void {
    this.dialogResult = {status: 0, message: ''}
    this.dialogRef.close(this.dialogResult);
  } 
  
  SavePayment(formData){   
    this.dialogRef.close(this.dialogResult);  
    if(formData.value.TransactionId == undefined || formData.value.TransactionId == ''){
      this.message = 'Please enter transaction';
      return;
    }
    else{
      this._paymentService.createPayment(this.paymentData).subscribe((res) => {
        if(res.status == true){
          this.dialogResult = { status: 1, message: res.message }
          setTimeout(() => { this.message = res.message; }, 1000)          
          setTimeout(() => { 
            this.message = '';
            this.dialogRef.close(this.dialogResult);
          }, 2000)          
      }
    })
    }
    this.message = '';  
  }
}