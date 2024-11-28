import { Injectable } from '@angular/core';
import { AssetSchmDObj } from '../model/asset-schm-d-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Injectable({
  providedIn: 'root'
})
export class AssetSchemeService {

  constructor(
    private UrlConstantNew: UrlConstantNew,
    private toastr: NGXToastrService,
    private router: Router,
    private http: HttpClient,
  ) { }

  AddRangeAssetSchmD(AssetSchmHId: any, listTemp: any[]) {
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
    this.http.post(this.UrlConstantNew.AddRangeAssetSchmD, AssetSchmObj, AdInsConstant.SpinnerOptions).subscribe(
      response => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ASSET_SCHM_MBR_DETAIL],{ "AssetSchmHId": AssetSchmHId });
      }
    );
  }
}
