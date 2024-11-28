import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ReqExchangeRateObj } from 'app/shared/model/request/exchange-rate/req-exchange-rate-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-exchange-rate-detail',
  templateUrl: './exchange-rate-detail.component.html'
})
export class ExchangeRateDetailComponent implements OnInit {
  
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  RefCurrId: number = 0;
  MaxBack: number = 0;
  SetDtReady: boolean = false;
  MaxBackDt: Date = new Date();
  BusinessDt: Date = new Date();
  reqExchangeRateObj: ReqExchangeRateObj = new ReqExchangeRateObj();
  

  ExchangeRateForm = this.fb.group({
    CurrDt: ['', [Validators.required]],
    ExchangeRateAmt: ['', [Validators.required, Validators.min(1)]]
  });

  readonly CancelLink: string = NavigationConstant.CS_EXCHANGE_RATE_PAGING;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["RefCurrId"] != null) {
        this.RefCurrId = queryParams["RefCurrId"];
      }
    });
  }

  async ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewRefCurrAdd.json";
    await this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, { Code: 'MAX_EXC_RATE_BACK_DT' }).toPromise().then(
      response => {
        this.MaxBack = parseInt(response['GsValue']);
      });
      this.BusinessDt = new Date(AdInsHelper.GetCookie(this.cookieService, CommonConstant.BUSINESS_DATE_RAW));
      this.setMaxDt();
    }

  setMaxDt(){
      this.MaxBackDt = new Date(this.BusinessDt);
      this.MaxBackDt.setDate(this.MaxBackDt.getDate() - this.MaxBack);
      this.ExchangeRateForm.controls.CurrDt.setValidators
      this.SetDtReady = true;
  }

  setDateWithoutTimezone(inputDate) {
    var date = new Date(inputDate);
    date.setHours(0, 0, 0, 0);
    var userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - userTimezoneOffset);
  }

  SaveForm() {
    let d1 = this.setDateWithoutTimezone(this.ExchangeRateForm.controls.CurrDt.value);
    var validateDt = this.setDateWithoutTimezone(this.BusinessDt);
        
    if(d1 > validateDt || d1 < this.MaxBackDt){
      this.toastr.warningMessage(ExceptionConstant.CURR_DT_VALIDATION);
      return;
    }

      this.reqExchangeRateObj.RefCurrId = this.RefCurrId;
      this.reqExchangeRateObj.CurrDt = this.ExchangeRateForm.controls["CurrDt"].value;
      this.reqExchangeRateObj.ExchangeRateAmt = this.ExchangeRateForm.controls["ExchangeRateAmt"].value;
      this.reqExchangeRateObj.ValueDt = this.ExchangeRateForm.controls["CurrDt"].value;
      this.reqExchangeRateObj.PostingDt = this.setDateWithoutTimezone(this.BusinessDt);
      this.http.post(this.UrlConstantNew.AddExchangeRate, this.reqExchangeRateObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_EXCHANGE_RATE_PAGING],{"RefCurrId":this.RefCurrId});
        }
      );
    }
}
