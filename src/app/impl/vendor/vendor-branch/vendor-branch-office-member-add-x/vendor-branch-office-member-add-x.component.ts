import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FromValueObj, UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-branch-office-member-add-x',
  templateUrl: './vendor-branch-office-member-add-x.component.html'
})
export class VendorBranchOfficeMemberAddXComponent implements OnInit {

  VendorId: number;
  MrVendorCategoryCode: string;
  listSelectedId: Array<number> = new Array<number>();
  listIsDefault: Array<boolean> = new Array<boolean>();
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj(this.UrlConstantNew);
  tempDataExists = false;

  readonly CancelLink: string = NavigationConstant.SELF_CUSTOM_VENDOR_BRANCH_MBR_PAGING_X;
  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private toastr: NGXToastrService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VendorId = queryParams['VendorId'];
      this.MrVendorCategoryCode = queryParams['MrVendorCategoryCode'];
    });
  }

  ngOnInit() {
    this.tempPagingObj.urlJson = "./assets/impl/ucpaging/ucTempPaging/vendorBranchMemberTempPagingX.json";
    this.tempPagingObj.pagingJson = "./assets/impl/ucpaging/ucTempPaging/vendorBranchMemberTempPagingX.json";

    var addCritIsActive = new CriteriaObj();
    addCritIsActive.propName = 'RO.IS_ACTIVE';
    addCritIsActive.restriction = AdInsConstant.RestrictionEq;
    addCritIsActive.value = "true";
    this.tempPagingObj.addCritInput.push(addCritIsActive);

    let fromValueObj = new FromValueObj();
    fromValueObj.property = 'VendorId';
    fromValueObj.value = this.VendorId;
    this.tempPagingObj.fromValue.push(fromValueObj);
    this.tempPagingObj.isReady = true;
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
    this.listIsDefault.length = 0;
    for(var i = 0 ; i<Object.keys(ev.TempListObj).length ; i++){
      this.listIsDefault.push(ev.TempListObj[i].IsDefault);
    }
    this.tempDataExists = this.listSelectedId && this.listSelectedId.length > 0
  }

  SaveVendorOfficeMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }

    var obj = {
      VendorId: this.VendorId,
      RefOfficeId: this.listSelectedId
    }

    var obj2= {
      VendorOfficeMbrObj: obj, 
      IsDefault : this.listIsDefault
    }

    this.http.post(this.UrlConstantNew.AddListVendorOfficeMemberX, obj2, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.SELF_CUSTOM_VENDOR_BRANCH_MBR_PAGING_X],{ "VendorId": this.VendorId, "MrVendorCategoryCode": this.MrVendorCategoryCode });
      });
  }

}
