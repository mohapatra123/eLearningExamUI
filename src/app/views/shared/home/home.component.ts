import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../../../core/models/course';
import { Exam } from '../../../core/models/exam';
import { ExamService } from '../../../core/services/exam/exam.service';
import { BehaviorSubjectService } from '../../../core/services/common/behavior-subject.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { Category } from 'src/app/core/models/category.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private examService: ExamService, private _behaviorSubject: BehaviorSubjectService,
    @Inject(DOCUMENT) private document: Document, private _commonService: CommonService, private _router: Router) { }

  examArray: any[];
  examList: any[];
  buttonText: string = "Show All";

  public clients: Category[];

  categoryData: Category;
  dataSource: any;
  imgBaseName: '/assets/';
  imgExtension: '.svg'
  

  ngOnInit(): void {
    this.setBanner();
    this._behaviorSubject.setRoute('Home');    
    this.getAllExam();
  }

  setBanner(){
    this._behaviorSubject.setBannerHeading("We Envision World’s Best Learning Experience.");
    this._behaviorSubject.setBannerDescription("we believe that learning is for everyone. Our expertise lies in Finance and Technology education for all.");
  }

  getAllExam(){
    this.examService.getAllCategory().subscribe(res => {
      if(res != null){
        res.data.forEach(element => {
          element.tag_name = '/assets/' + element.tag_name + '.svg'
        });
        this.dataSource = res.data;
        console.log(res);
      }      
    })
  }

  showAll(text: string){
    if(text == "Show All"){
      this.examArray = this.examList;
      this.buttonText = "Show less";
    }
    else{
      this.examArray = this.examList.slice(0, 8);
      this.buttonText = "Show All";
    }    
  }

  selectCategory(cat){
    this._behaviorSubject.setSubCategory(cat.name);
    this._router.navigate(['/examcategory', cat.name]);     
  }


  windowScrolled: boolean;
  
  @HostListener("window:scroll", [])
  onWindowScroll() {
      if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop >= 250) {
          this.windowScrolled = true;
      } 
     else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
      }
  }
  scrollToTop() {
      (function smoothscroll() {
          var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - (currentScroll / 8));
          }
      })();
  }

}
