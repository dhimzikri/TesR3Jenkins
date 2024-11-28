import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-bank-charge-x',
  templateUrl: './bank-charge-paging-x.component.html'
})
export class BankChargePagingXComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) {

  }

  readonly AddLink: string = NavigationConstant.CS_BANK_CHARGE_DETAIL_X;
  ngOnInit() {
    this.inputPagingObj._url = "./assets/impl/ucpaging/searchBankChargeX.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteRefBank;
    this.inputPagingObj.pagingJson = "./assets/impl/ucpaging/searchBankChargeX.json";
  }

}