import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';

@Component({
  selector: 'app-funding-company-paging',
  templateUrl: './funding-company-paging.component.html',
})
export class FundingCompanyPagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  isReady: boolean;
  constructor(private router: Router,
    private UrlConstantNew: UrlConstantNew) { }

  ngOnInit(): void {
    this.setPagingFundingCoy();
  }

  getCallBack(ev){
    console.log(ev.RowObj.FundCoyCode);
  }

  setPagingFundingCoy(){
    this.inputPagingObj._url = "./assets/ucpaging/funding-company/searchFundingCompany.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/funding-company/searchFundingCompany.json";
    this.isReady = true;
  }

  
  onClickAdd(){
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.VENDOR_FUNDING_COY_ADD_EDIT]);
  }

}
