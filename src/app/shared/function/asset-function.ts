import { AssetSchmDObj } from '../model/asset-schm-d-obj.model';
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Router } from "@angular/router";
import { AssetMasterObj } from '../model/asset-master-obj.model';
import { ListAssetSchmDObj } from '../model/list-asset-schm-d-obj.model';
import * as env from "../../../assets/config/enviConfig.json";
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { AssetMasterAttrObj } from '../model/asset-master-attr/asset-master-attr-obj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';

const envi = URLConstant.env;

export function addRangeAssetSchmD(AssetSchmHId: any, listTemp: any[], api: any, http: HttpClient, toastr: NGXToastrService, router: Router) {
  var arrAssetSchmDObj = [];
  var assetSchmDObj = new AssetSchmDObj();
  for (const temp of listTemp) {
    assetSchmDObj = new AssetSchmDObj();
    assetSchmDObj.AssetSchmHId = AssetSchmHId;
    assetSchmDObj.AssetMasterId = temp.AssetMasterId;
    arrAssetSchmDObj.push(assetSchmDObj);
  }

  var AssetSchmObj = {
    AssetSchmDObjs: arrAssetSchmDObj
  }

  let url = envi.FoundationR3Url + api;
  http.post(url, AssetSchmObj, AdInsConstant.SpinnerOptions).subscribe(
    response => {
      toastr.successMessage(response['message']);
      AdInsHelper.RedirectUrl(router,[NavigationConstant.SELF_CUSTOM_ASSET_SCHM_MBR_DETAIL],{ "AssetSchmHId": AssetSchmHId });
    }
  );
}

