import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ResSysConfigResultObj } from 'app/shared/model/response/res-sys-config-result-obj,model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResCustListIframeViewObj } from 'app/shared/model/response/cust-list-iframe-View/res-cust-list-iframe-view-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html'
})
export class CustomerViewComponent implements OnInit {
  custResultData: any;

  viewCustMainInfoHeaderObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewCustCoyMainInfoHeader: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  CustId: number;
  selectedIndex: number;

  CustNo: string;
  custModel: string;
  custType: string;
  viewCustJobData: string;
  getCustByCustIdUrl: string;
  viewCustJobDataAddress: string;
  Tab: string;

  IsLos: boolean = false;
  IsLms: boolean = false;
  IsUseDms: boolean = false;

  IsIframe: boolean = false;
  IsUseDigitalization: boolean = false;
  IsUseTs: boolean = false;
  IsUseAsliRi: boolean = false;
  IsUseCbasSlik: Boolean = false;
  listIframe: Array<ResCustListIframeViewObj> = new Array<ResCustListIframeViewObj>();

  SysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj();
  digitalizationSysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj();

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.getCustByCustIdUrl = this.UrlConstantNew.GetCustByCustId;
  }

  changeRoute(url) {
    this.router.navigateByUrl('', { skipLocationChange: true });
    setTimeout(() => AdInsHelper.RedirectUrl(this.ngxRouter, [url], {}));
  }

  dictIdxAt: { [Id: string]: number } = {};
  async ngOnInit(): Promise<void> {
    this.viewCustMainInfoHeaderObj.viewInput = "./assets/ucviewgeneric/viewCustMainInfoHeader.json";

    this.viewCustCoyMainInfoHeader.viewInput = "./assets/ucviewgeneric/viewCustCoyMainInfoHeader.json";
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["CustId"] != null) {
        this.CustId = queryParams["CustId"];
      }
      if (queryParams["Tab"] != null) {
        this.Tab = queryParams["Tab"];
      }
    });
    
    if (this.Tab == CommonConstant.HIGHLIGHT_COMMENT) {
      this.selectedIndex = 8;
      var linkUrl = NavigationConstant.VIEW_CUST_HIGHLIGHT_COMMENT;
      AdInsHelper.RedirectUrlView(this.router, [linkUrl], { "CustId": this.CustId }, true);
    }
    
    var custObj = {
      CustId: this.CustId
    }
    await this.http.post(this.getCustByCustIdUrl, { Id: this.CustId }).toPromise().then(
      (response) => {
        this.custResultData = response;
        this.CustNo = this.custResultData['CustNo'];
        this.custModel = this.custResultData['MrCustModelCode'];
        this.custType = this.custResultData['MrCustTypeCode'];
      }
    );

    let reqGetSysConfigResultLOSObj = new GenericObj();
    reqGetSysConfigResultLOSObj.Code = CommonConstant.MODULE_LOS;
    await this.http.post<ResSysConfigResultObj>(this.UrlConstantNew.GetSysConfigResultByCode, { ConfigCode: reqGetSysConfigResultLOSObj.Code }).toPromise().then(
      (response) => {
        if (response.ConfigValue === "1") {
          this.IsLos = true;
        }
        else {
          this.IsLos = false;
        }
      }
    );

    let reqGetSysConfigResultLMSObj = new GenericObj();
    reqGetSysConfigResultLMSObj.Code = CommonConstant.MODULE_LMS;
    await this.http.post<ResSysConfigResultObj>(this.UrlConstantNew.GetSysConfigResultByCode, { ConfigCode: reqGetSysConfigResultLMSObj.Code }).toPromise().then(
      (response) => {
        if (response.ConfigValue === "1") {
          this.IsLms = true;
        }
        else {
          this.IsLms = false;
        }
      }
    );

    //check DMS
    await this.http.post<ResSysConfigResultObj>(this.UrlConstantNew.GetSysConfigPncplResultByCode, { Code: CommonConstant.ConfigCodeIsUseDms }).toPromise().then(
      (response) => {
        this.SysConfigResultObj = response;
        if (response.ConfigValue === "1") {
          this.IsUseDms = true;
        }
        else {
          this.IsUseDms = false;
        }
      }
    );

    await this.GetCustListIframeView();
    await this.getIsUseDigitalization();
    this.setDictIdxAt();
  }

  setDictIdxAt() {
    let idxAt: number = 8;
    if (this.IsUseDms) this.dictIdxAt["DMS"] = ++idxAt;
    if (this.custType == 'PERSONAL') {

      if (this.IsUseDigitalization && this.IsUseTs) this.dictIdxAt["TrustSocial"] = ++idxAt;
      if (this.IsUseDigitalization && this.IsUseAsliRi) this.dictIdxAt["AsliRi"] = ++idxAt;
      if (this.IsUseDigitalization && this.IsUseCbasSlik) this.dictIdxAt["CbasSlik"] = ++idxAt;
    } else {
      if (this.IsUseDigitalization) this.dictIdxAt["TrustSocial"] = ++idxAt;
      if (this.IsUseDigitalization && this.IsUseAsliRi) this.dictIdxAt["AsliRi"] = ++idxAt;
      if (this.IsUseDigitalization && this.IsUseCbasSlik) this.dictIdxAt["CbasSlik"] = ++idxAt;
    }
    if (this.IsIframe) {
      let totalListIframe: number = this.listIframe.length;
      idxAt += totalListIframe;
    }
    this.dictIdxAt["OTH"] = ++idxAt;
  }

  async GetCustListIframeView() {
    await this.http.post(this.UrlConstantNew.GetCustListIframeView, {}).toPromise().then(
      (response) => {
        this.listIframe = response[CommonConstant.ReturnObj];
        this.IsIframe = true;
      }
    );
  }

  mencuba(ev: number) {
    let linkUrl: string = "";
    if (this.custType == CommonConstant.CustomerPersonal) {
      if (ev == 0) { 
        linkUrl = NavigationConstant.VIEW_CUST_PERSONAL_DETAIL;
      }
      else if (ev == 1) { 
        linkUrl = NavigationConstant.VIEW_CUST_ADDR;
      }
      else if (ev == 2) { // Family
        linkUrl = NavigationConstant.VIEW_CUST_PERSONAL_FAMILY;
      }
      else if (ev == 3) { // Contact Person
        linkUrl = NavigationConstant.VIEW_CUST_PERSONAL_CONTACT_PERSON;
      }
      else if (ev == 4) { // Customer Group
        linkUrl = NavigationConstant.VIEW_CUST_GRP;
      }
      else if (ev == 5) { // Job Data
        switch(this.custModel){
          case CommonConstant.CUST_MODEL_PROF:
            linkUrl = NavigationConstant.VIEW_CUST_PERSONAL_JOB_DATA;
            break;
          case CommonConstant.CUST_MODEL_NONPROF:
            linkUrl = NavigationConstant.VIEW_CUST_PERSONAL_JOB_DATA_NON_PROF;
            break;
          case CommonConstant.CUST_MODEL_EMP:
            linkUrl = NavigationConstant.VIEW_CUST_PERSONAL_JOB_DATA_EMP;
            break;
          case CommonConstant.CUST_MODEL_SME:
            linkUrl = NavigationConstant.VIEW_CUST_PERSONAL_JOB_DATA_SME;
            break;
        }
      }
      else if (ev == 6) { // Financial Data
        linkUrl = NavigationConstant.VIEW_CUST_PERSONAL_FINANCIAL_DATA;
      }
      else if (ev == 7) { // Customer Asset
        linkUrl = NavigationConstant.VIEW_CUST_ASSET_DATA;
      }
      else if (ev == 8) { // Highlight Comment
        linkUrl = NavigationConstant.VIEW_CUST_HIGHLIGHT_COMMENT;
      }
      else {
        linkUrl = NavigationConstant.VIEW_CUST;
        if(ev == this.dictIdxAt["DMS"]) linkUrl = NavigationConstant.VIEW_CUST_DOC;
        else if(ev == this.dictIdxAt["TrustSocial"]) linkUrl = NavigationConstant.VIEW_CUST_TRUSTING_SOCIAL;
        else if(ev == this.dictIdxAt["AsliRi"]) linkUrl = NavigationConstant.VIEW_CUST_ASLI_RI;
        else if(ev == this.dictIdxAt["CbasSlik"]) linkUrl = NavigationConstant.VIEW_CUST_CBAS_SLIK;
        else if(ev == this.dictIdxAt["OTH"]) linkUrl = NavigationConstant.VIEW_CUST_OTH_INFO;
      }
    }
    else if (this.custType == CommonConstant.CustomerCompany) {
      if (ev == 0) { // Main Data
        linkUrl = NavigationConstant.VIEW_CUST_COY_DETAIL;
      }
      else if (ev == 1) { // Address
        linkUrl = NavigationConstant.VIEW_CUST_ADDR;
      }
      else if (ev == 2) { // Management / Shareholder
        linkUrl = NavigationConstant.VIEW_CUST_COY_MNGMNT;
      }
      else if (ev == 3) { // Customer Group
        linkUrl = NavigationConstant.VIEW_CUST_GRP;
      }
      else if (ev == 4) { // Contact Information
        linkUrl = NavigationConstant.VIEW_CUST_COY_CONTACT;
      }
      else if (ev == 5) { // Financial Data
        linkUrl = NavigationConstant.VIEW_CUST_COY_FINANCIAL;
      }
      else if (ev == 6) { // Customer Asset
        linkUrl = NavigationConstant.VIEW_CUST_ASSET_DATA;
      }
      else if (ev == 7) { // Legal Document
        linkUrl = NavigationConstant.VIEW_CUST_COY_LEGAL;
      }
      else if (ev == 8) { // Highlight Comment
        linkUrl = NavigationConstant.VIEW_CUST_HIGHLIGHT_COMMENT;
      }
      else{
        linkUrl = NavigationConstant.VIEW_CUST;
        if(ev == this.dictIdxAt["DMS"]) linkUrl = NavigationConstant.VIEW_CUST_DOC;
        else if(ev == this.dictIdxAt["TrustSocial"]) linkUrl = NavigationConstant.VIEW_CUST_TRUSTING_SOCIAL;
        else if(ev == this.dictIdxAt["AsliRi"]) linkUrl = NavigationConstant.VIEW_CUST_ASLI_RI;
        else if(ev == this.dictIdxAt["CbasSlik"]) linkUrl = NavigationConstant.VIEW_CUST_CBAS_SLIK;
        else if(ev == this.dictIdxAt["OTH"]) linkUrl = NavigationConstant.VIEW_CUST_OTH_INFO;
      }
    }
    AdInsHelper.RedirectUrlView(this.router, [linkUrl], { "CustId": this.CustId }, true);
  }

  async getIsUseDigitalization() {
    await this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeIsUseDigitalization }).toPromise().then(
      async (response) => {
        if (response["GsValue"] === CommonConstant.TRUE_CONDITION) {
          this.IsUseDigitalization = true;
          await this.getDigitalizationSvcType();
        }
        else {
          this.IsUseDigitalization = false;
        }
      }
    );
  }

  async getDigitalizationSvcType() {
    await this.http.post<ResSysConfigResultObj>(this.UrlConstantNew.GetSysConfigPncplResultByCode, { Code: CommonConstant.ConfigCodeDigitalizationSvcType }).toPromise().then(
      (response) => {
        this.digitalizationSysConfigResultObj = response;
      });

    if (this.digitalizationSysConfigResultObj.ConfigValue != null) {
      var listSvcType = this.digitalizationSysConfigResultObj.ConfigValue.split("|");

      var svcTypeTs = listSvcType.find(x => x == CommonConstant.DigitalizationSvcTypeTrustingSocial);

      if (svcTypeTs != null) {
        this.IsUseTs = true;
      }
    }

    await this.http.post<ResSysConfigResultObj>(this.UrlConstantNew.GetSysConfigPncplResultByCode, { Code: CommonConstant.SvcTypeAsliRi }).toPromise().then(
      (response) => {
        if(response.ConfigValue == "1")
        {
          this.IsUseAsliRi = true;
        }
      });

    await this.http.post<ResSysConfigResultObj>(this.UrlConstantNew.GetSysConfigPncplResultByCode, { Code: CommonConstant.SvcTypeCbasSlik }).toPromise().then(
      (response) => {
        if(response.ConfigValue == "1") this.IsUseCbasSlik = true;
      }
    );
  }
}