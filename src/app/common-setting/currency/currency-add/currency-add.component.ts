import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrObj } from 'app/shared/model/curr-obj.model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-currency-add',
  templateUrl: './currency-add.component.html',
  //providers: [NGXToastrService]
})
export class CurrencyAddComponent implements OnInit {

  pageType: string = "add";
  refCurrId: number = 0;
  currObj: CurrObj;
  resultData: any;
  RefCurrForm = this.fb.group({
    CurrCode: ['', [Validators.required, Validators.maxLength(5)]],
    CurrName: ['', [Validators.required, Validators.maxLength(100)]],
    RegRptCode: ['', [Validators.required, Validators.maxLength(100)]],
    UCNumber: [''],
    UCNumber2: [''],
    IsActive: [true],
    RoundedAmt: ['', Validators.required]
  });

  UcNumber: any;
  UcNumber2: any;
  UcNumber3: any;
  isInvalid: boolean = false;

  readonly CancelLink: string = NavigationConstant.CS_CURRENCY_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService,
    private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["param"] != null) {
        this.pageType = queryParams["param"];
      }
      if (queryParams["RefCurrId"] != null) {
        this.refCurrId = queryParams["RefCurrId"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.RefCurrForm.controls["CurrCode"].disable();
      this.currObj = new CurrObj();
      this.currObj.RefCurrId = this.refCurrId;
      this.http.post(this.UrlConstantNew.GetRefCurrById, { Id: this.refCurrId }).subscribe(
        response => {
          this.resultData = response;
          this.RefCurrForm.patchValue({
            CurrCode: this.resultData.CurrCode,
            CurrName: this.resultData.CurrName,
            RegRptCode: this.resultData.RegRptCode,
            IsActive: this.resultData.IsActive,
            RoundedAmt: this.resultData.RoundedAmt
          });

        }
      );
    }

  }

  CommaFormatted(event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    if (this.UcNumber) {
      this.UcNumber = this.UcNumber.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  numberCheck(args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }

  SaveForm() {
    this.CheckRoundedAmt(this.RefCurrForm.controls["RoundedAmt"].value);

    if (this.isInvalid) return;

    if (this.pageType == "add") {
      this.currObj = new CurrObj();
      this.currObj.CurrCode = this.RefCurrForm.controls["CurrCode"].value
      this.currObj.CurrName = this.RefCurrForm.controls["CurrName"].value;
      this.currObj.RegRptCode = this.RefCurrForm.controls["RegRptCode"].value;
      this.currObj.IsActive = this.RefCurrForm.controls["IsActive"].value;
      this.currObj.RoundedAmt = this.RefCurrForm.controls["RoundedAmt"].value;
      this.http.post(this.UrlConstantNew.AddRefCurr, this.currObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CS_CURRENCY_PAGING], {});
        }
      );
    } else {
      this.currObj = this.resultData;
      this.currObj.RefCurrId = this.refCurrId;
      this.currObj.CurrName = this.RefCurrForm.controls["CurrName"].value;
      this.currObj.RegRptCode = this.RefCurrForm.controls["RegRptCode"].value;
      this.currObj.IsActive = this.RefCurrForm.controls["IsActive"].value;
      this.currObj.RoundedAmt = this.RefCurrForm.controls["RoundedAmt"].value;
      this.http.post(this.UrlConstantNew.EditRefCurr, this.currObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CS_CURRENCY_PAGING], {});
        }
      );
    }
  }

  CheckRoundedAmt(RoundedAmt: number) {
    if (RoundedAmt < 0 || RoundedAmt > 2) {
      this.toastr.warningMessage(ExceptionConstant.ROUNDED_AMT_INVALID);
      this.isInvalid = true
    }
  }
}
