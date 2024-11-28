import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { UcPagingObj, WhereValueObj } from 'app/shared/model/uc-paging-obj.model';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-vendor-credit-insurance-paging',
  templateUrl: './vendor-credit-insurance-paging.component.html'
})
export class VendorCreditInsurancePagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  MrVendorCategoryCode : string = 'CRD_INSCO_HO';
  isReady : boolean = false;
  navigationSubscription : any;
  constructor(private route : ActivatedRoute, private UrlConstantNew: UrlConstantNew, private router : Router,
    private ngxRouter: NgxRouterService) { 

    this.subscribeParam();
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.RefetchData();
      }
    });
  }

  RefetchData() {
    this.ReInit();
    this.subscribeParam();
    this.selectPage();
  }

  subscribeParam() {
    // this.route.queryParams.subscribe(params => {
    //   if (params["MrVendorCategoryCode"] != null) {
    //       this.MrVendorCategoryCode = params["MrVendorCategoryCode"];

    //   }
      
    // });
  }

  ReInit() {
    this.inputPagingObj = new UcPagingObj(this.UrlConstantNew);
  }
  ngOnInit() {
    this.selectPage();
  }

  navigate(){
    AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_CRD_INSCO_HO_DETAIL]);

  }

  selectPage(){
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorHO.json"; 
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorHO.json";
    this.inputPagingObj.title = "Credit Insurance HO";


    this.inputPagingObj.addCritInput = new Array();
    var critObj = new CriteriaObj();
    critObj.propName = "V.MR_VENDOR_CATEGORY_CODE";
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = this.MrVendorCategoryCode;

    this.inputPagingObj.addCritInput.push(critObj);

    var WVAddrTypeObj = new WhereValueObj();
    WVAddrTypeObj.property = "AddrType";
    WVAddrTypeObj.value = CommonConstant.AddrTypeLegal;
    this.inputPagingObj.whereValue.push(WVAddrTypeObj);

    var WVendorClassObj = new WhereValueObj();
    WVendorClassObj.property = "VendorClass";
    WVendorClassObj.value = CommonConstant.HeadOffice;
    this.inputPagingObj.whereValue.push(WVendorClassObj);

    this.isReady = true;
  }

}
