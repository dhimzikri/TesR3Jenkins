import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-view-personal-financial-data',
  templateUrl: './customer-view-personal-financial-data.component.html'
})
export class CustomerViewPersonalFinancialDataComponent implements OnInit {
  CustId: number;
  GetCBAForCustFinDataByCustIdUrl = this.UrlConstantNew.GetCBAForCustFinDataByCustId;
  responseCBAObj: any;
  allBankStmntList : any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['CustId'] != null) {
        this.CustId = queryParams['CustId'];
      }
    });
    
    await this.http.post(this.GetCBAForCustFinDataByCustIdUrl, { Id : this.CustId }).toPromise().then(
      response => {
        this.responseCBAObj = response['ListCBAForCustFinData'];
      },
      error => {
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ERROR],{});
      }
    );
  }
}
