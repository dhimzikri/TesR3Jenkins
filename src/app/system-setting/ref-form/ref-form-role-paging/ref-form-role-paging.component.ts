import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-ref-form-role-paging',
  templateUrl: './ref-form-role-paging.component.html',
  styleUrls: ['./ref-form-role-paging.component.scss']
})
export class RefFormRolePagingComponent implements OnInit {
  RefFormId: string;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.SYSTEM_SETTING_REF_FORM_PAGING;
  readonly AddLink: string = NavigationConstant.SYSTEM_SETTING_REF_FORM_ROLE_MAP_ADD;
  constructor(private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.RefFormId = queryParams["RefFormId"];
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewRefFormRole.json";

    this.inputPagingObj = new UcPagingObj(this.UrlConstantNew);
    this.inputPagingObj._url = "./assets/ucpaging/searchRefFormRole.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRefFormRole.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteAuthForm;

    var critInput = new CriteriaObj();
    critInput.DataType = "numeric";
    critInput.propName = "AF.REF_FORM_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefFormId;
    this.inputPagingObj.addCritInput.push(critInput);
  }
}
