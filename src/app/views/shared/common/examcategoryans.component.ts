import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, SubCategory } from 'src/app/core/models/category.model';
import { Exam } from 'src/app/core/models/exam';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
import { CommonService } from 'src/app/core/services/common/common.service';

@Component({
  selector: 'app-examcategory',
  templateUrl: './examcategoryans.component.html',
  styleUrls: ['./examcategoryans.component.scss']
})
export class ExamcategoryAnsComponent implements OnInit {

  constructor(private _commonService: CommonService, private _activatedRoute: ActivatedRoute, private _behaviorSubject: BehaviorSubjectService) { }

  examName: string;
  subCategoryName: string;
  subCategoryId: number;

  public clients: Question[];
  public subCatList: SubCategory[];
  
  dataSource: any;  
  currentQuestion: string;
  currentOption: string[];
  isChecked: boolean = false;

  ngOnInit(): void {
    this._behaviorSubject.subCategory.subscribe(o =>{
      if(o != 0)
        this.subCategoryName = o;      
    })
    this.examName = this._activatedRoute.snapshot.paramMap.get('exam');
    this.getCategoryFromFile();
  }

  getCategoryFromFile(){
    this._commonService.list().subscribe(o => {
      this._commonService.list().subscribe(client => { 
        this.subCatList = client[1].SubCategory;       
        this.clients = client[2].Question;
        this.subCategoryId = this.subCatList.filter(o => o.name == this.examName)[0].id
        this.dataSource = this.clients.filter(o => o.subCategoryId == this.subCategoryId);
        this.currentQuestion = this.dataSource[0].content;
        this.currentOption = this.dataSource[0].option;        
      });
    })
  }

  checkValue(data: any){    
    console.log(data);
  }

}
