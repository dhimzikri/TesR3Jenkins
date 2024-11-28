import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { HttpClient } from '@angular/common/http';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-branch-employee-paging-x',
  templateUrl: './vendor-branch-employee-paging-x.component.html'
})
export class VendorBranchEmployeePagingXComponent implements OnInit {

  VendorId: string;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  arrCrit = new Array();
  MrVendorCategoryCode: string = "";

  readonly CancelLink: string = NavigationConstant.VENDOR_PAGING_X;
  readonly AddLink: string = NavigationConstant.VENDOR_BRANCH_EMP_DETAIL_X;
  constructor(private route: ActivatedRoute, private http : HttpClient, private UrlConstantNew: UrlConstantNew,
    private router: Router, private ngxRouter: NgxRouterService) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["VendorId"] != null) {
        this.VendorId = queryParams["VendorId"];
      }
    });
  }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/impl/ucpaging/searchVendorBranchEmployeeX.json";
    this.inputPagingObj.pagingJson = "./assets/impl/ucpaging/searchVendorBranchEmployeeX.json";

    var critObj = new CriteriaObj();
    critObj.propName = 'VENDOR_ID';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = this.VendorId;
    this.inputPagingObj.addCritInput.push(critObj);

    
    this.http.post(this.UrlConstantNew.GetVendorBranchAndVendorTaxAddrByVendorId, { Id: this.VendorId }).subscribe(
      (response) => {
        this.MrVendorCategoryCode = response["VendorObj"]["MrVendorCategoryCode"];

        if(this.MrVendorCategoryCode == CommonConstant.NOTARY){
          this.MrVendorCategoryCode = response["VendorObj"]["MrVendorTypeCode"] == 'P' ? CommonConstant.NOTARY_PERSONAL : CommonConstant.NOTARY_COMPANY;
        }
      }
    );
  }

  back(){
    AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CREDIT_INS_BRANCH_PAGING])
  }

}
