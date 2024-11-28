import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-general-setting-add-edit',
  templateUrl: './general-setting-add-edit.component.html',
  //providers: [NGXToastrService]
})
export class GeneralSettingAddEditComponent implements OnInit {

  gsObj: GeneralSettingObj;
  type: string = 'add';
  generalSettingId: any;
  resultData: any;

  GeneralSettingForm = this.fb.group({
    GsCode: [{disabled: true, value: ''}],
    GsName: ['', [Validators.required, Validators.maxLength(100)]],
    GsValue: ['', [Validators.required, Validators.maxLength(3000)]],
    GsDescr: ['', Validators.maxLength(4000)]
    });

  readonly CancelLink: string = NavigationConstant.CS_GEN_SETTING;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private service: NGXToastrService,
    private fb: FormBuilder,
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['generalSettingId'] != null) {
        this.generalSettingId = queryParams['generalSettingId'];
      }
    });
  }


  ngOnInit() {
    this.gsObj = new GeneralSettingObj();
    this.gsObj.GeneralSettingId = this.generalSettingId
    this.http.post(this.UrlConstantNew.GetGeneralSettingById, {Id: this.generalSettingId}).subscribe(
      (response) => {
        this.resultData = response;
        this.GeneralSettingForm.patchValue({
          GsCode: this.resultData.GsCode,
          GsName: this.resultData.GsName,
          GsValue: this.resultData.GsValue,
          GsDescr: this.resultData.GsDescr
          }); 
        }
    ); 
  }

  SaveForm(): void {
    this.gsObj = this.resultData;
    this.gsObj.GeneralSettingId = this.generalSettingId;
    this.gsObj.GsName = this.GeneralSettingForm.controls["GsName"].value;
    this.gsObj.GsValue = this.GeneralSettingForm.controls["GsValue"].value;
    this.gsObj.GsDescr = this.GeneralSettingForm.controls["GsDescr"].value;
    this.http.post(this.UrlConstantNew.EditGeneralSetting, this.gsObj, AdInsConstant.SpinnerOptions).subscribe(
      response => {
        this.service.successMessage(response["Message"]);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_GEN_SETTING],{});
      }
    );
  }
}
