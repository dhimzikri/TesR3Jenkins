import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-negative-customer',
  templateUrl: './negative-customer.component.html'
})
export class NegativeCustomerComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.CUST_NEG_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchNegativeCustomer.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteNegativeCustomer;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchNegativeCustomer.json";
  }
}
