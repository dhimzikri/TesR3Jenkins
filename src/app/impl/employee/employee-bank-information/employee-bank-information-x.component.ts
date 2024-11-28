import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-employee-bank-information-x',
  templateUrl: './employee-bank-information-x.component.html'
})
export class EmployeeBankInformationXComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.EMP_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/impl/search/searchEmployeeBankX.json";
    this.inputPagingObj.pagingJson = "./assets/impl/search/searchEmployeeBankX.json";
  }

}
