import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ViewPefindoScoreObj } from 'app/shared/model/pefindo/view-pefindo-score-obj.model';

@Component({
  selector: 'app-self-custom-view-pefindo-score',
  templateUrl: './self-custom-view-pefindo-score.component.html'
})
export class SelfCustomViewPefindoScoreComponent implements OnInit {

  TrxNo: string;
  PefindoScoreInfo: ViewPefindoScoreObj = new ViewPefindoScoreObj();
  PefindoScoreHist: Array<ViewPefindoScoreObj> = new Array<ViewPefindoScoreObj>();
  IsReady: boolean = false;
  
  constructor(private http: HttpClient, private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
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
    this.http.post(this.UrlConstantNew.GetViewPefindoScore, reqByTrxNo).subscribe(
      (response) => {
        console.log(response[CommonConstant.ReturnObj]);
        if(response[CommonConstant.ReturnObj] != null) {
          this.PefindoScoreHist = response[CommonConstant.ReturnObj];
          this.PefindoScoreInfo = this.PefindoScoreHist.pop();
        }
        this.IsReady = true;
      }
    )
  }

}
