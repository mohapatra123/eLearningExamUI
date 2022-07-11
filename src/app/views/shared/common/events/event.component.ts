import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/core/services/exam/exam.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.getAllEvents();     
  }

  getAllEvents(){
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
    })
  }
}
