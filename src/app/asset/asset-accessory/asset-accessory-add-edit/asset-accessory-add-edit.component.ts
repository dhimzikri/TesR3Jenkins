import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AssetAccessoryObj } from 'app/shared/model/asset-accesorry-obj.model';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-asset-accessory-add-edit',
  templateUrl: './asset-accessory-add-edit.component.html'
})
export class AssetAccessoryAddEditComponent implements OnInit {
  AssetAccessoryForm = this.fb.group({
    AssetAccessoryName: ['', [Validators.required, Validators.maxLength(100)]],
    AssetAccessoryCode: ['', [Validators.required, Validators.maxLength(50)]],
    IsActive: [true]
  });
  pageType: string = 'add';
  AssetTypeId: number;
  AssetAccessoryId: number;
  result: AssetAccessoryObj = new AssetAccessoryObj();
  acObj: AssetAccessoryObj = new AssetAccessoryObj();
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
      if (queryParams["AssetAccessoryId"] != null) {
        this.AssetAccessoryId = queryParams["AssetAccessoryId"];
      }
    });
  }
  ngOnInit() {
    
    this.http.post(this.UrlConstantNew.GetAssetTypeById, {Id: this.AssetTypeId }).subscribe(
      (response) => {
        this.assetTypeName = response['AssetTypeName'];
      }
    );
    if (this.pageType == "edit") {
      var acObj = new AssetAccessoryObj();
      acObj.AssetAccessoryId = this.AssetAccessoryId;
      acObj.AssetTypeId = this.AssetTypeId;
      this.AssetAccessoryForm.controls.AssetAccessoryCode.disable();
      let obj = {Id: this.AssetAccessoryId};

      this.http.post<AssetAccessoryObj>(this.UrlConstantNew.GetAssetAccessorybyAssetAccessoryId, obj).subscribe(
        (response) => {
          this.result = response;
          this.AssetAccessoryForm.patchValue({
            AssetAccessoryCode: this.result.AssetAccessoryCode,
            AssetAccessoryName: this.result.AssetAccessoryName,
            IsActive: this.result.IsActive
          })
        }
      );
    }else{
      this.checkIsAutoFormNoFromSetting('AA');
    }
  }
  SaveForm() {
    if (this.pageType == "add") {
      this.acObj = new AssetAccessoryObj();
      this.acObj.AssetAccessoryCode = this.AssetAccessoryForm.controls["AssetAccessoryCode"].value;
      this.acObj.AssetAccessoryName = this.AssetAccessoryForm.controls["AssetAccessoryName"].value;
      this.acObj.IsActive = this.AssetAccessoryForm.controls["IsActive"].value;
      this.acObj.AssetTypeId = this.AssetTypeId;
      this.http.post(this.UrlConstantNew.AddNewAssetAccesory, this.acObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_ACC_PAGING],{ "AssetTypeId": this.acObj.AssetTypeId });
        }
      );
    } else {
      this.acObj = this.result;
      this.acObj.AssetAccessoryCode = this.AssetAccessoryForm.controls["AssetAccessoryCode"].value;
      this.acObj.AssetAccessoryName = this.AssetAccessoryForm.controls["AssetAccessoryName"].value;
      this.acObj.IsActive = this.AssetAccessoryForm.controls["IsActive"].value;
      this.http.post(this.UrlConstantNew.EditAssetAccessory, this.acObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_ACC_PAGING],{ "AssetTypeId": this.acObj.AssetTypeId });
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
            //patch value form no
            this.AssetAccessoryForm.patchValue({
              AssetAccessoryCode: '-'
            });
          }
        }
      });
  }
  //check is automatic/not form no 4
}
