import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-view-customer-group',
  templateUrl: './customer-view-customer-group.component.html'
})
export class CustomerViewCustomerGroupComponent implements OnInit {
  CustId: number;
  responseObj: any;
  custViewUrl: string;
  responseMemberCustGrpObj: any;
  IsReady: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) { }

  ngOnInit() {
    this.custViewUrl = this.UrlConstantNew.env.FoundationR3Web + "/View/Customer/PersonalDetail?CustId=";
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['CustId'] != null) {
        this.CustId = queryParams['CustId'];
      }
    });
    
    let reqById: GenericObj = new GenericObj();
    reqById.Id = this.CustId;
    this.http.post(this.UrlConstantNew.GetListCustGrpForCustViewById, reqById).subscribe(
      response => {
        this.responseObj = response['ParentCustGrp'];
        this.responseMemberCustGrpObj = response['ChildCustGrp'];
        this.IsReady = true;
      }
    );
  }
}
