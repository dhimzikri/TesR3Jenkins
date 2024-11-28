import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HolidayDObj } from 'app/shared/model/holiday-d-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { formatDate } from '@angular/common';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-holiday-detail-edit',
  templateUrl: './holiday-detail-edit.component.html'
})
export class HolidayDetailEditComponent implements OnInit {

  HolidaySchmDId: any;
  HolidaySchmHId: any;
  HolidayListForm = this.fb.group({
    IsPublicHoliday: [false, Validators.required],
    Date: ['', Validators.required],
    Descr: ['', Validators.required]
  })
  title: string;
  result: any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.HolidaySchmDId = queryParams["HolidaySchmDId"];
      this.HolidaySchmHId = queryParams["HolidaySchmHId"];
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewHolidayDetail.json";

    this.title = "Holiday Scheme-Edit";
    var HolidayObj = new HolidayDObj;
    HolidayObj.HolidaySchmDId = this.HolidaySchmDId;
    this.http.post(this.UrlConstantNew.GetHolidaySchmDById, {Id: this.HolidaySchmDId}).subscribe(
      (response) => {
        this.result = response;
        this.HolidayListForm.patchValue({
          IsPublicHoliday: this.result.IsPublicHoliday,
          Date: formatDate(this.result.HolidayDt, 'yyyy-MM-dd', 'en-US'),
          Descr: this.result.Descr
        })
      }
    );
  }

  SaveForm() {
    var HolidayObj = new HolidayDObj;
    HolidayObj.Descr = this.HolidayListForm.controls.Descr.value;
    HolidayObj.IsPublicHoliday = this.HolidayListForm.controls.IsPublicHoliday.value;
    HolidayObj.HolidayDt = this.HolidayListForm.controls.Date.value;
    HolidayObj.HolidaySchmHId = this.result.HolidaySchmHId;
    HolidayObj.HolidaySchmDId = this.result.HolidaySchmDId;
    HolidayObj.RowVersion = this.result.RowVersion;

    this.http.post(this.UrlConstantNew.EditHolidaySchmD, HolidayObj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_HOLIDAY_DETAIL],{ "HolidaySchmHId": this.HolidaySchmHId })
        this.toastr.successMessage(response['message']);
      });
  }

  BackNavigate() {
    AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_HOLIDAY_DETAIL],{ "HolidaySchmHId": this.HolidaySchmHId })
  }
}
