import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AssetTypeObj } from 'app/shared/model/asset-type-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-asset-type-add-edit',
  templateUrl: './asset-type-add-edit.component.html'
})
export class AssetTypeAddEditComponent implements OnInit {
  ItemMaxHierarchyLevelNumber: Array<number> = [1, 2, 3, 4, 5];
  HierarchyNumber: number;
  AssetTypeForm = this.fb.group({
    AssetTypeCode: ['', Validators.required],
    AssetTypeName: ['', Validators.required],
    SerialNo1Label: [''],
    SerialNo2Label: [''],
    SerialNo3Label: [''],
    SerialNo4Label: [''],
    SerialNo5Label: [''],
    IsMndtrySerialNo1: [''],
    IsMndtrySerialNo2: [''],
    IsMndtrySerialNo3: [''],
    IsMndtrySerialNo4: [''],
    IsMndtrySerialNo5: [''],
    IsLoanObj: [''],
    IsActive: [''],
    MaxHierarchyLevel: [''],
    HierarchyArr: this.fb.array([
      this.fb.group({
        label: ['Hierarchy Level 1 Label'],
        values: [''],
      })
    ]),
    TotalSerialNo: ['', [Validators.required]]
  });
  pageType: string = "add";
  assetTypeObj: AssetTypeObj = new AssetTypeObj();
  assetTypeId: number;
  resultData: AssetTypeObj = new AssetTypeObj();
  RowVersion: string;
  assetTypeCode: string;
  serialNoOptions: Array<number> = [1, 2, 3, 4, 5];
  serialNoShown: Array<boolean> = [false, false, false, false, false];

