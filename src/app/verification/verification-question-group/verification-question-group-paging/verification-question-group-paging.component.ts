import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-verification-question-group-paging',
  templateUrl: './verification-question-group-paging.component.html'
})
export class VerificationQuestionGroupPagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.VERIF_QA_GRP_ADD;
  constructor(private UrlConstantNew: UrlConstantNew) { }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/verification/searchVerificationQuestionGroupForPaging.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/verification/searchVerificationQuestionGroupForPaging.json";
  }
}
