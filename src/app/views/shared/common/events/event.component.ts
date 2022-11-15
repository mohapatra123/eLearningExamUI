import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/core/services/exam/exam.service';
import { FormsModule } from '@angular/forms';
import { LoaderService } from 'src/app/core/services/common/loader.service';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

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
  baseImageUrl: string = environment.baseImageUri;

  constructor(private examService: ExamService, private _loaderService: LoaderService, private _behaviorSubject: BehaviorSubjectService, private _router: Router) { }

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
              element.path = '/upload/event/defaultEvent.png';
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

  gotoEvent(id: number, name: string){
    this._router.navigate(['event-detail', id, name]);
  }
}
