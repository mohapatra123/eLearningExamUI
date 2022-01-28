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

  getAllExam(param: any): Observable<any> {
      return this._http.get(this.baseUri + 'f/exam/', { headers: this.header }).pipe(
      map((response: Response) => {
        return response;
      })
    )
  }  
}
