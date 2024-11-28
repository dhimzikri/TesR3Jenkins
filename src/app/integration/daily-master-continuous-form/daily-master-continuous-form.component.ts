import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { RequestDateObj } from 'app/shared/model/integration/request-date-obj.model';

@Component({
  selector: 'app-daily-master-continuous-form',
  templateUrl: './daily-master-continuous-form.component.html',
})
export class DailyMasterContinuousFormComponent implements OnInit {

  Type: string = "";
  TypeSingle = CommonConstant.DailyMasterTypeSingle;
  TypeRange = CommonConstant.DailyMasterTypeRange;

  DateForm = this.fb.group({
    RequestDt: [null],
    StartDt: [null],
    EndDt: [null]
  });

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private http: HttpClient, private toastr: NGXToastrService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.Type = queryParams["Type"];
      if (this.Type == this.TypeSingle) {
        this.DateForm.get("RequestDt").setValidators(Validators.required);
        this.DateForm.get("RequestDt").updateValueAndValidity();
      } else if (this.Type == this.TypeRange) {
        this.DateForm.get("StartDt").setValidators(Validators.required);
        this.DateForm.get("StartDt").updateValueAndValidity();
        this.DateForm.get("EndDt").setValidators(Validators.required);
        this.DateForm.get("EndDt").updateValueAndValidity();
      }
    });
  }

  ngOnInit() {
  }

  ReqForm() {
    var reqDt: RequestDateObj = this.DateForm.getRawValue();

    this.http.post(this.UrlConstantNew.SendMasterDailyToRabbitMq, reqDt, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
      this.toastr.successMessage(response['message']);
    });
  }
}
