import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUri: string = environment.baseUri;
  private readonly baseLoginUri: string = environment.baseLoginUri;
  private header: HttpHeaders;

  constructor(private _http: HttpClient) {
    this.header = new HttpHeaders();
    this.header.append('Content-Type', 'application/json');
    this.header.append('Access-Control-Allow-Origin' , '*');
    this.header.append('Access-Control-Allow-Headers', '*');
  }

  getLocalAuth(key: string): Observable<boolean> | Promise<boolean> | boolean{
    if(localStorage.getItem('user_token') != undefined){
      return true;
    }
    else{
      return false;
    }
  }

  authenticateUser(param: any): Observable<any> {    
      let formData: FormData = new FormData();
      formData.append('eMail', param.email);
      formData.append('password', param.password);      
      return this._http.post(this.baseLoginUri + 'cms/user/login', formData, { headers: this.header }).pipe(
      map((response: Response) => {
        return response;
      })
    )
  }  

  userRegistration(param: any): Observable<any>{
    let formData: FormData = new FormData();
    formData.append('firstName', param.firstName);
    formData.append('lastName', param.lastName); 
    formData.append('eMail', param.eMail);
    formData.append('mobile', param.mobile); 
    formData.append('password', param.password); 
    formData.append('roleId', "3"); 
    formData.append('status', "1"); 
    return this._http.post(this.baseLoginUri + 'cms/user/register', formData, { headers: this.header }).pipe(
      map((response: Response) => {
        return response;
      })
    )   
  }

  getUser(formData: any){
      return this._http.post(this.baseUri + 'user/f/myAccount', formData, { headers: this.header }).pipe(
      map((response: Response) => {
        return response;
      })
    )
  }

  getToken(){
    return localStorage.getItem('user_token');
  }

  setToken(authToken: string){
    localStorage.setItem('user_token', authToken);
  }

  removeLocalAuth(key: string): void{
    localStorage.removeItem('user_token');    
  }

  getLocalStorage(key: string){
    return localStorage.getItem(key);
  }

  setLocalStorage(key: string, value: any){
    localStorage.setItem(key, value);
  }

  removeLocalStorage(key: string){
    localStorage.removeItem(key);
  }
}
