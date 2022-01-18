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
    console.log(param);
      let formData: FormData = new FormData();
      formData.append('email', param.email);
      formData.append('password', param.password);
      formData.append('status', '1');
      return this._http.post(this.baseUri + 'o/login', formData, { headers: this.header }).pipe(
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
}
