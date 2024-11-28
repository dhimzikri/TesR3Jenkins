import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-survey-task',
  templateUrl: './survey-task.component.html'
})
export class SurveyTaskComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  srvyTaskId: number;

  constructor(private UrlConstantNew: UrlConstantNew,
    private adInsHelperService: AdInsHelperService) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyTask.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyTask.json";
    
  }

  getCallback(event){
    this.srvyTaskId = event['RowObj']['SrvyTaskId'];
    this.adInsHelperService.OpenSurveyTaskViewBySrvyTaskId(this.srvyTaskId);
  }
}
