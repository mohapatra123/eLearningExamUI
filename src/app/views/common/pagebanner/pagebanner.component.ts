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
  bannerDescription: string = "courses is for every one from different age groups and with various level of skills.";

  ngOnInit(): void {
    this.setBanner();
  }

  setBanner(){
    this._behaviorService.bannerHeading.subscribe(data => {
      this.bannerText = data;
    })
    this._behaviorService.bannerDescription.subscribe(data => {
      this.bannerDescription = data;
    })
  }
}
