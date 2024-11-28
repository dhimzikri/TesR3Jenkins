import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { FromValueObj, UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-app-source-office-member-add',
  templateUrl: './app-source-office-member-add.component.html'
})
export class AppSourceOfficeMemberAddComponent implements OnInit {
  listSelectedId: Array<number> = new Array<number>();
  RefAppSrcId: number;
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj(this.UrlConstantNew);
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService,
    private location: Location, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['RefAppSrcId'] != null) {
        this.RefAppSrcId = queryParams['RefAppSrcId'];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewAppSource.json";
    
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/refAppSrcOfficeMbrTempPaging.json";
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/refAppSrcOfficeMbrTempPaging.json";

    let fromValueObj = new FromValueObj();
    fromValueObj.property = 'RefAppSrcId';
    fromValueObj.value = this.RefAppSrcId;
    this.tempPagingObj.fromValue.push(fromValueObj);
    this.tempPagingObj.isReady = true;
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveAppSourceOfficeMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }
    
    var RequestItem = {
      RefAppSrcId : this.RefAppSrcId,
      RefOfficeIds: this.listSelectedId
    }
    this.http.post(this.UrlConstantNew.AddRefAppSrcOfficeMbr, RequestItem, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.ngxRouter,["/CommonSetting/AppSource/OfficeMember/Paging"],{ "RefAppSrcId": this.RefAppSrcId });
      });
    
  }
}