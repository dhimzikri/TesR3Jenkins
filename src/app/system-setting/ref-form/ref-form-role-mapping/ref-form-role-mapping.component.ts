import { Component, OnInit } from '@angular/core';
import { AuthFormObj } from 'app/shared/model/auth-form-obj.model';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ListAuthFormObj } from 'app/shared/model/list-auth-form-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { FromValueObj, UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-ref-form-role-mapping',
  templateUrl: './ref-form-role-mapping.component.html'
})

export class RefFormRoleMappingComponent implements OnInit {
  RefFormId: number;
  AuthFormObj: AuthFormObj;
  listAuthFormObj: ListAuthFormObj;
  listSelectedId: Array<number> = new Array<number>();
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj(this.UrlConstantNew);
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.SYSTEM_SETTING_REF_FORM_ROLE_MAP;
  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private toastr: NGXToastrService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.RefFormId = queryParams['RefFormId'];
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewRefForm.json";
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/refFormRoleTempPaging.json";
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/refFormRoleTempPaging.json";

    let fromValueObj = new FromValueObj();
    fromValueObj.property = 'RefFormId';
    fromValueObj.value = this.RefFormId;
    this.tempPagingObj.fromValue.push(fromValueObj);
    this.tempPagingObj.isReady = true;
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }


  SaveListAuthForm() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }

    this.listAuthFormObj = new ListAuthFormObj();
    this.listAuthFormObj.ListAuthFormObj = new Array();


    for (var i = 0; i < this.listSelectedId.length; i++) {
      this.AuthFormObj = new AuthFormObj();
      this.AuthFormObj.RefRoleId = this.listSelectedId[i];
      this.AuthFormObj.RefFormId = this.RefFormId;
      this.listAuthFormObj.ListAuthFormObj.push(this.AuthFormObj);
    }

    this.http.post(this.UrlConstantNew.AddListAuthForm, this.listAuthFormObj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.SYSTEM_SETTING_REF_FORM_ROLE_MAP],{ "RefFormId": this.RefFormId });
      });
  }
}
