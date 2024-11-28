import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { InputGridObj } from 'app/shared/model/input-grid-obj.model';
import { CustPersonalFamilyObj, ResponseListCustPersonalFamilyObj } from 'app/shared/model/response/customer/view/response-list-cust-personal-family-obj.model';

@Component({
  selector: 'app-customer-view-personal-family',
  templateUrl: './customer-view-personal-family.component.html'
})
export class CustomerViewPersonalFamilyComponent implements OnInit {
  CustId: number;
  ListFamily: Array<CustPersonalFamilyObj> = new Array();
  InputGridFamilyObj: InputGridObj = new InputGridObj();

  constructor(private http: HttpClient, private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService){
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["CustId"] != null) {
        this.CustId = queryParams["CustId"];
      }
    });
  }

  ngOnInit() {
    this.InputGridFamilyObj.pagingJson = "./assets/ucgridview/Customer/View/gridCustPersonalFamilyView.json";
    this.http.post<ResponseListCustPersonalFamilyObj>(this.UrlConstantNew.GetMainCustAndListCustPersonalFamilyByCustId, { Id: this.CustId }).toPromise().then(
      (response) => {
        this.InputGridFamilyObj.resultData = {
          Data: ""
        }
        this.InputGridFamilyObj.resultData["Data"] = new Array();
        this.InputGridFamilyObj.resultData.Data = response.CustPersonalFamilyList;
        this.ListFamily = this.InputGridFamilyObj.resultData.Data;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

}
