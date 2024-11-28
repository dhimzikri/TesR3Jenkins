import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';

@Component({
  selector: 'app-survey-task-result-paging',
  templateUrl: './survey-task-result-paging.component.html'
})
export class SurveyTaskResultPagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  AppId: number;
  AppNo: number;

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj(this.UrlConstantNew);
    this.inputPagingObj.apiQryPaging = this.UrlConstantNew.GetPagingObjectBySQL;
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyTaskResult.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyTaskResult.json";
    
  }

}
