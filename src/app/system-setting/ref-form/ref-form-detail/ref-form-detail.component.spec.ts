import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RefFormDetailComponent } from './ref-form-detail.component';

describe('RefFormDetailComponent', () => {
  let component: RefFormDetailComponent;
  let fixture: ComponentFixture<RefFormDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RefFormDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefFormDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
