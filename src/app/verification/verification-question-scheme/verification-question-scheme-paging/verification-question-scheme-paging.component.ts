import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-verification-question-scheme-paging',
  templateUrl: './verification-question-scheme-paging.component.html'
})
export class VerificationQuestionSchemePagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.VERIF_QA_SCHM_ADD;

  constructor(private UrlConstantNew: UrlConstantNew) {}

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/verification/searchVerificationQuestionScheme.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/verification/searchVerificationQuestionScheme.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteVerfSchemeHById;
  }
}
