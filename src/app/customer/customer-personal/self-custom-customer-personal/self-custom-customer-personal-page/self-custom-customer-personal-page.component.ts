import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-customer-personal-page',
  templateUrl: './self-custom-customer-personal-page.component.html'
})
export class SelfCustomCustomerPersonalPageComponent implements OnInit {

  pageName: string;

  constructor() {
    this.pageName = "CustPersonalPageViewHeaderV2"
  }

  ngOnInit(): void {
  }

}
