import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AssetMasterObj } from 'app/shared/model/asset-master-obj.model';
import { AssetTypeObj } from 'app/shared/model/asset-type-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { ListRequestCriteriaObj } from 'app/shared/model/list-request-criteria-obj.model';
import { AssetCategoryObj } from 'app/shared/model/asset-category-obj.model';
import { AssetSchmListObj, ReqGetListAssetSchmHObj } from 'app/shared/model/asset-schm-list-obj.model';
import { ListAssetSchmDObj } from 'app/shared/model/list-asset-schm-d-obj.model';
import { map, mergeMap, first } from 'rxjs/operators';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { Subscription, forkJoin } from 'rxjs';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ResGetAssetMasterAttrContentByIdObj } from 'app/shared/model/response/asset-master/res-get-asset-master-attr-content-obj.model';
import { GenericKeyValueListObj } from 'app/shared/model/generic/generic-key-value-list-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ListAssetSchemeHObj, ResGetListAssetSchemeHObj } from 'app/shared/model/response/asset-master/res-get-list-asset-scheme-h-obj.model';
import { AssetMasterAttrContentObj, AssetMasterAttrObj } from 'app/shared/model/asset-master-attr/asset-master-attr-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';

@Component({
  selector: 'app-custom-asset-master-add-edit-child',
  templateUrl: './custom-asset-master-add-edit-child.component.html'
})
export class CustomAssetMasterAddEditChildComponent implements OnInit {

  @Input()
  parentForm: FormGroup;

  @Input()
  dicts: Record<string, any> = {};

  @Output()
  data: EventEmitter<any> = new EventEmitter<any>();

  listItem: any[];

  AssetTypeId: string;
  checkboxAll: boolean = false;
  isFinal: boolean = false;
  isTable: boolean = false;
  MaxHierarchyLvl: any;
  AssetTypeCode: any;
  listAssetScheme: Array<ListAssetSchemeHObj> = new Array<ListAssetSchemeHObj>();
  listSelectedId: Array<number> = new Array<number>();
  listRequest: ListRequestCriteriaObj;
  resultAssetCategory: Array<KeyValueObj>;
  AssetMasterId: number;
  isReadyAssetMasterAttr: boolean = false;
  pageType: string;
  assetTypeObj: AssetTypeObj = new AssetTypeObj();
  resultAssetType: AssetTypeObj = new AssetTypeObj();
  resultData: AssetMasterObj = new AssetMasterObj();
  listAssetMasterAttrContent: Array<ResGetAssetMasterAttrContentByIdObj>;

  AssetMasterChildForm = this.fb.group({
    AssetCategoryId: [''],
    AssetTypeId: [0, [Validators.required]],
    AssetCode: ['', [Validators.required, Validators.maxLength(50)]],
    AssetName: ['', [Validators.required, Validators.maxLength(100)]],
    HierarchyLvl: [''],
    FullAssetCode: [''],
    FullAssetName: [''],
    ParentId: [0],
    IsFinal: [false],
    IsActive: [true],
    AssetTypeName: [''],
    AssetCheckbox: [''],
    AssetSchmCode: [''],
    AssetSchmName: [''],
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit(): void {
    // this.getListAssetScheme(ev);
    if (this.isFinal) {
      let reqGetAssetMasterAttrContentObj = {
        AssetMasterId: this.AssetMasterId,
        AttrTypeCode: CommonConstant.AttrTypeCodeMaster
      };
      this.http.post(this.UrlConstantNew.GetAssetMasterAttrContentForAssetMasterByAttrTypeCode, reqGetAssetMasterAttrContentObj).pipe(first()).subscribe(
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
          this.AssetMasterChildForm.addControl("AssetMasterAttrContent", this.fb.group(parentFormGroup));
          this.isReadyAssetMasterAttr = true;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  SplitAttrListValue(value: string) {
    return value.split(";").sort();
  }

  async setFormGroupValue(masterAttr: AssetMasterAttrContentObj, formGroupObject: object, parentFormGroup) {
    if (masterAttr.IsMandatory == true) {
      formGroupObject["AttrValue"] = [masterAttr.AttrContent == null ? "" : masterAttr.AttrContent, [Validators.required, Validators.maxLength(masterAttr.AttrLength)]];
    }
    else {
      formGroupObject["AttrValue"] = [masterAttr.AttrContent == null ? "" : masterAttr.AttrContent, [Validators.maxLength(masterAttr.AttrLength)]];
    }

    parentFormGroup[masterAttr.AssetAttrId] = this.fb.group(formGroupObject);
  }
}
