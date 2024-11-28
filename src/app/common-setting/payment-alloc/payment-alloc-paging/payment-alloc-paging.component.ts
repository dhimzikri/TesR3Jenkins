import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-payment-alloc-paging',
  templateUrl: './payment-alloc-paging.component.html'
})
export class PaymentAllocPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  isReady: boolean;

  readonly AddLink: string = NavigationConstant.CS_PAYMENT_ALLOC_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/common-setting/payment-allocation/search-payment-alloc-paging.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/common-setting/payment-allocation/search-payment-alloc-paging.json";
    
    this.isReady = true;
  }
}