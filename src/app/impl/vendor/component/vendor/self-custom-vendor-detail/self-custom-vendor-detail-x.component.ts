import { NgxRouterService } from '@adins/fe-core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-self-custom-vendor-detail-x',
  templateUrl: './self-custom-vendor-detail-x.component.html'
})
export class SelfCustomVendorDetailXComponent implements OnInit, OnDestroy {
  pageName: string;
  MrVendorCategoryCode: string;
  Type: string = "Default";
  navigationSubscription;
  isReady = false;

  constructor(private route: ActivatedRoute, private ngxRouter: NgxRouterService) {
    this.subscribeParam();

    this.pageName = 'SupplierDetailXCNAF'
    this.selectPage();
  }

  ngOnInit(): void {
    this.selectPage();
  }

  ngOnDestroy(): void {
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
    this.isReady = false;
    if (this.Type == "Scheme") {

    }
    else if (this.Type == "Group") {

    }
    else if (this.Type == "Default") {
      if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
        this.pageName = "SupplierDetailXCNAF"
      }
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO ||
               this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_HO ||
               this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_HO ||
               this.MrVendorCategoryCode == CommonConstant.CRD_INSCO_HO ||
               this.MrVendorCategoryCode == CommonConstant.SURVEYOR_HO) {
        switch (this.MrVendorCategoryCode) {
          case CommonConstant.SURVEYOR_HO:
            this.pageName = 'VendorSurveyorHoDetail'
            break;
          case CommonConstant.SUPPLIER_HO:
            this.pageName = 'SupplierHoDetail'
            break;
          case CommonConstant.ASSET_INSCO_HO:
            this.pageName = 'SupplierHoDetailXCNAF'
            break;
          case CommonConstant.LIFE_INSCO_HO:
            this.pageName = 'SupplierHoDetail'
            break;
          case CommonConstant.SURVEYOR_HO:
            this.pageName = 'SupplierHoDetail'
            break;
          case CommonConstant.CRD_INSCO_HO:
              this.pageName = 'SupplierHoDetail'
            break;
        }
      }
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HOLDING) {

      }
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_ATPM) {
        this.pageName = "SupplierAtpmDetail"
      }
      else if (this.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH) {
        this.pageName = 'VendorSurveyorDetail'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.COLL_COMPANY){
        this.pageName = 'VendorCollectionCompanyDetail'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.AUCTION_COMPANY){
        this.pageName = 'VendoRauctionCompanyDetailXCNAF'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_BRANCH){
        this.pageName = 'VendorLifeInsuranceBranchDetail'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_BRANCH){
        this.pageName = 'VendorInsuranceDetailXcnaf'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.CRD_INSCO_BRANCH){
        this.pageName = 'VendorCreditInsuranceDetail'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY){
        this.pageName = 'VendorAgencyCompanyDetail'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.NOTARY_COMPANY){
        this.pageName = 'VendorNotaryCompanyDetailXCNAF'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.NOTARY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.CUSTODY)
      {
        this.pageName = 'VendorbranchregistrationwithParamXCNAF'
      }
      else{
        this.pageName = 'VendorbranchregistrationwithParamWithNoParamXCNAF'
      }
    }

    setTimeout(() => {
      this.isReady = true;
    }, 10);
  }

}
