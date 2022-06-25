import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private _behaviorSubject: BehaviorSubjectService) { }

  fromRoute: string = ''

  ngOnInit(): void {    
    this._behaviorSubject.routePage.subscribe(o =>{
      this.fromRoute = o;      
    })
  }

  getClass(fromroute: string){
    if(fromroute != 'Home')
      return 'noNews';
    return '';
  }
}
