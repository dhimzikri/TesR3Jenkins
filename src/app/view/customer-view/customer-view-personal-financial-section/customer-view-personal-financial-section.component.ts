import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { DatePipe } from '@angular/common';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-view-personal-financial-section',
  templateUrl: './customer-view-personal-financial-section.component.html'
})
export class CustomerViewPersonalFinancialSectionComponent implements OnInit {
  tempCustObj: any;
  CustId: number;

  TitleSuffix:string = '';
  IsShowDetail:boolean = false;
  currentCustFinDataIndex: number;
  ListCustPersonalFinData : Array<object> = [];

  responseCustAttr: any;
  IsAttrExist: boolean;
  custObj: CustObj = new CustObj();
  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["IdCust"] != null) {
        this.CustId = queryParams["IdCust"];
      }
      else if (queryParams["CustId"] != null) {
        this.CustId = queryParams["CustId"];
      }
    });
  }

  async ngOnInit() {
    this.custObj = new CustObj();
    this.custObj.CustId = this.CustId;
    await this.http.post(this.UrlConstantNew.GetListCustPersonalFinDataForCustViewByCustId, {custId : this.CustId }).toPromise().then(
      (response) => {
        console.log(response)
        this.ListCustPersonalFinData = response["ListCustPersonalFinDataForCustView"];
      }
    );

    await this.http.post(this.UrlConstantNew.GetCustFinDataAttrContentForCustViewByCustId, { Id : this.CustId }).toPromise().then(
      (response) => {
        this.responseCustAttr = response[CommonConstant.ReturnObj];
        console.log(this.responseCustAttr);
        if (this.responseCustAttr[0] != null){
          this.IsAttrExist = true;
        }
      },
      (error) => {
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ERROR],{});
      }
    );

    console.log(this.responseCustAttr)
  }

  showDetailCustFinData(index:number){
    let datePipe = new DatePipe("en-US");
    this.currentCustFinDataIndex = index;
    this.tempCustObj = this.ListCustPersonalFinData[this.currentCustFinDataIndex];
    this.TitleSuffix = 'Date as of '+datePipe.transform(this.tempCustObj['DateAsOf'], 'dd-MMM-yyyy')
    this.IsShowDetail = true;
  }
  
  hideDetail()
  {
    this.TitleSuffix = '';
    this.IsShowDetail = false;
    this.tempCustObj = null;
  }

}