import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from 'src/app/core/models/category.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ExamService } from 'src/app/core/services/exam/exam.service';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { PaymentDialogComponent } from './dialog/payment-dialog.component';

@Component({
  selector: 'app-examcourse',
  templateUrl: './examcourse.component.html',
  styleUrls: ['./examcourse.component.scss']
})
export class ExamcourseComponent implements OnInit {

  constructor(private _commonService: CommonService, private _router: Router, private _activatedRoute: ActivatedRoute, 
    private _paymentService: PaymentService, private _behaviorSubject: BehaviorSubjectService, private _examService: ExamService, private dialog: MatDialog, private _authService: AuthService) { }

  public clients: SubCategory[];
  dataSource: any;
  categoryId: number;
  categoryName: string;
  subCategoryName: string;
  subCategoryId: number;
  subCategoryData: any;
  result: any;
  userData: any;
  accountData: any;
  btnHeaderText: string = 'Enroll'
  isEnrolledSubCategory: boolean;

  ngOnInit(): void {  
    this.userData = JSON.parse(this._authService.getLocalStorage('userInfo'));     
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    this._behaviorSubject.setBannerHeading("We Envision World’s Best Category.");
    this._behaviorSubject.setBannerDescription("Category Description");
    // this._behaviorSubject.subCategory.subscribe(o =>{
    //   this.subCategoryName = o;
    //   this.getSubCategory();      
    // })
    this.categoryId = Number.parseInt(this._activatedRoute.snapshot.paramMap.get('categoryId'));
    this.categoryName = this._activatedRoute.snapshot.paramMap.get('category');
    this.subCategoryName = this._activatedRoute.snapshot.paramMap.get('subCategory');
    this.subCategoryId = Number.parseInt(this._activatedRoute.snapshot.paramMap.get('subCategoryId'));
    
    this.getExamCourse();    
  }

  getExamCourse(){
    this._examService.getAllExamCourse().subscribe(res => {
      this.dataSource = res.data.filter(o => o.subcategoryId == this.subCategoryId); 
      if(this.dataSource && this.dataSource.length > 0){
        this.getAccountDetail();
        this._examService.getSubCategoryById(this.subCategoryId).subscribe(subCatResponse => {
          this.subCategoryData = subCatResponse.data[0];          
        })        
      }      
    }) 
  }

  getAccountDetail(){
    if(!this.userData){
      this.isEnrolledSubCategory = false;
      this.btnHeaderText = "Enroll";
    }
    var formData = {
      email: this.userData.eMail
    }
    this._paymentService.getAccountByEmail(formData).subscribe(res => {
      this.accountData = res.data.my_courses; 
      if(this.accountData && this.accountData.findIndex(o => o.category_selected == this.categoryId.toString()) > -1){
        this.btnHeaderText = '';
      }
      else if(this.accountData && this.accountData.findIndex(o => o.sub_category_selected == this.subCategoryId.toString()) > -1){
        this.btnHeaderText = '';
      }
      else{
        this.dataSource.forEach(element => {
          if(this.accountData.findIndex(o => o.sub_category_selected == element.id) >= 0){
            element.isEnrolled = true;
            element.btnText = "";
          }
          else{
            if(this.accountData.findIndex(o => o.courses_selected == element.id) >= 0){
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
          this.isEnrolledSubCategory = true;
          this.btnHeaderText = "";
        }
      }      
    })
  }

  openDialog(): void {
    if(this._authService.getToken() != undefined){
      const dialogRef = this.dialog.open(PaymentDialogComponent, {
        width: '400px',
        data: {
          subCategoryId: this.subCategoryId, 
          subCategoryName: this.subCategoryName,
          retailPrice: this.subCategoryData.retail_price,
          sellingPrice: this.subCategoryData.selling_price
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

  redirectExam(data){ 
    this._router.navigate(['/examcategoryans', this.categoryName, this.subCategoryName, this.subCategoryId, data.name, data.id, data.duration ? data.duration : 0]);
  }  

  openDialogExam(data){    
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
        this.result = result;
        if(this.result.status == 1){
          this._router.navigate(['/myaccount'])
        }      
      });
    }
    else
     this._router.navigate(['/login']);
  }
}
