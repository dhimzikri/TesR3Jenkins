import { Component, OnInit } from '@angular/core';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { IntegrationObj } from 'app/shared/model/library/integration-obj.model';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { RequestTaskModelObj } from 'app/shared/model/v2/request-task-model-obj.model';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-customer-update-master',
  templateUrl: './customer-update-master.component.html',
  styles: []
})
export class CustomerUpdateMasterComponent implements OnInit {
  inputPagingObj: UcPagingObj= new UcPagingObj(this.UrlConstantNew);
  IntegrationObj: IntegrationObj = new IntegrationObj();
  RequestTaskModel: RequestTaskModelObj = new RequestTaskModelObj();

  constructor(private cookieService: CookieService, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    let UserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));

    this.inputPagingObj._url = "./assets/ucpaging/searchUpdateMasterCust.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchUpdateMasterCust.json";
    
    if(environment.isCore){
      this.inputPagingObj._url = "./assets/ucpaging/V2/searchUpdateMasterCustV2.json";
      this.inputPagingObj.pagingJson = "./assets/ucpaging/V2/searchUpdateMasterCustV2.json";
      this.inputPagingObj.isJoinExAPI = true;
      
      this.RequestTaskModel.ProcessKey = CommonConstant.WF_CODE_UPD_CUST_MANUAL;
      this.RequestTaskModel.TaskDefinitionKey = CommonConstant.ACT_CODE_UPD_CUST_DATA;
      this.RequestTaskModel.OfficeRoleCodes = [UserAccess[CommonConstant.ROLE_CODE],
                                               UserAccess[CommonConstant.OFFICE_CODE],
                                               UserAccess[CommonConstant.ROLE_CODE] + "-" + UserAccess[CommonConstant.OFFICE_CODE]];
      
      this.IntegrationObj.baseUrl = this.UrlConstantNew.GetAllTaskWorkflow;
      this.IntegrationObj.requestObj = this.RequestTaskModel;
      this.IntegrationObj.leftColumnToJoin = "RefNo";
      this.IntegrationObj.rightColumnToJoin = "ProcessInstanceBusinessKey";
      this.inputPagingObj.integrationObj = this.IntegrationObj;
    }
  }
}
