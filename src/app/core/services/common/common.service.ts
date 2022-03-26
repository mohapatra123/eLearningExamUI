import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private readonly baseUri: string = environment.baseUri;
  private header: HttpHeaders;

  constructor(private _http: HttpClient) {
    this.header = new HttpHeaders();
    this.header.append('Content-Type', 'application/json');
    this.header.append('Access-Control-Allow-Origin' , '*');
    this.header.append('Access-Control-Allow-Headers', '*');
  }  

  list(): Observable<any[]> {
    return this._http.get<any[]>('/assets/client.json');
  }  

  postContact(param: any): Observable<any>{
    let formData: FormData = new FormData();
    formData.append('name', param.name);
    formData.append('phoneNo', param.phone); 
    formData.append('emailId', param.email);
    formData.append('message', param.message);   
    //return of({ status: 1, error: null, message: 'success' });  
    return this._http.post(this.baseUri + 'f/contactUS', formData, { headers: this.header }).pipe(
      map((response: Response) => {
        return response;
      })
    )   
  }  
}
