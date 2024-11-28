import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomerViewCustomerAssetComponent } from './customer-view-customer-asset.component';

describe('CustomerViewCustomerAssetComponent', () => {
  let component: CustomerViewCustomerAssetComponent;
  let fixture: ComponentFixture<CustomerViewCustomerAssetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerViewCustomerAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerViewCustomerAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
