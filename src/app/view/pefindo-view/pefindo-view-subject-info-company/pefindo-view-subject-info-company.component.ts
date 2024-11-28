import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResViewSubjectInfoCompanyObj } from 'app/shared/model/response/pefindo/res-view-subject-info-company-obj.model';
import { ResViewSubjectInfoHistoryObj } from 'app/shared/model/response/pefindo/res-view-subject-info-history-obj.model';

@Component({
  selector: 'app-pefindo-view-subject-info-company',
  templateUrl: './pefindo-view-subject-info-company.component.html'
})
export class PefindoViewSubjectInfoCompanyComponent implements OnInit {
  TrxNo: string;
  ResViewSubjectInfoCompanyObj: ResViewSubjectInfoCompanyObj = new ResViewSubjectInfoCompanyObj();
  ListRPefindoSubjInfoAddrHist: Array<ResViewSubjectInfoHistoryObj> = new Array<ResViewSubjectInfoHistoryObj>();
  ListRPefindoSubjInfoCntctHist: Array<ResViewSubjectInfoHistoryObj> = new Array<ResViewSubjectInfoHistoryObj>();
  ListRPefindoSubjInfoGnrlHist: Array<ResViewSubjectInfoHistoryObj> = new Array<ResViewSubjectInfoHistoryObj>();
  ListRPefindoSubjInfoIdntfctnHist: Array<ResViewSubjectInfoHistoryObj> = new Array<ResViewSubjectInfoHistoryObj>();

  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew, 
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["TrxNo"] != null) {
        this.TrxNo = queryParams["TrxNo"];
      }
    });
  }

  ngOnInit() {
    let reqByTrxNo: GenericObj = new GenericObj();
    reqByTrxNo.TrxNo = this.TrxNo;
    this.http.post(this.UrlConstantNew.GetViewSubjectInfoCompany, reqByTrxNo).subscribe(
      (response: ResViewSubjectInfoCompanyObj) => {
        this.ResViewSubjectInfoCompanyObj = response;
      }
    )

    this.http.post(this.UrlConstantNew.GetViewSubjectInfoAllHistory, reqByTrxNo).subscribe(
      (response) => {
        this.ListRPefindoSubjInfoAddrHist = response["ListRPefindoSubjInfoAddrHist"]? response["ListRPefindoSubjInfoAddrHist"] : new Array<ResViewSubjectInfoHistoryObj>();
        this.ListRPefindoSubjInfoCntctHist = response["ListRPefindoSubjInfoCntctHist"]? response["ListRPefindoSubjInfoCntctHist"] : new Array<ResViewSubjectInfoHistoryObj>();
        this.ListRPefindoSubjInfoGnrlHist = response["ListRPefindoSubjInfoGnrlHist"]? response["ListRPefindoSubjInfoGnrlHist"] : new Array<ResViewSubjectInfoHistoryObj>();
        this.ListRPefindoSubjInfoIdntfctnHist = response["ListRPefindoSubjInfoIdntfctnHist"]? response["ListRPefindoSubjInfoIdntfctnHist"] : new Array<ResViewSubjectInfoHistoryObj>();
      }
    )
  }

}
