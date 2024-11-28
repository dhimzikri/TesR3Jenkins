import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RefProvDistrictObj } from 'app/shared/model/ref-prov-district-obj.model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-district-add-edit',
  templateUrl: './district-add-edit.component.html',
  //providers: [NGXToastrService]
})
export class DistrictAddEditComponent implements OnInit {

  pageType: string = "add";
  refProvDistrictId: any;
  refProvDistrictObj: RefProvDistrictObj;
  resultData: any;
  parentId: any;
  DistrictForm = this.fb.group({
    ProvinceName: [{disabled: true, value: ''}],
    ProvDistrictCode: ['', [Validators.required, Validators.maxLength(50)]],
    ProvDistrictName: ['', [Validators.required, Validators.maxLength(100)]],
    DistrictRegRptCode: ['', Validators.maxLength(100)],
    PhnArea: ['', [Validators.maxLength(10)]],
    IsActive: [true]
  });

  readonly CancelLink: string = NavigationConstant.CS_DISTRICT_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, 
    private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) { 
    
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["param"] != null) {
        this.pageType = queryParams["param"];
      }
      if (queryParams["refProvDistrictId"] != null) {
        this.refProvDistrictId = queryParams["refProvDistrictId"];
      }
      if (queryParams["parentId"] != null) {
        this.parentId = queryParams["parentId"];
      }
    });
  }

  ngOnInit() {
    this.refProvDistrictObj = new RefProvDistrictObj();
    this.refProvDistrictObj.RefProvDistrictId = this.parentId;
    this.http.post(this.UrlConstantNew.GetRefProvDistrictById, {Id : this.parentId}).subscribe(
      response => {
        this.resultData = response;
        this.DistrictForm.patchValue({
          ProvinceName: this.resultData.ProvDistrictName
        });
      }
    );
    if (this.pageType == "edit") {
      this.DistrictForm.controls["ProvDistrictCode"].disable();
      this.refProvDistrictObj = new RefProvDistrictObj();
      this.refProvDistrictObj.RefProvDistrictId = this.refProvDistrictId;
      this.http.post(this.UrlConstantNew.GetRefProvDistrictById, {Id : this.refProvDistrictId}).subscribe(
        response => {
          this.resultData = response;
          this.DistrictForm.patchValue({
            ProvDistrictCode: this.resultData.ProvDistrictCode,
            ProvDistrictName: this.resultData.ProvDistrictName,
            DistrictRegRptCode: this.resultData.DistrictRegRptCode,
            IsActive: this.resultData.IsActive,
            PhnArea: this.resultData.PhnArea
          });
        }
      );
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.refProvDistrictObj = new RefProvDistrictObj();
      this.refProvDistrictObj.ProvDistrictCode = this.DistrictForm.controls["ProvDistrictCode"].value
      this.refProvDistrictObj.ProvDistrictName = this.DistrictForm.controls["ProvDistrictName"].value;
      this.refProvDistrictObj.DistrictRegRptCode = this.DistrictForm.controls["DistrictRegRptCode"].value;
      this.refProvDistrictObj.IsActive = this.DistrictForm.controls["IsActive"].value;
      this.refProvDistrictObj.PhnArea = this.DistrictForm.controls["PhnArea"].value;
      this.refProvDistrictObj.ParentId = this.parentId;
      this.refProvDistrictObj.Type = CommonConstant.RefProvDistrictTypeDis;
      this.http.post(this.UrlConstantNew.AddRefProvDistrict, this.refProvDistrictObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
            this.toastr.successMessage(response["Message"]);  
            AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_DISTRICT_PAGING],{"refProvDistrictId": this.parentId});     
        }
      );
    } else {
      this.refProvDistrictObj = this.resultData;
      this.refProvDistrictObj.RefProvDistrictId = this.refProvDistrictId;
      this.refProvDistrictObj.ProvDistrictName = this.DistrictForm.controls["ProvDistrictName"].value;
      this.refProvDistrictObj.DistrictRegRptCode = this.DistrictForm.controls["DistrictRegRptCode"].value;
      this.refProvDistrictObj.IsActive = this.DistrictForm.controls["IsActive"].value;
      this.refProvDistrictObj.PhnArea = this.DistrictForm.controls["PhnArea"].value;
      this.refProvDistrictObj.Type =  CommonConstant.RefProvDistrictTypeDis;
      this.http.post(this.UrlConstantNew.EditRefProvDistrict, this.refProvDistrictObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);  
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_DISTRICT_PAGING],{"refProvDistrictId": this.parentId});       
        }
      );
    }
  } 
}
