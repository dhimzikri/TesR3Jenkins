import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe, Location } from '@angular/common';
import { NegativeCustObj } from 'app/shared/model/negative-cust-obj.model';
import { map, mergeMap } from 'rxjs/operators';
import { NegativeCustChangeTrxObj } from 'app/shared/model/negative-cust-change-trx-obj.model';
import { forkJoin } from 'rxjs';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-negative-customer-view',
  templateUrl: './negative-customer-view.component.html',
  styleUrls: []
})
export class NegativeCustomerViewComponent implements OnInit {
  negativeCustId: number = 0;
  response: any;
  responseTrx: any;
  expiredDt: string;
  birthDt: string;
  custType: string = 'P';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['negativeCustId'] != null) {
        this.negativeCustId = queryParams['negativeCustId'];
      }
    });
  }

  ngOnInit() {
    var datePipe = new DatePipe("en-US");
    var negativeCustObj = new NegativeCustObj();
    negativeCustObj.NegativeCustId = this.negativeCustId;

    this.http.post(this.UrlConstantNew.GetNegativeCustByNegativeCustId, {Id : this.negativeCustId}).pipe(
      map((response) => {
        return response;
      }),
      mergeMap((response: any) => {
        var negativeCustChangeTrxObj = new NegativeCustChangeTrxObj();
        negativeCustChangeTrxObj.NegativeCustId = response.NegativeCustId;
        const negativeCustChangeTrx = this.http.post(this.UrlConstantNew.GetListNegativeCustChangeTrxByNegativeCustId, {Id : response.NegativeCustId});
        var tempResponse = [response];
        return forkJoin([tempResponse, negativeCustChangeTrx]);
      }),
      mergeMap((response: any) => {        
        let requestIdType = this.http.post(this.UrlConstantNew.GetRefMasterByMasterCode, {Code : response[0].MrIdTypeCode });
        let requestNegativeCustType = this.http.post(this.UrlConstantNew.GetRefMasterByMasterCode, {Code : response[0].MrNegCustTypeCode});
        let requestNegativeSource = this.http.post(this.UrlConstantNew.GetRefMasterByMasterCode, {Code : response[0].MrNegCustSourceCode});

        var tempResponse = [response];

        return forkJoin([tempResponse, requestIdType, requestNegativeCustType, requestNegativeSource]);
      })
    ).subscribe(
      (response: any) => {
        this.response = response[0][0];
        this.expiredDt = datePipe.transform(this.response.IdExpiredDt, 'yyyy-MM-dd');
        this.birthDt = datePipe.transform(this.response.BirthDt, 'yyyy-MM-dd');
        this.responseTrx = response[0][1].ReturnObject;
        this.response.MrIdTypeCode = response[1].Descr;
        this.response.MrNegCustTypeCode = response[2].Descr;
        this.response.MrNegCustSourceCode = response[3].Descr;
        this.custType = this.response.MrCustTypeCode;
      }
    );
  }
}
