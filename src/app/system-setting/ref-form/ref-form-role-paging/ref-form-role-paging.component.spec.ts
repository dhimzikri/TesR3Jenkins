import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RefFormRolePagingComponent } from './ref-form-role-paging.component';

describe('RefFormRolePagingComponent', () => {
  let component: RefFormRolePagingComponent;
  let fixture: ComponentFixture<RefFormRolePagingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RefFormRolePagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefFormRolePagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
