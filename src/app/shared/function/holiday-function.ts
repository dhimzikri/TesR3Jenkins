import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { HolidayDByYearObj } from "../model/holiday-d-by-year-obj.model";
import { AdInsHelper } from "../AdInsHelper";
import { AdInsConstant } from "../AdInstConstant";
import enviConfig from "assets/config/enviConfig.json";

export function addHolidaySchmDUntilYear(dicts: Record<string, any>, api: any, next: string, http: HttpClient, toastr: NGXToastrService, router: Router)
{
    let url = enviConfig.FoundationR3Url + api;

    let holidayDetailByYearObj = new HolidayDByYearObj();
    holidayDetailByYearObj.IsPublicHoliday = dicts.formRaw.IsPublicHoliday;
    holidayDetailByYearObj.HolidaySchmHId = dicts.HolidaySchmHId;
    holidayDetailByYearObj.RowVersion = "";
    holidayDetailByYearObj.UntilYear = dicts.formRaw.UntilYear;

    if (dicts.formRaw.Sunday) {
      holidayDetailByYearObj.DictOfDays.push("Sunday");
    }
    if (dicts.formRaw.Monday) {
      holidayDetailByYearObj.DictOfDays.push("Monday");
    }
    if (dicts.formRaw.Tuesday) {
      holidayDetailByYearObj.DictOfDays.push("Tuesday");
    }
    if (dicts.formRaw.Wednesday) {
      holidayDetailByYearObj.DictOfDays.push("Wednesday");
    }
    if (dicts.formRaw.Thursday) {
      holidayDetailByYearObj.DictOfDays.push("Thursday");
    }
    if (dicts.formRaw.Friday) {
      holidayDetailByYearObj.DictOfDays.push("Friday");
    }
    if (dicts.formRaw.Saturday) {
      holidayDetailByYearObj.DictOfDays.push("Saturday");
    }
    
    http.post(url, holidayDetailByYearObj, AdInsConstant.SpinnerOptions).subscribe((response) => {
      AdInsHelper.RedirectUrl(router,[next],{ "HolidaySchmHId": dicts.HolidaySchmHId })
      toastr.successMessage(response['message']);
    });
}