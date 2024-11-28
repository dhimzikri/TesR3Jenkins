import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-coa-scheme-paging',
  templateUrl: './coa-scheme-paging.component.html'
})
export class CoaSchemePagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  isReady: boolean;

  readonly AddLink: string = NavigationConstant.CS_COA_SCHM_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/common-setting/coa-scheme/search-coa-scheme.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/common-setting/coa-scheme/search-coa-scheme.json";
    
    this.isReady = true;
  }

  getCallback(event) {
    if (event.Key == "view") {
      var url = "http://r3impl-websvr.ad-ins.com/Foundation/CommonSettingView/coascheme/view?CoaSchmId=" + event.RowObj.CoaSchmId
      window.open(url, "_blank")
    }
  }
}