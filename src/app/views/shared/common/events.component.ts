import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private _behaviorSubject: BehaviorSubjectService) { }

  ngOnInit(): void {
    this._behaviorSubject.setRoute('Event');
  }

}
