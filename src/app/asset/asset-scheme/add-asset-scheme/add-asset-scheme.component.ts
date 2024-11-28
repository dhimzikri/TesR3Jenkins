import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetSchemeHObj } from 'app/shared/model/asset-scheme-h-obj.model';
import { AssetSchmDObj } from 'app/shared/model/asset-schm-d-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { FromValueObj, UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-add-asset-scheme',
  templateUrl: './add-asset-scheme.component.html'
})

export class AddAssetSchemeComponent implements OnInit {
  pageType: string = 'add';
  assetSchmHObj: AssetSchemeHObj;
  AssetTypeId: number;
  arrAssetSchmD: Array<AssetSchmDObj> = new Array<AssetSchmDObj>();
  responseResultData: AssetSchemeHObj;

  AssetSchmHId: any;
  viewObj: string;
  getListAssetSchmDByAssetSchmHId = this.UrlConstantNew.GetListAssetSchmDByAssetSchmHId;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  listSelectedId: Array<number> = new Array<number>();
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.ASSET_SCHM_MBR_DETAIL;
  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['param'] != null) {
        this.pageType = queryParams['param'];
      } else {
        this.pageType = 'add';
      }
      if (queryParams['AssetSchmHId'] != null) {
        this.AssetSchmHId = queryParams['AssetSchmHId'];
      }
      if (queryParams['AssetTypeId'] != null) {
        this.AssetTypeId = queryParams['AssetTypeId'];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewAssetSchemeMember.json";

    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/assetSchmMbrTempPaging.json";
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/assetSchmMbrTempPaging.json";

    let fromValueObj = new FromValueObj();
    fromValueObj.property = 'AssetSchmHId';
    fromValueObj.value = this.AssetSchmHId;
    this.tempPagingObj.fromValue.push(fromValueObj);
    

    this.http.post(this.UrlConstantNew.GetAssetSchmHById, { Id: this.AssetSchmHId}).subscribe(
      (response: AssetSchemeHObj) => {
        this.responseResultData = response;
        this.AssetTypeId = this.responseResultData.AssetTypeId;

        let whereValueObj = new FromValueObj();
        whereValueObj.property = 'AssetTypeId';
        whereValueObj.value = this.AssetTypeId;
        this.tempPagingObj.whereValue.push(whereValueObj);

        this.tempPagingObj.isReady = true;
      }
    );
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveAssetSchmMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }

    for (let index = 0; index < this.listSelectedId.length; index++) {
      var assetSchmDObj = new AssetSchmDObj();
      assetSchmDObj.AssetSchmHId = this.AssetSchmHId;
      assetSchmDObj.AssetMasterId = this.listSelectedId[index];
      this.arrAssetSchmD.push(assetSchmDObj);
    }

    var AssetSchmObj = {
      AssetSchmH: this.assetSchmHObj,
      AssetSchmDObjs: this.arrAssetSchmD
    }
    this.http.post(this.UrlConstantNew.AddRangeAssetSchmD, AssetSchmObj, AdInsConstant.SpinnerOptions).subscribe(
      response => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_SCHM_MBR_DETAIL],{ "AssetSchmHId": this.AssetSchmHId });
      }
    );
  }
}