import { Component, OnDestroy, OnInit } from '@angular/core';
import { UcPagingObj, WhereValueObj } from 'app/shared/model/uc-paging-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-paging',
  templateUrl: './vendor-paging.component.html'
})
export class VendorPagingComponent implements OnInit, OnDestroy {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  MrVendorCategoryCode: string = CommonConstant.VENDOR_CATEGORY_GENERAL;
  Type: string = "Default";
  mode: string;
  navigationSubscription;
  constructor(private route: ActivatedRoute, private router: Router, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.subscribeParam();
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.RefetchData();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.selectPage();
  }

  isReady: boolean = false
  selectPage() {
    this.isReady = false;
    if (this.Type == "Scheme") {
      this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorScheme.json";
      this.inputPagingObj._url = "./assets/ucpaging/searchVendorScheme.json";

      switch (this.MrVendorCategoryCode) {
        case CommonConstant.SUPPLIER:
          this.inputPagingObj.title = "Supplier Scheme";
          break;
        case CommonConstant.ASSET_INSCO_BRANCH:
          this.inputPagingObj.title = "Insurance Branch Scheme";
          break;
        case CommonConstant.LIFE_INSCO_BRANCH:
          this.inputPagingObj.title = "Life Insurance Scheme";
          break;
        case CommonConstant.SURVEYOR_BRANCH:
          this.inputPagingObj.title = "Surveyor Branch Scheme";
          break;
        case CommonConstant.AGENCY_PERSONAL:
          this.inputPagingObj.title = "Agency Personal Scheme";
          break;
        case CommonConstant.AGENCY_COMPANY:
          this.inputPagingObj.title = "Agency Company Scheme";
          break;
      }

      var critObj = new CriteriaObj();
      critObj.propName = "VS.MR_VENDOR_CATEGORY_CODE";
      critObj.restriction = AdInsConstant.RestrictionEq;
      critObj.value = this.MrVendorCategoryCode;
      this.inputPagingObj.addCritInput.push(critObj);
    }
    else if (this.Type == "Group") {
      this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorGroup.json";
      this.inputPagingObj._url = "./assets/ucpaging/searchVendorGroup.json";

      switch (this.MrVendorCategoryCode) {
        case CommonConstant.SUPPLIER:
          this.inputPagingObj.title = "Supplier Group";
          break;
        case CommonConstant.ASSET_INSCO_BRANCH:
          this.inputPagingObj.title = "Insurance Branch Group";
          break;
        case CommonConstant.LIFE_INSCO_BRANCH:
          this.inputPagingObj.title = "Life Insurance Group";
          break;
        case CommonConstant.SURVEYOR_BRANCH:
          this.inputPagingObj.title = "Surveyor Branch Group";
          break;
        case CommonConstant.AGENCY_PERSONAL:
          this.inputPagingObj.title = "Agency Personal Group";
          break;
        case CommonConstant.AGENCY_COMPANY:
          this.inputPagingObj.title = "Agency Company Group";
          break;
      }

      var critObj = new CriteriaObj();
      critObj.propName = "VG.MR_VENDOR_CATEGORY_CODE";
      critObj.restriction = AdInsConstant.RestrictionEq;
      critObj.value = this.MrVendorCategoryCode;
      this.inputPagingObj.addCritInput.push(critObj);
    }
    else if (this.Type == "Default") {
      if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER || this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_BRANCH || this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_BRANCH
        || this.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH || this.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY || this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL
        || this.MrVendorCategoryCode == CommonConstant.NOTARY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.NOTARY_COMPANY || this.MrVendorCategoryCode == CommonConstant.AUCTION_COMPANY
        || this.MrVendorCategoryCode ==  CommonConstant.CUSTODY || this.MrVendorCategoryCode == CommonConstant.VENDOR_CATEGORY_GENERAL) {
        switch (this.MrVendorCategoryCode) {
          case CommonConstant.SUPPLIER:
            this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSupplier.json";
            this.inputPagingObj._url = "./assets/ucpaging/searchSupplier.json";
            break;
          case CommonConstant.AGENCY_PERSONAL:
            this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAgencyPersonal.json";
            this.inputPagingObj._url = "./assets/ucpaging/searchAgencyPersonal.json";
            break;
          case CommonConstant.AGENCY_COMPANY:
            this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAgencyCompany.json";
            this.inputPagingObj._url = "./assets/ucpaging/searchAgencyCompany.json";
            break;
          case CommonConstant.NOTARY_PERSONAL: 
            this.inputPagingObj.pagingJson = "./assets/ucpaging/verification/searchNotaryPersonal.json";
            this.inputPagingObj._url = "./assets/ucpaging/verification/searchNotaryPersonal.json";
            this.inputPagingObj.title = typeof (CommonConstant["TITLE_" + this.MrVendorCategoryCode]) != 'undefined' ? CommonConstant["TITLE_" + this.MrVendorCategoryCode] : this.MrVendorCategoryCode.replace(/_/g, ' ');
            this.inputPagingObj.addCritInput = new Array();
            var critObj = new CriteriaObj();
            critObj.propName = "vdr.MR_VENDOR_CATEGORY_CODE";
            critObj.restriction = AdInsConstant.RestrictionEq;
            critObj.value = CommonConstant.NOTARY;
            this.inputPagingObj.addCritInput.push(critObj);
            critObj = new CriteriaObj();
            critObj.propName = "vdr.MR_VENDOR_TYPE_CODE";
            critObj.restriction = AdInsConstant.RestrictionEq;
            critObj.value = 'P';
            this.inputPagingObj.addCritInput.push(critObj);
            break;
          case CommonConstant.NOTARY_COMPANY: 
            this.inputPagingObj.pagingJson = "./assets/ucpaging/verification/searchNotaryCompany.json";
            this.inputPagingObj._url = "./assets/ucpaging/verification/searchNotaryCompany.json";
            this.inputPagingObj.title = typeof (CommonConstant["TITLE_" + this.MrVendorCategoryCode]) != 'undefined' ? CommonConstant["TITLE_" + this.MrVendorCategoryCode] : this.MrVendorCategoryCode.replace(/_/g, ' ');
            this.inputPagingObj.addCritInput = new Array();
            var critObj = new CriteriaObj();
            critObj.propName = "vdr.MR_VENDOR_CATEGORY_CODE";
            critObj.restriction = AdInsConstant.RestrictionEq;
            critObj.value = CommonConstant.NOTARY;
            this.inputPagingObj.addCritInput.push(critObj);
            critObj = new CriteriaObj();
            critObj.propName = "vdr.MR_VENDOR_TYPE_CODE";
            critObj.restriction = AdInsConstant.RestrictionEq;
            critObj.value = 'C';
            this.inputPagingObj.addCritInput.push(critObj);
            break;
          case CommonConstant.AUCTION_COMPANY: 
            this.inputPagingObj.pagingJson = "./assets/ucpaging/vendor/auction-company/searchAuctionCompanyV2.json";
            this.inputPagingObj._url = "./assets/ucpaging/vendor/auction-company/searchAuctionCompanyV2.json";
            this.inputPagingObj.title = typeof (CommonConstant["TITLE_" + this.MrVendorCategoryCode]) != 'undefined' ? CommonConstant["TITLE_" + this.MrVendorCategoryCode] : this.MrVendorCategoryCode.replace(/_/g, ' ');
            this.inputPagingObj.addCritInput = new Array();
            var critObj = new CriteriaObj();
            critObj.propName = "vdr.MR_VENDOR_CATEGORY_CODE";
            critObj.restriction = AdInsConstant.RestrictionEq;
            critObj.value = CommonConstant.AUCTION_COMPANY;
            this.inputPagingObj.addCritInput.push(critObj);
            critObj = new CriteriaObj();
            critObj.propName = "vdr.MR_VENDOR_TYPE_CODE";
            critObj.restriction = AdInsConstant.RestrictionEq;
            critObj.value = 'C';
            this.inputPagingObj.addCritInput.push(critObj);
            break;
          case CommonConstant.CUSTODY:
            this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorCustody.json";
            this.inputPagingObj._url = "./assets/ucpaging/searchVendorCustody.json";
            this.inputPagingObj.title = typeof (CommonConstant["TITLE_" + this.MrVendorCategoryCode]) != 'undefined' ? CommonConstant["TITLE_" + this.MrVendorCategoryCode] : this.MrVendorCategoryCode.replace(/_/g, ' ');
            this.inputPagingObj.addCritInput = new Array();
            var critObj = new CriteriaObj();
            critObj.propName = "vdr.MR_VENDOR_CATEGORY_CODE";
            critObj.restriction = AdInsConstant.RestrictionEq;
            critObj.value = CommonConstant.CUSTODY;
            this.inputPagingObj.addCritInput.push(critObj);
            break;
          case CommonConstant.VENDOR_CATEGORY_GENERAL:
            this.inputPagingObj.pagingJson = "./assets/ucpaging/vendor/searchVendorGeneral.json";
            this.inputPagingObj._url = "./assets/ucpaging/vendor/searchVendorGeneral.json";
            this.inputPagingObj.addCritInput = new Array();
            var critObj = new CriteriaObj();
            critObj.propName = "vdr.MR_VENDOR_CATEGORY_CODE";
            critObj.restriction = AdInsConstant.RestrictionIn;
            critObj.listValue = ["CONSULTANT", "LOGISTIC", "COURIER", "IT_INFRA_SOLUTION"];
            this.inputPagingObj.addCritInput.push(critObj);
            break;
          default:
            this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBranch.json";
            this.inputPagingObj._url = "./assets/ucpaging/searchBranch.json";
            break;
        }

        if(this.MrVendorCategoryCode != CommonConstant.NOTARY_PERSONAL && this.MrVendorCategoryCode != CommonConstant.NOTARY_COMPANY && this.MrVendorCategoryCode != CommonConstant.AUCTION_COMPANY && this.MrVendorCategoryCode != CommonConstant.CUSTODY && this.MrVendorCategoryCode != CommonConstant.VENDOR_CATEGORY_GENERAL){
          this.inputPagingObj.title = typeof (CommonConstant["TITLE_" + this.MrVendorCategoryCode]) != 'undefined' ? CommonConstant["TITLE_" + this.MrVendorCategoryCode] : this.MrVendorCategoryCode.replace(/_/g, ' ');
          this.inputPagingObj.addCritInput = new Array();
          var critObj = new CriteriaObj();
          critObj.propName = "vdr.MR_VENDOR_CATEGORY_CODE";
          critObj.restriction = AdInsConstant.RestrictionEq;
          critObj.value = this.MrVendorCategoryCode;
  
          this.inputPagingObj.addCritInput.push(critObj);
        }

        if (this.MrVendorCategoryCode != CommonConstant.SUPPLIER) {
          var WVendorClassObj = new WhereValueObj();
          WVendorClassObj.property = "VendorClass";
          WVendorClassObj.value = "BRANCH";
          this.inputPagingObj.whereValue.push(WVendorClassObj);
        }

      }
      else if (this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_HO || this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_HO || this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO || this.MrVendorCategoryCode == CommonConstant.SURVEYOR_HO) {

        this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorHO.json";
        this.inputPagingObj._url = "./assets/ucpaging/searchVendorHO.json";

        switch (this.MrVendorCategoryCode) {
          case CommonConstant.ASSET_INSCO_HO:
            this.inputPagingObj.title = "Insurance HO";
            break;
          case CommonConstant.LIFE_INSCO_HO:
            this.inputPagingObj.title = "Life Insurance HO";
            break;
          case CommonConstant.SUPPLIER_HO:
            this.inputPagingObj.title = "Supplier HO";
            break;
          case CommonConstant.SURVEYOR_HO:
            this.inputPagingObj.title = "Surveyor HO";
            break;
        }

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
      }
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HOLDING) {

        this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorHolding.json";
        this.inputPagingObj._url = "./assets/ucpaging/searchVendorHolding.json";
        this.inputPagingObj.title = "Supplier Holding";
        this.inputPagingObj.addCritInput = new Array();
        var critObj = new CriteriaObj();
        critObj.propName = "V.MR_VENDOR_CATEGORY_CODE";
        critObj.restriction = AdInsConstant.RestrictionEq;
        critObj.value = this.MrVendorCategoryCode;

        this.inputPagingObj.addCritInput.push(critObj);

        var WVendorClassObj = new WhereValueObj();
        WVendorClassObj.property = "VendorClass";
        WVendorClassObj.value = "HOLDING";
        this.inputPagingObj.whereValue.push(WVendorClassObj);
      }
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_ATPM) {

        this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSupplierATPM.json";
        this.inputPagingObj._url = "./assets/ucpaging/searchSupplierATPM.json";
        this.inputPagingObj.title = "Supplier ATPM";
        this.inputPagingObj.addCritInput = new Array();
        var critObj = new CriteriaObj();
        critObj.propName = "V.MR_VENDOR_CATEGORY_CODE";
        critObj.restriction = AdInsConstant.RestrictionEq;
        critObj.value = this.MrVendorCategoryCode;

        this.inputPagingObj.addCritInput.push(critObj);

        var WVendorClassObj = new WhereValueObj();
        WVendorClassObj.property = "VendorClass";
        WVendorClassObj.value = CommonConstant.ATPM;
        this.inputPagingObj.whereValue.push(WVendorClassObj);
      } 
      else if (this.MrVendorCategoryCode == CommonConstant.COLL_COMPANY) {
        this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCollCompany.json";
        this.inputPagingObj._url = "./assets/ucpaging/searchCollCompany.json";

        this.inputPagingObj.title = typeof (CommonConstant["TITLE_" + this.MrVendorCategoryCode]) != 'undefined' ? CommonConstant["TITLE_" + this.MrVendorCategoryCode] : this.MrVendorCategoryCode.replace(/_/g, ' ');
        this.inputPagingObj.addCritInput = new Array();
        var critObj = new CriteriaObj();
        critObj.propName = "vdr.MR_VENDOR_CATEGORY_CODE";
        critObj.restriction = AdInsConstant.RestrictionEq;
        critObj.value = this.MrVendorCategoryCode;

        this.inputPagingObj.addCritInput.push(critObj);
      }
    }
    setTimeout(() => {
      this.isReady = true
    }, 10);
  }

  subscribeParam() {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["MrVendorCategoryCode"] != null) {
          this.MrVendorCategoryCode = queryParams["MrVendorCategoryCode"];

      }
      if (queryParams["Type"] != null) {
        this.Type = queryParams["Type"];
      }
    });
  }

  ReInit() {
    this.Type = "Default";
    this.inputPagingObj = new UcPagingObj(this.UrlConstantNew);
  }

  RefetchData() {
    this.ReInit();
    this.subscribeParam();
    this.selectPage();
  }

  navigate() {
    if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER || this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_BRANCH || this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_BRANCH || this.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH || this.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY || this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL
      || this.MrVendorCategoryCode == CommonConstant.NOTARY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.NOTARY_COMPANY || this.MrVendorCategoryCode == CommonConstant.AUCTION_COMPANY || this.MrVendorCategoryCode == CommonConstant.CUSTODY) {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_BRANCH_ADD], { "MrVendorCategoryCode": this.MrVendorCategoryCode });
    }
    else if (this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_HO || this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_HO || this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO || this.MrVendorCategoryCode == CommonConstant.SURVEYOR_HO) {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_HO_DETAIL], { "MrVendorCategoryCode": this.MrVendorCategoryCode });
    }
    else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HOLDING) {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_HOLDING_DETAIL], { "MrVendorCategoryCode": this.MrVendorCategoryCode });
    }
    else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_ATPM) {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_ATPM_DETAIL], { "MrVendorCategoryCode": this.MrVendorCategoryCode });
    } 
    else if (this.MrVendorCategoryCode == CommonConstant.COLL_COMPANY) {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_COLL_COMPANY_ADD], { "MrVendorCategoryCode": this.MrVendorCategoryCode });
    }
    else if (this.MrVendorCategoryCode == CommonConstant.VENDOR_CATEGORY_GENERAL) {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_BRANCH_ADD]);
    }
    
    if (this.Type == "Scheme") {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_SCHM_DETAIL], { "MrVendorCategoryCode": this.MrVendorCategoryCode });
    }
    else if (this.Type == "Group") {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_GRP_ADD], { "MrVendorCategoryCode": this.MrVendorCategoryCode });
    }
  }

}
