import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { FromValueObj, UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { ToastrService } from 'ngx-toastr';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-scheme-member-add',
  templateUrl: './vendor-scheme-member-add.component.html'
})
export class VendorSchemeMemberAddComponent implements OnInit {

  VendorSchmId: number = 0;
  MrVendorCategoryCode: string;
  listSelectedId: Array<number> = new Array<number>();
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.VENDOR_SCHM_MBR;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, public toastr: ToastrService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VendorSchmId = queryParams['VendorSchmId'];
      this.MrVendorCategoryCode = queryParams["MrVendorCategoryCode"];
    });
  }

  ngOnInit() {
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/dummyTempPaging.json";
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/dummyTempPaging.json";

    const addCritTypeCode = new CriteriaObj();
    addCritTypeCode.DataType = 'text';
    addCritTypeCode.propName = 'MR_VENDOR_CATEGORY_CODE';
    addCritTypeCode.restriction = AdInsConstant.RestrictionEq;
    addCritTypeCode.value = this.MrVendorCategoryCode;
    this.tempPagingObj.addCritInput.push(addCritTypeCode);

    let fromValueObj = new FromValueObj();
    fromValueObj.property = 'VendorSchmId';
    fromValueObj.value = this.VendorSchmId;
    this.tempPagingObj.fromValue.push(fromValueObj);
    this.tempPagingObj.isReady = true;
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveVendorSchemeMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.error(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }
    
    var obj = {
      VendorSchmId: this.VendorSchmId,
      VendorId: this.listSelectedId
    }

    this.http.post(this.UrlConstantNew.AddVendorSchmMember, obj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.success(response["message"], 'Success!');
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.VENDOR_SCHM_MBR],{ "VendorSchmId" : this.VendorSchmId, "MrVendorCategoryCode": this.MrVendorCategoryCode });
      });
  }
}
