import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialInclusionComponent } from './financial-inclusion.component';

describe('FinancialInclusionComponent', () => {
  let component: FinancialInclusionComponent;
  let fixture: ComponentFixture<FinancialInclusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialInclusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialInclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
