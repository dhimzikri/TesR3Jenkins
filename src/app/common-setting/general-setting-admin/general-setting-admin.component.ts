import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';

@Component({
  selector: 'app-general-setting-admin',
  templateUrl: './general-setting-admin.component.html',
  styles: []
})
export class GeneralSettingAdminComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchGeneralSettingAdmin.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchGeneralSettingAdmin.json";

    var critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'IS_UPDATABLE';
    critObj.value = '0';
    this.inputPagingObj.addCritInput.push(critObj);
  }

}
