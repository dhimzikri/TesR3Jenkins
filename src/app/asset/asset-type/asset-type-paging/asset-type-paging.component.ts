import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-asset-type-paging',
  templateUrl: './asset-type-paging.component.html'
})
export class AssetTypePagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.ASSET_TYPE_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) { }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetType.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetType.json";
  }
}
