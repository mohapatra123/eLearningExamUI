import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverseasEducationComponent } from './overseas-education.component';

describe('OverseasEducationComponent', () => {
  let component: OverseasEducationComponent;
  let fixture: ComponentFixture<OverseasEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverseasEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverseasEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
