import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-coll-company-registration',
  templateUrl: './vendor-coll-company-registration.component.html'
})
export class VendorCollCompanyRegistrationComponent implements OnInit {
  VendorId: any; 
  objPassing: any = {};
  MrVendorCategoryCode: string = "";
  constructor(private route: ActivatedRoute, private ngxRouter: NgxRouterService) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.objPassing["VendorId"] = queryParams['VendorId'];
      if(!queryParams['VendorEmpId']){
      this.objPassing["VendorEmpId"] = queryParams['VendorEmpId'];
      }if(queryParams['MrVendorCategoryCode']!=null){
        this.MrVendorCategoryCode = queryParams['MrVendorCategoryCode'];
      }
    });
  }

  readonly EditLink: string = NavigationConstant.VENDOR_COLL_COMPANY_ADD;
  readonly CancelLink: string = NavigationConstant.VENDOR_PAGING;
  ngOnInit() {
    this.VendorId = this.objPassing["VendorId"];
    this.objPassing["Type"]="Vendor";
  }
}
