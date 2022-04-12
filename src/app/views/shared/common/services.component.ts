import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(private _behaviorSubject: BehaviorSubjectService) { }

  ngOnInit(): void {
    this._behaviorSubject.setRoute('Services');
  }

}
