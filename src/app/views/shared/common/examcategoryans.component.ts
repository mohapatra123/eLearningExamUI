import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TileStyler } from '@angular/material/grid-list/tile-styler';
import { ActivatedRoute } from '@angular/router';
import { Question, SubCategory } from 'src/app/core/models/category.model';
import { Exam } from 'src/app/core/models/exam';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ExamService } from 'src/app/core/services/exam/exam.service';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-examcategory',
  templateUrl: './examcategoryans.component.html',
  styleUrls: ['./examcategoryans.component.scss']
})
export class ExamcategoryAnsComponent implements OnInit, AfterViewInit {

  constructor(private _commonService: CommonService, private _activatedRoute: ActivatedRoute, private _behaviorSubject: BehaviorSubjectService, private _formBuilder: FormBuilder, private _examService: ExamService) { }

  examName: string;
  categoryName: string;
  subCategoryName: string;
  subCategoryId: number;
  examId: number;
  statusMessage: string = ''

  public clients: Question[];
  public subCatList: SubCategory[];
  
  dataSource: any;  
  currentQuestion: string;
  currentOption: string[];
  isChecked: boolean = false;
  questionIndex: number = 0;
  currentQuestionId: number = 0;

  questionForm: FormGroup;
  answerArr = [{id: 0, answer: [], isCorrect: false}];
  ans = ['0', '0', '0', '0'];

  numArr: number[] = [0];
  numArr1: any[] = [{id: 0, isAttempted: false}];
  numArr2 = [{id: 0, isAttempted: false}];

  totalQuestion: number = 0;
  totalUnattempted: number = 0;
  totalAttempted: number = 0;
  totalCorrectAnswer: number = 0;
  totalWrongAnswer: number = 0;
  
  
  isSubmitted: boolean = false;

  get answers(){
    return this.questionForm.get('SelectedAnswer') as FormArray;
  }

  addQuestions(value: string = '', checked: boolean = false){    
    this.answers.push(this._formBuilder.control(checked));
    console.log(this.questionForm);
  }

