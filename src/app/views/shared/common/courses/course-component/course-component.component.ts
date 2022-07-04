import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ExamService } from 'src/app/core/services/exam/exam.service';
import { CourseDialogComponent } from '../../dialog/course-dialog.component';

@Component({
  selector: 'app-course-component',
  templateUrl: './course-component.component.html',
  styleUrls: ['./course-component.component.scss']
})
export class CourseComponentComponent implements OnInit {

  constructor(private _commonService: CommonService, public dialog: MatDialog, public _router: Router, private _examService: ExamService) { }

  courseList: any;
  courseListTemp: any;
  buttonText: string = 'Browse All';

  ngOnInit(): void {
    this.getCourseList();
  }

  getCourseList(){    
    //   this._commonService.list().subscribe(o => { 
    //   this.courseList = o[3].FeaturedCourse;
    // }); 
    
    this._examService.getFeaturedCourse().subscribe(res => {      
      this.courseListTemp = res.data;
      this.courseList = res.data.slice(0, 6);
    })
  }

  enrollCourse(course: any){

  }

  showAll(text: string, el: HTMLElement){
    el.scrollIntoView();
    if(text == "Browse All"){
      this.courseList = this.courseListTemp;
      this.buttonText = "Browse less";
    }
    else{
      this.courseList = this.courseListTemp.slice(0, 6);
      this.buttonText = "Browse All";
    }    
  }

  // EnrollCourse(course: any): void {    
  //   const dialogRef = this.dialog.open(CourseDialogComponent, {
  //     width: '400px',
  //     data: {
  //       courseId: course.id,
  //       courseName: course.courseName,
  //       description: course.description,
  //       module: course.module,
  //       duration: course.duration,
  //       imagetag:course.imageTag,
  //       price: course.price
  //     }, disableClose: true
  //   });      
  // }

  EnrollCourse(course: any): void {
    this._router.navigate(['feature-course', course.id, course.name]);
  }
}
