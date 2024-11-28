import { NgxRouterService } from '@adins/fe-core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';

@Component({
  selector: 'app-survey-task-view',
  templateUrl: './survey-task-view.component.html',
  styleUrls: ['./survey-task-view.component.scss']
})
export class SurveyTaskViewComponent implements OnInit {
  SrvyTaskId: string;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  
  constructor(private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["SrvyTaskId"] != null) {
        this.SrvyTaskId = queryParams["SrvyTaskId"];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewSurveyTask.json";
  }

}
