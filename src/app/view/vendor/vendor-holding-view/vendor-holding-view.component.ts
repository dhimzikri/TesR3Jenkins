import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VendorHoObj } from 'app/shared/model/vendor-ho-obj.model';
import { VendorGroupObj } from 'app/shared/model/vendor-group-obj.model';
import { VendorObj } from 'app/shared/model/vendor-obj.model';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-holding-view',
  templateUrl: './vendor-holding-view.component.html',
 // providers: [NGXToastrService]
})
export class VendorHoldingViewComponent implements OnInit {
  @ViewChild(UcgridfooterComponent) UCGridFooter;
  @ViewChild(UCSearchComponent) UCSearchComponent;
  VendorId: any;
  viewVendorHoldingObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  arrCrit: any[];
  vendorHoObj: VendorHoObj;
  MainInfo: any;
  vendorAddrObj: VendorHoObj;
  MrVendorTypeCode: any;
  viewVendorHoldingMainPObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewVendorHoldingMainCObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewVendorHoldingTaxObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewVendorHoldingTaxAddrObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewVendorHoldingAddrObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewVendorHoldingLtLgObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  
  VendorGrp: any;
  GroupListObj: VendorGroupObj;
  HoListObj: VendorObj;
  Vendor: any;
  vendorContactPerson: Object;
  tempData: any[];
  tempListId: any[];
  listSelectedId: any[];
  MrVendorTypeObj: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private ngxRouter: NgxRouterService, private UrlConstantNew: UrlConstantNew) {

    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["VendorId"] != null) {
        this.VendorId = queryParams["VendorId"];
      }

    });
  }

  ngOnInit() {
    
    this.http.post(this.UrlConstantNew.GetVendorByVendorId, {Id : this.VendorId}).subscribe(
      response => {
        this.MrVendorTypeObj = response;
        this.MrVendorTypeCode = this.MrVendorTypeObj.MrVendorTypeCode;
      }
    )

    this.viewVendorHoldingObj.viewInput = "./assets/ucviewgeneric/viewVendorHolding.json";
    this.viewVendorHoldingMainPObj.viewInput = "./assets/ucviewgeneric/viewVendorHoldingMainP.json";
    this.viewVendorHoldingMainCObj.viewInput = "./assets/ucviewgeneric/viewVendorHoldingMainC.json";
    this.viewVendorHoldingTaxObj.viewInput = "./assets/ucviewgeneric/viewVendorHoldingTax.json";
    this.viewVendorHoldingTaxAddrObj.viewInput = "./assets/ucviewgeneric/viewVendorHoldingTaxAddr.json";
    this.viewVendorHoldingAddrObj.viewInput = "./assets/ucviewgeneric/viewVendorHoldingAddr.json";
    this.viewVendorHoldingLtLgObj.viewInput = "./assets/ucviewgeneric/viewVendorHoldingLtLg.json";
    
    this.GetListVendorContactPersonByVendorId();

    this.listSelectedId = new Array();
    this.tempListId = new Array();
    this.tempData = new Array();

    this.GroupListObj = new VendorGroupObj();
    this.GroupListObj.VendorId = this.VendorId;

    this.http.post(this.UrlConstantNew.GetListVendorGrpByVendorId, {Id : this.VendorId}).subscribe(
      response => {
        this.VendorGrp = response[CommonConstant.ReturnObj]

      }
    )
    this.HoListObj = new VendorObj();
    this.HoListObj.VendorId = this.VendorId;
    let ReqGetListHO : GenericObj = new GenericObj();
    ReqGetListHO.Id = this.VendorId;
    this.http.post(this.UrlConstantNew.GetListHoByVendorId, ReqGetListHO).subscribe(
      response => {
        this.Vendor = response[CommonConstant.ReturnObj]

      }
    )
  }

  GetListVendorContactPersonByVendorId() {
    
    var getListUrl = this.UrlConstantNew.GetListVendorContactPersonByVendorId;
    this.http.post(getListUrl, {Id : this.VendorId}).subscribe(
      (response) => {
        this.vendorContactPerson = response[CommonConstant.ReturnObj];
      }
    );
  }
}
