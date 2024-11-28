import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-office-area-member-add',
  templateUrl: './office-area-member-add.component.html'
})
export class OfficeAreaMemberAddComponent implements OnInit {
  listSelectedId: Array<number> = new Array<number>();
  RefOfficeAreaId: number;
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj(this.UrlConstantNew);
  tempDataExists = false;

  readonly CancelLink: string = NavigationConstant.OFFICE_AREA_MEMBER;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService,private location: Location, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['RefOfficeAreaId'] != null) {
        this.RefOfficeAreaId = queryParams['RefOfficeAreaId'];
      }
    });
  }

  ngOnInit() {
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/officeAreaMbrTempPaging.json";
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/officeAreaMbrTempPaging.json";
    this.tempPagingObj.isReady = true;
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
    this.tempDataExists = this.listSelectedId && this.listSelectedId.length > 0
  }

  SaveOfficeAreaMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }
    
    var RequestItem = {
      RefOfficeAreaId : this.RefOfficeAreaId,
      RefOfficeId: this.listSelectedId
    }
    this.http.post(this.UrlConstantNew.AddRefOfficeAreaMember, RequestItem, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.OFFICE_AREA_MEMBER],{ "RefOfficeAreaId": this.RefOfficeAreaId });
      });
    
  }
}