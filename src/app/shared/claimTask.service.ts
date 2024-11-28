
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie";
import { AdInsHelper } from "./AdInsHelper";
import { CommonConstant } from "./constant/CommonConstant";
import { UrlConstantNew } from "./constant/URLConstantNew";
import { ClaimWorkflowObj } from "./model/claim-workflow-obj.model";
import { CurrentUserContext } from "./model/current-user-context.model";
import { ClaimTaskModelObj } from "./model/v2/claim-task-model-obj.model";

@Injectable()
export class ClaimTaskService{
  currentUserContext : CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
  
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private UrlConstantNew: UrlConstantNew) { }


  ClaimTask(WfTaskListId: number){
    let wfClaimObj: ClaimWorkflowObj = new ClaimWorkflowObj();
    wfClaimObj.pWFTaskListID = WfTaskListId.toString();
    wfClaimObj.pUserID = this.currentUserContext[CommonConstant.USER_NAME];
    this.http.post(this.UrlConstantNew.ClaimTask, wfClaimObj).subscribe(
      () => {
      });
  }

  ClaimTaskV2(WfTaskListId: string){
    let ClaimTaskObj: ClaimTaskModelObj = new ClaimTaskModelObj();
    ClaimTaskObj.TaskId = WfTaskListId;
    ClaimTaskObj.UserId = this.currentUserContext[CommonConstant.USER_NAME];
    this.http.post(this.UrlConstantNew.ClaimTaskV2, ClaimTaskObj).subscribe(
      () => {
      });
  }
}