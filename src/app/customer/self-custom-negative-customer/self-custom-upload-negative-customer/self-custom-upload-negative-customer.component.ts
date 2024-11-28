import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-upload-negative-customer',
  templateUrl: './self-custom-upload-negative-customer.component.html',
})
export class SelfCustomUploadNegativeCustomerComponent implements OnInit {

  pageName: string

  constructor(){
    this.pageName = "UploadCustomerNegative"
  }

  ngOnInit(): void {
  }

}
