import { UcTemplateService } from '@adins/uctemplate';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { Subscription } from 'rxjs';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ListRequestCriteriaObj } from 'app/shared/model/list-request-criteria-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { GenericKeyValueListObj } from 'app/shared/model/generic/generic-key-value-list-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { FormDropDownListService } from '@adins/ucform';

@Component({
  selector: 'app-custom-asset-master-add-edit-parent',
  templateUrl: './custom-asset-master-add-edit-parent.component.html'
})
export class CustomAssetMasterAddEditParentComponent implements OnInit, AfterViewInit {

  parentForm: FormGroup = this.fb.group({});
  data: EventEmitter<any> = new EventEmitter<any>();
  listRequest: ListRequestCriteriaObj;
  resultAssetCategory: Array<KeyValueObj>;
  valueSub: Subscription;
  isFinal: boolean = false;
  AssetTypeCode: any;
  AssetTypeId: string;
  mode: string;
  pageName: string = "AssetMasterDetail";
  
  handler = {
    callback: ($event) => this.callback($event)
  };

  constructor(private http: HttpClient, private templateService: UcTemplateService, private UrlConstantNew: UrlConstantNew, private fb: FormBuilder, private ddlSvc: FormDropDownListService) {}

  ngAfterViewInit(): void {
  }

  onFormCreate(ev) {
    this.parentForm = ev;
  }

  ngOnInit(): void {  
  }

  waitFor(conditions) {
    const vote = resolve => {
      if (conditions()) resolve();
      else setTimeout(_ => vote(resolve), 250);
    }

    return new Promise(vote);
  }

  async callback(ev: any) {
    if(ev === 'AssetTypeId') {

      await this.waitFor(_ => this.parentForm.controls.AssetTypeId != undefined);

      const _ddl = this.ddlSvc.GetDictDDL(ev);
      const y = this.parentForm.get(ev).value;
      const x = _ddl.find(x=>x.Key == y);

      let assetTypeCode = ""
      await this.http.post(this.UrlConstantNew.GetAssetTypeById, {Id: x.Key }).toPromise().then(
        (response) => {
          assetTypeCode = response['AssetTypeCode'];
          if (response['MaxHierarchyLevel'] == 1)
          {
            this.parentForm.controls["AssetCategoryId"].setValidators([Validators.required]);
          }
          else
          {
            this.parentForm.controls['AssetCategoryId'].clearValidators();
          }
          this.parentForm.controls['AssetCategoryId'].updateValueAndValidity();
        }
      );

      this. getListAssetCategory(assetTypeCode)
    }
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
      });
  }

}
