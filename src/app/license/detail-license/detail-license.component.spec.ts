import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailLicenseComponent } from './detail-license.component';

describe('DetailLicenseComponent', () => {
  let component: DetailLicenseComponent;
  let fixture: ComponentFixture<DetailLicenseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
