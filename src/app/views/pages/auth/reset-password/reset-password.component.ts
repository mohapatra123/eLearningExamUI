import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetData: {email: ''}
  resetForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.resetData = {email: ''};
    this.resetForm = this._formBuilder.group({      
      email: ['']
      // password: [''],
      // confirmPassword: ['']
    });
  }

  ResetForm(){
    this.resetData = {email: ''};
  }

  Submit(formValue){
    console.log(formValue);
  }
}
