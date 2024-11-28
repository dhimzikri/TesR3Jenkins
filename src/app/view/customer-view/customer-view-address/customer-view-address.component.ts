import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-view-address',
  templateUrl: './customer-view-address.component.html'
})
export class CustomerViewAddressComponent implements OnInit {
  CustId: number;

  ddlItem: any;
  arrCrit: any;
  inputObj: any;
  responseResultCustAddr: any;
  responseResultCustAddrHist: any;
  selectedOption: any;

  CustForm = this.fb.group({
    DdlAddress: ['']
  });
  CustType: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private ngxRouter: NgxRouterService,
    private fb: FormBuilder, 
    private UrlConstantNew: UrlConstantNew
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['CustId'] != null) {
        this.CustId = queryParams['CustId'];
      }
    });
    this.http.post(this.UrlConstantNew.GetListCustAddrByCustIdForCustomerPersonalView, { Id: this.CustId }).subscribe(
      response => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.responseResultCustAddr = response[CommonConstant.ReturnObj];
        }
      },
      error => {
        AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.ERROR], {});
      }
    );
    var custObj = new CustObj();
    custObj.CustId = this.CustId;
    this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: this.CustId }).subscribe(
      response => {
        this.CustType = response['MrCustTypeCode'];
        let refMasterObj: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
        refMasterObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustAddrType;
        refMasterObj.MappingCode = this.CustType;
        this.http.post(this.UrlConstantNew.GetListActiveRefMasterWithMappingCodeAll, refMasterObj).subscribe(
          response => {
            if (response[CommonConstant.ReturnObj].length > 0) {
              this.ddlItem = response[CommonConstant.ReturnObj];
              this.CustForm.patchValue({
                DdlAddress: this.ddlItem[0].Value
              });
            }
          }
        );
      });
    this.http.post(this.UrlConstantNew.GetListCustAddrHistByCustIdForCustomerPersonalView, { Id: this.CustId }).subscribe(
      response => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.responseResultCustAddrHist = response[CommonConstant.ReturnObj];
        }
      },
      error => {
        AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.ERROR], {});
      }
    );
  }
}