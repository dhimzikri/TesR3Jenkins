import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-vendor-scheme-add-edit',
  templateUrl: './self-custom-vendor-scheme-add-edit.component.html'
})
export class SelfCustomVendorSchemeAddEditComponent implements OnInit {

  pageName: string;

  constructor() {
    this.pageName = "SupplierSchemeAddEdit"
  }

  ngOnInit(): void {
  }

}
