import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResViewPefindoAlertQuestObj } from 'app/shared/model/response/pefindo/res-view-pefindo-alert-quest-obj.model';

@Component({
  selector: 'app-pefindo-view-pefindo-alert-quest',
  templateUrl: './pefindo-view-pefindo-alert-quest.component.html'
})
export class PefindoViewPefindoAlertQuestComponent implements OnInit {
  TrxNo: string;
  ResViewPefindoAlertQuestObj: ResViewPefindoAlertQuestObj = new ResViewPefindoAlertQuestObj();

  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["TrxNo"] != null) {
        this.TrxNo = queryParams["TrxNo"];
      }
    });
  }

  ngOnInit() {
    let reqByTrxNo: GenericObj = new GenericObj();
    reqByTrxNo.TrxNo = this.TrxNo;
    this.http.post(this.UrlConstantNew.GetViewPefindoAlertQuest, reqByTrxNo).subscribe(
      (response: ResViewPefindoAlertQuestObj) => {
        this.ResViewPefindoAlertQuestObj = response;
      }
    )
  }

}
