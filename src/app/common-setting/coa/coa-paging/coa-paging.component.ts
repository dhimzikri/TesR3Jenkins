import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-coa-paging',
  templateUrl: './coa-paging.component.html'
})
export class CoaPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  isReady: boolean;

  readonly AddLink: string = NavigationConstant.CS_COA_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/common-setting/coa/search-coa.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/common-setting/coa/search-coa.json";
    this.isReady = true;
  }
}