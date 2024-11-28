import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-edit-main-data-paging-x',
  templateUrl: './edit-main-data-paging-x.component.html'
})
export class EditMainDataPagingXComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) { }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/impl/ucpaging/editMainDataCustomerX.json";
    this.inputPagingObj.pagingJson = "./assets/impl/ucpaging/editMainDataCustomerX.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteAssetAccessory;
    this.inputPagingObj.addCritInput = [];
    var critObj = new CriteriaObj();
    critObj.propName = "C.IS_CUSTOMER";
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = '1';
    this.inputPagingObj.addCritInput.push(critObj);
  }
}
