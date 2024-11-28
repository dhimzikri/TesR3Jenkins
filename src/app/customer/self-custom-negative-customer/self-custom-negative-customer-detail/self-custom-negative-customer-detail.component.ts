import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-negative-customer-detail',
  templateUrl: './self-custom-negative-customer-detail.component.html',
})
export class SelfCustomNegativeCustomerDetailComponent implements OnInit {

  pageName: string

  constructor(){
    this.pageName = "NegativeCustomerDetailV2"
  }


  ngOnInit(): void {
  }

}
