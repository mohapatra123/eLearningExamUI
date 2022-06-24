import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  resetData: {email: string, password: string, confirmPassword: string}
  resetForm: FormGroup;
  userData: any;
  statusMessage: string = '';

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _behaviorSubject: BehaviorSubjectService) { }

  ngOnInit(): void {
    this._behaviorSubject.setRoute('UpdatePassword');
    this.resetData = {email: '', password: '', confirmPassword:''};
    this.resetForm = this._formBuilder.group({      
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
    this.getUserInfo();
  }

  getUserInfo(){
    this.userData = JSON.parse(this._authService.getLocalStorage('userInfo'));
    this.resetData = { email: this.userData.eMail, password: '', confirmPassword:'' };
  }

  ResetForm(){
    this.resetData = {email: this.userData.eMail, password: '', confirmPassword: ''};
  }

  Submit(formValue){
    this.statusMessage = '';
    if(this.resetForm.value.password != this.resetForm.value.confirmPassword){
      this.statusMessage = 'Password and Confirm password not matched';
    }    
  }
}
