import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { FormBuilder } from '@angular/forms';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { HolidayCopyObj } from 'app/shared/model/holiday-copy.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-holiday-detail',
  templateUrl: './holiday-detail.component.html'
})
export class HolidayDetailComponent implements OnInit {
  HolidaySchmHIdCopy: string;
  HolidaySchmHId: string;
  inputPagingObjHolidayScheme: InputLookupObj;
  inputPagingObjHolidayDetail: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  copyHoliday: any;
  title: string = "Copy Holiday Scheme";
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  HolidayManagementForm = this.fb.group({

  });

  readonly BackLink: string = NavigationConstant.CS_HOLIDAY;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.HolidaySchmHId = queryParams["HolidaySchmHId"];
    })
  }

  AddNavigate() {
    AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_HOLIDAY_DETAIL_ADD],{ "HolidaySchmHId": this.HolidaySchmHId })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewHolidayDetail.json";

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
    this.inputPagingObjHolidayDetail._url = "./assets/ucpaging/searchHolidayDetail.json";
    this.inputPagingObjHolidayDetail.pagingJson = "./assets/ucpaging/searchHolidayDetail.json";
    this.inputPagingObjHolidayDetail.deleteUrl = this.UrlConstantNew.DeleteHolidaySchmD;
    this.inputPagingObjHolidayDetail.addCritInput = new Array();

    var critInput = new CriteriaObj();
    critInput.propName = "HoliH.HOLIDAY_SCHM_H_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.HolidaySchmHId;
    this.inputPagingObjHolidayDetail.addCritInput.push(critInput);
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
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CS_HOLIDAY_DETAIL],{ HolidaySchmHId: this.HolidaySchmHId })
          this.toastr.successMessage(response['message']);
        },
        (error) => {
          this.toastr.warningMessage(error['message']);
        }
      );
    }
  }
}
