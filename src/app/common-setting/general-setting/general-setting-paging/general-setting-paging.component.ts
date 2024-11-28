import { Component, OnInit } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { UcPagingObj } from "app/shared/model/uc-paging-obj.model";
import { CriteriaObj } from "app/shared/model/criteria-obj.model";
import { URLConstant } from "app/shared/constant/URLConstant";
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";

@Component({
  selector: "app-general-setting-paging",
  templateUrl: "./general-setting-paging.component.html"
})

export class GeneralSettingPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  arrCrit: any;

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchGeneralSetting.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchGeneralSetting.json";

    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'IS_UPDATEABLE';
    critObj.value = '1';
    this.inputPagingObj.addCritInput = this.arrCrit;
  }
}
