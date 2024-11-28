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
  selector: 'app-vendor-credit-insurance-branch-paging',
  templateUrl: './vendor-credit-insurance-branch-paging.component.html'
})
export class VendorCreditInsuranceBranchPagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  MrVendorCategoryCode : string ;
  isReady : boolean = false;
  navigationSubscription : any;
  readonly AddLink: string = NavigationConstant.VENDOR_HO_DETAIL;
  constructor(private route : ActivatedRoute, private UrlConstantNew: UrlConstantNew, private router : Router) { 

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.RefetchData();
      }
    });
  }

  RefetchData() {
    this.ReInit();
    this.selectPage();
  }


  ReInit() {
    this.inputPagingObj = new UcPagingObj(this.UrlConstantNew);
  }
  ngOnInit() {    
    this.MrVendorCategoryCode = 'CRD_INSCO_BRANCH';

    this.selectPage();
  }

  navigate(){
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CREDIT_INS_BRANCH_ADD_EDIT]);

  }

  selectPage(){
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBranch.json";
    this.inputPagingObj._url = "./assets/ucpaging/searchBranch.json";
    this.inputPagingObj.title = "Credit Insurance Branch"

    this.inputPagingObj.addCritInput = new Array();
    var critObj = new CriteriaObj();
    critObj.propName = "vdr.MR_VENDOR_CATEGORY_CODE";
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = this.MrVendorCategoryCode;

    this.inputPagingObj.addCritInput.push(critObj);

    var WVendorClassObj = new WhereValueObj();
    WVendorClassObj.property = "VendorClass";
    WVendorClassObj.value = CommonConstant.Branch;
    this.inputPagingObj.whereValue.push(WVendorClassObj);

    this.isReady = true;
  }
}
