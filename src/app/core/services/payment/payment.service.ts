import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly baseUri: string = environment.baseUri;
  private header: HttpHeaders;  
  errorMsg: string = '';

  constructor(private _http: HttpClient) {
    this.header = new HttpHeaders();
    this.header.append('Content-Type', 'application/json');
    this.header.append('Access-Control-Allow-Origin' , '*');
    this.header.append('Access-Control-Allow-Headers', '*');
  }  

  getPayments(): Observable<any> {
      return this._http.get(this.baseUri + 'exam/cms/payment/retrieve', { headers: this.header }).pipe(
      map((response: Response) => {
        return response;
      })
    )
  } 

  getAccountByEmail(formData: any): Observable<any> {
    return this._http.post(this.baseUri + 'user/f/myAccount', formData, { headers: this.header }).pipe(
      map((response: any) => {
          return response;
      }), 
      catchError(err => {
        let errorMsg: string;
        if (err.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${err.error.message}`;
        } else {
            this.errorMsg = this.getServerErrorMessage(err);
        }
        return throwError(this.errorMsg);
      })
    );
  }

  createPayment(formData: any): Observable<any> {
    return this._http.post(this.baseUri + 'exam/f/payment/create', formData, { headers: this.header }).pipe(
      map((response: any) => {
          return response;
      }), 
      catchError(err => {
        let errorMsg: string;
        if (err.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${err.error.message}`;
        } else {
            this.errorMsg = this.getServerErrorMessage(err);
        }
        return throwError(this.errorMsg);
      })
    );
  }

  updatePayment(formData: any): Observable<any> {
    return this._http.post(this.baseUri + 'exam/cms/payment/update/' + formData.id, formData, { headers: this.header }).pipe(
      map((response: any) => {
          return response;
      }), 
      catchError(err => {
        let errorMsg: string;
        if (err.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${err.error.message}`;
        } else {
            this.errorMsg = this.getServerErrorMessage(err);
        }
        return throwError(this.errorMsg);
      })
    );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }
    }
  }
}
