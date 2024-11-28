import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';
@Component({
  selector: 'app-asset-attribute',
  templateUrl: './asset-attribute.component.html',
  styleUrls: ['./asset-attribute.component.scss']
})
export class AssetAttributeComponent implements OnInit {

  AssetTypeId: number;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  arrCrit: Array<CriteriaObj> = new Array<CriteriaObj>();
  critObj: CriteriaObj = new CriteriaObj();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.BACK_TO_DETAIL;
  readonly CancelLink: string = NavigationConstant.ASSET_CONFIG_PAGING;
  constructor(private route: ActivatedRoute, private http:HttpClient, private toastr : NGXToastrService, private router: Router, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["AssetTypeId"] != null) {
        this.AssetTypeId = queryParams["AssetTypeId"];
      }
    });
  }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetAttribute.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetAttribute.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteAssetAttr;
    
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewAssetType.json";

    this.critObj.restriction = AdInsConstant.RestrictionEq;
    this.critObj.propName = 'ASSET_TYPE_ID';
    this.critObj.value = this.AssetTypeId.toString();
    this.arrCrit.push(this.critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }

  edit(ev) {
    AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_ATTR_DETAIL],{ "AssetTypeId": this.AssetTypeId,"AssetAttrId": ev.RowObj.AssetAttrId, mode:"edit" });
  }

}
