import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DmsIframeComponent } from './dms-iframe.component';

describe('DmsIframeComponent', () => {
  let component: DmsIframeComponent;
  let fixture: ComponentFixture<DmsIframeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DmsIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmsIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
