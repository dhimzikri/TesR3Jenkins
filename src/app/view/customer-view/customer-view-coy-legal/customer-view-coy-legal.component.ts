import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsService } from 'app/shared/services/adIns.service';
import { FormBuilder } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-view-coy-legal',
  templateUrl: './customer-view-coy-legal.component.html'
})

export class CustomerViewCoyLegalComponent implements OnInit {
  arrCrit: any;
  ddlItem: any;
  inputObj: any;
  responseResultLegal: any;
  responseResultCustAddr: any;
  responseResultCustAddrHist: any;

  CustId: number;
  GetCustCompanyLegalDocForCustViewByCustIdUrl: string;

  CustForm = this.fb.group({
    DdlAddress: ['']
  });


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private adInsService: AdInsService,
    private fb: FormBuilder, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.GetCustCompanyLegalDocForCustViewByCustIdUrl = this.UrlConstantNew.GetCustCompanyLegalDocForCustViewByCustId
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['CustId'] != null) {
        this.CustId = queryParams['CustId'];
      }
    });
    var custObj = { "CustId": this.CustId };
    this.http.post(this.GetCustCompanyLegalDocForCustViewByCustIdUrl, {Id : this.CustId }).subscribe(
      response => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.responseResultLegal = response[CommonConstant.ReturnObj];
        }
      },
      error => {
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ERROR],{});
      }
    );
  }
}