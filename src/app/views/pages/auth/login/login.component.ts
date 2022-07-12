import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoaderService } from 'src/app/core/services/common/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService, private _router: Router, private _loaderService: LoaderService
  ) { }

  loginForm: FormGroup;
  isValid: boolean = true;
  statusMessage: string = '';
  tabIndex: number = 0;
  isForgetPwd: boolean = false;
  forgotPasswordData: {email: string}

  ngOnInit(): void {
    this.forgotPasswordData = { email: '' }
    this.loginForm = this._formBuilder.group({
      userId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  validateUser(loginForm){   
    this._loaderService.display(true);
    this.statusMessage = ''; 
    let loginData = {
      email: this.loginForm.value.userId,
      password: this.loginForm.value.password      
    }
    if(this.loginForm.valid){
      let authToken: any;
      let result: any;
      setTimeout(() => { 
        this._authService.authenticateUser(loginData).subscribe(res => {        
          if(res.token != null && res.token != undefined && res.token != ''){
            this.isValid = true;
            authToken = res.token;
            if(authToken){
              this._authService.setToken(authToken); 
              this.getUserInformation(loginData.email);
              
              this.redirectAfterAuth();
            }            
          }
          else{
            this.isValid = false;
          }
        }, (err) => {          
          this.statusMessage = err.error.message;
        })
        this._loaderService.display(false);
      }, 1000)      
      if(this.loginForm.value.userId == 'admin' && this.loginForm.value.password == 'admin'){
        this.redirectAfterAuth();
      }
    }
    
  }

  redirectAfterAuth(){
    this._router.navigateByUrl('');
  }

  GetChildData(data){    
    this.tabIndex = 0;
  }

  invokeForgotPassword(){
    
  }

  ForgotPassword(){
    this.isForgetPwd = true;
  }

  BackToLogin(){
    this.isForgetPwd = false;
  }

  getUserInformation(email: string){
    var formData = {
      email: email
    }
    this._authService.getUser(formData).subscribe((res: any) => {
      let userDetail: any;
      if(res != undefined){
        userDetail = {
          eMail: res.data.my_details.eMail,
          firstName: res.data.my_details.firstName,
          gender: res.data.my_details.gender,
          lastName: res.data.my_details.lastName,
          middleName: res.data.my_details.middleName,
          mobile: res.data.my_details.mobile,
          roleId: res.data.my_details.roleId,
          status: res.data.my_details.status,
          userId: res.data.my_details.userId,
          userName: res.data.my_details.userName
        }
      }      
      this._authService.setLocalStorage('userInfo', JSON.stringify(userDetail));
    })
  }
}