  ngOnInit(): void {
    this.numArr = [];   
    
    console.log(this.numArr1);

    // this._behaviorSubject.subCategory.subscribe(o =>{
    //   if(o != 0)
    //     this.subCategoryName = o;      
    // })
    this.categoryName = this._activatedRoute.snapshot.paramMap.get('category');
    this.subCategoryName = this._activatedRoute.snapshot.paramMap.get('subCategory');
    this.examName = this._activatedRoute.snapshot.paramMap.get('exam');
    this.examId = Number.parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    this.subCategoryId = Number.parseInt(this._activatedRoute.snapshot.paramMap.get('subCategoryId'));
    //this.getCategoryFromFile();
    this.getQuestionList();    

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

  checkAnswer(id, evt){    
    var i = this.answerArr && this.answerArr.length > 0 ? this.answerArr.filter(o => o.id == this.currentQuestionId) : undefined;
    if(i && i.length > 0){
      this.answerArr.filter(o => o.id == i[0].id)[0].answer[id] = evt.checked ? '1' : '0';
      if(this.answerArr.filter(o => o.id == i[0].id)[0].answer.indexOf(o => o == '1') < 0){
        this.answerArr.splice(this.answerArr.findIndex(o => o.id == this.currentQuestionId), 1)
      }
    }
    else{
      if(evt.checked){ 
        this.ans[id] = '1'
      }  
      else{
        this.ans[id] = '0'
      }
    }        
    console.log(this.ans);
  }

  getQuestionList(){
    this.numArr1.pop()
    this.numArr2.pop()
    console.log(this.examId);
    var idList = [];
    this._examService.getQuestionList().subscribe(res => {
      if(res != null){
        this.dataSource = res.data.filter(o => o.courseId == this.examId); 
        console.log(this.dataSource);
        this.totalQuestion = this.dataSource.length;
        this.currentQuestion = this.dataSource[0].content;
        this.currentOption = this.dataSource[0].option;
        this.currentQuestionId = this.dataSource[0].id;
        for(let i = 1; i <= this.dataSource.length; i++){
          this.numArr.push(i);
        }
        if(this.numArr.length > 0){
          this.numArr.forEach((ele, index) => {      
            if(index > 0 && index % 10 == 0){  
              this.numArr1.push(this.numArr2);
              this.numArr2 = [{id: ele, isAttempted: false}];              
            }      
            else{
              this.numArr2.push({id: ele, isAttempted: false});        
            }
          })
          this.numArr1.push(this.numArr2);
          this.numArr2 = [];
          this.answerArr.pop();
        }
      }      
    }) 
  }
  
  ngAfterViewInit(): void {
    for(let i = 0; i < 9; i++){
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
    if(this.ans.indexOf('1') >= 0){
      let numIndex = (this.questionIndex) / 5;
      let numColIndex = (this.questionIndex) % 5;
      this.numArr1[Number.parseInt(numIndex.toString())][numColIndex.toFixed()].isAttempted = true;
      if(JSON.stringify(this.dataSource[this.questionIndex].answer) == JSON.stringify(this.ans)){
        this.answerArr.push({id: this.dataSource[this.questionIndex].id, answer: this.ans, isCorrect: true});
      }
      else{
        this.answerArr.push({id: this.dataSource[this.questionIndex].id, answer: this.ans, isCorrect: false});
      }
    }
    if(this.questionIndex <= this.dataSource.length - 2){
      this.questionIndex += 1;
      this.currentQuestionId = this.dataSource[this.questionIndex].id;
      this.currentQuestion = this.dataSource[this.questionIndex].content;
      this.currentOption = this.dataSource[this.questionIndex].option;
      this.ans = ['0', '0', '0', '0'];
    }    
  }

  Previous(){
    if(this.ans.indexOf('1') >= 0){
      let numIndex = (this.questionIndex) / 5;
      let numColIndex = (this.questionIndex) % 5;
      this.numArr1[numIndex.toFixed()][numColIndex.toFixed()].isAttempted = true;
      if(JSON.stringify(this.dataSource[this.questionIndex].answer) == JSON.stringify(this.ans)){
        this.answerArr.push({id: this.dataSource[this.questionIndex].id, answer: this.ans, isCorrect: true});
      }
      else{
        this.answerArr.push({id: this.dataSource[this.questionIndex].id, answer: this.ans, isCorrect: false});
      }
    }    
    if(this.questionIndex > 0){
      this.questionIndex -= 1;
      this.currentQuestionId = this.dataSource[this.questionIndex].id;
      this.currentQuestion = this.dataSource[this.questionIndex].content;
      this.currentOption = this.dataSource[this.questionIndex].option;
    } 
    this.ans = ['0', '0', '0', '0'];
  }

  checkOption(i){
    let a = this.answerArr.filter(o => o.id == this.dataSource[this.questionIndex].id)[0];
    console.log(a);
    if(a && a.answer[i] == '1')
      return true;    
    return false;
  }

  tdClick(val){
    console.log(val)
    this.questionIndex = val - 1;
    this.currentQuestionId = this.dataSource[this.questionIndex].id;
    this.currentQuestion = this.dataSource[this.questionIndex].content;
    this.currentOption = this.dataSource[this.questionIndex].option;
  } 

  SubmitAnswer(questionForm){
    if(this.ans.indexOf('1') >= 0){
      let numIndex = (this.questionIndex) / 5;
      let numColIndex = (this.questionIndex) % 5;
      this.numArr1[Number.parseInt(numIndex.toString())][numColIndex.toFixed()].isAttempted = true;
      if(JSON.stringify(this.dataSource[this.questionIndex].answer) == JSON.stringify(this.ans)){
        this.answerArr.push({id: this.dataSource[this.questionIndex].id, answer: this.ans, isCorrect: true});
      }
      else{
        this.answerArr.push({id: this.dataSource[this.questionIndex].id, answer: this.ans, isCorrect: false});
      }
    }
    this.ans = ['0', '0', '0', '0'];
    console.log(this.answerArr);
    this.isSubmitted = true;
    
    this.totalAttempted = this.answerArr.length;
    this.totalUnattempted = this.totalQuestion - this.totalAttempted 
    
    this.totalCorrectAnswer = this.answerArr.filter(o => o.isCorrect == true).length;
    this.totalWrongAnswer = this.answerArr.length - this.totalCorrectAnswer;
     

    var requestBody = {
      courseId: this.examId,
      subCategoryId: this.subCategoryId,
      user_email : "student@fintechedu.com",                
      time_spent : "240/240",                
      answer_sheet: this.totalQuestion.toString() + "/"+ this.totalCorrectAnswer + "/" + this.totalWrongAnswer + "/" + this.totalUnattempted
    }

    this._examService.submitAnswer(requestBody).subscribe((res) => {
      if(res.status == true){
        this.statusMessage = res.message;
        setTimeout(() => { alert(this.statusMessage) }, 2000)        
      }
    })
  }

  clearResponse(){
    
  }
}
