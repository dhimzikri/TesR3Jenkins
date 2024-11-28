import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-atpm-registration',
  templateUrl: './vendor-atpm-registration.component.html'
})
export class VendorATPMRegistrationComponent implements OnInit {
  VendorId : any;
  objPassing: any = {};
  objPassingCP: any = {};
  VendorContactPersonId:any
  mode: string;
  HiddenState: boolean = true;
  show : boolean = false;
  ButtonText : string = "Back";
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  
  readonly EditLink: string = NavigationConstant.VENDOR_ATPM_DETAIL;
  constructor(private route: ActivatedRoute, private router: Router, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.objPassing["VendorId"] = queryParams['VendorId'];
    });
   }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorATPM.json";

    this.VendorId = this.objPassing["VendorId"];
    this.objPassing["Type"]="Vendor";
  }

  outputValue(ev){
    this.HiddenState = ev.HiddenState;
    this.mode = ev.mode;
    this.VendorContactPersonId = ev.VendorContactPersonId;

    this.objPassingCP.VendorContactPersonId = this.VendorContactPersonId;
    this.objPassingCP.mode = this.mode;
    this.objPassingCP.VendorId = this.VendorId;
  }

  OnEnter()
  {
    this.ButtonText = "Finish";
  }

  OnExit()
  {
    this.ButtonText = "Back";
  }

  Finish() {
    AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.VENDOR_PAGING],{ "MrVendorCategoryCode": CommonConstant.SUPPLIER_ATPM });
  }
}
