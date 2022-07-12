import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TileStyler } from '@angular/material/grid-list/tile-styler';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, SubCategory } from 'src/app/core/models/category.model';
import { Exam } from 'src/app/core/models/exam';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ExamService } from 'src/app/core/services/exam/exam.service';
import { map } from 'rxjs/operators'
import { interval, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from './dialog/common-dialog.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoaderService } from 'src/app/core/services/common/loader.service';

@Component({
  selector: 'app-examcategory',
  templateUrl: './examcategoryans.component.html',
  styleUrls: ['./examcategoryans.component.scss']
})
export class ExamcategoryAnsComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private _commonService: CommonService, private _activatedRoute: ActivatedRoute, private dialog: MatDialog, private _behaviorSubject: BehaviorSubjectService, private _formBuilder: FormBuilder, private _examService: ExamService, private _router: Router, private _authService: AuthService, private _loaderService: LoaderService) { }

  examName: string;
  categoryName: string;
  subCategoryName: string;
  subCategoryId: number;
  examId: number;
  statusMessage: string = ''
  examDuration: number;

  public clients: Question[];
  public subCatList: SubCategory[];
  
  dataSource: any;  
  currentQuestion: string;
  currentOption: string[];
  isChecked: boolean = false;
  questionIndex: number = 0;
  currentQuestionId: number = 0;

  questionForm: FormGroup;
  answerArr = [{id: 0, answer: [], isCorrect: false, questionIndex: 0}];
  ans = ['0', '0', '0', '0'];

  numArr: number[] = [0];
  numArr1: any[] = [{id: 0, isAttempted: false, isCorrect: false}];
  numArr2 = [{id: 0, isAttempted: false}];

  totalQuestion: number = 0;
  totalUnattempted: number = 0;
  totalAttempted: number = 0;
  totalCorrectAnswer: number = 0;
  totalWrongAnswer: number = 0;
  isValidUser: boolean = false;
  percentage: string = '0';
  freeMock: boolean = false;
  
  
  isSubmitted: boolean = false;

  private subscription: Subscription;
  
  public dateNow = new Date();
  public dDay = new Date();
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;

  result: any;

  alertHour: number;
  alertMinute: number;
  alertSecond: number;

  userData: any;

  get answers(){
    return this.questionForm.get('SelectedAnswer') as FormArray;
  }

  addQuestions(value: string = '', checked: boolean = false){    
    this.answers.push(this._formBuilder.control(checked));    
  }

  ngOnInit(): void {
    this.numArr = [];  
    
    this.userData = JSON.parse(this._authService.getLocalStorage('userInfo'));
    if(this.userData != undefined){
      this.isValidUser = true;
    }    
    this._behaviorSubject.setRoute('ExamCategoryAns');
    
    this.freeMock = (this._activatedRoute.snapshot.queryParamMap.get('freeMock') == 'true');
    this.categoryName = this._activatedRoute.snapshot.paramMap.get('category');
    this.subCategoryName = this._activatedRoute.snapshot.paramMap.get('subCategory');
    this.examName = this._activatedRoute.snapshot.paramMap.get('exam');
    this.examId = Number.parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    this.subCategoryId = Number.parseInt(this._activatedRoute.snapshot.paramMap.get('subCategoryId'));
    this.examDuration = Number.parseInt(this._activatedRoute.snapshot.paramMap.get('duration'));
    this.alertSecond = this.examDuration * 60;

    this.subscription = interval(1000)
      .subscribe(x => { 
      this.getTimeDifference(); 
      this.alertSecond -= 1      
    }); 

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

  private getTimeDifference () {
    this.timeDifference = new  Date().getTime() - this.dDay.getTime();
    if(this.alertSecond == 11){
      //this.subscription.unsubscribe();
      this.openDialog();
    }
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits (timeDifference) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
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
  }

  openDialog(){
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '400px',
      data: {
        alertDuration: 10
      }, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {        
      this.result = result;
      if(this.result.status == 1){
        this.SubmitAnswer(this.questionForm);
      }      
      this.subscription.unsubscribe();
    });
  }

  getQuestionList(){
    this.numArr1.pop()
    this.numArr2.pop()    
    var idList = [];
    this._examService.getQuestionList(this.examId).subscribe(res => {
      if(res != null){
        if(this.freeMock == true){
          this.dataSource = res.data.slice(0, 5);
        }
        else
          this.dataSource = res.data;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
  }

  Next(){
    if(this.ans.indexOf('1') >= 0){
      let numIndex = (this.questionIndex) / 10;
      let numColIndex = (this.questionIndex) % 10;
      this.numArr1[Number.parseInt(numIndex.toString())][numColIndex.toFixed()].isAttempted = true;
      if(JSON.stringify(this.dataSource[this.questionIndex].answer) == JSON.stringify(this.ans)){
        this.answerArr.push({id: this.dataSource[this.questionIndex].id, answer: this.ans, isCorrect: true, questionIndex: this.questionIndex});
        this.numArr1[Number.parseInt(numIndex.toString())][numColIndex.toFixed()].isCorrect = true;
      }
      else{
        this.answerArr.push({id: this.dataSource[this.questionIndex].id, answer: this.ans, isCorrect: false, questionIndex: this.questionIndex});
        this.numArr1[Number.parseInt(numIndex.toString())][numColIndex.toFixed()].isCorrect = false;
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
      let numIndex = (this.questionIndex) / 10;
      let numColIndex = (this.questionIndex) % 10;
      this.numArr1[numIndex.toFixed()][numColIndex.toFixed()].isAttempted = true;
      if(JSON.stringify(this.dataSource[this.questionIndex].answer) == JSON.stringify(this.ans)){
        this.answerArr.push({id: this.dataSource[this.questionIndex].id, answer: this.ans, isCorrect: true, questionIndex: this.questionIndex});
        this.numArr1[Number.parseInt(numIndex.toString())][numColIndex.toFixed()].isCorrect = true;
      }
      else{
        this.answerArr.push({id: this.dataSource[this.questionIndex].id, answer: this.ans, isCorrect: false, questionIndex: this.questionIndex});
        this.numArr1[Number.parseInt(numIndex.toString())][numColIndex.toFixed()].isCorrect = false;
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
    if(a && a.answer[i] == '1')
      return true;    
    return false;
  }

  tdClick(val){    
    this.questionIndex = val - 1;
    this.currentQuestionId = this.dataSource[this.questionIndex].id;
    this.currentQuestion = this.dataSource[this.questionIndex].content;
    this.currentOption = this.dataSource[this.questionIndex].option;
  } 

  SubmitAnswer(questionForm){
    if(this.answerArr.length <= 0 && this.ans.indexOf('1') < 0){
      alert('You have not attend any questions.')
      return;
    }      
    if(this.ans.indexOf('1') >= 0){
      let numIndex = (this.questionIndex) / 10;
      let numColIndex = (this.questionIndex) % 10;
      this.numArr1[Number.parseInt(numIndex.toString())][numColIndex.toFixed()].isAttempted = true;
      if(JSON.stringify(this.dataSource[this.questionIndex].answer) == JSON.stringify(this.ans)){
        this.answerArr.push({id: this.dataSource[this.questionIndex].id, answer: this.ans, isCorrect: true, questionIndex: this.questionIndex});
        this.numArr1[Number.parseInt(numIndex.toString())][numColIndex.toFixed()].isCorrect = true;
      }
      else{
        this.answerArr.push({id: this.dataSource[this.questionIndex].id, answer: this.ans, isCorrect: false, questionIndex: this.questionIndex});
        this.numArr1[Number.parseInt(numIndex.toString())][numColIndex.toFixed()].isCorrect = false;
      }
    }
    this.ans = ['0', '0', '0', '0'];    
    this.isSubmitted = true;
    
    this.totalAttempted = this.answerArr.length;
    this.totalUnattempted = this.totalQuestion - this.totalAttempted 
    
    this.totalCorrectAnswer = this.answerArr.filter(o => o.isCorrect == true).length;
    this.totalWrongAnswer = this.answerArr.length - this.totalCorrectAnswer;

    this.percentage = ((this.totalCorrectAnswer / this.totalQuestion) * 100).toFixed(2);
     

    var requestBody = {
      courseId: this.examId,
      subCategoryId: this.subCategoryId,
      user_email : "student@fintechedu.com",                
      time_spent : "240/240",                
      answer_sheet: this.totalQuestion.toString() + "/"+ this.totalCorrectAnswer + "/" + this.totalWrongAnswer + "/" + this.totalUnattempted
    }
    if(this.freeMock){
      this._loaderService.display(true);
      this.subscription.unsubscribe();
      setTimeout(() => { 
        this._loaderService.display(false);
        alert('Exam Completed.') }, 1000);
    }
    else{
      this._loaderService.display(true);
      this._examService.submitAnswer(requestBody).subscribe((res) => {
        if(res.status == true){
          this.statusMessage = res.message;
          this.subscription.unsubscribe();
          setTimeout(() => {
            this._loaderService.display(false);
            alert(this.statusMessage) }, 2000)        
        }
      }, (err) => {
        this._loaderService.display(false);
      }, () => {
        this._loaderService.display(false);
      })
    }    
  }

  navigateCourse(){
    this._router.navigate(['/examcategory', this.categoryName]);
  }

  navigateSubCategory(){
    this._router.navigate(['/examcourse', this.categoryName, this.subCategoryName, this.subCategoryId]);
  }

  clearResponse(){
    this.answerArr = [{id: 0, answer: [], isCorrect: false, questionIndex: 0}];
    this.numArr = [];
    this.numArr1 = [{id: 0, isAttempted: false}];
    this.numArr2 = [{id: 0, isAttempted: false}];
    this.questionIndex = 0;
    this.alertSecond = this.examDuration * 60;
    this.subscription.unsubscribe();
    this.dDay = new Date();
    this.subscription = interval(1000)
      .subscribe(x => { 
      this.getTimeDifference(); 
      this.alertSecond -= 1      
    }); 
    this.getQuestionList();
  }
}
