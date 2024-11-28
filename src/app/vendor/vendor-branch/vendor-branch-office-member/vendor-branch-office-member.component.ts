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
  selector: 'app-vendor-branch-office-member',
  templateUrl: './vendor-branch-office-member.component.html'
})
export class VendorBranchOfficeMemberComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  VendorId: string;
  objPassing: any = {};
  MrVendorCategoryCode: string = "";

  CancelLink: string = NavigationConstant.VENDOR_PAGING;
  readonly AddLink: string = NavigationConstant.VENDOR_BRANCH_MBR_ADD;
  constructor(private route: ActivatedRoute, private http : HttpClient, private UrlConstantNew: UrlConstantNew,
    private router : Router, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.objPassing["VendorId"] = queryParams['VendorId'];
      this.objPassing["VendorEmpId"] = queryParams['VendorEmpId'];
      this.VendorId = queryParams['VendorId'];
    });
  }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorOfficeMember.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorOfficeMember.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteVendorOfficeMember;

    this.inputPagingObj.addCritInput = new Array();
    var critObj = new CriteriaObj();
    critObj.propName = "VOM.VENDOR_ID";
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = this.VendorId;
    this.inputPagingObj.addCritInput.push(critObj);

    this.http.post(this.UrlConstantNew.GetVendorBranchAndVendorTaxAddrByVendorId, { Id: this.VendorId }).subscribe(
      (response) => {
        this.MrVendorCategoryCode = response["VendorObj"]["MrVendorCategoryCode"];

        if(this.MrVendorCategoryCode == CommonConstant.NOTARY){
          this.MrVendorCategoryCode = response["VendorObj"]["MrVendorTypeCode"] == 'P' ? CommonConstant.NOTARY_PERSONAL : CommonConstant.NOTARY_COMPANY;
        }

        console.log(this.MrVendorCategoryCode)
        console.log("HAIHAI")
      }
    );
  }

  back(){
    if(this.MrVendorCategoryCode == "CRD_INSCO_BRANCH"){
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CREDIT_INS_BRANCH_PAGING])
    }
    else{
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_PAGING])

    }
  }

}
