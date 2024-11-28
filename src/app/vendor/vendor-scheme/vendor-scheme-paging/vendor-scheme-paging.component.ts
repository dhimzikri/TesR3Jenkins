import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { environment } from 'environments/environment';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-vendor-scheme-paging',
  templateUrl: './vendor-scheme-paging.component.html'
})
export class VendorSchemePagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.VENDOR_SCHM_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) { }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorScheme.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorScheme.json";
  }

}
