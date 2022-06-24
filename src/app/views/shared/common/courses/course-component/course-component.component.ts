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

  constructor(private _commonService: CommonService, public dialog: MatDialog, private _examService: ExamService, private _router: Router) { }

  courseList: any;

  ngOnInit(): void {
    this.getCourseList();
  }

  getCourseList(){
    this._examService.getFeaturedCourse().subscribe(res => {
      res.data.forEach(element => {        
        element.tag_name = '/assets/' + element.name  + '.png';
        element.module = ['Module-1', 'Module-2', 'Module-3']
      });
      this.courseList = res.data;      
    })    
  }

  enrollCourse(course: any){

  }

  EnrollCourse(course: any): void {
    //this._router.navigate(['/contactus']);    
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
    
    dialogRef.afterClosed().subscribe(result => {        
      this._router.navigate(['/contactus']);            
    });
  }
}
