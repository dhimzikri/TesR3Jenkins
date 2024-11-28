import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { ResGetPefindoMultiObj } from 'app/shared/model/digitalization/res-get-pefindo-multi-obj.model';
import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ThirdPartyRsltHObj } from 'app/shared/model/third-party-rslt/third-party-rslt-h-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-pefindo-view',
  templateUrl: './pefindo-view.component.html',
  styleUrls: ['./pefindo-view.component.css']
})
export class PefindoViewComponent implements OnInit {
  CustNo: string;
  TrxNo: string;
  Param: string;
  IsLos: boolean;
  CustObj: CustObj = new CustObj();
  MrCustTypeCode: string;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["CustNo"] != null) {
        this.CustNo = queryParams["CustNo"];
      }

      if (queryParams["TrxNo"] != null) {
        this.TrxNo = queryParams["TrxNo"];
      }

      if (queryParams["GroupTrxNo"] != null) {
        this.GroupTrxNo = queryParams["GroupTrxNo"];
      }

      if (queryParams["MrCustTypeCode"] != null) {
        this.MrCustTypeCode = queryParams["MrCustTypeCode"];
      }

      if (queryParams["IsLos"] != null) {
        this.IsLos = JSON.parse(queryParams["IsLos"]);
      }
    });
  }

  async ngOnInit() {
    await this.getGenSet();

    if(this.CustNo != null){
      let reqByCustNo: GenericObj = new GenericObj();
      reqByCustNo.CustNo = this.CustNo;
      await this.http.post(this.UrlConstantNew.GetCustByCustNo, reqByCustNo).toPromise().then(
        (response: CustObj) => {
          this.CustObj = response;
          this.Param = response.ThirdPartyTrxNo;
          if (this.pefindoMultiResMax > 0) this.GroupTrxNo = response.ThirdPartyGroupTrxNo;
          this.MrCustTypeCode = this.CustObj.MrCustTypeCode;
        })
    }
    else
    {
      this.Param = this.TrxNo;
    }

    if (this.GroupTrxNo != undefined)
    {
      await this.getPefindoMulti();
      this.Param = this.ListPefindoMulti[0].TrxNo;
      this.MrCustTypeCode = this.ListPefindoMulti[0].CustType;
      this.ListActive[0] = true;
      this.isReady = true;
    }
    await this.checkTrxSrcStat();
    if (this.IsTrxStatRequest) return;

    this.redirectTab(0);
  }

  async redirectTab(ev) {
    let url: string = "";
    if (ev == 0) { // Subject Info Personal / Company
      url = NavigationConstant.PEFINDO_SUBJECT_INFO_PERSONAL;
      if (this.MrCustTypeCode == CommonConstant.CustTypeCompany) {
        url = NavigationConstant.PEFINDO_SUBJECT_INFO_COMPANY
      }
    }
    else if (ev == 1) { // MO Summary
      url = NavigationConstant.PEFINDO_MO_SUMMARY;
    }
    else if (ev == 2) { // PEFINDO Score
      url = NavigationConstant.PEFINDO_PEFINDO_SCORE;
    }
    else if (ev == 3) { // Contracts
      url = NavigationConstant.PEFINDO_CONTRACTS;
    }
    /*
    else if (ev == 4) { // PEFINDO Alert Quest
      url = NavigationConstant.PEFINDO_PEFINDO_ALERT_QUEST;
    }
    else if (ev == 5) { // Securities
      url = NavigationConstant.PEFINDO_SECURITIES;
    }
    else if (ev == 6) { // Other Liabilities
      url = NavigationConstant.PEFINDO_OTHER_LIABILITIES;
    }
    else if (ev == 7) { // Involvements
      url = NavigationConstant.PEFINDO_INVOLVEMENTS;
    }
    else if (ev == 8) { // Relations
      url = NavigationConstant.PEFINDO_RELATIONS;
    }
    else if (ev == 9) { // Inquiries
      url = NavigationConstant.PEFINDO_INQUIRIES;
    }
    else if (ev == 10) { // Disputes
      url = NavigationConstant.PEFINDO_DISPUTES;
    }
    else if (ev == 11) { // Financial Statements
      url = NavigationConstant.PEFINDO_FINANCIAL_STATEMENTS;
    }
    */
    else if (ev == 4) { // Inquiries
      url = NavigationConstant.PEFINDO_INQUIRIES;
    }
    else if (ev == 5 && this.MrCustTypeCode == CommonConstant.CustTypeCompany) { // Financial Statements
      url = NavigationConstant.PEFINDO_FINANCIAL_STATEMENTS;
    }
    else if (ev == 5 && this.MrCustTypeCode != CommonConstant.CustTypeCompany || ev == 6) { // Others
      url = NavigationConstant.PEFINDO_OTHERS;
    }
    AdInsHelper.RedirectUrlView(this.router, [url], { "TrxNo": this.Param, "MrCustTypeCode": this.MrCustTypeCode }, true);
  }

  GroupTrxNo: string;
  isReady: boolean = false;
  pefindoMultiResMax: number = 0;
  ListActive: Array<boolean> = new Array<boolean>();
  ListPefindoMulti: Array<ResGetPefindoMultiObj> = new Array<ResGetPefindoMultiObj>();
  async getGenSet()
  {
    await this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, { Code: CommonConstant.GsPefindoMultiResultMax }).toPromise().then(
      (result: GeneralSettingObj) => {
        this.pefindoMultiResMax = parseInt(result.GsValue);
      }
    );
  }

  async getPefindoMulti()
  {
    let reqByThirdPartyGroupTrxNo: GenericObj = new GenericObj();
    reqByThirdPartyGroupTrxNo.Code = this.GroupTrxNo;

    await this.http.post(this.UrlConstantNew.GetPefindoMultiResultByGroupTrxNo, reqByThirdPartyGroupTrxNo).toPromise().then(
    (response) => {
      var temp: Array<ResGetPefindoMultiObj> = new Array<ResGetPefindoMultiObj>();
      temp = response["ReturnObject"];

      for (let i = 0; i < this.pefindoMultiResMax; i ++)
      {
        if (i >= temp.length) break;

        this.ListPefindoMulti.push(temp[i]);
      }

      for (let i = 0; i < this.ListPefindoMulti.length; i++)
      {
        this.ListActive.push(false)
      }
    })
  }

  async ChangeTab(TrxNo: string, MrCustTypeCode: string)
  {
    this.isReady = false;
    this.Param = TrxNo;
    this.MrCustTypeCode = MrCustTypeCode;

    let numNext = this.ListPefindoMulti.findIndex(x => x.TrxNo == TrxNo);
    let numPrev = this.ListActive.indexOf(true);
    this.ListActive[numPrev] = false;
    this.ListActive[numNext] = true;

    await this.checkTrxSrcStat();
    if (this.IsTrxStatRequest) return;

    await this.redirectTab(0);

    setTimeout (() => {
      this.isReady = true
    }, 50);
  }

  IsTrxStatRequest : boolean = false;
  IsTrxStatInProgress : boolean = false;
  async checkTrxSrcStat()
  {
    this.isReady = false;
    await this.http.post(this.UrlConstantNew.GetPefindoTrxSrcData, {TrxNo: this.Param}).toPromise().then(
      (response: object) => {
        this.IsTrxStatRequest = (response && response['ReferenceNo'] && response['TrxStat'] && response['TrxStat'] == CommonConstant.PEFINDO_TRX_SRC_DATA_STAT_REQ)
        this.IsTrxStatInProgress = (response && response['ReferenceNo'] && response['TrxStat'] && response['TrxStat'] == CommonConstant.PEFINDO_TRX_SRC_DATA_STAT_INP)
        this.isReady = true;
      }
    )
    if(this.IsTrxStatRequest)setTimeout(() => {
      this.ChangeTab(this.Param, this.MrCustTypeCode)
    }, 10000);
  }

}
