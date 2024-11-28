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
  selector: 'app-province-add-edit',
  templateUrl: './province-add-edit.component.html',
  //providers: [NGXToastrService]
})
export class ProvinceAddEditComponent implements OnInit {

  pageType: string = "add";
  refProvDistrictId: any;
  refProvDistrictObj: RefProvDistrictObj;
  resultData: any;
  ProvinceForm = this.fb.group({
    ProvDistrictCode: ['', [Validators.required, Validators.maxLength(50)]],
    ProvDistrictName: ['', [Validators.required, Validators.maxLength(100)]],
    IsActive: [true]
  });

  readonly CancelLink: string = NavigationConstant.CS_REF_PROVINCE_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) { 
    

    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["param"] != null) {
        this.pageType = queryParams["param"];
      }
      if (queryParams["refProvDistrictId"] != null) {
        this.refProvDistrictId = queryParams["refProvDistrictId"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.ProvinceForm.controls["ProvDistrictCode"].disable();
      this.refProvDistrictObj = new RefProvDistrictObj();
      this.refProvDistrictObj.RefProvDistrictId = this.refProvDistrictId;
      this.http.post(this.UrlConstantNew.GetRefProvDistrictById, {Id : this.refProvDistrictId}).subscribe(
        response => {
          this.resultData = response;
          this.ProvinceForm.patchValue({
            ProvDistrictCode: this.resultData.ProvDistrictCode,
            ProvDistrictName: this.resultData.ProvDistrictName,
            IsActive: this.resultData.IsActive
          });

        }
      );
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.refProvDistrictObj = new RefProvDistrictObj();
      this.refProvDistrictObj.ProvDistrictCode = this.ProvinceForm.controls["ProvDistrictCode"].value
      this.refProvDistrictObj.ProvDistrictName = this.ProvinceForm.controls["ProvDistrictName"].value;
      this.refProvDistrictObj.IsActive = this.ProvinceForm.controls["IsActive"].value;
      this.refProvDistrictObj.Type = CommonConstant.RefProvDistrictTypePrv;
      this.http.post(this.UrlConstantNew.AddRefProvDistrict, this.refProvDistrictObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
            this.toastr.successMessage(response["Message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_REF_PROVINCE_PAGING],{});     
        }
      );
    } else {
      this.refProvDistrictObj = this.resultData;
      this.refProvDistrictObj.RefProvDistrictId = this.refProvDistrictId;
      this.refProvDistrictObj.ProvDistrictName = this.ProvinceForm.controls["ProvDistrictName"].value;
      this.refProvDistrictObj.IsActive = this.ProvinceForm.controls["IsActive"].value;
      this.http.post(this.UrlConstantNew.EditRefProvDistrict, this.refProvDistrictObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_REF_PROVINCE_PAGING],{});   
        }
      );
    }
  }
  
}
