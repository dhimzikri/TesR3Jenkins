import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-vendor-holding-registration',
  templateUrl: './self-custom-vendor-holding-registration.component.html'
})
export class SelfCustomVendorHoldingRegistrationComponent implements OnInit {

  pageName: string;

  constructor() {
    this.pageName = 'SupplierHoldingDetail'
  }

  ngOnInit(): void {
  }

}
