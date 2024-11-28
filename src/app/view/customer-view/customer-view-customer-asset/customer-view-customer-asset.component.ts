import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';
@Component({
  selector: 'app-customer-view-customer-asset',
  templateUrl: './customer-view-customer-asset.component.html',
  styleUrls: ['./customer-view-customer-asset.component.css']
})
export class CustomerViewCustomerAssetComponent implements OnInit {

  CustId: number = 0;
  ListAsset: Array<any> = new Array<any>();

  constructor(private http: HttpClient, private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService){
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["CustId"] != null) {
        this.CustId = queryParams["CustId"];
      }
    });
  }

  async ngOnInit() {
    await this.http.post(this.UrlConstantNew.GetListCustAssetByCustId, { Id: this.CustId }).toPromise().then(
      (response) => {
        console.log(response)
        this.ListAsset = response["CustAssetList"];
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );

  }

}
