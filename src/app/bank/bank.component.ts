import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html'
})
export class BankComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) {

  }

  readonly AddLink: string = NavigationConstant.CS_BANK_DETAIL;
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchBank.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteRefBank;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBank.json";
  }

}