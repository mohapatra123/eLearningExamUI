import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamcourseComponent } from './examcourse.component';

describe('ExamcourseComponent', () => {
  let component: ExamcourseComponent;
  let fixture: ComponentFixture<ExamcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamcourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
