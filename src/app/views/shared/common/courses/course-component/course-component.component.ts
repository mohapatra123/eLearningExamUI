import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ExamService } from 'src/app/core/services/exam/exam.service';
import { CourseDialogComponent } from '../../dialog/course-dialog.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-course-component',
  templateUrl: './course-component.component.html',
  styleUrls: ['./course-component.component.scss']
})
export class CourseComponentComponent implements OnInit {

  constructor(private _commonService: CommonService, public dialog: MatDialog, public _router: Router, private _examService: ExamService) { }

  @Input() isFromHomePage: boolean = false;
  courseList: any;
  courseListTemp: any;
  buttonText: string = 'Browse All';
  isNavigated: boolean = false;
  baseImageUrl: string = environment.baseImageUri;

  ngOnInit(): void {
    this.getCourseList();
  }

  getCourseList(){    
    //   this._commonService.list().subscribe(o => { 
    //   this.courseList = o[3].FeaturedCourse;
    // }); 
    
    this._examService.getFeaturedCourse().subscribe(res => {      
      this.courseListTemp = res.data;
      if(this.isFromHomePage){
        if(res != undefined){
          res.data.forEach(element => {
            if(element.path == null || element.path == ''){
              element.path = '/upload/feature_courses/defaultFeaturedCourse.png';
            }
            else{
              element.path = element.path.replace('feature_course', 'feature_courses');
            }
          });
        }
        this.courseList = res.data.slice(0, 6);
      }
      else{
        this.courseList = this.courseListTemp;
        this.courseList.forEach(element => {
          if(element.path == null || element.path == ''){
            element.path = '/upload/feature_courses/defaultFeaturedCourse.png';
          }
          else{
            element.path = element.path.replace('upload/feature_course', 'upload/feature_courses');
          }
        });
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
      }
        
    })
  }

  enrollCourse(course: any){

  }

  showAll(text: string, el: HTMLElement){
    el.scrollIntoView();
    if(text == "Browse All"){
      this._router.navigate(['featured-course'])
      //this.courseList = this.courseListTemp;
      //this.buttonText = "Browse less";
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
