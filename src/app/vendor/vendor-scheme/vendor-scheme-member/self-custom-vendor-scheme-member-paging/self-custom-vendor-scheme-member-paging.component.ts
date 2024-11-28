import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-vendor-scheme-member-paging',
  templateUrl: './self-custom-vendor-scheme-member-paging.component.html'
})
export class SelfCustomVendorSchemeMemberPagingComponent implements OnInit {

  pageName: string;

  constructor() {
    this.pageName = "SupplierSchemeMember"
  }

  ngOnInit(): void {
  }

}
