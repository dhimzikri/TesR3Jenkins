import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-vendor-group-view',
  templateUrl: './self-custom-vendor-group-view.component.html'
})
export class SelfCustomVendorGroupViewComponent implements OnInit {

  pageName: string;

  constructor() {
    this.pageName = "SupplierGroupMemberVendor"
  }

  ngOnInit(): void {
  }

}
