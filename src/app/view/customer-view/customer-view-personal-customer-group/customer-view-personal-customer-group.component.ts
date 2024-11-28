import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-view-personal-customer-group',
  templateUrl: './customer-view-personal-customer-group.component.html'
})
export class CustomerViewPersonalCustomerGroupComponent implements OnInit {
  CustId: number;
  responseObj: any;

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
    this.http.post(this.UrlConstantNew.GetListCustGrpForCustViewByCustId, {Id : this.CustId}).subscribe(
      response => {
        this.responseObj = response[CommonConstant.ReturnObj];
      },
      error => {
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ERROR],{});
      }
    );
  }
}
