import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectService } from 'src/app/core/services/common/behavior-subject.service';

@Component({
  selector: 'app-pagebanner',
  templateUrl: './pagebanner.component.html',
  styleUrls: ['./pagebanner.component.scss']
})
export class PagebannerComponent implements OnInit {

  constructor(private _behaviorService: BehaviorSubjectService) { }

  bannerText: string = 'We Envision World’s Best Learning Experience.';
  bannerDescription: string = "we believe that learning is for everyone. Our expertise lies in Finance and Technology education for all.";

  ngOnInit(): void {
    this.setBanner();
  }

  setBanner(){
    // this._behaviorService.bannerHeading.subscribe(data => {
    //   this.bannerText = data;
    // })
    this._behaviorService.bannerDescription.subscribe(data => {
      this.bannerDescription = data;
    })
  }
}
