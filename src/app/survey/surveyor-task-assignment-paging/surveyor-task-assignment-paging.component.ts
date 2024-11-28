import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-surveyor-task-assignment-paging',
  templateUrl: './surveyor-task-assignment-paging.component.html',

})
export class SurveyorTaskAssignmentPagingComponent implements OnInit {

  readonly AddLink: string = NavigationConstant.SURVEYOR_PAGING;

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  AppId: number;
  AppNo: number;

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj(this.UrlConstantNew);
    this.inputPagingObj.apiQryPaging = this.UrlConstantNew.GetPagingObjectBySQL;
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyTaskAssignment.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyTaskAssignment.json";
    
  }

  viewApp(event: any) {
    this.AppNo = event['RowObj'].TransactionRefNo;
    window.open(this.UrlConstantNew.env.losR3Web + "/View/AppView?AppId=" + this.AppId + "&AppNo=" + this.AppNo, "_blank");
  }

}
