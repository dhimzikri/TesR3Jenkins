import { NgxRouterService } from '@adins/fe-core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { VendorService } from 'app/vendor/vendor.service';

@Component({
  selector: 'app-vendor-ho-registration-x',
  templateUrl: './vendor-ho-registration-x.component.html'
})
export class VendorHoRegistrationXComponent implements OnInit {
  VendorId: any; 
  objPassing: any = {};
  objPassingCP: any = {};
  HiddenState: boolean = true;
  mode: string;
  VendorContactPersonId:any;
  MrVendorCategoryCode: string = "";
  MrVendorCategoryCodeParam: string = "";

  readonly EditLink: string = NavigationConstant.VENDOR_HO_DETAIL_X;
  constructor(private route: ActivatedRoute, private router: Router, private vendorService: VendorService,
    private ngxRouter: NgxRouterService) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.objPassing["VendorId"] = queryParams['VendorId'];
      this.MrVendorCategoryCodeParam = queryParams['MrVendorCategoryCode'];
    });
  }

  ngOnInit() {
    this.VendorId = this.objPassing["VendorId"];
    this.objPassing["Type"]="Vendor";

    this.vendorService.GetVendorAndVendorAddrByVendorId({ Id: this.VendorId }).subscribe(
      (response) => {
        this.MrVendorCategoryCode = response["VendorObj"]["MrVendorCategoryCode"];
      }
    );
  }

  outputValue(ev){
    this.HiddenState = ev.HiddenState;
    this.mode = ev.mode;
    this.VendorContactPersonId = ev.VendorContactPersonId;

    this.objPassingCP.VendorContactPersonId = this.VendorContactPersonId;
    this.objPassingCP.mode = this.mode;
    this.objPassingCP.VendorId = this.VendorId;
  }

  Back() {
    if(this.MrVendorCategoryCode == "CRD_INSCO_HO"){
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CREDIT_INS_PAGING]);
    }
    else{
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_PAGING_X], { "MrVendorCategoryCode": this.MrVendorCategoryCodeParam });
    }
  }
}

