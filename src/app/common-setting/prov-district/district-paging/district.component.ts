import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { ActivatedRoute } from '@angular/router';
import { RefProvDistrictObj } from 'app/shared/model/ref-prov-district-obj.model';
import { HttpClient } from '@angular/common/http';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';



@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  providers: [DecimalPipe]
})
export class DistrictComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  parentId: any;
  arrCrit: any;
  resultData: any;
  provinceName: any;
  provinceCode: any;
  refProvDistrictObj: RefProvDistrictObj;
  getUrl: any;
  
  readonly CancelLink: string = NavigationConstant.CS_REF_PROVINCE_PAGING;
  readonly AddLink: string = NavigationConstant.CS_DISTRICT_DETAIL;
  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.getUrl = this.UrlConstantNew.GetRefProvDistrictById;
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['refProvDistrictId'] != null) {
        this.parentId = queryParams['refProvDistrictId'];
      }
    });
  }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchDistrict.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchDistrict.json";


    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.DataType = 'text';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'TYPE';
    critObj.value = 'DIS';
    this.arrCrit.push(critObj);
    critObj = new CriteriaObj();
    critObj.DataType = 'number';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'PARENT_ID';
    critObj.value = this.parentId;
    this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;

    this.refProvDistrictObj = new RefProvDistrictObj();
    this.refProvDistrictObj.RefProvDistrictId = this.parentId;
    this.http.post(this.getUrl, {Id : this.parentId}).subscribe(
      response => {
        this.resultData = response;
      }
    );
  }
}
