import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-ref-ins-claim-doc-paging',
  templateUrl: './ref-ins-claim-doc-paging.component.html'
})
export class RefInsClaimDocPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  
  readonly AddLink: string = NavigationConstant.BACK_TO_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchRefInsClaimDoc.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRefInsClaimDoc.json";
    
  }
}
