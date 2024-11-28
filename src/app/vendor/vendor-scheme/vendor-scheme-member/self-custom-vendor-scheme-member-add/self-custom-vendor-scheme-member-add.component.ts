import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-vendor-scheme-member-add',
  templateUrl: './self-custom-vendor-scheme-member-add.component.html'
})
export class SelfCustomVendorSchemeMemberAddComponent implements OnInit {

  pageName: string;

  constructor() {
    this.pageName = "SupplierSchemeMemberAdd"
  }

  ngOnInit(): void {
  }

}
