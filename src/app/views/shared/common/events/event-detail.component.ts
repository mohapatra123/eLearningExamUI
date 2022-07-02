import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/core/services/exam/exam.service';
import {MatRadioButton} from '@angular/material/radio';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { TileStyler } from '@angular/material/grid-list/tile-styler';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  constructor(private _router: Router, public dialog: MatDialog, private _activatedRoute: ActivatedRoute, private _examService: ExamService, private _authService: AuthService, private _paymentService: PaymentService) { }

  eventData: any; 
  eventId: number;
  eventName: string; 

  ngOnInit(): void {
    this.eventId = Number.parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    this.eventName = this._activatedRoute.snapshot.paramMap.get('name');    
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });    
    this.getFeaturedCourse(this.eventId);    
  }

  getFeaturedCourse(id: Number){
    this._examService.getEventsById(this.eventId).subscribe(res => {
      if(res != undefined && res != null){
        this.eventData = res.data[0];        
      }      
    })
  }
}
