import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ListRequestCriteriaObj } from 'app/shared/model/list-request-criteria-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ListAssetSchemeHObj, ResGetListAssetSchemeHObj } from 'app/shared/model/response/asset-master/res-get-list-asset-scheme-h-obj.model';
import { UcTemplateService } from '@adins/uctemplate';
import { ResGetAssetMasterAttrContentByIdObj } from 'app/shared/model/response/asset-master/res-get-asset-master-attr-content-obj.model';
import { Validators } from '@angular/forms';
import { AssetMasterObj } from 'app/shared/model/asset-master-obj.model';
import { AssetTypeObj } from 'app/shared/model/asset-type-obj.model';
import { AssetSchmListObj, ReqGetListAssetSchmHObj } from 'app/shared/model/asset-schm-list-obj.model';
import { ListAssetSchmDObj } from 'app/shared/model/list-asset-schm-d-obj.model';
import { map, mergeMap, first } from 'rxjs/operators';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AssetMasterAttrContentObj, AssetMasterAttrObj } from 'app/shared/model/asset-master-attr/asset-master-attr-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { GenericKeyValueListObj } from 'app/shared/model/generic/generic-key-value-list-obj.model';
import { FormDropDownListService } from '@adins/ucform';

@Component({
  selector: 'app-custom-asset-master-detail-child',
  templateUrl: './custom-asset-master-detail-child.component.html'
})
export class CustomAssetMasterDetailChildComponent implements OnInit {

  @Input()
  parentForm: FormGroup;

  @Input()
  dicts: Record<string, any> = {};

  @Output()
  data: EventEmitter<any> = new EventEmitter<any>();

  AssetTypeId: string;
  checkboxAll: boolean = false;
  isReadyAssetMasterAttr: boolean = false;
  isFinal: boolean = false;
  MaxHierarchyLvl: any;
  AssetTypeCode: any;
  listAssetScheme: Array<ListAssetSchemeHObj> = new Array<ListAssetSchemeHObj>();
  listSelectedId: Array<number> = new Array<number>();
  listRequest: ListRequestCriteriaObj;
  listAssetMasterAttrContent: Array<ResGetAssetMasterAttrContentByIdObj>;
  resultAssetCategory: Array<KeyValueObj>;
  assetMasterObj: AssetMasterObj = new AssetMasterObj();
  resultData: AssetMasterObj = new AssetMasterObj();
  resultAssetType: AssetTypeObj = new AssetTypeObj();
  reqGetListAssetSchmHObj: ReqGetListAssetSchmHObj = new ReqGetListAssetSchmHObj();
  listAssetSchmDObj: ListAssetSchmDObj = new ListAssetSchmDObj();
  assetTypeObj: AssetTypeObj = new AssetTypeObj();

  listItem: any[];

  constructor(private http: HttpClient, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private templateService: UcTemplateService, private cdr: ChangeDetectorRef, private ddlSvc: FormDropDownListService) { }

