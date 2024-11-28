import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';


@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html'
})
export class ReasonComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.CS_REASON_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchReason.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchReason.json";
  }
}
