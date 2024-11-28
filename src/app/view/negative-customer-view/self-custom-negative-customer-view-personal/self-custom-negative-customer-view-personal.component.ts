import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-negative-customer-view-personal',
  templateUrl: './self-custom-negative-customer-view-personal.component.html',
  styleUrls: []
})
export class SelfCustomNegativeCustomerViewPersonalComponent implements OnInit {

  pageName: string

  constructor(){
    this.pageName = "ViewNegativeCustomerPersonal"
  }

  ngOnInit(): void {
  }

}
