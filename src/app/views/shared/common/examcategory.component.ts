import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from 'src/app/core/models/category.model';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ExamService } from 'src/app/core/services/exam/exam.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PaymentDialogComponent } from './dialog/payment-dialog.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-examcategory',
  templateUrl: './examcategory.component.html',
  styleUrls: ['./examcategory.component.scss']
})
export class ExamcategoryComponent implements OnInit {

  constructor(private _commonService: CommonService, private _router: Router, private _activatedRoute: ActivatedRoute, 
    private _behaviorSubject: BehaviorSubjectService, private _examService: ExamService, public dialog: MatDialog, private _authService: AuthService) { }

  public clients: SubCategory[];
  dataSource: any;
  categoryData: any;
  categoryName: string;
  examCourseName: string;

  

  result: any;

  ngOnInit(): void {    
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
        this._examService.getCategoryById(this.dataSource[0].categoryId).subscribe(catResponse => {
          this.categoryData = catResponse.data[0];
          console.log(catResponse);
        })
        console.log(this.dataSource);
      }
      
    }) 
  }

  redirectExam(data){ 
    this._router.navigate(['/examcourse', data.categoryName, data.name, data.id]);
  }  

  openDialog(): void {
    if(this._authService.getToken() != undefined){
      const dialogRef = this.dialog.open(PaymentDialogComponent, {
        width: '250px',
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
}
