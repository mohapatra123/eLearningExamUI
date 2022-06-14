import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, MinLengthValidator, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @Output() myOutput:EventEmitter<boolean>= new EventEmitter(); 

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService, private _router: Router
  ) { }

  signupForm: FormGroup;
  isValid: boolean = true;
  statusMessage: string;
  isError: boolean = false;
  confirmPasswordMessage: string;

  ngOnInit(): void {
    this.signupForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      eMail: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), this.matchValues('password')]]
    })
  }

  userRegistration(userForm: any){
    if(this.signupForm.value.password != this.signupForm.value.confirmPassword){
      this.confirmPasswordMessage = "password and confirm password mismatch !";
      return;
    }
    if(this.signupForm.valid){
      this._authService.userRegistration(this.signupForm.value).subscribe(res => {  
        if(res.error)
          this.isError = true;
        else
          this.isError = false;           
        this.statusMessage = res.message;        
      })
    }
    this.sendValue(true);
  }

  sendValue(val: boolean){
    this.myOutput.emit(val);
  }

  matchValues(
    matchTo: string // name of the control to match to
    ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
}
}
