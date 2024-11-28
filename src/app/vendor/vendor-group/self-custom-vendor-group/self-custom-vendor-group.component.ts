import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-vendor-group',
  templateUrl: './self-custom-vendor-group.component.html'
})
export class SelfCustomVendorGroupComponent implements OnInit {

  pageName: string;

  constructor() {
    this.pageName = "SuppliergroupaddeditVendor"
  }

  ngOnInit(): void {
  }

}
