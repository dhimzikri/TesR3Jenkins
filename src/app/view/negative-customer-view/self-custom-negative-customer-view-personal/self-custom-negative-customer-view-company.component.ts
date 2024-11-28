import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-negative-customer-view-company',
  templateUrl: './self-custom-negative-customer-view-company.component.html',
  styleUrls: []
})
export class SelfCustomNegativeCustomerViewCompanyComponent implements OnInit {

  pageName: string

  constructor(){
    this.pageName = "ViewNegativeCustomerCompany"
  }

  ngOnInit(): void {
  }

}
