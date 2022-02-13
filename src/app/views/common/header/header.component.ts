import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }

  isAuthenticated: boolean = false;

  ngOnInit(): void {
    if(this._authService.getToken() != undefined){
      this.isAuthenticated = true;
    }
    else
      this.isAuthenticated = false;
  }

  logout(){
    this._authService.removeLocalAuth('user_token');
    this.isAuthenticated = false;    
  }
}
