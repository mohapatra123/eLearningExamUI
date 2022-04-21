import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from 'src/app/core/models/category.model';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ExamService } from 'src/app/core/services/exam/exam.service';

@Component({
  selector: 'app-examcourse',
  templateUrl: './examcourse.component.html',
  styleUrls: ['./examcourse.component.scss']
})
export class ExamcourseComponent implements OnInit {

  constructor(private _commonService: CommonService, private _router: Router, private _activatedRoute: ActivatedRoute, 
    private _behaviorSubject: BehaviorSubjectService, private _examService: ExamService) { }

  public clients: SubCategory[];
  dataSource: any;
  categoryName: string;
  subCategoryName: string;
  subCategoryId: number;

  ngOnInit(): void {    
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
    this.categoryName = this._activatedRoute.snapshot.paramMap.get('category');
    this.subCategoryName = this._activatedRoute.snapshot.paramMap.get('subCategory');
    this.subCategoryId = Number.parseInt(this._activatedRoute.snapshot.paramMap.get('subCategoryId'));
    
    this.getExamCourse();    
  }

  getExamCourse(){
    this._examService.getAllExamCourse().subscribe(res => {
      this.dataSource = res.data.filter(o => o.subcategoryId == this.subCategoryId); 
      console.log(res);
    }) 
  }

  redirectExam(data){ 
    console.log(data);
    //this._router.navigate(['/examcourse', data.name]);   
    this._router.navigate(['/examcategoryans', this.categoryName, this.subCategoryName, this.subCategoryId, data.name, data.id]);
  }  
}
