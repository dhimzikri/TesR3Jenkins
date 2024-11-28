import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AssetMasterObj } from 'app/shared/model/asset-master-obj.model';
import { AssetTypeObj } from 'app/shared/model/asset-type-obj.model';
import { ListRequestCriteriaObj } from 'app/shared/model/list-request-criteria-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AssetSchmListObj, ReqGetListAssetSchmHObj } from 'app/shared/model/asset-schm-list-obj.model';
import { ListAssetSchmDObj } from 'app/shared/model/list-asset-schm-d-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { map, mergeMap, first } from 'rxjs/operators';
import { forkJoin } from 'rxjs';import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { GenericKeyValueListObj } from 'app/shared/model/generic/generic-key-value-list-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ListAssetSchemeHObj, ResGetListAssetSchemeHObj } from 'app/shared/model/response/asset-master/res-get-list-asset-scheme-h-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { NgxRouterService } from '@adins/fe-core';


@Component({
  selector: 'app-asset-master-add-edit-parent',
  templateUrl: './asset-master-add-edit-parent.component.html'
})
export class AssetMasterAddEditParentComponent implements OnInit {

  pageType: string = "add";
  AssetMasterId: number;
  assetMasterObj: AssetMasterObj;
  assetTypeObj: AssetTypeObj;
  resultAssetType: AssetTypeObj;
  resultData: AssetMasterObj;
  allAssetMasterMethod: any;
  listRequest: ListRequestCriteriaObj;
  resultAssetCategory: Array<KeyValueObj>;;
  assetSchmListDObj: AssetSchmListObj;
  reqGetListAssetSchmHObj: ReqGetListAssetSchmHObj = new ReqGetListAssetSchmHObj()
  listAssetSchmDObj: ListAssetSchmDObj;
  listSelectedId: Array<number> = new Array<number>();
  listAssetScheme: Array<ListAssetSchemeHObj> = new Array<ListAssetSchemeHObj>();
  checkboxAll: boolean = false;
  isFinal: boolean;
  customPattern = new Array<CustomPatternObj>();
  AssetMasterParentForm = this.fb.group({
    AssetCategoryId: [''],
    AssetTypeId: [0, [Validators.required]],
    AssetCode: ['', [Validators.required, Validators.maxLength(50)]],
    AssetName: ['', [Validators.required, Validators.maxLength(100)]],
    HierarchyLvl: [1],
    FullAssetCode: ['', [Validators.maxLength(500)]],
    FullAssetName: ['', [Validators.maxLength(1000)]],
    ParentId: [0],
    IsFinal: [false],
    IsActive: [false],
  });

