import { Component, OnInit } from '@angular/core';
import { Course } from '../../../core/models/course';
import { Exam } from '../../../core/models/exam';
import { ExamService } from '../../../core/services/exam/exam.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private examService: ExamService) { }

  examArray: any[];
  examList: any[];
  buttonText: string = "Show All";

  ngOnInit(): void {
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
}
