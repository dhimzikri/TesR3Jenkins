import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HolidayDObj } from 'app/shared/model/holiday-d-obj.model';
import { HolidayDByYearObj } from 'app/shared/model/holiday-d-by-year-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-holiday-detail-add',
  templateUrl: './holiday-detail-add.component.html'
})
export class HolidayDetailAddComponent implements OnInit {

  HolidaySchmHId: number = 0;
  title: string = "Holiday Detail";
  holidayDetailObj: HolidayDObj;
  holidayDetailByYearObj: HolidayDByYearObj;
  check: boolean = false;
  mode: any = "";
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  HolidayListForm = this.fb.group({
    IsPublicHoliday: [false, Validators.required],
    Date: [''],
    Descr: [''],
    Sunday: [false],
    Monday: [false],
    Tuesday: [false],
    Wednesday: [false],
    Thursday: [false],
    Friday: [false],
    Saturday: [false],
    UntilYear: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
  })

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, 
    private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {

    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.HolidaySchmHId = queryParams["HolidaySchmHId"];
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewHolidayDetail.json";
  }
  
  SaveForm() {
    if (this.HolidayListForm.controls.IsPublicHoliday.value) {
      this.holidayDetailObj = new HolidayDObj;
      this.holidayDetailObj.IsPublicHoliday = this.HolidayListForm.controls.IsPublicHoliday.value;
      this.holidayDetailObj.HolidaySchmHId = this.HolidaySchmHId;
      this.holidayDetailObj.RowVersion = "";
      this.holidayDetailObj.HolidayDt = this.HolidayListForm.controls.Date.value;
      this.holidayDetailObj.Descr = this.HolidayListForm.controls.Descr.value;

      this.http.post(this.UrlConstantNew.AddHolidaySchmD, this.holidayDetailObj, AdInsConstant.SpinnerOptions).subscribe((response) => {
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_HOLIDAY_DETAIL],{ "HolidaySchmHId": this.HolidaySchmHId });
        this.toastr.successMessage(response['message']);
      });
    }
    else {
      this.holidayDetailByYearObj = new HolidayDByYearObj;
      this.holidayDetailByYearObj.IsPublicHoliday = this.HolidayListForm.controls.IsPublicHoliday.value;
      this.holidayDetailByYearObj.HolidaySchmHId = this.HolidaySchmHId;
      this.holidayDetailByYearObj.RowVersion = "";
      this.holidayDetailByYearObj.UntilYear = this.HolidayListForm.controls.UntilYear.value;

      if (this.HolidayListForm.controls.Sunday.value) {
        this.holidayDetailByYearObj.DictOfDays.push("Sunday");
      }
      if (this.HolidayListForm.controls.Monday.value) {
        this.holidayDetailByYearObj.DictOfDays.push("Monday");
      }
      if (this.HolidayListForm.controls.Tuesday.value) {
        this.holidayDetailByYearObj.DictOfDays.push("Tuesday");
      }
      if (this.HolidayListForm.controls.Wednesday.value) {
        this.holidayDetailByYearObj.DictOfDays.push("Wednesday");
      }
      if (this.HolidayListForm.controls.Thursday.value) {
        this.holidayDetailByYearObj.DictOfDays.push("Thursday");
      }
      if (this.HolidayListForm.controls.Friday.value) {
        this.holidayDetailByYearObj.DictOfDays.push("Friday");
      }
      if (this.HolidayListForm.controls.Saturday.value) {
        this.holidayDetailByYearObj.DictOfDays.push("Saturday");
      }
      this.http.post(this.UrlConstantNew.AddHolidaySchmDUntilYear, this.holidayDetailByYearObj, AdInsConstant.SpinnerOptions).subscribe((response) => {
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_HOLIDAY_DETAIL],{ "HolidaySchmHId": this.HolidaySchmHId })
        this.toastr.successMessage(response['message']);
      });
    }
  }

  updateValueAndValidityForm() {
    this.HolidayListForm.controls.Date.updateValueAndValidity();
    this.HolidayListForm.controls.Descr.updateValueAndValidity();
    this.HolidayListForm.controls.UntilYear.updateValueAndValidity();
  }

  Checkbox() {
    if (!this.HolidayListForm.controls.IsPublicHoliday.value) {
      this.HolidayListForm.controls.UntilYear.clearValidators();
      this.HolidayListForm.controls.Date.setValidators(Validators.required);
      this.HolidayListForm.controls.Descr.setValidators(Validators.required);
      this.updateValueAndValidityForm();
      this.check = true;
    }
    else {
      this.HolidayListForm.controls.UntilYear.setValidators([Validators.required, Validators.pattern("^[0-9]+$")]);
      this.HolidayListForm.controls.Date.clearValidators();
      this.HolidayListForm.controls.Descr.clearValidators();
      this.updateValueAndValidityForm();
      this.check = false;
    }

  }
  BackNavigate() {
    AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_HOLIDAY_DETAIL],{ "HolidaySchmHId": this.HolidaySchmHId })
  }
}
