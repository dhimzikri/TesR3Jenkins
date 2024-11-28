import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-review-upload-negative-customer',
  templateUrl: './self-custom-review-upload-negative-customer.component.html',
})
export class SelfCustomReviewUploadNegativeCustomerComponent implements OnInit {

  pageName: string

  constructor(
    ){
    this.pageName = "ReviewUploadNegativeCustomer"
  }

  ngOnInit(): void {
  }

}
