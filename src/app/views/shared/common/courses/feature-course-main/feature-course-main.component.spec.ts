import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCourseMainComponent } from './feature-course-main.component';

describe('FeatureCourseMainComponent', () => {
  let component: FeatureCourseMainComponent;
  let fixture: ComponentFixture<FeatureCourseMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureCourseMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureCourseMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
