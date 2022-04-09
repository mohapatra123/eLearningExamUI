import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from 'src/app/core/models/category.model';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
import { CommonService } from 'src/app/core/services/common/common.service';

@Component({
  selector: 'app-examcategory',
  templateUrl: './examcategory.component.html',
  styleUrls: ['./examcategory.component.scss']
})
export class ExamcategoryComponent implements OnInit {

  constructor(private _commonService: CommonService, private _router: Router, private _activatedRoute: ActivatedRoute, private _behaviorSubject: BehaviorSubjectService) { }

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
      this.getCategoryFromFile();      
    })
    this.subCategoryName = this._activatedRoute.snapshot.paramMap.get('subCategory');
    this.getCategoryFromFile();    
  }

  getCategoryFromFile(){
    this._commonService.list().subscribe(o => {
      this._commonService.list().subscribe(client => {
        this.clients = client[1].SubCategory;
        this.dataSource = this.clients.filter(o => o.categoryName == this.subCategoryName);          
      });
    })
  }

  redirectExam(data){    
    this._router.navigate(['/examcategoryans', data.name]);
  }  
}
