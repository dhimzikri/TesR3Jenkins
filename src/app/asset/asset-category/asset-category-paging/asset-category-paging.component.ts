import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-asset-category-paging',
  templateUrl: './asset-category-paging.component.html'
})
export class AssetCategoryPagingComponent implements OnInit {
  AssetTypeId: number;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  arrCrit: Array<CriteriaObj> = new Array<CriteriaObj>();
  critObj: CriteriaObj = new CriteriaObj();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.BACK_TO_DETAIL;
  readonly CancelLink: string = NavigationConstant.ASSET_CONFIG_PAGING;
  constructor(private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["AssetTypeId"] != null) {
        this.AssetTypeId = queryParams["AssetTypeId"];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewAssetType.json";

    this.inputPagingObj._url = "./assets/ucpaging/searchAssetCategory.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetCategory.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteAssetCategory;

    this.critObj.restriction = AdInsConstant.RestrictionLike;
    this.critObj.propName = 'ASSET_TYPE_ID';
    this.critObj.value = this.AssetTypeId.toString();
    this.arrCrit.push(this.critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }
}
