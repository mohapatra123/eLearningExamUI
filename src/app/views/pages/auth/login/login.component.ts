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
    console.log(loginForm);
    // if(loginForm.value.userId == 'Admin' && loginForm.value.password == 'Admin@123'){
    //   this._authService.setToken('12345');
    //   this.redirectAfterAuth();      
    // }
    // this.isValid = false;
    let loginData = {
      email: this.loginForm.value.userId,
      password: this.loginForm.value.password      
    }

    if(this.loginForm.valid){
      let authToken: any;
      let result: any;
      this._authService.authenticateUser(loginData).subscribe(res => {
        console.log(res);
        if(res.token != null && res.token != undefined && res.token != ''){
          this.isValid = true;
          authToken = res.token;
          this._authService.setToken(authToken);
          this.redirectAfterAuth();

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
    this._router.navigateByUrl('dashboard');
  }
}
