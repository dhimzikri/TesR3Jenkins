import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AssetSchemeHObj } from 'app/shared/model/asset-scheme-h-obj.model';
import { AssetTypeObj } from 'app/shared/model/asset-type-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-asset-scheme-add-edit-information',
  templateUrl: './asset-scheme-add-edit-information.component.html'
})
export class AssetSchemeAddEditInformationComponent implements OnInit {
  AssetSchemeInfoForm = this.fb.group({
    AssetSchmCode: ['', Validators.required],
    AssetSchmName: ['', Validators.required],
    AssetTypeId: [''],
    IsActive: ['']
  });
  pageType: string = "add";
  assetSchmHObj: AssetSchemeHObj = new AssetSchemeHObj();
  AssetSchmHId: number;
  resultData: AssetSchemeHObj = new AssetSchemeHObj();
  RowVersion: string;
  ItemAssetType: Array<AssetTypeObj> = new Array<AssetTypeObj>();
  AssetSchmCode: string;

  readonly CancelLink: string = NavigationConstant.ASSET_SCHM_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService,
    private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["param"] != null) {
        this.pageType = queryParams["param"];
      }
      if (queryParams["AssetSchmHId"] != null) {
        this.AssetSchmHId = queryParams["AssetSchmHId"];
      }
    });
  }

  ngOnInit() {
    var assetTypeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeAssetTypeId,
      RowVersion: ""
    }
    this.http.post(this.UrlConstantNew.GetListActiveAssetType, assetTypeObj).subscribe(
      (response) => {
        this.ItemAssetType = response[CommonConstant.ReturnObj];
        if (this.pageType == "add") {
          this.AssetSchemeInfoForm.patchValue({
            AssetTypeId: this.ItemAssetType[0].AssetTypeId,
            IsActive: true
          });
        this.checkIsAutoFormNoFromSetting('AS');
        }
      }
    );

    if (this.pageType == "edit") {
      this.assetSchmHObj = new AssetSchemeHObj();
      this.assetSchmHObj.AssetSchmHId = this.AssetSchmHId;
      this.AssetSchemeInfoForm.controls["AssetSchmCode"].disable();

      this.http.post(this.UrlConstantNew.GetAssetSchmHById, {Id: this.AssetSchmHId}).subscribe(
        (response: AssetSchemeHObj) => {
          this.resultData = response;
          this.RowVersion = this.resultData.RowVersion;
          this.AssetSchemeInfoForm.patchValue({
            AssetSchmCode: this.resultData.AssetSchmCode,
            AssetSchmName: this.resultData.AssetSchmName,
            AssetTypeId: this.resultData.AssetTypeId,
            IsActive: this.resultData.IsActive,
          });
          this.AssetSchmCode = this.resultData.AssetSchmCode;
        }
      );
    }
  }
  SaveForm() {
    this.assetSchmHObj = new AssetSchemeHObj();
    this.assetSchmHObj = this.AssetSchemeInfoForm.value;
    if (!this.assetSchmHObj.IsActive || this.assetSchmHObj.IsActive == "") {
      this.assetSchmHObj.IsActive = false;
    }
    else {
      this.assetSchmHObj.IsActive = true;
    }
    if (this.pageType == "add") {
      this.assetSchmHObj.RowVersion = "";
      this.http.post(this.UrlConstantNew.AddAssetSchmH, this.assetSchmHObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_SCHM_PAGING],{});
        }
      );
    }
    else {
      this.assetSchmHObj.AssetSchmHId = this.AssetSchmHId;
      this.assetSchmHObj.RowVersion = this.RowVersion;
      this.assetSchmHObj.AssetSchmCode = this.AssetSchmCode;
      this.http.post(this.UrlConstantNew.EditAssetSchmH, this.assetSchmHObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_SCHM_PAGING],{});
        }
      );
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
            this.AssetSchemeInfoForm.patchValue({
              AssetSchmCode: '-'
            });
          }
        }
      });
  }
  //check is automatic/not form no 4

}