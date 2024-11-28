import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UCGridFooterComponent } from './ucgrid-footer.component';

describe('UCGridFooterComponent', () => {
  let component: UCGridFooterComponent;
  let fixture: ComponentFixture<UCGridFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UCGridFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UCGridFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
