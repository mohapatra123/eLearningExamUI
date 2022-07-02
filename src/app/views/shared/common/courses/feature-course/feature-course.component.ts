import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/core/services/exam/exam.service';
import {MatRadioButton} from '@angular/material/radio';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { CourseDialogComponent } from '../../dialog/course-dialog.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { TileStyler } from '@angular/material/grid-list/tile-styler';

@Component({
  selector: 'app-feature-course',
  templateUrl: './feature-course.component.html',
  styleUrls: ['./feature-course.component.scss']
})
export class FeatureCourseComponent implements OnInit {

  constructor(private _router: Router, public dialog: MatDialog, private _activatedRoute: ActivatedRoute, private _examService: ExamService, private _authService: AuthService, private _paymentService: PaymentService) { }

  courseId: number;
  courseName: string;
  featuredCourse: any;
  selectedOption: number = 0;
  userData: any;
  statusMessage: string = '';
  isOnline: boolean = true;  
  isEnrolled: boolean = false;
  isApproved: boolean = false;
  result: any;
  paymentData: any;
  featuredCourseDeatil: any;

  ngOnInit(): void {
    this.courseId = Number.parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    this.courseName = this._activatedRoute.snapshot.paramMap.get('name');    
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    this.userData = JSON.parse(this._authService.getLocalStorage('userInfo'));    
    this.getFeaturedCourse(this.courseId);    
  }

  getFeaturedCourse(id: Number){
    this._examService.getFeaturedCourse(id).subscribe(res => {
      if(res != undefined && res != null){
        this.verifyAccount();
        this.featuredCourse = res.data[0];        
      }      
    })
  }

  verifyAccount(){
    if(this.userData != undefined && this.userData != null){  
    var formData = {
      email: this.userData.eMail
    } 
    this._paymentService.getAccountByEmail(formData).subscribe(res => {
        if(res != undefined && res != null){
          if(res.data.my_courses.findIndex(o => o.featured_course_id == this.courseId) >= 0){
            this.featuredCourseDeatil = res.data.my_courses.filter(o => o.featured_course_id == this.courseId)[0];
            this.isOnline = this.featuredCourseDeatil.availability == 'Online' ? true : false;
            if(res.data.my_courses.findIndex(o => o.status == 21) >= 0){
              this.isEnrolled = true;
              this.statusMessage = 'Course enrolled & waiting for approval.';
            } 
            else if(res.data.my_courses.findIndex(o => o.status == 22) >= 0){
              this.isEnrolled = true;
              this.isApproved = true;
              this.statusMessage = 'Course enrolled.';
            } 
          }          
          else{
            this.isEnrolled = false;
            this.statusMessage = '';
          }       
        }
      })
    }
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

  enrollCourse(featuredCourse){
    this.statusMessage = '';
    if(this.userData != undefined && this.userData != null){  
      var formData = {
        email: this.userData.eMail
      }      
      if(this.isOnline){
        const dialogRef = this.dialog.open(CourseDialogComponent, {
          width: '400px',
          data: {
            courseId: featuredCourse.id,
            courseName: featuredCourse.name,
            description: featuredCourse.description,
            module: featuredCourse.modules,
            duration: featuredCourse.duration,                        
            sellingPrice: featuredCourse.selling_price,
            retailPrice: featuredCourse.retail_price,
            availability: this.isOnline ? 'Online' : 'Offline'            
          }, disableClose: true
        }); 
        
        dialogRef.afterClosed().subscribe(result => {        
          this.result = result;
          if(this.result.status == 1){
            this._router.navigate(['/myaccount'])
          }      
        });
      }
      else{
        this.EnrollOfflineCourse(featuredCourse);
      }
    }
    else{
      this._router.navigate(['/login']);
    }
  }

  EnrollOfflineCourse(featuredCourse: any){    
    this.paymentData = { 
      transaction_id: null,
      email_id: this.userData.eMail,
      status: 21,
      amount: featuredCourse.sellingPrice,  
      category_name: null,    
      category_selected: null,      
      courses_name: null,
      courses_selected: null,      
      sub_category_name: null,
      sub_category_selected: null,
      featured_course_id: featuredCourse.id,
      featured_course_name: featuredCourse.name,
      availability: this.isOnline ? 'Online' : 'Offline'
    }

    this._paymentService.createPayment(this.paymentData).subscribe((res) => {
    if(res.status == true){        
      setTimeout(() => { this.statusMessage = res.message; }, 1000)          
      setTimeout(() => { 
        this.statusMessage = '';          
      }, 2000)          
    }
  })
  }
}
