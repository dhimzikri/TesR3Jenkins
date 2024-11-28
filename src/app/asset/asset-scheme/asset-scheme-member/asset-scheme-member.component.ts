import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { HttpClient } from '@angular/common/http';
import { AssetSchemeHObj } from 'app/shared/model/asset-scheme-h-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-asset-scheme-member',
  templateUrl: './asset-scheme-member.component.html'
})

export class AssetSchemeMemberComponent implements OnInit {
  AssetSchmHId: number;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  arrCrit: Array<CriteriaObj> = new Array<CriteriaObj>();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  assetSchmHObj: AssetSchemeHObj;
  AssetSchmHIsSystem: false;
  
  readonly CancelLink: string = NavigationConstant.ASSET_SCHM_PAGING;
  readonly AddLink: string = NavigationConstant.ASSET_SCHM_ADD_MBR;
  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["AssetSchmHId"] != null) {
        this.AssetSchmHId = queryParams["AssetSchmHId"];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewAssetSchemeMember.json";

    this.inputPagingObj._url = "./assets/ucpaging/searchAssetSchemeMember.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetSchemeMember.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteAssetSchmD;

    var critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'ASD.ASSET_SCHM_H_ID';
    critObj.value = this.AssetSchmHId.toString();

    this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;

    this.assetSchmHObj = new AssetSchemeHObj();
    this.assetSchmHObj.AssetSchmHId = this.AssetSchmHId;
    this.http.post(this.UrlConstantNew.GetAssetSchmHById, {Id: this.AssetSchmHId}).subscribe(
      (response: AssetSchemeHObj) => {
        this.assetSchmHObj = response;
        this.AssetSchmHIsSystem = response.IsSystem;
      }
    );
  }
}