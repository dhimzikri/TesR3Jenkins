import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';
import { CommonConstantX } from 'app/impl/shared/constant/CommonConstantX';

@Component({
  selector: 'app-main-info-x-view',
  templateUrl: './main-info-x-view.component.html'
})
export class MainInfoXViewComponent implements OnInit {
  VendorId: number;
  MrVendorClass: string;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  MrVendorCategoryCode: string;
  constructor(private http: HttpClient, private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VendorId = queryParams["VendorId"];
    })
  }

  ngOnInit() {
    
    this.http.post(this.UrlConstantNew.GetVendorByVendorId, {Id : this.VendorId}).subscribe(
      (response) => {
        this.MrVendorClass = response["MrVendorClass"];
        this.MrVendorCategoryCode = response["MrVendorCategoryCode"]
        if (this.MrVendorClass == CommonConstant.Holding) {
          this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorHoldingMainInfo.json";
        } else if (this.MrVendorClass == CommonConstant.HeadOffice) {
          this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorHOMainInfo.json";
        }else if (this.MrVendorCategoryCode === CommonConstant.VENDOR_CATEGORY_GENERAL || this.MrVendorCategoryCode === CommonConstant.CONSULTANT
          || this.MrVendorCategoryCode === CommonConstant.LOGISTIC || this.MrVendorCategoryCode === CommonConstant.COURIER
          || this.MrVendorCategoryCode === CommonConstant.IT_INFRA_SOLUTION || this.MrVendorCategoryCode === CommonConstantX.GENERAL){
            this.viewGenericObj.viewInput = "./assets/impl/ucviewgeneric/viewVendorGeneralMainInfoX.json";
        } else if (this.MrVendorClass == CommonConstant.Branch && this.MrVendorCategoryCode != CommonConstant.SUPPLIER) {
          this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchMainInfo.json";
        }else if (this.MrVendorClass == CommonConstant.COLL_COMPANY) {
          this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorCollCompanyMainInfo.json";
        }else{
          this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewSupplierBranchMainInfo.json";
        }
      }
    );
  }
}