export function saveFormAssetMasterParent(dicts: Record<string, any>, apiSaveForm: string, apiSaveSchm: string, http: HttpClient, toastr: NGXToastrService, router: Router) {
  let url = envi.FoundationR3Url + apiSaveForm;
  let urlSchm = envi.FoundationR3Url + apiSaveSchm;

  let assetMasterObj = new AssetMasterObj();

  assetMasterObj.AssetTypeId = dicts.formRaw["AssetTypeId"];
  assetMasterObj.AssetCode = dicts.formRaw["AssetCode"];
  assetMasterObj.AssetName = dicts.formRaw["AssetName"];
  assetMasterObj.FullAssetCode = dicts.formRaw["AssetCode"];
  assetMasterObj.FullAssetName = dicts.formRaw["AssetName"];
  assetMasterObj.IsFinal = dicts.formRaw["IsFinal"];
  assetMasterObj.IsActive = dicts.formRaw["IsActiveAssetMaster"];

  if (dicts.mode == "add") {
    assetMasterObj.HierarchyLvl = 1;
    assetMasterObj.ParentId = null;
 
    if (assetMasterObj.IsFinal == true) {
      assetMasterObj.AssetCategoryId = dicts.formRaw["AssetCategoryId"];
    }
    else {
      assetMasterObj.AssetCategoryId = '';
    }
 
    if (assetMasterObj.IsFinal == true) {
      let listAssetSchmDObj = new ListAssetSchmDObj();
      listAssetSchmDObj.AssetMasterId = dicts.AssetMasterId;
      listAssetSchmDObj.AssetSchmHId = [];
      for (var i = 0; i < dicts.ListAssetScheme.length; i++) {
        if (dicts.listSelectedSchm.length != 0) {
          for (let j = 0; j < dicts.listSelectedSchm.length; j++) {
            if (dicts.ListAssetScheme[i].AssetSchmHIdFromH == dicts.listSelectedSchm[j]) {
              listAssetSchmDObj.AssetSchmHId.push(dicts.ListAssetScheme[i].AssetSchmHIdFromH);
              break;
            } else {
              dicts.ListAssetScheme[i].AssetMasterId = null;
            }
          }
        } else {
          dicts.ListAssetScheme[i].AssetMasterId = null;
        }
      }
      http.post(url, assetMasterObj, AdInsConstant.SpinnerOptions).pipe(
        map((response) => {
          return response;
        }),
        mergeMap((response) => {
          listAssetSchmDObj.AssetMasterId = response["Id"];
          let observableBatch = [];
          let editListAssetSchm = http.post(urlSchm, listAssetSchmDObj, AdInsConstant.SpinnerOptions);
          observableBatch.push(editListAssetSchm);
          return forkJoin(observableBatch);
        })
      ).subscribe(
        (response) => {
          toastr.successMessage(response[response.length - 1]["Message"]);
          AdInsHelper.RedirectUrl(router,[NavigationConstant.CUSTOM_ASSET_MASTER_PAGING],{});
        });
 
    }else{
      http.post(url, assetMasterObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(router,[NavigationConstant.CUSTOM_ASSET_MASTER_PAGING],{});
 
        }
      );
    }
 
  } else {
    assetMasterObj.AssetMasterId = dicts.AssetMasterId;
    assetMasterObj.HierarchyLvl = dicts["HierarchyLvl"];
    assetMasterObj.ParentId = dicts["ParentId"];
    assetMasterObj.RowVersion = dicts.formRaw.rowVersion;
 
    if (assetMasterObj.IsFinal == true) {
      assetMasterObj.AssetCategoryId = dicts.formRaw["AssetCategoryId"];
    }
    else {
      assetMasterObj.AssetCategoryId = '';
    }
 
    if (assetMasterObj.IsFinal == true) {
      let listAssetSchmDObj = new ListAssetSchmDObj();
      listAssetSchmDObj.AssetMasterId = dicts.AssetMasterId;
      listAssetSchmDObj.AssetSchmHId = [];
      for (var i = 0; i < dicts.ListAssetScheme.length; i++) {
        if (dicts.listSelectedSchm.length != 0) {
          for (let j = 0; j < dicts.listSelectedSchm.length; j++) {
            if (dicts.ListAssetScheme[i].AssetSchmHIdFromH == dicts.listSelectedSchm[j]) {
              listAssetSchmDObj.AssetSchmHId.push(dicts.ListAssetScheme[i].AssetSchmHIdFromH);
              break;
            } else {
              dicts.ListAssetScheme[i].AssetMasterId = null;
            }
          }
        } else {
          dicts.ListAssetScheme[i].AssetMasterId = null;
        }
      }
 
      let editAssetMaster = http.post(url, assetMasterObj, AdInsConstant.SpinnerOptions);
      let editAssetSchm = http.post(urlSchm, listAssetSchmDObj, AdInsConstant.SpinnerOptions);
      let observableBatch = [editAssetMaster, editAssetSchm];
 
 
      forkJoin(observableBatch).subscribe(
        (response) => {
          toastr.successMessage(response[response.length - 1]["Message"]);
          AdInsHelper.RedirectUrl(router,[NavigationConstant.CUSTOM_ASSET_MASTER_PAGING],{});
        },
        (error) => {
          console.log(error);
        }
      );
    }else{
      http.post(url, assetMasterObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(router,[NavigationConstant.CUSTOM_ASSET_MASTER_PAGING],{});
        }
      );
 
    }
 
  }
}

