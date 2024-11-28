import { NgxRouterService } from '@adins/fe-core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-exchange-rate-paging',
  templateUrl: './exchange-rate-paging.component.html'
})
export class ExchangeRatePagingComponent implements OnInit {
  RefCurrId: string;

  critObj: CriteriaObj = new CriteriaObj();
  arrCrit: Array<CriteriaObj> = new Array<CriteriaObj>();
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.CS_CURRENCY_PAGING;
  readonly AddLink: string = NavigationConstant.CS_EXCHANGE_RATE_DETAIL;

  constructor(private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.RefCurrId = queryParams["RefCurrId"];
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewRefCurr.json";

    this.inputPagingObj._url = "./assets/ucpaging/searchExchangeRate.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchExchangeRate.json";

    this.critObj.restriction = AdInsConstant.RestrictionEq;
    this.critObj.propName = 'ER.REF_CURR_ID';
    this.critObj.value = this.RefCurrId.toString();
    this.arrCrit.push(this.critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }

}
