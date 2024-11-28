import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-asset-document-master-paging',
  templateUrl: './asset-document-master-paging.component.html'
})
export class AssetDocumentMasterPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  
  readonly AddLink: string = NavigationConstant.BACK_TO_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetDocumentMaster.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetDocumentMaster.json";
    
  }
}
