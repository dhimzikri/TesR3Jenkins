import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-view-other-info',
  templateUrl: './customer-view-other-info.component.html',
  styleUrls: []
})
export class CustomerViewOtherInfoComponent implements OnInit {
  CustId: number;
  CustOtherInfoObj : any;
  CustAttrContentObj: any;
  IsReady: boolean = false;

  constructor(private http: HttpClient,
    private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['CustId'] != null) {
        this.CustId = queryParams['CustId'];
      }
    });
  }

  readonly AttrInputTypeDate: string = CommonConstant.AttrInputTypeDate;
  readonly AttrInputTypeNum: string = CommonConstant.AttrInputTypeNum;
  readonly AttrInputTypeNumPerc: string = CommonConstant.AttrInputTypeNumPerc;
  ngOnInit() {
    this.http.post(this.UrlConstantNew.GetCustOtherInfoByCustId, { Id : this.CustId }).subscribe(
      (response: any) => { 
        this.CustOtherInfoObj = response;

        this.http.post(this.UrlConstantNew.GetCustAttrContentForCustViewByCustId, { Id : this.CustId }).subscribe(
          (response: any) => {
            this.CustAttrContentObj = response[CommonConstant.ReturnObj];

            this.IsReady = true;
          }
        );
      }
    );
  }
}