import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-office-group-member-add',
  templateUrl: './office-group-member-add.component.html'
})
export class OfficeGroupMemberAddComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  listSelectedId: Array<number> = new Array<number>();
  RefOfficeId: number;
  CenterGrpId: number;
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.OFFICE_GROUP_MEMBER;
  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private toastr: NGXToastrService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.RefOfficeId = queryParams['RefOfficeId'];
      this.CenterGrpId = queryParams['CenterGrpId'];
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewOfficeCenterGrpMbr.json";
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/officeGrpMbrTempPaging.json";
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/officeGrpMbrTempPaging.json";

    this.GetListCenterGrpMemberByRefOfficeId();
  }

  GetListCenterGrpMemberByRefOfficeId() {
    this.http.post(this.UrlConstantNew.GetListCenterGrpMemberByRefOfficeId, { Id: this.RefOfficeId }).subscribe(
      (response) => {
        var arrMemberList = new Array();
        for (let index = 0; index < response["ListCenterGrpOfficeMbr"].length; index++) {
          arrMemberList.push(response["ListCenterGrpOfficeMbr"][index].RefOfficeId)
        }

        if (arrMemberList.length != 0) {
          const addCritListRefOffice = new CriteriaObj();
          addCritListRefOffice.DataType = 'numeric';
          addCritListRefOffice.propName = 'REF_OFFICE_ID';
          addCritListRefOffice.restriction = AdInsConstant.RestrictionNotIn;
          addCritListRefOffice.listValue = arrMemberList;
          this.tempPagingObj.addCritInput.push(addCritListRefOffice);
        }
        this.tempPagingObj.isReady = true;
      }
    );
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveOfficeGroupMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }

    var obj = {
      CenterGrpId: this.CenterGrpId,
      RefOfficeId: this.listSelectedId
    }

    this.http.post(this.UrlConstantNew.AddCenterGrpOfficeMember, obj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.OFFICE_GROUP_MEMBER],{ "RefOfficeId": this.RefOfficeId, "CenterGrpId": this.CenterGrpId });
      });
  }
}