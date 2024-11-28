import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { RefAppSrcObj } from 'app/shared/model/ref-app-src-obj.model';
import { formatDate } from '@angular/common';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-app-source-add-edit',
  templateUrl: './app-source-add-edit.component.html'
})
export class AppSourceAddEditComponent implements OnInit {

  mode: any;
  listAppSrcType: any;
  rasObj: RefAppSrcObj = new RefAppSrcObj();
  RefAppSrcId: number;
  resultData: any;

  AppSourceForm = this.fb.group({
    AppSrcCode: ['', [Validators.required, Validators.maxLength(50)]],
    AppSrcName: ['', [Validators.required, Validators.maxLength(100)]],
    MrAppSrcTypeCode: ['', [Validators.required, Validators.maxLength(50)]],
    Descr: ['', Validators.maxLength(50)],
    PeriodFrom:['',[Validators.required]],
    PeriodTo:['',[Validators.required]],
    MaxApvDt:['',[Validators.required]],
    IsActive:[true]
  });


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, 
    private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["mode"] != null) {
        this.mode = queryParams["mode"];
      }
      if (queryParams["RefAppSrcId"] != null) {
        this.RefAppSrcId = queryParams["RefAppSrcId"];
      }
    });
  }

  ngOnInit() {
    var refMasterCategoryObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeAppSrcType
    }
    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, refMasterCategoryObj).subscribe(
      (response) => {
        this.listAppSrcType = response[CommonConstant.ReturnObj];
        if (this.listAppSrcType.length > 0) {
          this.AppSourceForm.patchValue({
            MrAppSrcTypeCode: this.listAppSrcType[0].Key 
          });
        }
      }
    );

    if (this.mode == "Edit") {
      this.AppSourceForm.controls["AppSrcCode"].disable();
      this.rasObj = new RefAppSrcObj();
      this.rasObj.RefAppSrcId = this.RefAppSrcId;
      this.http.post(this.UrlConstantNew.GetRefAppSrcByRefAppSrcId, { Id: this.RefAppSrcId }).subscribe(
        response => {
          this.resultData = response;
          this.AppSourceForm.patchValue({
            AppSrcCode: this.resultData.AppSrcCode,
            AppSrcName: this.resultData.AppSrcName,
            MrAppSrcTypeCode: this.resultData.MrAppSrcTypeCode,
            Descr: this.resultData.Descr,
            PeriodFrom: formatDate(this.resultData.PeriodFrom, 'yyyy-MM-dd', 'en-US'),
            PeriodTo: formatDate(this.resultData.PeriodTo, 'yyyy-MM-dd', 'en-US'),
            MaxApvDt: formatDate(this.resultData.MaxApvDt, 'yyyy-MM-dd', 'en-US'),
            IsActive: this.resultData.IsActive
          });

        }
      );
    }
  }

  SaveForm() 
  {
    if (this.mode == "Add") {
      this.rasObj = new RefAppSrcObj();
      this.rasObj.AppSrcCode = this.AppSourceForm.controls["AppSrcCode"].value;
      this.rasObj.AppSrcName = this.AppSourceForm.controls["AppSrcName"].value;
      this.rasObj.MrAppSrcTypeCode = this.AppSourceForm.controls["MrAppSrcTypeCode"].value;
      this.rasObj.Descr = this.AppSourceForm.controls["Descr"].value;
      this.rasObj.PeriodFrom = this.AppSourceForm.controls["PeriodFrom"].value;
      this.rasObj.PeriodTo = this.AppSourceForm.controls["PeriodTo"].value;
      this.rasObj.MaxApvDt = this.AppSourceForm.controls["MaxApvDt"].value;
      this.rasObj.IsActive = this.AppSourceForm.controls["IsActive"].value;
      this.http.post(this.UrlConstantNew.AddRefAppSrc, this.rasObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          //this.router.navigate(["/CommonSetting/AppSource/Paging"], { queryParams: { "RefAppSrcId": this.rasObj.RefAppSrcId } });
          AdInsHelper.RedirectUrl(this.ngxRouter,["/CommonSetting/AppSource/Paging"],{ "RefAppSrcId": this.rasObj.RefAppSrcId});
        }
      );
    } else {
      this.rasObj = this.resultData;
      this.rasObj.AppSrcName = this.AppSourceForm.controls["AppSrcName"].value;
      this.rasObj.MrAppSrcTypeCode = this.AppSourceForm.controls["MrAppSrcTypeCode"].value;
      this.rasObj.Descr = this.AppSourceForm.controls["Descr"].value;
      this.rasObj.PeriodFrom = this.AppSourceForm.controls["PeriodFrom"].value;
      this.rasObj.PeriodTo = this.AppSourceForm.controls["PeriodTo"].value;
      this.rasObj.MaxApvDt = this.AppSourceForm.controls["MaxApvDt"].value;
      this.rasObj.IsActive = this.AppSourceForm.controls["IsActive"].value;
      this.http.post(this.UrlConstantNew.EditRefAppSrc, this.rasObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          //this.router.navigate(["/CommonSetting/AppSource/Paging"], { queryParams: { "RefAppSrcId": this.rasObj.RefAppSrcId } });
          AdInsHelper.RedirectUrl(this.ngxRouter,["/CommonSetting/AppSource/Paging"],{ "RefAppSrcId": this.rasObj.RefAppSrcId});
        }
      );
    }
  }

}
