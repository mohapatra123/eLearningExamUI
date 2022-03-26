import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectService {

  private _routePage = new BehaviorSubject<any>(0);
  routePage = this._routePage.asObservable();

  private _subCategory = new BehaviorSubject<any>('');
  subCategory = this._subCategory.asObservable();

  constructor() { }

  setRoute(data: string){
    this._routePage.next(data);
  }  

  setSubCategory(data: string){
    this._subCategory.next(data);
  }  
}
