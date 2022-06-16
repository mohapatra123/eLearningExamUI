import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/services/common/common.service';
import { CourseDialogComponent } from '../../dialog/course-dialog.component';

@Component({
  selector: 'app-course-component',
  templateUrl: './course-component.component.html',
  styleUrls: ['./course-component.component.scss']
})
export class CourseComponentComponent implements OnInit {

  constructor(private _commonService: CommonService, public dialog: MatDialog) { }

  courseList: any;

  ngOnInit(): void {
    this.getCourseList();
  }

  getCourseList(){    
      this._commonService.list().subscribe(o => { 
      this.courseList = o[3].FeaturedCourse;
    });    
  }

  enrollCourse(course: any){

  }

  EnrollCourse(course: any): void {    
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width: '400px',
      data: {
        courseId: course.id,
        courseName: course.courseName,
        description: course.description,
        module: course.module,
        duration: course.duration,
        price: course.price
      }, disableClose: true
    });      
  }
}
