import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
import { CommonService } from 'src/app/core/services/common/common.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _commonService: CommonService, private _router: Router, private _behaviorSubject: BehaviorSubjectService
  ) { }

  contactForm: FormGroup;
  statusMessage: string = '';
  status: boolean = false;

  ngOnInit(): void {
    this._behaviorSubject.setRoute('Contactus');
    this.clearForm();
  }

  postContact(contact: any){
    console.log(contact);
      this._commonService.postContact(contact.value).subscribe((res)=> {
        if(res.error == false){
          console.log(res);
          this.status = true;
          this.statusMessage = 'Successfully Saved';
          this.clearForm();
        }
        else{
          this.statusMessage = res.message;
          this.status = false;
        }        
      }, (err) => {      
        this.status = false;
        this.statusMessage = err.error.message;
    })
  }

  getColor(status: boolean){
    switch(status){
      case true:
        return 'blue';
      case false:
        return 'red';
      default:
        return 'black';
    }
  }

  clearForm(){
    this.contactForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['']
    })    
  }
}
