import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../../../core/models/course';
import { Exam } from '../../../core/models/exam';
import { ExamService } from '../../../core/services/exam/exam.service';
import { BehaviorSubjectService } from '../../../core/services/common/behavior-subject.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private examService: ExamService, private _behaviorSubject: BehaviorSubjectService,
    @Inject(DOCUMENT) private document: Document) { }

  examArray: any[];
  examList: any[];
  buttonText: string = "Show All";

  ngOnInit(): void {
    this._behaviorSubject.setRoute('Home');
    this.getAllExam();
  }

  getAllExam(){
      this.examService.getAllExam(0).subscribe(res => {
      this.examArray = res.list.slice(0, 8);
      this.examList = res.list;
      //this.showAll(this.buttonText);
      console.log(res.list);
    });
  }

  showAll(text: string){
    if(text == "Show All"){
      this.examArray = this.examList;
      this.buttonText = "Show less";
    }
    else{
      this.examArray = this.examList.slice(0, 8);
      this.buttonText = "Show All";
    }    
  }


  windowScrolled: boolean;
  
  @HostListener("window:scroll", [])
  onWindowScroll() {
      if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop >= 250) {
          this.windowScrolled = true;
      } 
     else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
      }
  }
  scrollToTop() {
      (function smoothscroll() {
          var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - (currentScroll / 8));
          }
      })();
  }

}
