import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate{
    isLoggedIn: boolean = false;
    constructor(
        private _router: Router,
        private _auth: AuthService
    ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this._auth.getLocalAuth('user_token')){
          return true;
        }
        else{
           this._router.navigate(['/login']);
           return false;
        }
    }
}