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
  isEnrolledCategory: boolean = true;
  btnText: string = '';
  btnCategoryText: string = '';

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
      if(res != undefined){
        this.dataSource = res.data.filter(o => o.categoryName == this.categoryName);         
        if(this.dataSource && this.dataSource.length > 0){            
          this.dataSource.isEnroll = false;        
          this._examService.getCategoryById(this.dataSource[0].categoryId).subscribe(catResponse => {
            if(catResponse){
              this.categoryData = catResponse.data[0];
              this.getAccountDetail();
            }            
          })
        }        
      }      
    }) 
  }

  redirectExam(data){ 
    this._router.navigate(['/examcourse', data.categoryName, data.categoryId, data.name, data.id]);
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
    this.isEnrolledCategory = false;
    this._paymentService.getAccountByEmail(formData).subscribe(res => {
      this.accountData = res.data.my_courses;      
      if(this.accountData.findIndex(o => o.category_selected == this.categoryData.id) == -1){
        this.isEnrolledCategory = false;
        this.btnCategoryText = "Enroll";
      }
      else{
        this.dataSource.forEach(element => {
          if(!this.isEnrolledCategory){
            element.isEnrolled = true;
            element.btnText = "";
          }
          else{
            if(this.accountData.findIndex(o => o.sub_category_selected == element.id) >= 0){
              element.isEnrolled = true;
              element.btnText = "";
            }
            else{
              element.isEnrolled = false;
              element.btnText = "Enroll";
            }
          }          
        });
        if(this.dataSource.findIndex(o => o.isEnrolled == false) == -1){
          this.isEnrolledCategory = true;
          this.btnCategoryText = "";
        }
      }
    })
  }

  openDialogSubCategory(data){
    if(this._authService.getToken() != undefined){
      const dialogRef = this.dialog.open(PaymentDialogComponent, {
        width: '400px',
        data: {
          subCategoryId: data.id, 
          subCategoryName: data.name,
          retailPrice: data.retail_price,
          sellingPrice: data.selling_price
        }, disableClose: true
      });
  
      dialogRef.afterClosed().subscribe(result => {        
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
      this.btnText = "";
      return true;
    }
    this.btnText = "Enroll";
    return false;
  }
}
