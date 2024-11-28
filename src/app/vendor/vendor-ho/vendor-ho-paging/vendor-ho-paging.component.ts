import { Component, OnInit } from '@angular/core';
import { UcPagingObj, WhereValueObj } from 'app/shared/model/uc-paging-obj.model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-vendor-ho-paging',
  templateUrl: './vendor-ho-paging.component.html'
})
export class VendorHoPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.VENDOR_HO_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) { }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorHO.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorHO.json";

    var WVAddrTypeObj = new WhereValueObj();
    WVAddrTypeObj.property = "AddrType";
    WVAddrTypeObj.value = CommonConstant.AddrTypeTax;
    this.inputPagingObj.whereValue.push(WVAddrTypeObj);
    
    var WVendorClassObj = new WhereValueObj();
    WVendorClassObj.property = "VendorClass";
    WVendorClassObj.value = CommonConstant.HeadOffice;
    this.inputPagingObj.whereValue.push(WVendorClassObj);
  }
}
