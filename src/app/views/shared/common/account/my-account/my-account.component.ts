import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { observable, Observable, of } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  userData: any;
  accountData: any;
  statusColor: 'red-row';

  dataSource: MatTableDataSource<Category>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['TransactionId', 'Date', 'Category', 'SubCategory', 'Course', 'Price', 'Status', 'Action'];  

  constructor(private _authService: AuthService, private _paymentService: PaymentService) { }

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
      this.dataSource = new MatTableDataSource(res.data.my_courses);
      this.dataSource.paginator = this.paginator;
      console.log(this.accountData);
    })
  }

  GetCourse(){
    
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
