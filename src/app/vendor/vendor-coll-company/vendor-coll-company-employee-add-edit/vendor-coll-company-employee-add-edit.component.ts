import { NgxRouterService } from '@adins/fe-core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-vendor-coll-company-employee-add-edit',
  templateUrl: './vendor-coll-company-employee-add-edit.component.html'
})
export class VendorCollCompanyEmployeeAddEditComponent implements OnInit {
  VendorId: number;
  objPassing: any = {};
  VendorEmpId: number;
  IsReload: boolean;

  readonly CancelLink: string = NavigationConstant.VENDOR_COLL_COMPANY_EMP_PAGING;
  constructor(private route: ActivatedRoute, private ngxRouter: NgxRouterService) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.objPassing["VendorId"] = queryParams['VendorId'];
      if(queryParams['VendorEmpId'] != null){
        this.objPassing["VendorEmpId"] = queryParams['VendorEmpId'];
      }
    });
  }

  ngOnInit() {
    this.VendorId = this.objPassing["VendorId"];
    this.objPassing["mode"] = "add";
    this.objPassing["Type"]="VendorEmployee";
  }

  outputValue(ev){
    this.VendorEmpId = ev;
    this.objPassing["VendorEmpId"] = this.VendorEmpId;
    this.objPassing["mode"] = "edit";
  }

  //Untuk force component employee load ulang
  EnterTab(ev){
    if(ev == "Employee"){
      this.IsReload = true
    }else{
      this.IsReload = false
    }
  }
}
