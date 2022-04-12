import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagebannerComponent } from './pagebanner.component';

describe('PagebannerComponent', () => {
  let component: PagebannerComponent;
  let fixture: ComponentFixture<PagebannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagebannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagebannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
