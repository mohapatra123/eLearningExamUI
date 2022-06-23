import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ExamService } from 'src/app/core/services/exam/exam.service';
import { CourseDialogComponent } from '../../dialog/course-dialog.component';

@Component({
  selector: 'app-course-component',
  templateUrl: './course-component.component.html',
  styleUrls: ['./course-component.component.scss']
})
export class CourseComponentComponent implements OnInit {

  constructor(private _commonService: CommonService, public dialog: MatDialog, private _examService: ExamService) { }

  courseList: any;

  ngOnInit(): void {
    this.getCourseList();
  }

  getCourseList(){
    this._examService.getFeaturedCourse().subscribe(res => {
      this.courseList = res.data;      
    })    
  }

  enrollCourse(course: any){

  }

  EnrollCourse(course: any): void {    
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width: '400px',
      data: {
        courseId: course.id,
        courseName: course.name,
        description: course.description,
        module: course.module,
        duration: '4 Weeks',
        price: course.selling_price
      }, disableClose: true
    });      
  }
}
