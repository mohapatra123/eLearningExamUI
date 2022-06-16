import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) { }

  categoryName: string;

  ngOnInit(): void {
    this.categoryName = this._activatedRoute.snapshot.paramMap.get('name');
    this._router.navigate(['/examcategory', this.categoryName]);    
  }
}
