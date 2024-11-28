import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustAddrObj } from 'app/shared/model/cust-addr-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-custom-customer-company-address',
  templateUrl: './custom-customer-company-address.component.html'
})
export class CustomCustomerCompanyAddressComponent implements OnInit {

  @Output()
  next: EventEmitter<any> = new EventEmitter<any>();
  
  mode: string;
  AddrId: number;
  custAddrObj: CustAddrObj;
  IdCust: number = 0;
  CustNo: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, 
    private toastr: NGXToastrService,private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["IdCust"] != null) {
        this.IdCust = queryParams["IdCust"];
      }
    });
  }

  ngOnInit() {
    this.mode = "check";

    this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: this.IdCust }).subscribe(
      (response: CustObj) => {
        this.CustNo = response.CustNo;
      }
    );
  }
  terimaValue(ev: any) {
    this.mode = ev.mode;
    this.AddrId = ev.AddrId;
  }

  SaveAndSync()
  {
    this.http.post(this.UrlConstantNew.SendCustomerDataToRabbitMq, { CustNo: this.CustNo }, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        if (response["StatusCode"] == 200) {
          this.toastr.successMessage("Sync Customer Succses");
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.SELF_CUSTOM_CUST_PAGING], {});
        }
      }
    )
  }

  SaveAndContinue(ev: any)
  {
    const actions = [
      {
        'result': {
          'type': 'function',
          'target': 'self',
          'alias': '',
          'methodName': 'NextStep',
          'params': []
        },
        'conditions': []
      }
    ];

    this.next.emit({Actions: actions});
  }
  
}
