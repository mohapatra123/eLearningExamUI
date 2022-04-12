import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyTrainingComponent } from './technology-training.component';

describe('TechnologyTrainingComponent', () => {
  let component: TechnologyTrainingComponent;
  let fixture: ComponentFixture<TechnologyTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnologyTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
