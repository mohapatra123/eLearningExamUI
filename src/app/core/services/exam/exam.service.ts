import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private readonly baseUri: string = environment.baseUri;
  private header: HttpHeaders;

  constructor(private _http: HttpClient) {
    this.header = new HttpHeaders();
    this.header.append('Content-Type', 'application/json');
    this.header.append('Access-Control-Allow-Origin' , '*');
    this.header.append('Access-Control-Allow-Headers', '*');
  }  

  getAllCategory(): Observable<any> {
      return this._http.get(this.baseUri + 'exam/f/category/retrieve', { headers: this.header }).pipe(
      map((response: Response) => {
        return response;
      })
    )
  } 
  
  getAllSubCategory(): Observable<any> {
    return this._http.get(this.baseUri + 'exam/f/sub-category/retrieve', { headers: this.header }).pipe(
    map((response: Response) => {
      return response;
    })
  )
} 
}