  async ngOnInit() {
    // this.getListAssetScheme(this.dicts.AssetTypeId);
    this.checkFinal();
    if (this.dicts.mode == "edit") {
      this.assetMasterObj = new AssetMasterObj();
      this.assetMasterObj.AssetMasterId = this.dicts.AssetMasterId;
      await this.http.post(this.UrlConstantNew.GetAssetMasterById, { Id: this.dicts.AssetMasterId }).toPromise().then(
        async (response: AssetMasterObj) => {
          this.resultData = response;

          this.assetTypeObj = new AssetTypeObj();
          this.assetTypeObj.AssetTypeId = this.resultData.AssetTypeId;
          await this.http.post(this.UrlConstantNew.GetAssetTypeById, { Id: this.resultData.AssetTypeId }).toPromise().then(
            async (response: AssetTypeObj) => {
              this.resultAssetType = response;

              if (this.isFinal) {
                let reqGetAssetMasterAttrContentObj = {
                  AssetMasterId: this.dicts.AssetMasterId,
                  AttrTypeCode: CommonConstant.AttrTypeCodeMaster
                };
                await this.http.post(this.UrlConstantNew.GetAssetMasterAttrContentForAssetMasterByAttrTypeCode, reqGetAssetMasterAttrContentObj).pipe(first()).toPromise().then(
                  async (response) => {
                    this.listAssetMasterAttrContent = response["AssetMasterAttrContentObjs"];
                    var parentFormGroup = new Object();
                    for (const masterAttr of this.listAssetMasterAttrContent) {

                      var formGroupObject = new Object();
                      formGroupObject["AssetAttrId"] = [masterAttr["AssetAttrId"]];
                      formGroupObject["IsMandatory"] = [masterAttr["IsMandatory"]];
                      formGroupObject["AttrLength"] = [masterAttr["AttrLength"]];

                      await this.setFormGroupValue(masterAttr, formGroupObject, parentFormGroup);
                    }
                    this.parentForm.addControl("AssetMasterAttrContent", this.fb.group(parentFormGroup));
                    this.isReadyAssetMasterAttr = true;
                    this.data.emit({ListAssetMasterAttrContent: this.listAssetMasterAttrContent});
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              }
            });
          this.reqGetListAssetSchmHObj = new ReqGetListAssetSchmHObj();
          this.reqGetListAssetSchmHObj.AssetMasterId = this.dicts.AssetMasterId;
          this.reqGetListAssetSchmHObj.AssetTypeId = this.dicts.AssetTypeId;
          await this.http.post<ResGetListAssetSchemeHObj>(this.UrlConstantNew.GetListAssetSchmH, this.reqGetListAssetSchmHObj).toPromise().then(
            async response => {
              this.listAssetScheme = response[CommonConstant.ReturnObj];
              for (let i = 0; i < this.listAssetScheme.length; i++) {
                if (this.listAssetScheme[i].AssetSchmHIdFromD != null) {
                  this.listSelectedId.push(this.listAssetScheme[i].AssetSchmHIdFromD);
                }
              }
              this.data.emit({ listSelectedSchm: this.listSelectedId });
              this.data.emit({ListAssetScheme: this.listAssetScheme});
            });
        }
      );
    }

    if (this.dicts.mode == "add") {
      this.assetMasterObj = new AssetMasterObj();
      this.assetMasterObj.AssetMasterId = this.dicts.AssetMasterId;
      await this.http.post(this.UrlConstantNew.GetAssetMasterById, { Id: this.dicts.AssetMasterId }).toPromise().then(
        async (response: AssetMasterObj) => {
          this.resultData = response;

          this.assetTypeObj = new AssetTypeObj();
          this.assetTypeObj.AssetTypeId = this.resultData.AssetTypeId;
          await this.http.post(this.UrlConstantNew.GetAssetTypeById, { Id: this.resultData.AssetTypeId }).toPromise().then(
            async (response: AssetTypeObj) => {
              this.resultAssetType = response;
              if (this.isFinal) {
                let reqGetAssetMasterAttrContentObj = {
                  AssetMasterId: this.dicts.AssetMasterId,
                  AttrTypeCode: CommonConstant.AttrTypeCodeMaster
                };
                await this.http.post<ResGetAssetMasterAttrContentByIdObj>(this.UrlConstantNew.GetAssetMasterAttrContentForAssetMasterByAttrTypeCode, reqGetAssetMasterAttrContentObj).pipe(first()).toPromise().then(
                  async (response) => {
                    this.listAssetMasterAttrContent = response["AssetMasterAttrContentObjs"];
                    var parentFormGroup = new Object();
                    for (const masterAttr of this.listAssetMasterAttrContent) {

                      var formGroupObject = new Object();
                      formGroupObject["AssetAttrId"] = [masterAttr["AssetAttrId"]];
                      formGroupObject["IsMandatory"] = [masterAttr["IsMandatory"]];
                      formGroupObject["AttrLength"] = [masterAttr["AttrLength"]];

                      await this.setFormGroupValue(masterAttr, formGroupObject, parentFormGroup);
                    }
                    this.parentForm.addControl("AssetMasterAttrContent", this.fb.group(parentFormGroup));
                    this.isReadyAssetMasterAttr = true;
                    this.data.emit({ListAssetMasterAttrContent: this.listAssetMasterAttrContent});
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              }
            });
          this.reqGetListAssetSchmHObj = new ReqGetListAssetSchmHObj();
          this.reqGetListAssetSchmHObj.AssetMasterId = this.dicts.AssetMasterId;
          this.reqGetListAssetSchmHObj.AssetTypeId = this.dicts.AssetTypeId;
          await this.http.post<ResGetListAssetSchemeHObj>(this.UrlConstantNew.GetListAssetSchmH, this.reqGetListAssetSchmHObj).toPromise().then(
            async response => {
              this.listAssetScheme = response[CommonConstant.ReturnObj];
              for (let i = 0; i < this.listAssetScheme.length; i++) {
                if (this.listAssetScheme[i].AssetSchmHIdFromD != null) {
                  this.listSelectedId.push(this.listAssetScheme[i].AssetSchmHIdFromD);
                }
              }
              this.data.emit({ listSelectedSchm: this.listSelectedId });
              this.data.emit({ ListAssetScheme: this.listAssetScheme });
            });
        }
      );
    }
    await this.getListAssetCategory(this.resultAssetType.AssetTypeCode)
  }


  Checked(AssetSchmHIdFromH: number, isChecked: boolean): void {
    if (isChecked) {
      this.listSelectedId.push(AssetSchmHIdFromH);
    } else {
      let index = this.listSelectedId.indexOf(AssetSchmHIdFromH)
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }

    this.data.emit({ listSelectedSchm: this.listSelectedId });
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

  getDataListAssetScheme() {
    this.listAssetSchmDObj = new ListAssetSchmDObj();
    this.listAssetSchmDObj.AssetMasterId = this.dicts.AssetMasterId;
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
      this.data.emit({ ListAssetScheme: this.listAssetScheme });
    }
  }

  SplitAttrListValue(value: string) {
    return value.split(";").sort();
  }

  async setFormGroupValue(masterAttr: AssetMasterAttrContentObj, formGroupObject: object, parentForm) {
    if (masterAttr.IsMandatory == true) {
      formGroupObject["AttrValue"] = [masterAttr.AttrContent == null ? "" : masterAttr.AttrContent, [Validators.required, Validators.maxLength(masterAttr.AttrLength)]];
    }
    else {
      formGroupObject["AttrValue"] = [masterAttr.AttrContent == null ? "" : masterAttr.AttrContent, [Validators.maxLength(masterAttr.AttrLength)]];
    }

    parentForm[masterAttr.AssetAttrId] = this.fb.group(formGroupObject);
  }

  checkFinal() {
    const MaxHierarchyLvl = this.dicts.MaxHierarchyLevel;
    let mode = this.dicts.mode;
    if (mode == "edit" && MaxHierarchyLvl == this.dicts.HierarchyLvl) {
      this.isFinal = true;
      this.getDataListAssetScheme();
    }
    else if (mode == "add" && MaxHierarchyLvl == this.dicts.NextHierarchyLvl) {
      this.isFinal = true;
      this.getDataListAssetScheme();
    }
    else {
      this.isFinal = false;
    }
    this.parentForm.get('IsFinal').setValue(this.isFinal);
  }

  getListAssetCategory(val: string){
    if (this.AssetTypeCode === val && val !== '') {
      return;
    }
    
    this.AssetTypeCode = val;
    
    var critObj = new CriteriaObj();
    critObj.DataType = 'text';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'ASSET_TYPE_CODE';
    critObj.value = this.AssetTypeCode;
    
    this.listRequest = new ListRequestCriteriaObj();
    this.listRequest.criteria = new Array();
    this.listRequest.criteria.push(critObj);

    this.http.post<GenericKeyValueListObj>(this.UrlConstantNew.GetListAssetCategory, this.listRequest).subscribe(
      (response) => {
        this.resultAssetCategory = response[CommonConstant.ReturnObj];
        this.ddlSvc.SetDictDDL("AssetCategoryId", this.resultAssetCategory);
        this.parentForm.patchValue({
          AssetCategoryId: this.dicts.mode == "edit" ? this.resultData.AssetCategoryId : ""
        });
      });
  }
}
