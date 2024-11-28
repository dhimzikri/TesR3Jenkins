import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-branch-registration-x',
  templateUrl: './vendor-branch-registration-x.component.html'
})
export class VendorBranchRegistrationXComponent implements OnInit {
  VendorId: any; 
  objPassing: any = {};
  MrVendorCategoryCode: string = "";
  Registration : string;
  constructor(private router : Router,private route: ActivatedRoute,private http: HttpClient, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.objPassing["VendorId"] = queryParams['VendorId'];
      if(!queryParams['VendorEmpId']){
      this.objPassing["VendorEmpId"] = queryParams['VendorEmpId'];
      }
    });
  }

  readonly EditLink: string = NavigationConstant.VENDOR_BRANCH_ADD_X;
  CancelLink: string ;
  ngOnInit() {

    this.VendorId = this.objPassing["VendorId"];
    this.objPassing["Type"]="Vendor";

    this.http.post(this.UrlConstantNew.GetVendorBranchAndVendorTaxAddrByVendorId, { Id: this.VendorId }).subscribe(
      (response) => {
        this.MrVendorCategoryCode = response["VendorObj"]["MrVendorCategoryCode"]; 

        if(this.MrVendorCategoryCode == CommonConstant.NOTARY){
          this.MrVendorCategoryCode = response["VendorObj"]["MrVendorTypeCode"] == 'P' ? CommonConstant.NOTARY_PERSONAL : CommonConstant.NOTARY_COMPANY;
        }

        if(this.MrVendorCategoryCode == CommonConstant.SUPPLIER){
          this.Registration = "Supplier Registration"
        }else if (this.MrVendorCategoryCode === CommonConstant.VENDOR_CATEGORY_GENERAL || this.MrVendorCategoryCode === CommonConstant.CONSULTANT
          || this.MrVendorCategoryCode === CommonConstant.LOGISTIC || this.MrVendorCategoryCode === CommonConstant.COURIER
          || this.MrVendorCategoryCode === CommonConstant.IT_INFRA_SOLUTION){
            this.Registration = "Vendor Registration"
        }
        else{
          this.Registration = "Branch Registration"
        } 
      }
    );

   
  }

  back(){
    if(this.MrVendorCategoryCode == "CRD_INSCO_BRANCH"){
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CREDIT_INS_BRANCH_PAGING]);
    }
    else{
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_PAGING_X]);
    }
  }

  backTo(){
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_PAGING_X],{ MrVendorCategoryCode: this.MrVendorCategoryCode  });
    
  }

}
