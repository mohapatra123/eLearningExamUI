import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Category } from 'src/app/core/models/category.model';
import { CommonService } from 'src/app/core/services/common/common.service';
import { Router } from '@angular/router';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
import { ExamService } from 'src/app/core/services/exam/exam.service';
@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainmenuComponent implements OnInit {

  constructor(private _commonService: CommonService, private _router: Router, private _behaviorSubject: BehaviorSubjectService, private _examService: ExamService) {
  
  }  

  selected :string;  
  examArray: any[];
  examList: any[];
  buttonText: string = "Show All";

  public clients: Category[];

  categoryData: Category;
  dataSource: any;

  select(data: any)
  { 
    this._behaviorSubject.setCategoryId(data.id);   
    this._behaviorSubject.setSubCategory(data.name);
    this._behaviorSubject.setRoute('');    
    //this._router.navigate(['/examcategory', data.name]);    
    this._router.navigate(['/sample', data.name]);    
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory(){
    this._examService.getAllCategory().subscribe(res => {
      this.dataSource = res.data;      
    })
  }
}
