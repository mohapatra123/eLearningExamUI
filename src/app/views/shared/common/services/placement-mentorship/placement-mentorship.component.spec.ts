import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementMentorshipComponent } from './placement-mentorship.component';

describe('PlacementMentorshipComponent', () => {
  let component: PlacementMentorshipComponent;
  let fixture: ComponentFixture<PlacementMentorshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementMentorshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementMentorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
