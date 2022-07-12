import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/core/services/exam/exam.service';
import { FormsModule } from '@angular/forms';
import { LoaderService } from 'src/app/core/services/common/loader.service';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  examArray: any[];
  examList: any[];
  eventList: any;
  isFromHomePage: boolean = true;

  constructor(private examService: ExamService, private _loaderService: LoaderService, private _behaviorSubject: BehaviorSubjectService) { }

  ngOnInit(): void {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    this._behaviorSubject.setRoute('Event');
    this.getAllEvents();     
  }

  getAllEvents(){
    this._loaderService.display(true);
    setTimeout(() => {
      this.examService.getEvents().subscribe(res => {
        if(res != undefined){
          this.eventList = res.data;
          this.eventList.sort((a, b) => {
            return <any>new Date(b.eventDate) - <any>new Date(a.eventDate);
          }); 
          this.eventList.forEach(element => {
            if(element.path == null || element.path == ''){
              element.path = 'defaultEvent';
            }
          });
        }      
      }, (err) => {
        this._loaderService.display(false);
      }, () => {
        this._loaderService.display(false);
      })  
    }, 500);    
  }
}
