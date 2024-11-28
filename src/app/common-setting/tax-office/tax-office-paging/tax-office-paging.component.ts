import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-tax-office-paging',
  templateUrl: './tax-office-paging.component.html'
})
export class TaxOfficePagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  readonly AddLink: string = NavigationConstant.CS_REF_TAX_OFFICE_DETAIL;

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/search/searchTaxOffice.json";
    this.inputPagingObj.pagingJson = "./assets/search/searchTaxOffice.json";
  }

}
