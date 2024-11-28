import { NgxRouterService } from '@adins/fe-core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-vendor-branch-employee-add-edit-x',
  templateUrl: './vendor-branch-employee-add-edit-x.component.html'
})
export class VendorBranchEmployeeAddEditXComponent implements OnInit {

  VendorId: number;
  objPassing: any = {};
  VendorEmpId: number;
  IsReload: boolean;

  readonly CancelLink: string = NavigationConstant.VENDOR_BRANCH_EMP_PAGING_X;
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
    if(ev == "Employee" || ev == "Address"){
      this.IsReload = true
    }else{
      this.IsReload = false
    }
  }
}
