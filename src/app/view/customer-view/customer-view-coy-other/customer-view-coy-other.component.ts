import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-view-coy-other',
  templateUrl: './customer-view-coy-other.component.html'
})
export class CustomerViewCoyOtherComponent implements OnInit {
  CustId: number;
  GetCustAttrContentForCustViewByCustIdUrl = this.UrlConstantNew.GetCustAttrContentForCustViewByCustId;
  responseCustAttr: Array<any> = new Array();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['CustId'] != null) {
        this.CustId = queryParams['CustId'];
      }
    });
    var custObj = { "CustId": this.CustId };
    this.http.post(this.GetCustAttrContentForCustViewByCustIdUrl, { Id : this.CustId }).subscribe(
      response => {
        this.responseCustAttr = response[CommonConstant.ReturnObj];
      },
      error => {
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ERROR],{});
      }
    );
  }
}
