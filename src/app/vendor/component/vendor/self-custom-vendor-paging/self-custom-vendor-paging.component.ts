import { NgxRouterService } from '@adins/fe-core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-self-custom-vendor-paging',
  templateUrl: './self-custom-vendor-paging.component.html'
})
export class SelfCustomVendorPagingComponent implements OnInit, OnDestroy {
  pageName: string;
  MrVendorCategoryCode: string;
  Type: string = "Default";
  navigationSubscription;
  isReady = false;

  constructor(private route: ActivatedRoute, private ngxRouter: NgxRouterService) {
    this.subscribeParam();
    // this.navigationSubscription = this.router.events.subscribe((e: any) => {
    //   // If it is a NavigationEnd event re-initalise the component
    //   if (e instanceof NavigationEnd) {
    //     // this.RefetchData();
    //   }
    // });
    this.pageName = 'Supplierhocomponent'
  }

  ngOnInit(): void {
    this.selectPage();
  }

  ngOnDestroy(): void {
    // if (this.navigationSubscription) {
    //   this.navigationSubscription.unsubscribe();
    // }
  }

  RefetchData() {
    this.ReInit();
    this.subscribeParam();
    this.selectPage();
  }

  ReInit() {
    this.Type = "Default";
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

  selectPage() {
    console.log("logg")
    this.isReady = false;
    if (this.Type == "Scheme") {
      switch (this.MrVendorCategoryCode) {
        case CommonConstant.SUPPLIER:
          this.pageName = 'SupplierSchemeComponent'
          break;
      }
    }
    else if (this.Type == "Group") {
      switch (this.MrVendorCategoryCode) {
        case CommonConstant.SUPPLIER:
          this.pageName = 'SupplierGroupComponent'
          break;
        case CommonConstant.AGENCY_PERSONAL:
          this.pageName = 'AgencyPersonalPaging'
          break;
        case CommonConstant.AGENCY_COMPANY:
          this.pageName = 'AgencyCompanyPaging'
          break;
        case CommonConstant.ASSET_INSCO_BRANCH:
          this.pageName = 'InsuranceBranchGroupPaging'
          break;
        case CommonConstant.LIFE_INSCO_BRANCH:
          this.pageName = 'LifeInsuranceGroupPaging'
          break;
        case CommonConstant.SURVEYOR_BRANCH:
          this.pageName = 'SurveyorBranchGroupPaging'
          break;
        case CommonConstant.CRD_INSCO_BRANCH:
          this.pageName = 'CreditInsuranceBranchGroupPaging'
          break;
      }
    }
    else if (this.Type == "Default") {
      if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
        this.pageName = 'Suppliercomponent'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO ||
               this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_HO ||
               this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_HO ||
               this.MrVendorCategoryCode == CommonConstant.CRD_INSCO_HO ||
               this.MrVendorCategoryCode == CommonConstant.SURVEYOR_HO) {
        switch (this.MrVendorCategoryCode) {
          case CommonConstant.SUPPLIER_HO:
            this.pageName = 'Supplierhocomponent'
            break;
          case CommonConstant.ASSET_INSCO_HO:
            this.pageName = 'AssetInsuranceHoPaging'
            break;
          case CommonConstant.LIFE_INSCO_HO:
            this.pageName = 'LifeInsuranceHoPaging'
            break;
          case CommonConstant.SURVEYOR_HO:
            this.pageName = 'Vendorsurveyorhopaging'
            break;
          case CommonConstant.CRD_INSCO_HO:
            this.pageName = 'CreditInsuranceHo'
        }
      }
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HOLDING) {
        this.pageName = 'SupplierHoldingComponent'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_ATPM) {
        this.pageName = 'SupplierAtmpComponent'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.CUSTODY) {
        this.pageName = 'Vendorcustody'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL) {
        this.pageName = 'Vendoragencypersonal'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH){
        this.pageName = 'VendorSurveyorPaging'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.NOTARY_PERSONAL){
        this.pageName = 'VendorpagingNotorypersonal'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.COLL_COMPANY){
        this.pageName = 'VendorCollectionCompanyPaging'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.AUCTION_COMPANY){
        this.pageName = 'VendorAuctionCompanyPaging'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_BRANCH){
        this.pageName = 'VendorLifeInsuranceBranch'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_BRANCH){
        this.pageName = 'VendorInsurancePaging'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.CRD_INSCO_BRANCH){
        this.pageName = 'VendorCreditInsurancePaging'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY){
        this.pageName = 'VendorAgencyCompanyPaging'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.NOTARY_COMPANY){
        this.pageName = 'VendorNotaryCompanyPaging2'
      }
      else {
        this.pageName = 'Vendorpaging'
      }


    }


    setTimeout(() => {
      this.isReady = true;
    }, 10);
  }

}
