import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ListRequestCriteriaObj } from 'app/shared/model/list-request-criteria-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ListAssetSchemeHObj, ResGetListAssetSchemeHObj } from 'app/shared/model/response/asset-master/res-get-list-asset-scheme-h-obj.model';
import { Subscription } from 'rxjs';
import { UcTemplateService } from '@adins/uctemplate';
import { ReqGetListAssetSchmHObj } from 'app/shared/model/asset-schm-list-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-custom-asset-master-detail-parent',
  templateUrl: './custom-asset-master-detail-parent.component.html'
})
export class CustomAssetMasterDetailParentComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  parentForm: FormGroup;

  @Input()
  dicts: Record<string, any> = {};

  @Output()
  data: EventEmitter<any> = new EventEmitter<any>();

  valueSub: Subscription;

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

  listItem: any[];

  AssetMasterParentForm = this.fb.group({
    IsFinal: [false],
    AssetCategoryId: ['']
  });


  constructor(private http: HttpClient, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, 
    private templateService: UcTemplateService, private cdr: ChangeDetectorRef) { 
  }

  ngOnDestroy(): void {
    if (this.valueSub) {
      this.valueSub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
  }

  async ngOnInit() {
    await this.waitFor(_ => this.dicts.formRaw != undefined);
    await this.waitFor(_ => this.dicts.formRaw.AssetTypeId != undefined);

    this.valueSub = this.templateService.callback.subscribe(key => {
      if (key != undefined && !key.hasOwnProperty('pageId')) {
        if (key === "AssetTypeId" && this.dicts.formRaw.AssetTypeId)
        {
          const value = this.dicts.formRaw.AssetTypeId;
          this.checkFinal(value);
          this.getListAssetScheme(value);
        }
      }
    });
  }

  waitFor(conditions) {
    const vote = resolve => {
      if (conditions()) resolve();
      else setTimeout(_ => vote(resolve), 250);
    }

    return new Promise(vote);
  }

  Checked(AssetSchmHIdFromH: number, isChecked: boolean): void {
    if (isChecked) {
      this.listSelectedId.push(AssetSchmHIdFromH);
    } else {
      let index = this.listSelectedId.indexOf(AssetSchmHIdFromH)
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }

    this.data.emit({listSelectedSchm: this.listSelectedId});
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

  getListAssetScheme(key: string) {
    if (this.AssetTypeId === key && key === '') {
      return;
    }

    if (key == "") return;
    
    this.AssetTypeId = key;
    const request = {
      AssetTypeId: this.AssetTypeId
    };

    if (this.dicts.mode == "add")
    {
      this.http.post(this.UrlConstantNew.GetListAssetSchmH, request)
      .subscribe(res => {
        this.listAssetScheme = res['ReturnObject'];
        this.data.emit({ listSelectedSchm: this.listSelectedId });
        this.data.emit({ListAssetScheme: this.listAssetScheme});
        this.parentForm.updateValueAndValidity();
        this.cdr.detectChanges();
      })
    }
    else
    {
      let reqGetListAssetSchmHObj = new ReqGetListAssetSchmHObj();
      reqGetListAssetSchmHObj.AssetMasterId = this.dicts.AssetMasterId;
      reqGetListAssetSchmHObj.AssetTypeId = Number(this.AssetTypeId);
      this.http.post<ResGetListAssetSchemeHObj>(this.UrlConstantNew.GetListAssetSchmH, reqGetListAssetSchmHObj).subscribe(
        (response) => {
          this.listAssetScheme = response[CommonConstant.ReturnObj];
          this.data.emit({ListAssetScheme: this.listAssetScheme});
          for (let i = 0; i < this.listAssetScheme.length; i++) {
            if (this.listAssetScheme[i].AssetSchmHIdFromD != null) {
              this.listSelectedId.push(this.listAssetScheme[i].AssetSchmHIdFromD);
            }
          }
          this.data.emit({ listSelectedSchm: this.listSelectedId });
        });
    }
  }

  checkFinal(key: string){
    if (this.AssetTypeId === key && key !== '') {
      return;
    }

    if (key == "") return;
    
    this.AssetTypeId = key;
    const request = {
      Id: this.AssetTypeId
    };

    this.http.post(this.UrlConstantNew.GetAssetTypeById, request)
    .subscribe(res => {

        if ( res['MaxHierarchyLevel'] == 1) {
          this.isFinal = true;
        }
        else {
          this.isFinal = false;
        }
      this.parentForm.get('IsFinal').setValue(this.isFinal);

    })
  }

}
