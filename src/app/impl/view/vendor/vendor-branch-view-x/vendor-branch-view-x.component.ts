import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VendorHoObj } from 'app/shared/model/vendor-ho-obj.model';
import { VendorBankAccObj } from 'app/shared/model/vendor-bank-acc-obj.model';
import { VendorEmpObj } from 'app/shared/model/vendor-emp-obj.model';
import { VendorOfficeMbrObj } from 'app/shared/model/vendor-office-mbr-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ReqRefAttrByAttrGroupObj } from 'app/shared/model/request/ref-attr/req-ref-attr-by-attr-group-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-branch-view-x',
  templateUrl: './vendor-branch-view-x.component.html'
})
export class VendorBranchViewXComponent implements OnInit {
  VendorId: number;
  viewVendorHoldingObj: string;
  arrCrit: any[];
  vendorHoObj: VendorHoObj;
  MainInfo: any;
  vendorAddrObj: VendorHoObj;
  MrVendorTypeCode: string;

  VendorGrp: any;
  Vendor: any;
  pageNow: any;
  pageSize: any;
  totalData: any;
  apiUrl: any;
  resultData: any;
  orderByValue: any;
  orderByKey: any;
  tempData: any[];
  tempListId: any[];
  listSelectedId: any[];
  MrVendorTypeObj: any;

  viewVendorBranchObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewVendorBranchMainPObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewBranchInfoSuppObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewBranchInfoSurObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewBranchInfoAssetObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewBranchInfoLifeObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewBranchAgencyPObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewBranchAgencyCObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewVendorBranchMainCObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  MrVendorCategoryCode: any;
  viewVendorBranchTaxObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewVendorBranchTaxAddrObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewVendorBranchAddrObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewVendorBranchLtLgObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  VendorBankAccListObj: VendorBankAccObj;
  VendorBankAcc: any;
  VendorEmpListObj: VendorEmpObj;
  VendorEmp: any;
  VendorOfficeMbrListObj: VendorOfficeMbrObj;
  VendorOfficeMbr: any;
  VendorOfficeMbrX: any;
  ListVendorAttrContent: any;
  VendorAttrList: any;
  IsReady: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {

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
        this.MrVendorCategoryCode = this.MrVendorTypeObj.MrVendorCategoryCode;
        if (this.MrVendorCategoryCode=="NOTARY"){
          this.viewVendorBranchMainCObj.viewInput = "./assets/impl/ucviewgeneric/viewVendorBranchMainCNotaryX.json";
          this.viewVendorBranchMainPObj.viewInput = "./assets/impl/ucviewgeneric/viewVendorBranchMainPNotaryX.json";
        }
        else if  (this.MrVendorCategoryCode==CommonConstant.ASSET_INSCO_BRANCH){
          this.viewVendorBranchMainCObj.viewInput = "./assets/impl/ucviewgeneric/viewVendorBranchMainCAssetInscoBranchX.json";
        }
        else if (this.MrVendorCategoryCode==CommonConstant.AUCTION_COMPANY){
          this.viewVendorBranchMainCObj.viewInput = "./assets/impl/ucviewgeneric/viewVendorBranchMainCAuctionX.json";
        }
      }
    )

    this.viewVendorBranchObj.viewInput = "./assets/ucviewgeneric/viewVendorBranch.json";
    this.viewVendorBranchMainPObj.viewInput = "./assets/impl/ucviewgeneric/viewVendorBranchMainPX.json";
    this.viewVendorBranchMainCObj.viewInput = "./assets/impl/ucviewgeneric/viewVendorBranchMainCX.json";
    this.viewBranchInfoSuppObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchInfoSupp.json";

    this.viewBranchInfoSurObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchInfoSur.json";

    this.viewBranchInfoAssetObj.viewInput = "./assets/ucviewgeneric/viewBranchInfoAsset.json";

    this.viewBranchInfoLifeObj.viewInput = "./assets/ucviewgeneric/viewBranchInfoLife.json";

    this.viewVendorBranchTaxObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchTax.json";
    this.viewVendorBranchTaxAddrObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchTaxAddr.json";
    this.viewVendorBranchAddrObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchAddr.json";

    this.http.post(this.UrlConstantNew.GetListVendorBankAccByVendorId, { Id: this.VendorId }).subscribe(
      response => {
        this.VendorBankAcc = response[CommonConstant.ReturnObj]

      }
    )

    this.http.post(this.UrlConstantNew.GetListVendorGrpByVendorId, { Id: this.VendorId }).subscribe(
      response => {
        this.VendorGrp = response[CommonConstant.ReturnObj]

      }
    )

    this.http.post(this.UrlConstantNew.GetListVendorEmpByVendorIdX, { Id: this.VendorId }).subscribe(
      response => {
        this.VendorEmp = response[CommonConstant.ReturnObj]
      }
    )

    this.http.post(this.UrlConstantNew.GetListVendorOfficeMbrByVendorId, { Id: this.VendorId }).subscribe(
      response => {
        this.VendorOfficeMbr = response[CommonConstant.ReturnObj]
      }
    )

    this.http.post(this.UrlConstantNew.GetListVendorOfficeMbrXByVendorId, { Id: this.VendorId }).subscribe(
      response => {
        this.VendorOfficeMbrX = response[CommonConstant.ReturnObj]
      }
    )

    this.http.post(this.UrlConstantNew.GetListVendorAttrContentByVendorId, { Id: this.VendorId }).subscribe(
      (response) => {
        this.ListVendorAttrContent = response[CommonConstant.ReturnObj];
        if (this.ListVendorAttrContent != null) {
          let reqByAttrGroup: ReqRefAttrByAttrGroupObj = new ReqRefAttrByAttrGroupObj();
          reqByAttrGroup.AttrGroup = this.MrVendorCategoryCode;
          if (this.MrVendorCategoryCode=="NOTARY"){
            reqByAttrGroup.AttrGroup = "NOTARY_COMPANY";
            if (this.MrVendorTypeCode =="P"){
              reqByAttrGroup.AttrGroup == "NOTARY_PERSONAL"
            }
          }  
          this.http.post(this.UrlConstantNew.GetListActiveRefAttrByAttrGroup, reqByAttrGroup).subscribe( 
            (res) => {
              this.VendorAttrList = res[CommonConstant.ReturnObj];
              this.VendorAttrList.forEach((x, index) => {
                if(!this.ListVendorAttrContent.find(({AttrCode}) => AttrCode == x.AttrCode)){
                  this.ListVendorAttrContent.splice(index,0,{'AttrContent':''});
                }
              });
              this.IsReady = true;
            });
        }
      }
    )
  }
}
