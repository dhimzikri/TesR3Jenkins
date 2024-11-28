import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HoTaxInfoComponent } from './ho-tax-info.component';

describe('HoTaxInfoComponent', () => {
  let component: HoTaxInfoComponent;
  let fixture: ComponentFixture<HoTaxInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HoTaxInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoTaxInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
