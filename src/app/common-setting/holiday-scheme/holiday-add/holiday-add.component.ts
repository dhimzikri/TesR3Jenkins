import { Component, OnInit } from '@angular/core';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HolidayObj } from 'app/shared/model/holiday-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
    selector: 'app-holiday-add',
    templateUrl: './holiday-add.component.html',
    //providers: [NGXToastrService]
})
export class HolidayAddComponent implements OnInit {


    HolidaySchemeHForm = this.fb.group({
        HolidaySchmCode: ['', Validators.required],
        HolidaySchmName: ['', Validators.required],
        IsActive: [true]
    })

    title: string = "Holiday Scheme-Add";
    HolidaySchmId: string;
    result: any;
    mode: string = "add";
    holidayObj: HolidayObj;
    holidaySchmHId: any;
    criteria: CriteriaObj[] = [];

    readonly CancelLink: string = NavigationConstant.CS_HOLIDAY;
    constructor(private toastr: NGXToastrService, private router: Router, private route: ActivatedRoute, 
        private http: HttpClient, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
        private ngxRouter: NgxRouterService) {
        this.route.queryParams.subscribe(params => {
            const queryParams = this.ngxRouter.getQueryParams(params);
            this.HolidaySchmId = queryParams["HolidaySchmHId"];
            this.mode = queryParams["mode"];
            if (this.mode == "edit") {
                var tempCrit = new CriteriaObj();
                tempCrit.restriction = "Eq";
                tempCrit.value = this.HolidaySchmId;
                this.criteria.push(tempCrit);
            }
        });
    }

    ngOnInit() {
        if (this.mode == "edit") {
            this.title = "Holiday Scheme-Edit";
            this.HolidaySchemeHForm.controls.HolidaySchmCode.disable();
            var holidayObj = new HolidayObj();
            holidayObj.HolidaySchmHId = this.HolidaySchmId;
            this.http.post(this.UrlConstantNew.GetHolidaySchmHById, {Id: this.HolidaySchmId}).subscribe(
                (response) => {
                    this.result = response;
                    this.HolidaySchemeHForm.patchValue({
                        HolidaySchmCode: this.result.HolidaySchmCode,
                        HolidaySchmName: this.result.HolidaySchmName,
                        IsActive: this.result.IsActive
                    })
                }
            );
        }
    }

    SaveForm() {
        if (this.mode == "edit") {
            this.holidayObj = new HolidayObj();
            this.holidayObj = this.HolidaySchemeHForm.value;
            this.holidayObj.HolidaySchmHId = this.HolidaySchmId;
            this.holidayObj.HolidaySchmCode = this.result.HolidaySchmCode;
            this.holidayObj.RowVersion = this.result.RowVersion;
            this.http.post(this.UrlConstantNew.EditHolidaySchmH, this.holidayObj, AdInsConstant.SpinnerOptions).subscribe(
                (response) => {
                    AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_HOLIDAY],{})
                    this.toastr.successMessage(response['message']);
                });
        }
        else {
            this.holidayObj = new HolidayObj();
            this.holidayObj = this.HolidaySchemeHForm.value;
            this.holidayObj.HolidaySchmHId = "0";
            this.holidayObj.RowVersion = "";

            this.http.post(this.UrlConstantNew.AddHolidaySchmH, this.holidayObj, AdInsConstant.SpinnerOptions).subscribe((response) => {
                AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_HOLIDAY],{})
                this.toastr.successMessage(response['message']);
            });
        }
    }
}
