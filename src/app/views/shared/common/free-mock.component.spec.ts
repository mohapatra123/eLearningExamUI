import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeMockComponent } from './free-mock.component';

describe('FreeMockComponent', () => {
  let component: FreeMockComponent;
  let fixture: ComponentFixture<FreeMockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeMockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
