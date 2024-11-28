import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResViewInvolvementsObj } from 'app/shared/model/response/pefindo/res-view-involvements-obj.model';

@Component({
  selector: 'app-pefindo-view-involvements',
  templateUrl: './pefindo-view-involvements.component.html'
})
export class PefindoViewInvolvementsComponent implements OnInit {
  TrxNo: string;
  ResViewInvolvementsObj: ResViewInvolvementsObj = new ResViewInvolvementsObj();

  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew, 
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
    this.http.post(this.UrlConstantNew.GetViewInvolvements, reqByTrxNo).subscribe(
      (response: ResViewInvolvementsObj) => {
        this.ResViewInvolvementsObj = response;
      }
    )
  }

}
