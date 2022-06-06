import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router, private _behaviorService: BehaviorSubjectService) { }

  isAuthenticated: boolean = false;
  bannerText: string;
  bannerDescription: string;

  ngOnInit(): void {
    if(this._authService.getToken() != undefined){
      this.isAuthenticated = true;
    }
    else
      this.isAuthenticated = false;
  }

  logout(){
    this._authService.removeLocalAuth('user_token');
    this._authService.removeLocalStorage('userInfo');
    this.isAuthenticated = false;    
    this._router.navigate(['/login']);
  }

  setBanner(){
    this._behaviorService.bannerHeading.subscribe(data => {
      this.bannerText = data;
    })
    this._behaviorService.bannerDescription.subscribe(data => {
      this.bannerDescription = data;
    })
  }
}
