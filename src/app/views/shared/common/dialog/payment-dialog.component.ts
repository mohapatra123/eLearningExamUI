import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule }  from '@angular/forms';
import { PaymentService }  from 'src/app/core/services/payment/payment.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth/auth.service';

export interface DialogData {
  categoryId: number;
  categoryName: string;
  subCategoryId: number;
  subCategoryName: string;
  courseId: number;
  courseName: string;
  status: number;
  message: string;
  retailPrice: number;
  sellingPrice: number;
}

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})

export class PaymentDialogComponent implements OnInit {

  paymentForm: FormGroup;
  paymentData: any;
  userData: any;
  isPaymentDone: boolean = false;
  message: string = '';

  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _formBuilder: FormBuilder, private _authService: AuthService,
    private _paymentService: PaymentService
  ) {}

  dialogResult: any = {status: 1, message: ''}

  ngOnInit(): void {
    console.log(this.data);



    this.paymentData = { 
      transaction_id: '',
      email_id: '',
      status: 0,
      amount: 0,      
      category_selected: null,
      sub_category_selected: null,
      courses_selected: null,
      category_name: null,
      sub_category_name: null,
      courses_name: null,
      name: '',
      contact_num: ''
  }
    this.setForm();
    this.getUserData();
  }

  getUserData(){
    this.userData = JSON.parse(this._authService.getLocalStorage('userInfo'));
    this.paymentData = {
      transaction_id: '',
      email_id: this.userData.eMail,
      status: 21,
      amount: this.data.sellingPrice,      
      category_selected: this.data.categoryId,
      sub_category_selected: this.data.subCategoryId == null ? 'ALL' : this.data.subCategoryId.toString(),
      courses_selected: this.data.courseId == null ? 'ALL' : this.data.courseId.toString(),
      category_name: this.data.categoryName == undefined ? '' : this.data.categoryName,
      sub_category_name: this.data.subCategoryName == undefined ? '' : this.data.subCategoryName,
      courses_name: this.data.courseName == undefined ? '' : this.data.courseName,
      name: this.userData.firstName + ' ' + this.userData.lastName,
      contact_num: this.userData.mobile
    }
  }

  onNoClick(): void {
    this.dialogResult = {status: 0, message: ''}
    this.dialogRef.close(this.dialogResult);
  }

  SavePayment(formData: any){
    console.log(formData);
    console.log(this.paymentData);
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

  setForm(){
    this.paymentForm = this._formBuilder.group({
      TransactionId: ['', [Validators.required]]
    });    
  }
}
