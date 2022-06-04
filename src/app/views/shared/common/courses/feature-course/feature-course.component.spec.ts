import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCourseComponent } from './feature-course.component';

describe('FeatureCourseComponent', () => {
  let component: FeatureCourseComponent;
  let fixture: ComponentFixture<FeatureCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
