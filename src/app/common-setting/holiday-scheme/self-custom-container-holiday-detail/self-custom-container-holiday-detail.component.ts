import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { HolidayCopyObj } from 'app/shared/model/holiday-copy.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';

@Component({
  selector: 'app-self-custom-container-holiday-detail',
  templateUrl: './self-custom-container-holiday-detail.component.html',
})
export class SelfCustomContainerHolidayDetailComponent implements OnInit {

  HolidaySchmHIdCopy: string;
  HolidaySchmHId: string;
  copyHoliday: any;
  inputPagingObjHolidayScheme: InputLookupObj;
  title = "Copy Holiday Scheme"

  HolidayManagementForm = this.fb.group({

  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.HolidaySchmHId = queryParams["HolidaySchmHId"];
    })
  }

  ngOnInit(): void {
    this.inputPagingObjHolidayScheme = new InputLookupObj(this.UrlConstantNew);
    var critInputNotIn = new CriteriaObj();
    critInputNotIn.propName = "HOLIDAY_SCHM_H_ID";
    critInputNotIn.restriction = AdInsConstant.RestrictionNeq;
    critInputNotIn.value = this.HolidaySchmHId;

    this.inputPagingObjHolidayScheme.addCritInput = new Array();
    this.inputPagingObjHolidayScheme.addCritInput.push(critInputNotIn);
    this.inputPagingObjHolidayScheme.urlJson = "./assets/lookup/lookupHolidayScheme.json";
    this.inputPagingObjHolidayScheme.pagingJson = "./assets/lookup/lookupHolidayScheme.json";
    this.inputPagingObjHolidayScheme.genericJson = "./assets/lookup/lookupHolidayScheme.json";
    this.inputPagingObjHolidayScheme.isRequired = false;
  }

  getHolidaySchmHId(ev) {
    this.HolidaySchmHIdCopy = ev.HolidaySchmHId;
  }

  Copy() {
    if (confirm(ExceptionConstant.COPY_REPLACE_CONFIRMATION + "holiday listings")) {
      this.copyHoliday = new HolidayCopyObj();
      this.copyHoliday.HolidaySchmHId = this.HolidaySchmHId;
      this.copyHoliday.HolidaySchmHIdCopy = this.HolidaySchmHIdCopy;

      this.http.post(this.UrlConstantNew.CopyHolidaySchmH, this.copyHoliday, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_SELF_CUSTOM_HOLIDAY_DETAIL],{ HolidaySchmHId: this.HolidaySchmHId })
        }
      );
    }
  }

}
