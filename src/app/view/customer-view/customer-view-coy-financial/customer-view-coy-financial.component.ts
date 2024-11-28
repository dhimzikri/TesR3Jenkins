import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-view-coy-financial',
  templateUrl: './customer-view-coy-financial.component.html'
})
export class CustomerViewCoyFinancialComponent implements OnInit {
  CustId: number;
  TitleSuffix:string = '';
  IsShowDetail:boolean = false;
  GetCBAForCustFinDataByCustIdUrl = this.UrlConstantNew.GetCBAForCustFinDataByCustId;
  ListCustCoyFinData: Array<object> = [];
  CustCoyFinData: object;
  responseCBAObj: any;
  responseCustAttr: any;
  IsAttrExist: boolean;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['CustId'] != null) {
        this.CustId = queryParams['CustId'];
      }
    });
    var custAddrObj = { "CustId": this.CustId };
    this.http.post(this.GetCBAForCustFinDataByCustIdUrl, { Id: this.CustId }).subscribe(
      (response) => {
        this.responseCBAObj = response['ListCBAForCustFinData'];
      },
      (error) => {
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ERROR],{});
      }
    );

    this.http.post(this.UrlConstantNew.GetCustFinDataAttrContentForCustViewByCustId, { Id : this.CustId }).subscribe(
      (response) => {
        this.responseCustAttr = response[CommonConstant.ReturnObj];
        this.IsAttrExist = true;
      },
      (error) => {
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ERROR],{});
      }
    );
  }
}
