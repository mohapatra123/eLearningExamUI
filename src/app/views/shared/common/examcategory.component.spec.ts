import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamcategoryComponent } from './examcategory.component';

describe('ExamcategoryComponent', () => {
  let component: ExamcategoryComponent;
  let fixture: ComponentFixture<ExamcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
