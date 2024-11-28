import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';


@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  providers: [DecimalPipe]
})
export class ProvinceComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  
  readonly AddLink: string = NavigationConstant.CS_REF_PROVINCE_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchProvince.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchProvince.json";
 

    var critObj = new CriteriaObj();
    critObj.DataType = 'text';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'TYPE';
    critObj.value = 'PRV';
    this.inputPagingObj.addCritInput.push(critObj);
  }
}
