import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  constructor(private _behaviorSubject: BehaviorSubjectService) { }

  ngOnInit(): void {
    this._behaviorSubject.setRoute('Aboutus');
  }

}
