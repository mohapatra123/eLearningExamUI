import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/common/loader.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private loaderService: LoaderService){

  }
  ngOnInit(): void {
    this.loaderService.status.subscribe((val: boolean) => {
      this.loader = val;
    })
  }

  title = 'ELearningUI';
  loader: boolean = true;
}
