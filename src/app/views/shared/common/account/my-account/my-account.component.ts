import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { observable, Observable, of } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { Router } from '@angular/router';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
import { ExamService } from 'src/app/core/services/exam/exam.service';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  userData: any;
  accountData: any;
  courseData: any;
  statusColor: 'red-row';
  categoryId: number;
  categoryName: string;

  dataSource: MatTableDataSource<Category>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['Package','TransactionId', 'Date',  'Price', 'Status', 'Action'];  

  constructor(private _authService: AuthService, private _paymentService: PaymentService, private _router: Router, private _behaviorSubject: BehaviorSubjectService, private _examService: ExamService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(this._authService.getLocalStorage('userInfo'));
    this.getAccountDetail();
  }

  getAccountDetail(){
    var formData = {
      email: this.userData.eMail
    }
    this._paymentService.getAccountByEmail(formData).subscribe(res => {
      this.accountData = res.data.my_details      
      this.courseData = res.data.my_courses
      this.courseData.forEach(element => {
        if(element.category_name && element.category_name != ''){
          element.package = element.category_name
        }
        else if(element.sub_category_name && element.sub_category_name != ''){
          element.package = element.sub_category_name
        }
        if(element.courses_name && element.courses_name != ''){
          element.package = element.courses_name
        }        
      });
      this.dataSource = new MatTableDataSource(this.courseData);
      this.dataSource.paginator = this.paginator;      
    })
  }

  GetCourse(element){    
    if(element.category_name && element.category_name != ''){
      this._behaviorSubject.setSubCategory(element.category_name);
      this._router.navigate(['/examcategory', element.category_name]); 
    }
    else if(element.sub_category_name && element.sub_category_name != ''){
      this._examService.getSubCategoryById(Number.parseInt(element.sub_category_selected)).subscribe(subCatResponse => {
        if(subCatResponse != undefined){
          this.categoryId = subCatResponse.data[0].categoryId;
          this.categoryName = subCatResponse.data[0].categoryName;          
          this._router.navigate(['/examcourse', this.categoryName, this.categoryId, element.sub_category_name, element.sub_category_selected]);
        }        
      })      
    }
  }

  getClass(statusId){
    switch (statusId) {
      case 21: {
          return 'orange-td-row'
      }
      case 22: {
          return 'green-td-row';
      }
      case 23: {
          return 'red-td-row';
      }
      default: {
          return 'default-td-row';
      }
    }
  }

  getStatus(statusId){
    switch (statusId) {
      case 21: {
          return 'Pending'
      }
      case 22: {
          return 'Approved';
      }
      case 23: {
          return 'Rejected';
      }
      default: {
          return 'Unknown';
      }
    }
  }
}
