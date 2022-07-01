import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators'
import { ExamcategoryAnsComponent } from 'src/app/views/shared/common/examcategoryans.component';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private readonly baseUri: string = environment.baseUri;
  private header: HttpHeaders;  
  errorMsg: string = '';

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

  getCategoryById(id: number): Observable<any>{
    return this._http.get(this.baseUri + 'exam/cms/category/retrieve/' + id, { headers: this.header }).pipe(
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

 getSubCategoryById(id: number): Observable<any>{
  return this._http.get(this.baseUri + 'exam/cms/sub-category/retrieve/' + id, { headers: this.header }).pipe(
    map((response: Response) => {
      return response;
    })
  )
}

 getAllExamCourse(): Observable<any> {
    return this._http.get(this.baseUri + 'exam/f/courses/retrieve', { headers: this.header }).pipe(
    map((response: Response) => {
      return response;
    })
   )  
  }

  getQuestionList(examCagetoryId: number): Observable<any> {
    return this._http.get(this.baseUri + 'exam/f/courses/questions/' + examCagetoryId, { headers: this.header }).pipe(
    map((response: Response) => {
      return response;
    })
   )  
  }

  submitAnswer(formData: any): Observable<any> {
    return this._http.post(this.baseUri + 'exam/f/exam_questions/submit', formData, { headers: this.header }).pipe(
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

  getFeaturedCourse(id: Number = 0): Observable<any>{
    var url = id > 0 ? 'featured_course/cms/retrieve/' + id : 'featured_course/cms/retrieve';
    return this._http.get(this.baseUri + url, { headers: this.header }).pipe(
      map((response: Response) => {
          return response;
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
