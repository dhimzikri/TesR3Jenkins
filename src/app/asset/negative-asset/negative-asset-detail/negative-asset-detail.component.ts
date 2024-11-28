import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { map, mergeMap } from 'rxjs/operators';
import { AssetNegativeObj } from 'app/shared/model/asset-negative-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-negative-asset-detail',
  templateUrl: './negative-asset-detail.component.html'
})
export class NegativeAssetDetailComponent implements OnInit {
  pageType: string = "add";
  assetNegativeId: number;
  inputLookupObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  criteriaList: Array<CriteriaObj> = new Array<CriteriaObj>();
  criteriaObj: CriteriaObj;
  negativeAssetSourceList: Array<Object> = new Array<Object>();
  fullAssetName: string = "";
  serial1Disabled: boolean = false;
  serial2Disabled: boolean = false;
  serial3Disabled: boolean = false;
  serial4Disabled: boolean = false;
  serial5Disabled: boolean = false;
  serial1Mandatory: boolean = false;
  serial2Mandatory: boolean = false;
  serial3Mandatory: boolean = false;
  serial4Mandatory: boolean = false;
  serial5Mandatory: boolean = false;

  AssetNegativeForm = this.fb.group({
    AssetNegativeId: [0, [Validators.required]],
    AssetMasterId: ['', [Validators.required]],
    AssetTypeId: ['', [Validators.required]],
    SerialNo1: [''],
    SerialNo2: [''],
    SerialNo3: [''],
    SerialNo4: [''],
    SerialNo5: [''],
    MrNegAssetSourceCode: ['', [Validators.required]],
    Notes: ['', [Validators.required]],
    IsActive: [true],
    RowVersion: ['']
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['param'] != null) {
        this.pageType = queryParams['param'];
      }
      if (queryParams['assetNegativeId'] != null) {
        this.assetNegativeId = queryParams['assetNegativeId'];
      }
    });
  }

  ngOnInit() {
    this.inputLookupObj.urlJson = "./assets/uclookup/NegativeAsset/lookupAssetMaster_NegAst.json";
    this.inputLookupObj.pagingJson = "./assets/uclookup/NegativeAsset/lookupAssetMaster_NegAst.json";
    this.inputLookupObj.genericJson = "./assets/uclookup/NegativeAsset/lookupAssetMaster_NegAst.json";

    this.criteriaList = new Array();
    this.criteriaObj = new CriteriaObj();
    this.criteriaObj.restriction = AdInsConstant.RestrictionEq;
    this.criteriaObj.propName = 'A.IS_ACTIVE';
    this.criteriaObj.value = "1";
    this.criteriaList.push(this.criteriaObj);

    this.criteriaObj = new CriteriaObj();
    this.criteriaObj.restriction = AdInsConstant.RestrictionEq;
    this.criteriaObj.propName = 'A.IS_FINAL';
    this.criteriaObj.value = "1";
    this.criteriaList.push(this.criteriaObj);

    this.inputLookupObj.addCritInput = this.criteriaList;

    if (this.pageType == "edit") {
      var negativeAsset = new AssetNegativeObj();
      negativeAsset.AssetNegativeId = this.assetNegativeId;
      let refMasterObj: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
      refMasterObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeNegAssetSource;
      this.http.post(this.UrlConstantNew.GetListActiveRefMaster, refMasterObj).pipe(
        map((response) => {
          this.negativeAssetSourceList = [...response[CommonConstant.ReturnObj]];
          if (this.negativeAssetSourceList.length > 0) {
            this.AssetNegativeForm.patchValue({
              MrNegAssetSourceCode: this.negativeAssetSourceList[0]["Key"]
            });
          }
        }),
        mergeMap(() => {
          const assetNegativeData = this.http.post(this.UrlConstantNew.GetAssetNegativeByIdEditPage, {Id: this.assetNegativeId});
          return assetNegativeData;
        })
      ).subscribe(
        (response) => {
          this.AssetNegativeForm.patchValue({
            AssetNegativeId: response["AssetNegativeObj"]["AssetNegativeId"],
            AssetMasterId: response["AssetNegativeObj"]["AssetMasterId"],
            AssetTypeId: response["AssetMasterObj"]["AssetTypeId"],
            SerialNo1: response["AssetNegativeObj"]["SerialNo1"],
            SerialNo2: response["AssetNegativeObj"]["SerialNo2"],
            SerialNo3: response["AssetNegativeObj"]["SerialNo3"],
            SerialNo4: response["AssetNegativeObj"]["SerialNo4"],
            SerialNo5: response["AssetNegativeObj"]["SerialNo5"],
            MrNegAssetSourceCode: response["AssetNegativeObj"]["MrNegAssetSourceCode"].toUpperCase(),
            Notes: response["AssetNegativeObj"]["Notes"],
            IsActive: response["AssetNegativeObj"]["IsActive"],
            RowVersion: response["RowVersion"]
          });
          // this.inputLookupObj.nameSelect = response.AssetMasterObj.FullAssetName;
          this.fullAssetName = response["AssetMasterObj"]["FullAssetName"];

          if (response["AssetTypeObj"]["IsMndtrySerialNo1"] == "1") {
            this.AssetNegativeForm.controls['SerialNo1'].setValidators([Validators.required]);
            this.serial1Mandatory = true;
          }
          if (response["AssetTypeObj"]["IsMndtrySerialNo2"] == "1") {
            this.AssetNegativeForm.controls['SerialNo2'].setValidators([Validators.required]);
            this.serial2Mandatory = true;
          }
          if (response["AssetTypeObj"]["IsMndtrySerialNo3"] == "1") {
            this.AssetNegativeForm.controls['SerialNo3'].setValidators([Validators.required]);
            this.serial3Mandatory = true;
          }
          if (response["AssetTypeObj"]["IsMndtrySerialNo4"] == "1") {
            this.AssetNegativeForm.controls['SerialNo4'].setValidators([Validators.required]);
            this.serial4Mandatory = true;
          }
          if (response["AssetTypeObj"]["IsMndtrySerialNo5"] == "1") {
            this.AssetNegativeForm.controls['SerialNo5'].setValidators([Validators.required]);
            this.serial5Mandatory = true;
          }

          this.serial1Disabled = response["AssetTypeObj"]["SerialNo1Label"] == "" ? true : false;
          this.serial2Disabled = response["AssetTypeObj"]["SerialNo2Label"] == "" ? true : false;
          this.serial3Disabled = response["AssetTypeObj"]["SerialNo3Label"] == "" ? true : false;
          this.serial4Disabled = response["AssetTypeObj"]["SerialNo4Label"] == "" ? true : false;
          this.serial5Disabled = response["AssetTypeObj"]["SerialNo5Label"] == "" ? true : false;
        }
      );
    }
    else {
      let tempReq: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
      tempReq.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeNegAssetSource;
      this.http.post(this.UrlConstantNew.GetListActiveRefMaster, tempReq).subscribe(
        (response) => {
          this.negativeAssetSourceList = [...response[CommonConstant.ReturnObj]];
          if (this.negativeAssetSourceList.length > 0) {
            this.AssetNegativeForm.patchValue({
              MrNegAssetSourceCode: this.negativeAssetSourceList[0]["Key"]
            });
          }
        }
      );
    }
  }

  getLookupAssetMasterResponse(e) {
    this.serial2Mandatory = false;
    this.serial3Mandatory = false;
    this.serial4Mandatory = false;
    this.serial5Mandatory = false;
    this.http.post(this.UrlConstantNew.GetAssetTypeById, { Id: e.assetTypeId }).subscribe(
      (response) => {
        if (response["IsMndtrySerialNo1"] == "1") {
          this.AssetNegativeForm.controls['SerialNo1'].setValidators([Validators.required]);
          this.AssetNegativeForm.controls['SerialNo1'].updateValueAndValidity();
          this.serial1Mandatory = true;
        }
        else {
          this.AssetNegativeForm.controls['SerialNo1'].clearValidators();
          this.AssetNegativeForm.controls['SerialNo1'].updateValueAndValidity();
          this.serial1Mandatory = false;
        }

        if (response["IsMndtrySerialNo2"] == "1") {
          this.AssetNegativeForm.controls['SerialNo2'].setValidators([Validators.required]);
          this.AssetNegativeForm.controls['SerialNo2'].updateValueAndValidity();
          this.serial2Mandatory = true;
        }
        else {
          this.AssetNegativeForm.controls['SerialNo2'].clearValidators();
          this.AssetNegativeForm.controls['SerialNo2'].updateValueAndValidity();
          this.serial2Mandatory = false;
        }

        if (response["IsMndtrySerialNo3"] == "1") {
          this.AssetNegativeForm.controls['SerialNo3'].setValidators([Validators.required]);
          this.AssetNegativeForm.controls['SerialNo3'].updateValueAndValidity();
          this.serial3Mandatory = true;
        }
        else {
          this.AssetNegativeForm.controls['SerialNo3'].clearValidators();
          this.AssetNegativeForm.controls['SerialNo3'].updateValueAndValidity();
          this.serial3Mandatory = false;
        }

        if (response["IsMndtrySerialNo4"] == "1") {
          this.AssetNegativeForm.controls['SerialNo4'].setValidators([Validators.required]);
          this.AssetNegativeForm.controls['SerialNo4'].updateValueAndValidity();
          this.serial4Mandatory = true;
        }
        else {
          this.AssetNegativeForm.controls['SerialNo4'].clearValidators();
          this.AssetNegativeForm.controls['SerialNo4'].updateValueAndValidity();
          this.serial4Mandatory = false;
        }

        if (response["IsMndtrySerialNo5"] == "1") {
          this.AssetNegativeForm.controls['SerialNo5'].setValidators([Validators.required]);
          this.AssetNegativeForm.controls['SerialNo5'].updateValueAndValidity();
          this.serial5Mandatory = true;
        }
        else {
          this.AssetNegativeForm.controls['SerialNo5'].clearValidators();
          this.AssetNegativeForm.controls['SerialNo5'].updateValueAndValidity();
          this.serial5Mandatory = false;
        }

        this.serial1Disabled = response["SerialNo1Label"] == "" ? true : false;
        this.serial2Disabled = response["SerialNo2Label"] == "" ? true : false;
        this.serial3Disabled = response["SerialNo3Label"] == "" ? true : false;
        this.serial4Disabled = response["SerialNo4Label"] == "" ? true : false;
        this.serial5Disabled = response["SerialNo5Label"] == "" ? true : false;

        this.AssetNegativeForm.patchValue({
          AssetMasterId: e.assetMasterId,
          AssetTypeId: e.assetTypeId
        });
      }
    );
  }

  Back() {
    AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_NEG_PAGING],{});
  }

  Save() {
    var assetNegativeObj = this.AssetNegativeForm.value;
    if (this.pageType == "add") {
      this.http.post(this.UrlConstantNew.AddAssetNegative, assetNegativeObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_NEG_PAGING],{});
        }
      );
    }
    else {
      this.http.post(this.UrlConstantNew.EditAssetNegative, assetNegativeObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_NEG_PAGING],{});
        }
      );
    }
  }
}
