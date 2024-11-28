import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-customer-paging',
  templateUrl: './customer-paging.component.html',
  styleUrls: []
})
export class CustomerPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  readonly AddLinkPersonal: string = NavigationConstant.CUST_PERSONAL_MAIN_INFO;
  readonly AddLinkCoy: string = NavigationConstant.CUST_COY_MAIN_INFO;
  readonly AddLinkNewCust: string = NavigationConstant.CUST_NEW_FORM;
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchCustomer.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCustomer.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteAssetAccessory;

    this.inputPagingObj.addCritInput = [];
    var critObj = new CriteriaObj();
    critObj.propName = "C.IS_CUSTOMER";
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = '1';
    this.inputPagingObj.addCritInput.push(critObj);
  }

}
