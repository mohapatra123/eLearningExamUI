import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamcategoryAnsComponent } from './examcategoryans.component';

describe('examcategoryAnsComponent', () => {
  let component: ExamcategoryAnsComponent;
  let fixture: ComponentFixture<ExamcategoryAnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamcategoryAnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamcategoryAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
