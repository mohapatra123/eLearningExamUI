import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Category } from 'src/app/core/models/category.model';
import { CommonService } from 'src/app/core/services/common/common.service';
import { Router } from '@angular/router';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';
@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainmenuComponent implements OnInit {

  constructor(private _commonService: CommonService, private _router: Router, private _behaviorSubject: BehaviorSubjectService) { }

  

  selected :string;  
  examArray: any[];
  examList: any[];
  buttonText: string = "Show All";

  public clients: Category[];

  categoryData: Category;
  dataSource: any;

  select(data: any)
  {    
    this._behaviorSubject.setSubCategory(data.name);
    this._behaviorSubject.setRoute('');
    this._router.navigate(['/examcategory', data.name]);    
  }

  ngOnInit(): void {
    this.getCategoryFromFile();
  }

  getCategoryFromFile(){
    this._commonService.list().subscribe(o => {
      this._commonService.list().subscribe(client => {
        this.clients = client[0].Category;
        this.dataSource = this.clients;       
      });
    })
  }
}
