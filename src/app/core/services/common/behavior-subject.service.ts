import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectService {

  private _routePage = new BehaviorSubject<any>(0);
  routePage = this._routePage.asObservable();

  constructor() { }

  setRoute(data: string){
    this._routePage.next(data);
  }  
}
