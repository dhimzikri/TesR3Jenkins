import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-self-custom-customer-view-coy-financial',
  templateUrl: './self-custom-customer-view-coy-financial.component.html'
})
export class SelfCustomCustomerViewCoyFinancialComponent implements OnInit {
  @Input() CustId: number;
  TitleSuffix:string = '';
  IsShowDetail:boolean = false;
  GetCBAForCustFinDataByCustIdUrl = this.UrlConstantNew.GetCBAForCustFinDataByCustId;
  ListCustCoyFinData: Array<object> = [];
  CustCoyFinData: object;
  responseCBAObj: any;
  responseCustAttr: any;
  IsAttrExist: boolean;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, 
    private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    var custAddrObj = { "CustId": this.CustId };
    this.http.post(this.GetCBAForCustFinDataByCustIdUrl, { Id: this.CustId }).subscribe(
      (response) => {
        this.responseCBAObj = response['ListCBAForCustFinData'];
      },
      (error) => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ERROR],{});
      }
    );
  }
}
