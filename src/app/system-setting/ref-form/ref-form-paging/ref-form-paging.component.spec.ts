import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RefFormPagingComponent } from './ref-form-paging.component';

describe('RefFormPagingComponent', () => {
  let component: RefFormPagingComponent;
  let fixture: ComponentFixture<RefFormPagingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RefFormPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefFormPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
