import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectService {

  private _routePage = new BehaviorSubject<any>(0);
  routePage = this._routePage.asObservable();

  private _category = new BehaviorSubject<any>('');
  category = this._category.asObservable();

  private _subCategory = new BehaviorSubject<any>('');
  subCategory = this._subCategory.asObservable();

  private _bannerHeading = new BehaviorSubject<string>('');
  bannerHeading = this._bannerHeading.asObservable();

  private _bannerDescription = new BehaviorSubject<string>('');
  bannerDescription = this._bannerDescription.asObservable();

  setRoute(data: string){
    this._routePage.next(data);
  }  

  setCategoryId(data: number){
    this._category.next(data);
  }

  setSubCategory(data: string){
    this._subCategory.next(data);
  }  

  setBannerHeading(data: string){
    this._bannerHeading.next(data);
  }

  setBannerDescription(data: string){
    this._bannerDescription.next(data);
  }

  constructor() { }  
}