  readonly CancelLink: string = NavigationConstant.ASSET_TYPE_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["param"] != null) {
        this.pageType = queryParams["param"];
      }
      if (queryParams["AssetTypeId"] != null) {
        this.assetTypeId = queryParams["AssetTypeId"];
      }
    });
  }

  get HierarchyArr() {
    return this.AssetTypeForm.get('HierarchyArr') as FormArray;
  }

  addHierarchyArr() {
    this.HierarchyArr.push(this.fb.control(''));
  }

  clearHierarchyArr() {
    while (this.HierarchyArr.length !== 0) {
      this.HierarchyArr.removeAt(0)
    }
  }

  public onHierarchyLevelChanged(valuesArr = []) {
    this.HierarchyNumber = this.AssetTypeForm.controls.MaxHierarchyLevel.value;
    this.clearHierarchyArr();
    for (let i = 1; i <= this.HierarchyNumber; i++) {
      this.HierarchyArr.push(this.fb.group({
        label: ['Hierarchy Level ' + i + ' Label'],
        values: [valuesArr[i - 1]]
      }));
    }
  }

  ngOnInit() {
    this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, { Code: 'MAXASSETTYPELVL' }).subscribe(
      response => {
        this.ItemMaxHierarchyLevelNumber = this.ItemMaxHierarchyLevelNumber.slice(0, parseInt(response['GsValue']));
        this.AssetTypeForm.patchValue({
          MaxHierarchyLevel: this.ItemMaxHierarchyLevelNumber[0],
          IsLoanObj: true,
          IsActive: true
        });
        if (this.pageType == "edit") {
          this.assetTypeObj = new AssetTypeObj();
          this.assetTypeObj.AssetTypeId = this.assetTypeId;
          this.AssetTypeForm.controls["AssetTypeCode"].disable();
          this.http.post(this.UrlConstantNew.GetAssetTypeById, {Id: this.assetTypeId}).subscribe(
            (response: AssetTypeObj) => {
              this.resultData = response;
              this.RowVersion = this.resultData.RowVersion;
              if (this.resultData.SerialNo1Label != null) {
                this.serialNoShown[0] = true;
              }
              if (this.resultData.SerialNo2Label != null) {
                this.serialNoShown[1] = true;
              }
              if (this.resultData.SerialNo3Label != null) {
                this.serialNoShown[2] = true;
              }
              if (this.resultData.SerialNo4Label != null) {
                this.serialNoShown[3] = true;
              }
              if (this.resultData.SerialNo5Label != null) {
                this.serialNoShown[4] = true;
              }
              var totalSerialCount = 0;
              for (var i = 0; i < this.serialNoShown.length; i++) {
                if (this.serialNoShown[i]) {
                  totalSerialCount++;
                }
              }
              this.AssetTypeForm.patchValue({
                AssetTypeCode: this.resultData.AssetTypeCode,
                AssetTypeName: this.resultData.AssetTypeName,
                SerialNo1Label: this.resultData.SerialNo1Label,
                SerialNo2Label: this.resultData.SerialNo2Label,
                SerialNo3Label: this.resultData.SerialNo3Label,
                SerialNo4Label: this.resultData.SerialNo4Label,
                SerialNo5Label: this.resultData.SerialNo5Label,
                IsMndtrySerialNo1: this.resultData.IsMndtrySerialNo1,
                IsMndtrySerialNo2: this.resultData.IsMndtrySerialNo2,
                IsMndtrySerialNo3: this.resultData.IsMndtrySerialNo3,
                IsMndtrySerialNo4: this.resultData.IsMndtrySerialNo4,
                IsMndtrySerialNo5: this.resultData.IsMndtrySerialNo5,
                IsLoanObj: this.resultData.IsLoanObj,
                IsActive: this.resultData.IsActive,
                MaxHierarchyLevel: this.resultData.MaxHierarchyLevel,
                TotalSerialNo: totalSerialCount
              });
              this.assetTypeCode = this.resultData.AssetTypeCode;
              this.clearHierarchyArr();
              this.HierarchyNumber = this.resultData.MaxHierarchyLevel;
              var tempArr = [this.resultData.HierarchyLabelLevel1, this.resultData.HierarchyLabelLevel2, this.resultData.HierarchyLabelLevel3, this.resultData.HierarchyLabelLevel4, this.resultData.HierarchyLabelLevel5];
              this.onHierarchyLevelChanged(tempArr);
            }
          );
        }else{
          this.checkIsAutoFormNoFromSetting('AT');
        }
      }
    );
  }

  totalSerialNoHandler() {
    this.serialNoShown = [false, false, false, false, false];
    var totalSerialNo = this.AssetTypeForm.controls["TotalSerialNo"].value;
    this.AssetTypeForm.patchValue({
      SerialNo1Label: '',
      SerialNo2Label: '',
      SerialNo3Label: '',
      SerialNo4Label: '',
      SerialNo5Label: '',
      IsMndtrySerialNo1: '',
      IsMndtrySerialNo2: '',
      IsMndtrySerialNo3: '',
      IsMndtrySerialNo4: '',
      IsMndtrySerialNo5: ''
    });
    for (var a = 0; a < this.serialNoShown.length; a++) {
      var idxReset = a + 1;
      var resetKey = "SerialNo" + idxReset + "Label";
      this.AssetTypeForm.controls[resetKey].clearValidators();
      this.AssetTypeForm.controls[resetKey].updateValueAndValidity();
    }
    for (var i = 0; i < totalSerialNo; i++) {
      var idx = i + 1;
      var key = "SerialNo" + idx + "Label";
      this.AssetTypeForm.controls[key].setValidators([Validators.required]);
      this.AssetTypeForm.controls[key].updateValueAndValidity();
      this.serialNoShown[i] = true;
    }
  }

  SaveForm() {
    this.assetTypeObj = new AssetTypeObj();
    this.assetTypeObj = this.AssetTypeForm.value;
    var tempArr = [];
    for (var i = 0; i < this.assetTypeObj.MaxHierarchyLevel; i++) {
      tempArr[i] = this.AssetTypeForm.value.HierarchyArr[i].values;
    }
    this.assetTypeObj.HierarchyLabelLevel1 = tempArr[0];
    this.assetTypeObj.HierarchyLabelLevel2 = tempArr[1];
    this.assetTypeObj.HierarchyLabelLevel3 = tempArr[2];
    this.assetTypeObj.HierarchyLabelLevel4 = tempArr[3];
    this.assetTypeObj.HierarchyLabelLevel5 = tempArr[4];
    if (!this.assetTypeObj.IsMndtrySerialNo1 || this.assetTypeObj.IsMndtrySerialNo1 == "") {
      this.assetTypeObj.IsMndtrySerialNo1 = false;
    }
    else {
      this.assetTypeObj.IsMndtrySerialNo1 = true;
    }
    if (!this.assetTypeObj.IsMndtrySerialNo2 || this.assetTypeObj.IsMndtrySerialNo2 == "") {
      this.assetTypeObj.IsMndtrySerialNo2 = false;
    }
    else {
      this.assetTypeObj.IsMndtrySerialNo2 = true;
    }
    if (!this.assetTypeObj.IsMndtrySerialNo3 || this.assetTypeObj.IsMndtrySerialNo3 == "") {
      this.assetTypeObj.IsMndtrySerialNo3 = false;
    }
    else {
      this.assetTypeObj.IsMndtrySerialNo3 = true;
    }
    if (!this.assetTypeObj.IsMndtrySerialNo4 || this.assetTypeObj.IsMndtrySerialNo4 == "") {
      this.assetTypeObj.IsMndtrySerialNo4 = false;
    }
    else {
      this.assetTypeObj.IsMndtrySerialNo4 = true;
    }
    if (!this.assetTypeObj.IsMndtrySerialNo5 || this.assetTypeObj.IsMndtrySerialNo5 == "") {
      this.assetTypeObj.IsMndtrySerialNo5 = false;
    }
    else {
      this.assetTypeObj.IsMndtrySerialNo5 = true;
    }
    if (!this.assetTypeObj.IsLoanObj || this.assetTypeObj.IsLoanObj == "") {
      this.assetTypeObj.IsLoanObj = false;
    }
    else {
      this.assetTypeObj.IsLoanObj = true;
    }
    if (!this.assetTypeObj.IsActive || this.assetTypeObj.IsActive == "") {
      this.assetTypeObj.IsActive = false;
    }
    else {
      this.assetTypeObj.IsActive = true;
    }
    if (this.assetTypeObj.SerialNo2Label == "") {
      this.assetTypeObj.SerialNo2Label = null;
    }
    if (this.assetTypeObj.SerialNo3Label == "") {
      this.assetTypeObj.SerialNo3Label = null;
    }
    if (this.assetTypeObj.SerialNo4Label == "") {
      this.assetTypeObj.SerialNo4Label = null;
    }
    if (this.assetTypeObj.SerialNo5Label == "") {
      this.assetTypeObj.SerialNo5Label = null;
    }
    if (this.pageType == "add") {
      this.assetTypeObj.RowVersion = "";
      this.http.post(this.UrlConstantNew.AddAssetType, this.assetTypeObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_TYPE_PAGING],{});
        });
    } else {
      this.assetTypeObj.AssetTypeCode = this.assetTypeCode;
      this.assetTypeObj.RowVersion = this.RowVersion;
      this.assetTypeObj.AssetTypeId = this.assetTypeId;
      this.http.post(this.UrlConstantNew.EditAssetType, this.assetTypeObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_TYPE_PAGING],{});
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
            this.AssetTypeForm.patchValue({
              AssetTypeCode: '-'
            });
          }
        }
      });
  }
  //check is automatic/not form no 4
}
