import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-office-bank-account-paging-x',
  templateUrl: './office-bank-account-paging-x.component.html'
})
export class OfficeBankAccountPagingXComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  isReady: boolean;

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/impl/ucpaging/common-setting/office-bank-account/search-office-bank-account-paging-x.json";
    this.inputPagingObj.pagingJson = "./assets/impl/ucpaging/common-setting/office-bank-account/search-office-bank-account-paging-x.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteOfficeBankAccX;

    this.isReady = true;
  }

  terimaCallBack(ev){

  }
}