export function saveFormAssetMasterChild(dicts: Record<string, any>, apiSaveForm: string, apiSaveAttr: string, apiSaveSchm: string, http: HttpClient, toastr: NGXToastrService, router: Router) {
    var formValue = dicts.formRaw;
    var assetMasterAttrValues = new Array<AssetMasterAttrObj>();
    let assetMasterObj = new AssetMasterObj();
    let url = envi.FoundationR3Url + apiSaveForm;
    let urlAttr = envi.FoundationR3Url + apiSaveAttr;
    let urlSchm = envi.FoundationR3Url + apiSaveSchm;

    if (formValue.AssetMasterAttrContent != undefined) {
      if (Object.keys(formValue["AssetMasterAttrContent"]).length > 0 && formValue["AssetMasterAttrContent"].constructor === Object) {
        for (const key in formValue["AssetMasterAttrContent"]) {
          var assetMasterAttr: AssetMasterAttrObj = {
            AssetMasterId: dicts.AssetMasterId,
            AssetAttrId: key,
            AttrContent: formValue["AssetMasterAttrContent"][key]["AttrValue"] == null ? "" : formValue["AssetMasterAttrContent"][key]["AttrValue"]
          };
          let x = dicts.ListAssetMasterAttrContent.find(f=>f.AssetAttrId == assetMasterAttr.AssetAttrId);
          if(x != null){
            if((x.AttrInputType == "A" || x.AttrInputType == "N") && assetMasterAttr.AttrContent == ""){
              assetMasterAttr.AttrContent = "0";
            }
          }
          assetMasterAttrValues.push(assetMasterAttr);
        }
      }
    }

    if (dicts.mode == "add") {
      assetMasterObj = new AssetMasterObj();
      assetMasterObj.AssetTypeId = dicts["AssetTypeId"];
      assetMasterObj.AssetCode = dicts.formRaw["AssetCode"];
      assetMasterObj.AssetName = dicts.formRaw["AssetName"];
      assetMasterObj.HierarchyLvl = dicts.formRaw["HierarchyLvl"];
      assetMasterObj.FullAssetCode = dicts.formRaw["FullAssetCode"] + '.' + dicts.formRaw["AssetCode"];
      assetMasterObj.FullAssetName = dicts.formRaw["FullAssetName"] + ' ' + dicts.formRaw["AssetName"];
      assetMasterObj.ParentId = dicts.AssetMasterId;
      assetMasterObj.IsFinal = dicts.formRaw["IsFinal"];
      assetMasterObj.IsActive = dicts.formRaw["IsActive"];

      if (assetMasterObj.IsFinal == true) {
        assetMasterObj.AssetCategoryId = dicts.formRaw["AssetCategoryId"];
      }
      else {
        assetMasterObj.AssetCategoryId = '';
      }

      if (assetMasterObj.IsFinal == true) {
        let listAssetSchmDObj = new ListAssetSchmDObj();
        listAssetSchmDObj.AssetMasterId = dicts.AssetMasterId;
        listAssetSchmDObj.AssetSchmHId = [];
        for (var i = 0; i < dicts.ListAssetScheme.length; i++) {
          if (dicts.listSelectedSchm.length != 0) {
            for (let j = 0; j < dicts.listSelectedSchm.length; j++) {
              if (dicts.ListAssetScheme[i].AssetSchmHIdFromH == dicts.listSelectedSchm[j]) {
                listAssetSchmDObj.AssetSchmHId.push(dicts.ListAssetScheme[i].AssetSchmHIdFromH);
                break;
              } else {
                dicts.ListAssetScheme[i].AssetMasterId = null;
              }
            }
          } else {
            dicts.ListAssetScheme[i].AssetMasterId = null;
          }
        }
        http.post(url, assetMasterObj, AdInsConstant.SpinnerOptions).pipe(
          map((response) => {
            return response;
          }),
          mergeMap((response) => {
            listAssetSchmDObj.AssetMasterId = response["Id"];
            let observableBatch = [];
            if (assetMasterAttrValues.length > 0) {
              assetMasterAttrValues.forEach(x => {
                x.AssetMasterId = response["Id"];
              })
              let addAssetMasterAttr = http.post(urlAttr, { AssetMasterAttrContentObjs: assetMasterAttrValues }, AdInsConstant.SpinnerOptions);
              observableBatch.push(addAssetMasterAttr);
            }
            let editListAssetSchm = http.post(urlSchm, listAssetSchmDObj, AdInsConstant.SpinnerOptions);
            observableBatch.push(editListAssetSchm);
            return forkJoin(observableBatch);
          })
        ).subscribe(
          (response) => {
            toastr.successMessage(response[response.length - 1]["Message"]);
            AdInsHelper.RedirectUrl(router,[NavigationConstant.CUSTOM_ASSET_MASTER_PAGING],{});
          });
      }
      else {
        http.post(url, assetMasterObj, AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
            toastr.successMessage(response["Message"]);
            AdInsHelper.RedirectUrl(router,[NavigationConstant.CUSTOM_ASSET_MASTER_PAGING],{});
          });
      }


    } else {
      assetMasterObj.AssetMasterId = dicts.AssetMasterId;
      assetMasterObj.AssetTypeId = dicts["AssetTypeId"];
      assetMasterObj.AssetCode = dicts.formRaw["AssetCode"];
      assetMasterObj.AssetName = dicts.formRaw["AssetName"];
      assetMasterObj.HierarchyLvl = dicts.formRaw["HierarchyLvl"];
      assetMasterObj.FullAssetCode = dicts.formRaw["FullAssetCode"] + '.' + dicts.formRaw["AssetCode"];
      assetMasterObj.FullAssetName = dicts.formRaw["FullAssetName"] + ' ' + dicts.formRaw["AssetName"];
      assetMasterObj.ParentId = dicts["ParentId"];
      assetMasterObj.IsFinal = dicts.formRaw["IsFinal"];
      assetMasterObj.IsActive = dicts.formRaw["IsActive"];
      assetMasterObj.RowVersion = dicts.formRaw.RowVersion;

      if (assetMasterObj.IsFinal == true) {
        assetMasterObj.AssetCategoryId = dicts.formRaw["AssetCategoryId"];
      }
      else {
        assetMasterObj.AssetCategoryId = '';
      }

      if (assetMasterObj.IsFinal == true) {
        let listAssetSchmDObj = new ListAssetSchmDObj();
        listAssetSchmDObj.AssetMasterId = dicts.AssetMasterId;
        listAssetSchmDObj.AssetSchmHId = [];
        for (var i = 0; i < dicts.ListAssetScheme.length; i++) {
          if (dicts.listSelectedSchm.length != 0) {
            for (let j = 0; j < dicts.listSelectedSchm.length; j++) {
              if (dicts.ListAssetScheme[i].AssetSchmHIdFromH == dicts.listSelectedSchm[j]) {
                listAssetSchmDObj.AssetSchmHId.push(dicts.ListAssetScheme[i].AssetSchmHIdFromH);
                break;
              } else {
                dicts.ListAssetScheme[i].AssetMasterId = null;
              }
            }
          } else {
            dicts.ListAssetScheme[i].AssetMasterId = null;
          }
        }

        let editAssetMaster = http.post(url, assetMasterObj, AdInsConstant.SpinnerOptions);
        let editAssetSchm = http.post(urlSchm, listAssetSchmDObj, AdInsConstant.SpinnerOptions);
        let observableBatch = [editAssetMaster, editAssetSchm];
        if (assetMasterAttrValues.length > 0) {
          let addAssetMasterAttr = http.post(urlAttr, { AssetMasterAttrContentObjs: assetMasterAttrValues }, AdInsConstant.SpinnerOptions);
          observableBatch.push(addAssetMasterAttr);
        }

        forkJoin(observableBatch).subscribe(
          (response) => {
            toastr.successMessage(response[response.length - 1]["Message"]);
            AdInsHelper.RedirectUrl(router,[NavigationConstant.CUSTOM_ASSET_MASTER_PAGING],{});
          },
          (error) => {
            console.log(error);
          }
        );
      }
      else {
        http.post(url, assetMasterObj, AdInsConstant.SpinnerOptions).subscribe(
          response => {
            toastr.successMessage(response["Message"]);
            AdInsHelper.RedirectUrl(router,[NavigationConstant.CUSTOM_ASSET_MASTER_PAGING],{});
          },
          error => {
            console.log(error);
          }
        );
      }
    }
}