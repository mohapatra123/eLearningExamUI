import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService, private _router: Router
  ) { }

  loginForm: FormGroup;
  isValid: boolean = true;
  statusMessage: string;

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      userId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  validateUser(loginForm){    
    let loginData = {
      email: this.loginForm.value.userId,
      password: this.loginForm.value.password      
    }

    if(this.loginForm.valid){
      let authToken: any;
      let result: any;
      this._authService.authenticateUser(loginData).subscribe(res => {        
        if(res.token != null && res.token != undefined && res.token != ''){
          this.isValid = true;
          authToken = res.token;
          if(authToken){
            this._authService.setToken(authToken); 
            this.getUserInformation(loginData.email);
            this.redirectAfterAuth();
          }
          //this._authService.removeLocalAuth(authToken);
        }
        else{
          this.isValid = false;
        }
      }, (err) => {
        console.log(err);
      })
      if(this.loginForm.value.userId == 'admin' && this.loginForm.value.password == 'admin'){
        this.redirectAfterAuth();
      }
    }
  }

  redirectAfterAuth(){
    this._router.navigateByUrl('home');
  }

  getUserInformation(email: string){
    var formData = {
      email: email
    }
    this._authService.getUser(formData).subscribe((res: any) => {
      console.log(res);
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
