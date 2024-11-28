import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CustExpsrHObj } from 'app/shared/model/credit-review/cust-expsr-h-obj.model';
import { CustExpsrInfoObj } from 'app/shared/model/credit-review/cust-expsr-info-obj.model';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-self-custom-cust-exposure-view',
  templateUrl: './self-custom-cust-exposure-view.component.html'
})
export class SelfCustomCustExposureViewComponent implements OnInit {

  @Input() CustId: number = 0;

  pageName: string;
  readonly whiteIndicator: string = CommonConstant.WhiteIndicator;

  constructor(private http: HttpClient,
    private UrlConstantNew: UrlConstantNew,
    private adInsHelperService: AdInsHelperService) {
    this.pageName = "CustomerExposureView"
  }

  async ngOnInit() {
    await this.GetCustExpsrInfoByCustId();
  }

  CustExpsrHObj: CustExpsrHObj = new CustExpsrHObj();
  CustExpsrInfoObj: CustExpsrInfoObj = new CustExpsrInfoObj();
  async GetCustExpsrInfoByCustId() {
    await this.http.post<CustExpsrInfoObj>(this.UrlConstantNew.GetCustExpsrInfoByCustId, { Id: this.CustId }).toPromise().then(
      (response) => {
        this.CustExpsrInfoObj = response;
        this.CustExpsrHObj = response.CustExpsrHObj;
      }
    );
  }

  openCustView(custNo: string) {
    this.http.post(this.UrlConstantNew.GetCustByCustId, {Id : this.CustId}).subscribe(
      (response: CustObj) => {
        if (response.MrCustTypeCode == CommonConstant.CustTypePersonal)
        {
          this.adInsHelperService.OpenCustomerViewByCustIdForTemplate(this.CustId);
        }
        else
        {
          this.adInsHelperService.OpenCustomerCoyViewByCustId(this.CustId);
        }
      }
    );
  }

}
