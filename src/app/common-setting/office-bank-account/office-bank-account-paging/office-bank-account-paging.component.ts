import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-office-bank-account-paging',
  templateUrl: './office-bank-account-paging.component.html'
})
export class OfficeBankAccountPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  isReady: boolean;

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/common-setting/office-bank-account/search-office-bank-account-paging.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/common-setting/office-bank-account/search-office-bank-account-paging.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteOfficeBankAcc;

    this.isReady = true;
  }

  terimaCallBack(ev){

  }
}