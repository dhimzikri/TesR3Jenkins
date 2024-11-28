import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CustObj } from 'app/shared/model/cust-obj.model';

@Component({
  selector: 'app-self-custom-customer-personal-address',
  templateUrl: './self-custom-customer-personal-address.component.html'
})
export class SelfCustomCustomerPersonalAddressComponent implements OnInit {

  @Output()
  next: EventEmitter<any> = new EventEmitter<any>();

  IdCust: number = 0;
  CustNo: string;

  mode: string;
  AddrId: number;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, 
    private toastr: NGXToastrService, private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
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

  terimaValue(ev) {
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
