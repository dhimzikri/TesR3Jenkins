import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { HttpClient } from '@angular/common/http';
import { VendorService } from '../vendor.service';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-holding-registration',
  templateUrl: './vendor-holding-registration.component.html'
})
export class VendorHoldingRegistrationComponent implements OnInit {
  VendorId : any;
  objPassing: any = {};
  objPassingCP: any = {};
  VendorContactPersonId:any
  mode: string;
  HiddenState: boolean = true;
  show : boolean = false;
  ButtonText : string = "Back";
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  MrVendorCategoryCode: string = "";
  
  readonly EditLink: string = NavigationConstant.VENDOR_HOLDING_DETAIL;
  readonly CancelLink: string = NavigationConstant.VENDOR_PAGING;
  constructor(private route: ActivatedRoute, private vendorService: VendorService, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.objPassing["VendorId"] = queryParams['VendorId'];
    });
   }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorHolding.json";

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

  OnEnter()
  {
    this.ButtonText = "Finish";
  }

  OnExit()
  {
    this.ButtonText = "Back";
  }
}
