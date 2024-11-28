import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { environment } from 'environments/environment';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-vendor-credit-insurance-group-paging',
  templateUrl: './vendor-credit-insurance-group-paging.component.html'
})
export class VendorCreditInsuranceGroupPagingComponent implements OnInit {

  readonly AddLink: string = NavigationConstant.CREDIT_INS_GROUP_ADD_EDIT;
  MrVendorCategoryCode: string = 'CRD_INSCO_BRANCH'
  constructor(private UrlConstantNew: UrlConstantNew) { }
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorGroup.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorGroup.json";
    this.inputPagingObj.title = "Credit Insurance Group"
    var critObj = new CriteriaObj();
    critObj.propName = "VG.MR_VENDOR_CATEGORY_CODE";
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = this.MrVendorCategoryCode;
    this.inputPagingObj.addCritInput.push(critObj);
  }

}
