import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FromValueObj, UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-coll-company-office-member-add',
  templateUrl: './vendor-coll-company-office-member-add.component.html'
})
export class VendorCollCompanyOfficeMemberAddComponent implements OnInit {
  Type: string = "";
  VendorId: number;
  listSelectedId: Array<number> = new Array<number>();
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj(this.UrlConstantNew);
  tempDataExists = false;

  readonly CancelLink: string = NavigationConstant.VENDOR_COLL_COMPANY_MBR_PAGING;
  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private toastr: NGXToastrService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VendorId = queryParams['VendorId'];
      if (queryParams["Type"] != null) {
        this.Type = queryParams["Type"];
      }
    });
  }

  ngOnInit() {
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/vendorCollCompanyMemberTempPaging.json";
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/vendorCollCompanyMemberTempPaging.json";

    var addCritCg = new CriteriaObj();
    addCritCg.propName = 'RO.MR_OFFICE_TYPE_CODE';
    addCritCg.restriction = AdInsConstant.RestrictionEq;
    addCritCg.value = CommonConstant.CollectionGroup;
    this.tempPagingObj.addCritInput.push(addCritCg);

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

    this.http.post(this.UrlConstantNew.AddListVendorOfficeMember, obj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.VENDOR_COLL_COMPANY_MBR_PAGING],{ "VendorId": this.VendorId });
      });
  }
}
