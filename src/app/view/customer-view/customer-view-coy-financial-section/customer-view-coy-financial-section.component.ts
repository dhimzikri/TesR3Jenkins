import { NgxRouterService } from '@adins/fe-core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-customer-view-coy-financial-section',
  templateUrl: './customer-view-coy-financial-section.component.html'
})
export class CustomerViewCoyFinancialSectionComponent implements OnInit {
  CustId: number;
  TitleSuffix:string = '';
  IsShowDetail:boolean = false;
  CustCoyFinData: object;
  ListCustCoyFinData: Array<object> = [];
  currentCustFinDataIndex: number;


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) 
  {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['CustId'] != null) {
        this.CustId = queryParams['CustId'];
      }
    });
  }

  ngOnInit() {
    this.getListCustCoyFinData();
  }

  async getListCustCoyFinData()
  {
    this.ListCustCoyFinData = [];
    await this.http.post(this.UrlConstantNew.GetListCustCompanyFinDataByCustId,  {Id: this.CustId}).toPromise().then((response) => {
      console.log(response)
      this.ListCustCoyFinData = response['ListCustCompanyFinData'];
    });

  }

  showDetailCustFinData(index:number){
    let datePipe = new DatePipe("en-US");
    this.currentCustFinDataIndex = index;
    this.CustCoyFinData = this.ListCustCoyFinData[this.currentCustFinDataIndex];
    this.TitleSuffix = 'Date as of '+datePipe.transform(this.CustCoyFinData['DateAsOf'], 'dd-MMM-yyyy')
    this.IsShowDetail = true;
  }

  hideDetail()
  {
    this.TitleSuffix = '';
    this.IsShowDetail = false;
    this.CustCoyFinData = {};
  }

}
