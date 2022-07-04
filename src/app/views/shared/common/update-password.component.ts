import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
import { LoaderService } from 'src/app/core/services/common/loader.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  resetData: {email: string, oldPassword: string, newPassword: string, confirmPassword: string}
  resetForm: FormGroup;
  userData: any;
  statusMessage: string = '';

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _behaviorSubject: BehaviorSubjectService, 
    private _loaderService: LoaderService) { 

  }

  ngOnInit(): void {
    this._behaviorSubject.setRoute('UpdatePassword');
    this.resetData = {email: '', oldPassword: '', newPassword: '', confirmPassword:''};
    this.resetForm = this._formBuilder.group({      
      email: ['', [Validators.required]],
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
    this.getUserInfo();
  }

  getUserInfo(){
    this.userData = JSON.parse(this._authService.getLocalStorage('userInfo'));
    this.resetData = { email: this.userData.eMail, oldPassword: '', newPassword: '', confirmPassword:'' };
  }

  ResetForm(){
    this.resetData = {email: this.userData.eMail, oldPassword: '', newPassword: '', confirmPassword: ''};
  }

  Submit(formValue){
    this.statusMessage = '';
    this._loaderService.display(true);
    if(this.resetForm.value.newPassword != this.resetForm.value.confirmPassword){
      this.statusMessage = 'Password and Confirm password not matched';
      this._loaderService.display(false);
      return;
    }    
    let formData = {
      email: this.resetData.email,
      pwd: this.resetData.oldPassword,
      newPwd: this.resetData.newPassword
    }
    this._authService.updatePassword(formData).subscribe((res) => {
      if(res.err == null){
        this.statusMessage = res.data;
      }
      else{
        this.statusMessage = res.err;
      }
    }, (err) => {
      console.log(err)
    }, () => {
      this.ResetForm();
      this._loaderService.display(false);
    })
  }
}
