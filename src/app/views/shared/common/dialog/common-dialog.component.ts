import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule }  from '@angular/forms';
import { PaymentService }  from 'src/app/core/services/payment/payment.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subscription, interval } from 'rxjs';

export interface DialogData {
  alertDuration: number;
  
}

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss']
})
export class CommonDialogComponent implements OnInit {

  paymentForm: FormGroup;
  paymentData: any;
  userData: any;
  isPaymentDone: boolean = false;
  message: string = '';
  packageName: string = ''
  packageId: number = 0;

  private subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<CommonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _formBuilder: FormBuilder, private _authService: AuthService,
    private _paymentService: PaymentService
  ) {}

  dialogResult: any = {status: 1, message: ''}

  ngOnInit(): void {
    this.subscription = interval(1000)
      .subscribe(x => {      
      this.data.alertDuration -= 1;
      if(this.data.alertDuration == 0){
        this.submit();
      }
    });   
  }  

  onNoClick(): void {
    this.dialogResult = {status: 0, message: ''}
    this.dialogRef.close(this.dialogResult);
  }

  submit(){    
    this.dialogResult = { status: 1, message: '' }   
    this.dialogRef.close(this.dialogResult);       
  }  
}
