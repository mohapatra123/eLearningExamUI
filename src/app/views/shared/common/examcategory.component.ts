import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from 'src/app/core/models/category.model';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ExamService } from 'src/app/core/services/exam/exam.service';

@Component({
  selector: 'app-examcategory',
  templateUrl: './examcategory.component.html',
  styleUrls: ['./examcategory.component.scss']
})
export class ExamcategoryComponent implements OnInit {

  constructor(private _commonService: CommonService, private _router: Router, private _activatedRoute: ActivatedRoute, 
    private _behaviorSubject: BehaviorSubjectService, private _examService: ExamService) { }

  public clients: SubCategory[];
  dataSource: any;
  subCategoryName: string;

  ngOnInit(): void {    
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    this._behaviorSubject.setBannerHeading("We Envision World’s Best Category.");
    this._behaviorSubject.setBannerDescription("Category Description");
    this._behaviorSubject.subCategory.subscribe(o =>{
      this.subCategoryName = o;
      this.getSubCategory();      
    })
    this.subCategoryName = this._activatedRoute.snapshot.paramMap.get('subCategory');
    this.getSubCategory();    
  }

  getSubCategory(){
    this._examService.getAllSubCategory().subscribe(res => {
      this.dataSource = res.data.filter(o => o.categoryName == this.subCategoryName); 
      console.log(res);
    }) 
  }

  redirectExam(data){    
    this._router.navigate(['/examcategoryans', data.name]);
  }  
}
