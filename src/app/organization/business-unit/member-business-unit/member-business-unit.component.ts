import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { ActivatedRoute } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'member-app-business-unit',
  templateUrl: './member-business-unit.component.html'
})
export class MemberBusinessUnitComponent implements OnInit {
  RefBizUnitId: string;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  
  readonly CancelLink: string = NavigationConstant.ORG_BZ_UNIT;
  constructor(private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService){
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.RefBizUnitId = queryParams["RefBizUnitId"];
  })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewBusinessUnitMember.json";

    this.inputPagingObj._url = "./assets/ucpaging/searchBusinessUnitMember.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBusinessUnitMember.json";

    var critInput = new CriteriaObj();
    critInput.propName = "RUR.REF_BIZ_UNIT_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefBizUnitId;
    this.inputPagingObj.addCritInput.push(critInput);
  }
}
