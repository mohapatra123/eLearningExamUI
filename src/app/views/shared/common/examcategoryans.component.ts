import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
export class ExamcategoryAnsComponent implements OnInit, AfterViewInit {

  constructor(private _commonService: CommonService, private _activatedRoute: ActivatedRoute, private _behaviorSubject: BehaviorSubjectService, private _formBuilder: FormBuilder) { }

  examName: string;
  subCategoryName: string;
  subCategoryId: number;

  public clients: Question[];
  public subCatList: SubCategory[];
  
  dataSource: any;  
  currentQuestion: string;
  currentOption: string[];
  isChecked: boolean = false;
  questionIndex: number = 0;

  questionForm: FormGroup;

  numArr: number[] = [0];
  numArr1: any[] = [];
  numArr2: number[] = [];

  get answers(){
    return this.questionForm.get('SelectedAnswer') as FormArray;
  }

  addQuestions(value: string = '', checked: boolean = false){    
    this.answers.push(this._formBuilder.control(checked));
    console.log(this.questionForm);
  }

  ngOnInit(): void {
    this.numArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    if(this.numArr.length > 0){
      this.numArr.forEach((ele, index) => {      
        if(index > 0 && index % 5 == 0){  
          this.numArr1.push(this.numArr2);
          this.numArr2 = [ele];              
        }      
        else{
          this.numArr2.push(ele);        
        }
      })
      this.numArr1.push(this.numArr2);
      this.numArr2 = [];
    }
    
    console.log(this.numArr1);

    this._behaviorSubject.subCategory.subscribe(o =>{
      if(o != 0)
        this.subCategoryName = o;      
    })
    this.examName = this._activatedRoute.snapshot.paramMap.get('exam');
    this.getCategoryFromFile();

    this.questionForm = this._formBuilder.group({      
      Id: [0],
      Content: [''],
      SubCategoryId: 0,
      IsActive: [false],
      Option: this._formBuilder.array([]),
      Answer: this._formBuilder.array([]),
      SelectedAnswer: this._formBuilder.array([])
    });
  }
  
  ngAfterViewInit(): void {
    for(let i = 0; i < 4; i++){
      this.addQuestions('', false);
    } 
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

  Next(){
    this.questionIndex += 1;
    this.currentQuestion = this.dataSource[this.questionIndex].content;
    this.currentOption = this.dataSource[this.questionIndex].option;
  }

  Previous(){
    if(this.questionIndex > 0){
      this.questionIndex -= 1;
      this.currentQuestion = this.dataSource[this.questionIndex].content;
      this.currentOption = this.dataSource[this.questionIndex].option;
    }    
  }

  SubmitAnswer(questionForm){
    console.log(this.questionForm);
  }
}
