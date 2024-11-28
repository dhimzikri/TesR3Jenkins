import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VendorGroupObj } from 'app/shared/model/vendor-group-obj.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';


@Component({
  selector: 'app-vendor-group-view',
  templateUrl: './vendor-group-view.component.html'
})
export class VendorGroupViewComponent implements OnInit {
  VendorGrpId: any;
  vendorGrpObj: VendorGroupObj;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  MrVendorCategoryCode: any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.VENDOR_GRP_MBR_ADD;
  CancelLink: string = NavigationConstant.VENDOR_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['VendorGrpId'] != null) {
        this.VendorGrpId = queryParams['VendorGrpId'];
      }
      if (queryParams['MrVendorCategoryCode'] != null) {
        this.MrVendorCategoryCode = queryParams['MrVendorCategoryCode'];
      }
    });

    if(this.MrVendorCategoryCode == "CRD_INSCO_BRANCH"){
      this.CancelLink = NavigationConstant.CREDIT_INS_GROUP_PAGING;
    }
  }


  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorGrp.json";
    
    this.inputPagingObj._url = "./assets/ucpaging/searchVendor.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendor.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteVendorGrpMemberById;

    var critInput = new CriteriaObj();
    critInput.propName = "C.VENDOR_GRP_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.VendorGrpId;
    this.inputPagingObj.addCritInput.push(critInput);

    var critInput = new CriteriaObj();
    critInput.propName = "A.MR_VENDOR_CATEGORY_CODE";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.MrVendorCategoryCode;
    this.inputPagingObj.addCritInput.push(critInput);

  }
}
