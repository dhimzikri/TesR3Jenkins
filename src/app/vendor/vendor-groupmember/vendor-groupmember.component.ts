import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { FromValueObj, UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-groupmember',
  templateUrl: './vendor-groupmember.component.html'
})
export class VendorGroupmemberComponent implements OnInit {
  VendorId: number;
  listSelectedId: Array<number> = new Array<number>();
  VendorGrpId: number;
  MrVendorCategoryCode: string = '';
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.VENDOR_GRP_VIEW;
  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private toastr: NGXToastrService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['VendorGrpId'] != null) {
        this.VendorGrpId = queryParams['VendorGrpId'];
      }
      if (queryParams['MrVendorCategoryCode'] != null) {
        this.MrVendorCategoryCode = queryParams['MrVendorCategoryCode'];
      }
    });
  }

  ngOnInit() {
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/vendorGrpMbrTempPaging.json";
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/vendorGrpMbrTempPaging.json";

    var crit1Obj = new CriteriaObj();
    crit1Obj.propName = "MR_VENDOR_CATEGORY_CODE";
    crit1Obj.restriction = AdInsConstant.RestrictionEq;
    crit1Obj.value = this.MrVendorCategoryCode;
    this.tempPagingObj.addCritInput.push(crit1Obj)

    if (this.MrVendorCategoryCode.includes("_HOLDING")) {
      var crit2Obj = new CriteriaObj();
      crit2Obj.propName = "MR_VENDOR_CLASS";
      crit2Obj.restriction = AdInsConstant.RestrictionEq;
      crit2Obj.value = CommonConstant.Holding;
      this.tempPagingObj.addCritInput.push(crit2Obj);
    } else if (this.MrVendorCategoryCode.includes("_HO")) {
      var crit2Obj = new CriteriaObj();
      crit2Obj.propName = "MR_VENDOR_CLASS";
      crit2Obj.restriction = AdInsConstant.RestrictionEq;
      crit2Obj.value = CommonConstant.HeadOffice;
      this.tempPagingObj.addCritInput.push(crit2Obj);
    } else if (this.MrVendorCategoryCode.includes("_BRANCH")) {
      var crit2Obj = new CriteriaObj();
      crit2Obj.propName = "MR_VENDOR_CLASS";
      crit2Obj.restriction = AdInsConstant.RestrictionEq;
      crit2Obj.value = CommonConstant.Branch;
      this.tempPagingObj.addCritInput.push(crit2Obj);
    }

    let fromValueObj = new FromValueObj();
    fromValueObj.property = 'VendorGrpId';
    fromValueObj.value = this.VendorGrpId;
    this.tempPagingObj.fromValue.push(fromValueObj);
    this.tempPagingObj.isReady = true;
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveVendorGroupMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }

    var obj = {
      VendorGrpId: this.VendorGrpId,
      VendorId: this.listSelectedId
    }

    this.http.post(this.UrlConstantNew.AddRangeVendorGrpMbr, obj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.VENDOR_GRP_VIEW],{ "VendorGrpId": this.VendorGrpId, "MrVendorCategoryCode": this.MrVendorCategoryCode });
      });
  }
}
