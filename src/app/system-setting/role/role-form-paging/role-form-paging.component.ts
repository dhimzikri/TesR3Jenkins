import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-role-form-paging',
  templateUrl: './role-form-paging.component.html'
})
export class RoleFormPagingComponent implements OnInit {
  RefRoleId: string;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.SYSTEM_SETTING_ROLE;
  readonly AddLink: string = NavigationConstant.SYSTEM_SETTING_ROLE_FORM_ADD;
  constructor(private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService){
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.RefRoleId = queryParams["RefRoleId"];
  })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewRoleRefForm.json";

    this.inputPagingObj._url = "./assets/ucpaging/searchRoleRefForm.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRoleRefForm.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteAuthForm;

    var critInput = new CriteriaObj();
    critInput.DataType = "numeric";
    critInput.propName = "AF.REF_ROLE_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefRoleId;
    this.inputPagingObj.addCritInput.push(critInput);
  }

}
