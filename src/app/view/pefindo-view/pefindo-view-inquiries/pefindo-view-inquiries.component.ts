import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResViewInquiriesObj } from 'app/shared/model/response/pefindo/res-view-inquiries-obj.model';

@Component({
  selector: 'app-pefindo-view-inquiries',
  templateUrl: './pefindo-view-inquiries.component.html'
})
export class PefindoViewInquiriesComponent implements OnInit {
  TrxNo: string;
  ResViewInquiriesObj: ResViewInquiriesObj = new ResViewInquiriesObj();

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
    this.http.post(this.UrlConstantNew.GetViewInquiries, reqByTrxNo).subscribe(
      (response: ResViewInquiriesObj) => {
        this.ResViewInquiriesObj = response;
      }
    )
  }

}
