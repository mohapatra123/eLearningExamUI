import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetData: {email: '', password: '', confirmPassword: ''}
  resetForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.resetData = {email: '', password: '', confirmPassword: ''};
    this.resetForm = this._formBuilder.group({      
      email: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  ResetForm(){

  }

  Submit(formValue){
    console.log(formValue);
  }
}
