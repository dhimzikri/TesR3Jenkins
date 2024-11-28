import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-survey-order-view',
  templateUrl: './survey-order-view.component.html'
})
export class SurveyOrderViewComponent implements OnInit {
  SrvyOrderId: string;
  TaskList = new Array();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly ViewLink: string = NavigationConstant.VIEW_SRVY_TASK;
  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["SrvyOrderId"] != null) {
        this.SrvyOrderId = queryParams["SrvyOrderId"];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewSurveyOrder.json";

    this.http.post(this.UrlConstantNew.GetListSrvyTaskBySrvyOrderId, {Id : this.SrvyOrderId}).subscribe(
      response => {
        this.TaskList = response[CommonConstant.ReturnObj];
      }
    );

  }

}
