import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AssetCategoryObj } from 'app/shared/model/asset-category-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-asset-category-add-edit',
  templateUrl: './asset-category-add-edit.component.html'
})
export class AssetCategoryAddEditComponent implements OnInit {
  AssetCategoryForm = this.fb.group({
    AssetCategoryName: ['', [Validators.required, Validators.maxLength(100)]],
    AssetCategoryCode: ['', [Validators.required, Validators.maxLength(50)]],
    IsActive: [true]
  });
  pageType: string = 'add';
  AssetTypeId: number;
  AssetCategoryId: number;
  result: AssetCategoryObj;
  acObj: AssetCategoryObj;
  assetTypeName: string;

  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["AssetTypeId"] != null) {
        this.AssetTypeId = queryParams["AssetTypeId"];
      }
      if (queryParams["mode"] != null) {
        this.pageType = queryParams["mode"];
      }
      if (queryParams["AssetCategoryId"] != null) {
        this.AssetCategoryId = queryParams["AssetCategoryId"];
      }
    });
  }

  ngOnInit() {
    this.http.post(this.UrlConstantNew.GetAssetTypeById, {Id: this.AssetTypeId }).subscribe(
      (response) => {
        this.assetTypeName = response['AssetTypeName'];
      });
    if (this.pageType == "edit") {
      var acObj = new AssetCategoryObj();
      this.AssetCategoryForm.controls.AssetCategoryCode.disable();
      acObj.AssetTypeId = this.AssetTypeId;
      acObj.AssetCategoryId = this.AssetCategoryId;
      let Obj = {Id: this.AssetCategoryId};
      this.http.post(this.UrlConstantNew.GetAssetCategorybyAssetCategoryId, Obj).subscribe(
        (response: AssetCategoryObj) => {
          this.result = response;
          this.AssetCategoryForm.patchValue({
            AssetCategoryCode: this.result.AssetCategoryCode,
            AssetCategoryName: this.result.AssetCategoryName,
            IsActive: this.result.IsActive
          })
        });
    }else{
      this.checkIsAutoFormNoFromSetting('AC');
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.acObj = new AssetCategoryObj();
      this.acObj.AssetCategoryCode = this.AssetCategoryForm.controls["AssetCategoryCode"].value;
      this.acObj.AssetCategoryName = this.AssetCategoryForm.controls["AssetCategoryName"].value;
      this.acObj.IsActive = this.AssetCategoryForm.controls["IsActive"].value;
      this.acObj.AssetTypeId = this.AssetTypeId;
      this.http.post(this.UrlConstantNew.AddNewAssetCategory, this.acObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_CATEGORY_PAGING],{ "AssetTypeId": this.acObj.AssetTypeId });
        });
    } else {
      this.acObj = this.result;
      this.acObj.AssetCategoryCode = this.AssetCategoryForm.controls["AssetCategoryCode"].value;
      this.acObj.AssetCategoryName = this.AssetCategoryForm.controls["AssetCategoryName"].value;
      this.acObj.IsActive = this.AssetCategoryForm.controls["IsActive"].value;

      this.http.post(this.UrlConstantNew.EditAssetCategory, this.acObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_CATEGORY_PAGING],{ "AssetTypeId": this.acObj.AssetTypeId });
        });
    }
  }

    //check is automatic/not form no 4
    isAuto: boolean = false;
    checkIsAutoFormNoFromSetting(msAutoGenCode: any) {
      var generalSettingObj = {
        rowVersion: "",
      code: "MASTER_AUTO_GNRT_CODE"
      }
      var result: any;
      this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, generalSettingObj).subscribe(
        (response) => {
          result = response;

          if (result.GsValue != undefined && result.GsValue != "") {
            if (result.GsValue.split(';').find(x => x == msAutoGenCode)) {
              this.isAuto = true;
              //patch value form no
              this.AssetCategoryForm.patchValue({
                AssetCategoryCode: '-'
              });
            }
          }
        });
    }
    //check is automatic/not form no 4
}
