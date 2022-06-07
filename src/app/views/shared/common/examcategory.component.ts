import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from 'src/app/core/models/category.model';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ExamService } from 'src/app/core/services/exam/exam.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PaymentDialogComponent } from './dialog/payment-dialog.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PaymentService } from 'src/app/core/services/payment/payment.service';

@Component({
  selector: 'app-examcategory',
  templateUrl: './examcategory.component.html',
  styleUrls: ['./examcategory.component.scss']
})
export class ExamcategoryComponent implements OnInit {

  constructor(private _commonService: CommonService, private _router: Router, private _activatedRoute: ActivatedRoute, 
    private _behaviorSubject: BehaviorSubjectService, private _examService: ExamService, private dialog: MatDialog, private _authService: AuthService
    ,private _paymentService: PaymentService
    ) { }

  public clients: SubCategory[];
  dataSource: any;
  categoryData: any;
  categoryName: string;
  examCourseName: string; 
  userData: any;
  accountData: any;
  isEnrolledCourse: boolean = false;
  btnText: string = '';

  result: any;

  ngOnInit(): void { 
    this.userData = JSON.parse(this._authService.getLocalStorage('userInfo'));   
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    this._behaviorSubject.setBannerHeading("We Envision World’s Best Category.");
    this._behaviorSubject.setBannerDescription("Category Description");    
    this.categoryName = this._activatedRoute.snapshot.paramMap.get('examCategory');    
    this.getExamCourse();
  }

  getExamCourse(){
    this._examService.getAllSubCategory().subscribe(res => {
      console.log(res);
      console.log(this.categoryName);
      if(res != undefined){
        this.dataSource = res.data.filter(o => o.categoryName == this.categoryName); 
        console.log(this.dataSource);
        if(this.dataSource && this.dataSource.length > 0){
          this.getAccountDetail();
          this._examService.getCategoryById(this.dataSource[0].categoryId).subscribe(catResponse => {
            this.categoryData = catResponse.data[0];
            console.log(catResponse);
          })
          console.log(this.dataSource);
        }        
      }      
    }) 
  }

  redirectExam(data){ 
    this._router.navigate(['/examcourse', data.categoryName, data.name, data.id]);
  }  

  openDialog(): void {
    if(this._authService.getToken() != undefined){
      const dialogRef = this.dialog.open(PaymentDialogComponent, {
        width: '400px',
        data: {
          categoryId: this.categoryData.id, 
          categoryName: this.categoryData.name,
          retailPrice: this.categoryData.retail_price,
          sellingPrice: this.categoryData.selling_price
        }, disableClose: true
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed ' + this.result);
        this.result = result;
        if(this.result.status == 1){
          this._router.navigate(['/myaccount'])
        }      
      });
    }
    else
     this._router.navigate(['/login']);    
  }

  getAccountDetail(){
    var formData = {
      email: this.userData.eMail
    }
    this._paymentService.getAccountByEmail(formData).subscribe(res => {
      this.accountData = res.data.my_courses; 
      console.log(this.accountData);     
    })
  }

  openDialogSubCategory(data){
    console.log(data);
    if(this._authService.getToken() != undefined){
      const dialogRef = this.dialog.open(PaymentDialogComponent, {
        width: '400px',
        data: {
          courseId: data.id, 
          courseName: data.name,
          retailPrice: data.retail_price,
          sellingPrice: data.selling_price
        }, disableClose: true
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed ' + this.result);
        this.result = result;
        if(this.result.status == 1){
          this._router.navigate(['/myaccount'])
        }      
      });
    }
    else
     this._router.navigate(['/login']);
  }

  checkEnrolledCourse(data){
    if(this.accountData && this.accountData.findIndex(o => o.courses_selected == data.id.toString()) > -1){
      this.btnText = "Enrolled";
      return true;
    }
    this.btnText = "Enroll";
    return false;
  }
}
