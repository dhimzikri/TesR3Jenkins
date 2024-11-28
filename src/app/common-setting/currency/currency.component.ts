import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';


@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
})
export class CurrencyComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.CS_CURRENCY_ADD;
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchCurrency.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCurrency.json";
  }
}
