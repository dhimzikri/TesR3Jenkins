import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-asset-accessory-paging',
  templateUrl: './asset-accessory-paging.component.html'
})
export class AssetAccessoryPagingComponent implements OnInit {
  AssetTypeId: number;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  arrCrit: Array<CriteriaObj> = new Array<CriteriaObj>();
  critObj: CriteriaObj = new CriteriaObj();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["AssetTypeId"] != null) {
        this.AssetTypeId = queryParams["AssetTypeId"];
      }
    });
  }
  readonly AddLink: string = NavigationConstant.BACK_TO_DETAIL;
  readonly CancelLink: string = NavigationConstant.ASSET_CONFIG_PAGING;
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetAccessory.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetAccessory.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteAssetAccessory;
    
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewAssetType.json";

    this.critObj.restriction = AdInsConstant.RestrictionLike;
    this.critObj.propName = 'ASSET_TYPE_ID';
    this.critObj.value = this.AssetTypeId.toString();
    this.arrCrit.push(this.critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }
}
