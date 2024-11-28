import { Component, OnInit } from '@angular/core';
import { UcPagingObj, WhereValueObj } from 'app/shared/model/uc-paging-obj.model';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-vendor-holding-paging',
  templateUrl: './vendor-holding-paging.component.html'
})
export class VendorHoldingPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  arrCrit: any;

  readonly AddLink: string = NavigationConstant.VENDOR_HOLDING_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorHolding.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorHolding.json";

    var WVendorClassObj = new WhereValueObj();
    WVendorClassObj.property = "VendorClass";
    WVendorClassObj.value = "HOLDING";
    this.inputPagingObj.whereValue.push(WVendorClassObj);
  }

}