  readonly CancelLink: string = NavigationConstant.ASSET_MASTER_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["param"] != null) {
        this.pageType = queryParams["param"];
      }
      if (queryParams["AssetMasterId"] != null) {
        this.AssetMasterId = queryParams["AssetMasterId"];
      }
    });
  }

  onChange() {
    this.assetTypeObj = new AssetTypeObj();
    this.assetTypeObj.AssetTypeId = this.AssetMasterParentForm.controls['AssetTypeId'].value;
    this.http.post(this.UrlConstantNew.GetAssetTypeById, {Id: this.AssetMasterParentForm.controls['AssetTypeId'].value}).subscribe(
      (response: AssetTypeObj) => {
        this.resultAssetType = response;
        if (this.resultAssetType.MaxHierarchyLevel == 1) {
          this.AssetMasterParentForm.patchValue({
            IsFinal: true
          })
          this.AssetMasterParentForm.controls["AssetCategoryId"].setValidators([Validators.required]);
          this.AssetMasterParentForm.controls['AssetCategoryId'].updateValueAndValidity();
        }
        else {
          this.AssetMasterParentForm.patchValue({
            IsFinal: false
          });
        }
        this.isFinal = this.AssetMasterParentForm.controls["IsFinal"].value;

        var critObj = new CriteriaObj();
        critObj.DataType = 'text';
        critObj.restriction = AdInsConstant.RestrictionEq;
        critObj.propName = 'ASSET_TYPE_CODE';
        critObj.value = this.resultAssetType.AssetTypeCode;

        this.listRequest = new ListRequestCriteriaObj();
        this.listRequest.criteria = new Array();
        this.listRequest.criteria.push(critObj);
        this.http.post<GenericKeyValueListObj>(this.UrlConstantNew.GetListAssetCategory, this.listRequest).subscribe(
          (response) => {
            this.resultAssetCategory = response[CommonConstant.ReturnObj];
            if (this.resultAssetCategory.length == 0) {
              this.AssetMasterParentForm.patchValue({ AssetCategoryId: null });
            } else {
              this.AssetMasterParentForm.patchValue({ AssetCategoryId: response[CommonConstant.ReturnObj][0]['Key'] });
            }
          });

        this.reqGetListAssetSchmHObj = new ReqGetListAssetSchmHObj();
        this.reqGetListAssetSchmHObj.AssetMasterId = this.AssetMasterId;
        this.reqGetListAssetSchmHObj.AssetTypeId = this.AssetMasterParentForm.controls['AssetTypeId'].value;
        this.http.post<ResGetListAssetSchemeHObj>(this.UrlConstantNew.GetListAssetSchmH, this.reqGetListAssetSchmHObj).subscribe(
          (response) => {
            this.listAssetScheme = response[CommonConstant.ReturnObj];
            for (let i = 0; i < this.listAssetScheme.length; i++) {
              if (this.listAssetScheme[i].AssetSchmHIdFromD != null) {
                this.listSelectedId.push(this.listAssetScheme[i].AssetSchmHIdFromD);
              }
            }
          });
      });
  }

  async ngOnInit() {
    this.checkSpace();
    await this.http.post(this.UrlConstantNew.GetValueAssetType, null).toPromise().then(
      (response) => {
        this.allAssetMasterMethod = response[CommonConstant.ReturnObj];
        if(this.allAssetMasterMethod.length > 0){
          this.AssetMasterParentForm.patchValue({
            AssetTypeId: response[CommonConstant.ReturnObj][0]['Key']
          });
        }
      });

    if (this.pageType == "edit") {
      // this.AssetMasterParentForm.controls["AssetTypeId"].disable();
      // this.AssetMasterParentForm.controls["AssetCode"].disable();
      // this.AssetMasterParentForm.controls["AssetName"].disable();
      this.assetMasterObj = new AssetMasterObj();
      this.assetMasterObj.AssetMasterId = this.AssetMasterId;
      this.http.post(this.UrlConstantNew.GetAssetMasterById, {Id : this.AssetMasterId}).subscribe(
        (response: AssetMasterObj) => {
          this.resultData = response;
          this.AssetMasterParentForm.patchValue({
            AssetCategoryId: this.resultData.AssetCategoryId,
            AssetTypeId: this.resultData.AssetTypeId,
            AssetCode: this.resultData.AssetCode,
            AssetName: this.resultData.AssetName,
            HierarchyLvl: this.resultData.HierarchyLvl,
            FullAssetCode: this.resultData.FullAssetCode,
            FullAssetName: this.resultData.FullAssetName,
            ParentId: this.resultData.ParentId,
            IsFinal: this.resultData.IsFinal,
            IsActive: this.resultData.IsActive,
          });

          this.isFinal = this.resultData.IsFinal;
          if(this.isFinal)
          {
            this.AssetMasterParentForm.controls["AssetCategoryId"].setValidators([Validators.required]);
            this.AssetMasterParentForm.controls['AssetCategoryId'].updateValueAndValidity();
          }

          this.assetTypeObj = new AssetTypeObj();
          this.assetTypeObj.AssetTypeId = this.resultData.AssetTypeId;
          this.http.post(this.UrlConstantNew.GetAssetTypeById, {Id: this.resultData.AssetTypeId}).subscribe(
            (response: AssetTypeObj) => {
              this.resultAssetType = response;

              var critObj = new CriteriaObj();
              critObj.DataType = 'text';
              critObj.restriction = AdInsConstant.RestrictionEq;
              critObj.propName = 'ASSET_TYPE_CODE';
              critObj.value = this.resultAssetType.AssetTypeCode;

              this.listRequest = new ListRequestCriteriaObj();
              this.listRequest.criteria = new Array();
              this.listRequest.criteria.push(critObj);
              this.http.post<GenericKeyValueListObj>(this.UrlConstantNew.GetListAssetCategory, this.listRequest).subscribe(
                (response) => {
                  this.resultAssetCategory = response[CommonConstant.ReturnObj];
                  if (this.resultAssetCategory.length == 0) {
                    this.AssetMasterParentForm.patchValue({ AssetCategoryId: null });
                  } else {
                    this.AssetMasterParentForm.patchValue({ AssetCategoryId: response[CommonConstant.ReturnObj][0]['Key'] });
                  }
                });
            });

          this.reqGetListAssetSchmHObj = new ReqGetListAssetSchmHObj();
          this.reqGetListAssetSchmHObj.AssetMasterId = this.AssetMasterId;
          this.reqGetListAssetSchmHObj.AssetTypeId = this.resultData.AssetTypeId;
          this.http.post<ResGetListAssetSchemeHObj>(this.UrlConstantNew.GetListAssetSchmH, this.reqGetListAssetSchmHObj).subscribe(
            (response) => {
              this.listAssetScheme = response[CommonConstant.ReturnObj];
              for (let i = 0; i < this.listAssetScheme.length; i++) {
                if (this.listAssetScheme[i].AssetSchmHIdFromD != null) {
                  this.listSelectedId.push(this.listAssetScheme[i].AssetSchmHIdFromD);
                }
              }
            });
        }
      );
    }else{
          this.reqGetListAssetSchmHObj = new ReqGetListAssetSchmHObj();
          this.reqGetListAssetSchmHObj.AssetMasterId = this.AssetMasterId;
          this.reqGetListAssetSchmHObj.AssetTypeId = this.allAssetMasterMethod[0]['Key'];
          this.http.post<ResGetListAssetSchemeHObj>(this.UrlConstantNew.GetListAssetSchmH, this.reqGetListAssetSchmHObj).subscribe(
            (response) => {
              this.listAssetScheme = response[CommonConstant.ReturnObj];
              for (let i = 0; i < this.listAssetScheme.length; i++) {
                if (this.listAssetScheme[i].AssetSchmHIdFromD != null) {
                  this.listSelectedId.push(this.listAssetScheme[i].AssetSchmHIdFromD);
                }
              }
            });

    }
  }

  SelectAll(condition) {
    this.checkboxAll = condition;
    if (condition) {
      for (let i = 0; i < this.listAssetScheme.length; i++) {
        if (this.listSelectedId.indexOf(this.listAssetScheme[i].AssetSchmHIdFromD) < 0) {
          this.listSelectedId.push(this.listAssetScheme[i].AssetSchmHIdFromH);
        }
      }
    } else {
      for (let i = 0; i < this.listAssetScheme.length; i++) {
        let index = this.listSelectedId.indexOf(this.listAssetScheme[i].AssetSchmHIdFromD);
        if (index >= -1) {
          this.listSelectedId.splice(index, 1);
        }
      }
    }
  }

  Checked(AssetSchmHIdFromH: number, isChecked: boolean): void {
    if (isChecked) {
      this.listSelectedId.push(AssetSchmHIdFromH);
    } else {
      let index = this.listSelectedId.indexOf(AssetSchmHIdFromH)
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.assetMasterObj = new AssetMasterObj();
      this.assetMasterObj.AssetTypeId = this.AssetMasterParentForm.controls["AssetTypeId"].value;
      this.assetMasterObj.AssetCode = this.AssetMasterParentForm.controls["AssetCode"].value;
      this.assetMasterObj.AssetName = this.AssetMasterParentForm.controls["AssetName"].value;
      this.assetMasterObj.HierarchyLvl = 1;
      this.assetMasterObj.FullAssetCode = this.AssetMasterParentForm.controls["AssetCode"].value;
      this.assetMasterObj.FullAssetName = this.AssetMasterParentForm.controls["AssetName"].value;
      this.assetMasterObj.ParentId = null;
      this.assetMasterObj.IsFinal = this.AssetMasterParentForm.controls["IsFinal"].value;
      this.assetMasterObj.IsActive = this.AssetMasterParentForm.controls["IsActive"].value;

      if (this.assetMasterObj.IsFinal == true) {
        this.assetMasterObj.AssetCategoryId = this.AssetMasterParentForm.controls["AssetCategoryId"].value;
      }
      else {
        this.assetMasterObj.AssetCategoryId = '';
      }

      if (this.assetMasterObj.IsFinal == true) {
        this.listAssetSchmDObj = new ListAssetSchmDObj();
        this.listAssetSchmDObj.AssetMasterId = this.AssetMasterId;
        this.listAssetSchmDObj.AssetSchmHId = [];
        for (var i = 0; i < this.listAssetScheme.length; i++) {
          if (this.listSelectedId.length != 0) {
            for (let j = 0; j < this.listSelectedId.length; j++) {
              if (this.listAssetScheme[i].AssetSchmHIdFromH == this.listSelectedId[j]) {
                this.listAssetSchmDObj.AssetSchmHId.push(this.listAssetScheme[i].AssetSchmHIdFromH);
                break;
              } else {
                this.listAssetScheme[i].AssetMasterId = null;
              }
            }
          } else {
            this.listAssetScheme[i].AssetMasterId = null;
          }
        }
        this.http.post(this.UrlConstantNew.AddAssetMaster, this.assetMasterObj, AdInsConstant.SpinnerOptions).pipe(
          map((response) => {
            return response;
          }),
          mergeMap((response) => {
            this.listAssetSchmDObj.AssetMasterId = response["Id"];
            let observableBatch = [];
            let editListAssetSchm = this.http.post(this.UrlConstantNew.EditListAssetSchmDByAssetMasterId, this.listAssetSchmDObj, AdInsConstant.SpinnerOptions);
            observableBatch.push(editListAssetSchm);
            return forkJoin(observableBatch);
          })
        ).subscribe(
          (response) => {
            this.toastr.successMessage(response[response.length - 1]["Message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_MASTER_PAGING],{});
          });

      }else{
        this.http.post(this.UrlConstantNew.AddAssetMaster, this.assetMasterObj, AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
            this.toastr.successMessage(response["Message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_MASTER_PAGING],{});

          }
        );
      }

    } else {
      this.assetMasterObj = this.resultData;
      this.assetMasterObj.AssetMasterId = this.AssetMasterId;
      this.assetMasterObj.AssetTypeId = this.AssetMasterParentForm.controls["AssetTypeId"].value;
      this.assetMasterObj.AssetCode = this.AssetMasterParentForm.controls["AssetCode"].value;
      this.assetMasterObj.AssetName = this.AssetMasterParentForm.controls["AssetName"].value;
      this.assetMasterObj.HierarchyLvl = this.AssetMasterParentForm.controls["HierarchyLvl"].value;
      this.assetMasterObj.FullAssetCode = this.AssetMasterParentForm.controls["FullAssetCode"].value;
      this.assetMasterObj.FullAssetName = this.AssetMasterParentForm.controls["AssetName"].value;
      this.assetMasterObj.ParentId = this.AssetMasterParentForm.controls["ParentId"].value;
      this.assetMasterObj.IsFinal = this.AssetMasterParentForm.controls["IsFinal"].value;
      this.assetMasterObj.IsActive = this.AssetMasterParentForm.controls["IsActive"].value;

      if (this.assetMasterObj.IsFinal == true) {
        this.assetMasterObj.AssetCategoryId = this.AssetMasterParentForm.controls["AssetCategoryId"].value;
      }
      else {
        this.assetMasterObj.AssetCategoryId = '';
      }

      if (this.assetMasterObj.IsFinal == true) {
        this.listAssetSchmDObj = new ListAssetSchmDObj();
        this.listAssetSchmDObj.AssetMasterId = this.AssetMasterId;
        this.listAssetSchmDObj.AssetSchmHId = [];
        for (var i = 0; i < this.listAssetScheme.length; i++) {
          if (this.listSelectedId.length != 0) {
            for (let j = 0; j < this.listSelectedId.length; j++) {
              if (this.listAssetScheme[i].AssetSchmHIdFromH == this.listSelectedId[j]) {
                this.listAssetSchmDObj.AssetSchmHId.push(this.listAssetScheme[i].AssetSchmHIdFromH);
                break;
              } else {
                this.listAssetScheme[i].AssetMasterId = null;
              }
            }
          } else {
            this.listAssetScheme[i].AssetMasterId = null;
          }
        }

        let editAssetMaster = this.http.post(this.UrlConstantNew.EditAssetMaster, this.assetMasterObj, AdInsConstant.SpinnerOptions);
        let editAssetSchm = this.http.post(this.UrlConstantNew.EditListAssetSchmDByAssetMasterId, this.listAssetSchmDObj, AdInsConstant.SpinnerOptions);
        let observableBatch = [editAssetMaster, editAssetSchm];


        forkJoin(observableBatch).subscribe(
          (response) => {
            this.toastr.successMessage(response[response.length - 1]["Message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_MASTER_PAGING],{});
          },
          (error) => {
            console.log(error);
          }
        );
      }else{
        this.http.post(this.UrlConstantNew.EditAssetMaster, this.assetMasterObj, AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
            this.toastr.successMessage(response["Message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_MASTER_PAGING],{});
          }
        );

      }

    }
  }
  checkSpace(){
    const patternObj: CustomPatternObj = new CustomPatternObj();
    patternObj.pattern = CommonConstant.regexSpace;
    patternObj.invalidMsg = ExceptionConstant.NO_WHITE_SPACE;
    this.customPattern.push(patternObj);
    this.AssetMasterParentForm.controls.AssetCode.setValidators([Validators.required,Validators.pattern(CommonConstant.regexSpace)]);
    this.AssetMasterParentForm.controls.AssetCode.updateValueAndValidity();
  }
}
