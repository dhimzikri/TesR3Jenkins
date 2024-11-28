import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-main-ho-info-x',
  templateUrl: './main-ho-info-x.component.html'
})
export class MainHoInfoXComponent implements OnInit {
  viewCObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewPObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewInsObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  VendorId: any;
  MrVendorTypeCode: any;
  MrVendorCategoryCode: any;
  viewObj12345: any;
  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew, 
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VendorId = queryParams['VendorId'];
    });
  }

  ngOnInit() {    

    this.http.post(this.UrlConstantNew.GetVendorByVendorId, {Id : this.VendorId}).subscribe(
      (response) => {
        this.MrVendorTypeCode = response["MrVendorTypeCode"];
        this.MrVendorCategoryCode = response["MrVendorCategoryCode"];
        if (this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_HO) this.MrVendorTypeCode = this.MrVendorCategoryCode;
      }
    )
    
    this.viewCObj.viewInput = "./assets/impl/ucviewgeneric/viewHOInfoCompanyX.json";
    this.viewPObj.viewInput = "./assets/ucviewgeneric/viewHOInfoPersonal.json";
    this.viewInsObj.viewInput = "./assets/impl/ucviewgeneric/viewHOInfoCompanyInscoX.json";

  }

}
