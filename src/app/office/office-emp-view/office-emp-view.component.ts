import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-office-emp-view',
  templateUrl: './office-emp-view.component.html'
})
export class OfficeEmpViewComponent implements OnInit {

  RefOfficeId: number;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly BackLink: string = NavigationConstant.OFFICE_PAGING;

  constructor(private UrlConstantNew: UrlConstantNew, private route: ActivatedRoute, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['RefOfficeId'] != null) {
        this.RefOfficeId = queryParams['RefOfficeId'];
      }
    });
  }

  ngOnInit(): void {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewOfficeEmp.json";

    this.inputPagingObj._url = "./assets/ucpaging/searchOfficeEmp.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchOfficeEmp.json";

    var critInput = new CriteriaObj();
    critInput.propName = "RO.REF_OFFICE_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefOfficeId;
    this.inputPagingObj.addCritInput.push(critInput);
  }

}
