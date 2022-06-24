import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
import { ExamService } from 'src/app/core/services/exam/exam.service';

@Component({
  selector: 'app-free-mock',
  templateUrl: './free-mock.component.html',
  styleUrls: ['./free-mock.component.scss']
})
export class FreeMockComponent implements OnInit {

  constructor(private _examService: ExamService, private _behaviorSubject: BehaviorSubjectService,private _router: Router) { }

  dataSource: any;

  ngOnInit(): void {
    this._behaviorSubject.setRoute('ExamCourse');
    this.getAllExam();
  }

  redirectExam(data){ 
    this._router.navigate(['/examcategoryans', '', '', 0, data.name, data.id, 1], {queryParams: { freeMock: 'true' }});        
  }  

  getAllExam(){
    this._examService.getAllExamCourse().subscribe(res => {
      this.dataSource = res.data;        
    }) 
  }
}
