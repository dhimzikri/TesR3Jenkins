import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-view-coy-contact',
  templateUrl: './customer-view-coy-contact.component.html'
})
export class CustomerViewCoyContactComponent implements OnInit {
  responseResult: any;
  CustId: number;
  viewCustCoyViewContactData: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewCustCoyViewContactAddress: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewCustCoyViewContactInformation: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew){}

  ngOnInit() {
    this.viewCustCoyViewContactData.viewInput  =  "./assets/ucviewgeneric/viewCustCoyViewContactData.json";
    this.viewCustCoyViewContactInformation.viewInput  = "./assets/ucviewgeneric/viewCustCoyViewContactInformation.json";
    this.viewCustCoyViewContactAddress.viewInput  =  "./assets/ucviewgeneric/viewCustCoyViewContactAddress.json";
  }
}