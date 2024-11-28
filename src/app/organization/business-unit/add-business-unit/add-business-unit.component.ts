import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessUnitObj } from 'app/shared/model/business-unit-obj.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
    selector: 'add-app-business-unit',
    templateUrl: './add-business-unit.component.html',
   // providers: [NGXToastrService] // add NgbPaginationConfig to the component providers
})

export class AddBusinessUnitComponent implements OnInit {
    bizUnitObj: BusinessUnitObj;
    RefBizUnitId: string;
    pageType: any;
    result: any;
    title: string;
    mode: string = "add";
    isActive: boolean = true;

    readonly CancelLink: string = NavigationConstant.ORG_BZ_UNIT;
    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, 
        private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
        this.route.queryParams.subscribe(params => {
            const queryParams = this.ngxRouter.getQueryParams(params);
            this.RefBizUnitId = queryParams["RefBizUnitId"];
            this.mode = queryParams["mode"];
        })
    }

    BizUnitForm = this.fb.group({
        BizUnitCode: ['', Validators.required],
        BizUnitName: ['', Validators.required],
        Descr: [''],
        IsActive: [true],
        RowVersion: ['']
    })

    ngOnInit() {
        this.title = "Business Unit Add";
        if (this.mode == "edit") {
            this.title = "Business Unit Edit";
            this.bizUnitObj = new BusinessUnitObj();
            this.bizUnitObj.RefBizUnitId = this.RefBizUnitId;
            this.BizUnitForm.controls.BizUnitCode.disable();
            this.http.post(this.UrlConstantNew.GetRefBizUnit, {Id : this.RefBizUnitId}).subscribe(
                (response) => {
                    this.result = response;
                    this.BizUnitForm.patchValue({
                        BizUnitCode: this.result.BizUnitCode,
                        BizUnitName: this.result.BizUnitName,
                        Descr: this.result.Descr,
                        IsActive: this.result.IsActive,
                        RowVersion: this.result.RowVersion,
                    });
                }
            );
        }
    }

    SaveForm() {
        this.bizUnitObj = new BusinessUnitObj();
        this.bizUnitObj = this.BizUnitForm.value;
        if (this.mode == "edit") {
            this.bizUnitObj.BizUnitCode = this.result.BizUnitCode;
            this.bizUnitObj.RefBizUnitId = this.RefBizUnitId;

            this.http.post(this.UrlConstantNew.EditRefBizUnit, this.bizUnitObj, AdInsConstant.SpinnerOptions).subscribe(
                (response) => {
                    this.toastr.successMessage(response["message"]);
                    AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ORG_BZ_UNIT],{});
                });
        }
        else {
            this.http.post(this.UrlConstantNew.AddRefBizUnit, this.bizUnitObj, AdInsConstant.SpinnerOptions).subscribe(
                (response) => {
                    this.toastr.successMessage(response["message"]);
                    AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ORG_BZ_UNIT],{});
                });
        }
    }
}
