import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsService } from 'app/shared/services/adIns.service';
import { FormBuilder } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';


@Component({
  selector: 'app-customer-view-personal-address',
  templateUrl: './customer-view-personal-address.component.html'
})
export class CustomerViewPersonalAddressComponent implements OnInit {
  arrCrit: any;
  inputObj: any;
  CustId: number;
  responseResultCustAddr: any;
  responseResultCustAddrHist: any;
  ddlItem: any;
  selectedOption: any;

  CustForm = this.fb.group({
    DdlAddress: ['']
  });
  
  viewCustFinData: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private adInsService: AdInsService,
    private fb: FormBuilder, 
    private ngxRouter: NgxRouterService,
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
    this.viewCustFinData.viewInput =   "./assets/ucviewgeneric/viewCustFinData.json";
    this.http.post(this.UrlConstantNew.GetListCustAddrByCustIdForCustomerPersonalView, { Id: this.CustId }).subscribe(
      response => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.responseResultCustAddr = response[CommonConstant.ReturnObj];
        }
      },
      error => {
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ERROR],{});
      }
    );
    this.http.post(this.UrlConstantNew.GetListCustAddrHistByCustIdForCustomerPersonalView, { Id: this.CustId }).subscribe(
      response => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.responseResultCustAddrHist = response[CommonConstant.ReturnObj];
        }
      },
      error => {
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ERROR],{});
      }
    );

    let refMasterObj: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    refMasterObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeAddrType;
    this.http.post(this.UrlConstantNew.GetListActiveRefMaster, refMasterObj).subscribe(
      response => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.ddlItem = response[CommonConstant.ReturnObj];
          this.CustForm.patchValue({
            DdlAddress: this.ddlItem[0].Value
          });
        }
      }
    );
  }
}