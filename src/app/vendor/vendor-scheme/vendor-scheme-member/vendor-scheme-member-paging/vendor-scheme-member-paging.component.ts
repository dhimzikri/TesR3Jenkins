import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from "app/shared/model/criteria-obj.model";
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-scheme-member-paging',
  templateUrl: './vendor-scheme-member-paging.component.html'
})
export class VendorSchemeMemberPagingComponent implements OnInit {

  VendorSchmId: string;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  MrVendorCategoryCode: any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.VENDOR_SCHM_MBR_ADD;
  readonly CancelLink: string = NavigationConstant.VENDOR_PAGING;
  constructor(private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VendorSchmId = queryParams["VendorSchmId"];
      this.MrVendorCategoryCode = queryParams["MrVendorCategoryCode"];
  })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorSchemeMember.json";

    this.inputPagingObj._url = "./assets/ucpaging/searchVendorSchemeMember.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorSchemeMember.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteVendorSchmMember;

    var critInput = new CriteriaObj();
    critInput.propName = "vsm.VENDOR_SCHM_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.VendorSchmId;
    this.inputPagingObj.addCritInput.push(critInput);
  }

}
