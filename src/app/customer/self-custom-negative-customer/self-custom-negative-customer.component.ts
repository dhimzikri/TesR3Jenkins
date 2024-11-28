import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-self-custom-negative-customer',
  templateUrl: './self-custom-negative-customer.component.html'
})
export class SelfCustomNegativeCustomerComponent implements OnInit {

  pageName: string

  constructor(
    private router: Router,
    private adinsHelperService: AdInsHelperService,
    private urlConstantNew: UrlConstantNew
    ){
    this.pageName = "NegativeCustomerPaging"
  }

  ngOnInit() {

  }

  handler = {
    callback: ($event) => this.callback($event)
  };

  callback(ev){

    let raw = ev.RowObj.negativeCustId;


    if(ev.Key == "view"){
      if(ev.RowObj.mrCustTypeCode == "Personal"){
        let url = NavigationConstant.VIEW_CUSTOM_CUST_NEG_PERSONAL + "?negativeCustId=" + raw;
        window.open(url,"_blank");

      }
      else{
        let url = NavigationConstant.VIEW_CUSTOM_CUST_NEG_COMPANY + "?negativeCustId=" + raw;
        window.open(url,"_blank");
      }

    }
  }
}
