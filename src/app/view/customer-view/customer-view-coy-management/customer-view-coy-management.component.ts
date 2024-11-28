import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ShareholderListingObj } from 'app/shared/model/new-cust/shareholder/shareholder-listing-obj.model';
import { GenericListObj } from 'app/shared/model/generic/generic-list-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-view-coy-management',
  templateUrl: './customer-view-coy-management.component.html'
})

export class CustomerViewCoyManagementComponent implements OnInit {
  CustId: number;
  responseObj: Array<ShareholderListingObj> = new Array();

  readonly CustomerPersonal = CommonConstant.CustomerPersonal;
  readonly CustomerCompany = CommonConstant.CustomerCompany;
  readonly CustomerPublic = CommonConstant.CustomerPublic;
  
  readonly NegCustTypeBad = CommonConstant.NegCustTypeBad;
  readonly NegCustTypeWarning = CommonConstant.NegCustTypeWarning;
  readonly dictNegCustType: {[id: string]: string}={};
  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew,
    private adInsHelperService: AdInsHelperService) { 
  }

  ngOnInit() {
    this.dictNegCustType[this.NegCustTypeBad]="red";
    this.dictNegCustType[this.NegCustTypeWarning]="yellow";
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['CustId'] != null) {
        this.CustId = queryParams['CustId'];
      }
    });
    this.http.post(this.UrlConstantNew.GetListManagementShareholderForListPagingByCustId, {Id : this.CustId}).subscribe(
      (response: GenericListObj) => {
        this.responseObj = response.ReturnObject;
      },
      error => {
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ERROR],{});
      }
    );
  }

  openViewPersonal(custId: number){
    this.adInsHelperService.OpenCustomerViewByCustId(custId);
  }

  openViewCoy(custId: number){
    this.adInsHelperService.OpenCustomerCoyViewByCustId(custId);
  }
}