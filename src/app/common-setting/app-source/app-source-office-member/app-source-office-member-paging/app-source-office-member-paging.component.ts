import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj, WhereValueObj } from 'app/shared/model/uc-paging-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';


@Component({
  selector: 'app-app-source-office-member-paging',
  templateUrl: './app-source-office-member-paging.component.html'
})
export class AppSourceOfficeMemberPagingComponent implements OnInit {

  //param: any;
  RefAppSrcId: string;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  constructor(private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.RefAppSrcId = queryParams["RefAppSrcId"];
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewAppSource.json";

    this.inputPagingObj = new UcPagingObj(this.UrlConstantNew);
    this.inputPagingObj._url = "./assets/ucpaging/searchAppSourceOfficeMember.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAppSourceOfficeMember.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteRefAppSrcOfficeMbr;

    var whereValue = new WhereValueObj();
    whereValue.property = "RefAppSrcId";
    whereValue.value = this.RefAppSrcId;
    this.inputPagingObj.whereValue.push(whereValue);
  }

}
