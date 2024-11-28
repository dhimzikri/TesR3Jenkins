import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { CriteriaObj } from "app/shared/model/criteria-obj.model";
import { UcPagingObj } from "app/shared/model/uc-paging-obj.model";
import { UcViewGenericObj } from "app/shared/model/uc-view-generic-obj.model";
import { NavigationConstant } from "app/shared/NavigationConstant";
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";
import { NgxRouterService } from "@adins/fe-core";

@Component({
  selector: 'app-office-group-member',
  templateUrl: './office-group-member.component.html'
})
export class OfficeGroupMemberComponent implements OnInit {

  RefOfficeId: string;
  CenterGrpId: string;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.OFFICE_PAGING;
  readonly AddLink: string = NavigationConstant.OFFICE_GROUP_MEMBER_ADD;
  constructor(private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.RefOfficeId = queryParams["RefOfficeId"];
      this.CenterGrpId = queryParams["CenterGrpId"];
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewOfficeCenterGrpMbr.json";

    this.inputPagingObj._url = "./assets/ucpaging/searchCenterGrpMbr.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCenterGrpMbr.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteCenterGrpOfficeMember;

    var critInput = new CriteriaObj();
    critInput.propName = "RO.REF_OFFICE_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefOfficeId;
    this.inputPagingObj.addCritInput.push(critInput);
  }
}