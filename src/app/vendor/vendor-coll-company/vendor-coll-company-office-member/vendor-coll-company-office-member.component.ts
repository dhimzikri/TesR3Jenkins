import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-vendor-coll-company-office-member',
  templateUrl: './vendor-coll-company-office-member.component.html'
})
export class VendorCollCompanyOfficeMemberComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  VendorId: string;
  objPassing: any = {};
  MrVendorCategoryCode: string = "";
  Type: string = "";

  readonly CancelLink: string = NavigationConstant.VENDOR_PAGING;
  readonly AddLink: string = NavigationConstant.VENDOR_COLL_COMPANY_MBR_ADD;
  constructor(private route: ActivatedRoute, private http : HttpClient, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.objPassing["VendorId"] = queryParams['VendorId'];
      this.objPassing["VendorEmpId"] = queryParams['VendorEmpId'];
      this.VendorId = queryParams['VendorId'];
    });
  }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorOfficeMember.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorOfficeMember.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteVendorOfficeMember;

    this.inputPagingObj.addCritInput = new Array();
    var critObj = new CriteriaObj();
    critObj.propName = "VOM.VENDOR_ID";
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = this.VendorId;
    this.inputPagingObj.addCritInput.push(critObj);

    this.http.post(this.UrlConstantNew.GetVendorBranchAndVendorTaxAddrByVendorId, { Id: this.VendorId }).subscribe(
      (response) => {
        this.MrVendorCategoryCode = response["VendorObj"]["MrVendorCategoryCode"];
      }
    );
  }

}
