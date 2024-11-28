import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ApprovalObj } from 'app/shared/model/approval/approval-obj.model';
import { UcInputApprovalGeneralInfoObj } from 'app/shared/model/uc-input-approval-general-info-obj.model';
import { UcInputApprovalHistoryObj } from 'app/shared/model/uc-input-approval-history-obj.model';
import { UcInputApprovalObj } from 'app/shared/model/uc-input-approval-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';

@Component({
  selector: 'app-vendor-grading-approval-detail',
  templateUrl: './vendor-grading-approval-detail.component.html',
 // providers: [NGXToastrService]
})
export class VendorGradingApprovalDetailComponent implements OnInit {

  VendorGradingHistId: number;
  VendorGradingHistNo : string;
  taskId: number;
  instanceId: number;
  inputObj: any;
  viewVendorBranchObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
   
  InputApvObj : UcInputApprovalObj;
  InputApprovalHistoryObj : UcInputApprovalHistoryObj;
  UcInputApprovalGeneralInfoObj : UcInputApprovalGeneralInfoObj;
  IsReady: boolean = false;
  ApvReqId: number;
  
  constructor(private router: Router, 
    private route: ActivatedRoute,
     private toastr: NGXToastrService,
     private http: HttpClient, 
     private ngxRouter: NgxRouterService,
     private UrlConstantNew: UrlConstantNew
     ) {

    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
 
      if(queryParams["VendorGradingHistId"] != null) {
        this.VendorGradingHistId = queryParams["VendorGradingHistId"];
        this.VendorGradingHistNo = queryParams["VendorGradingHistNo"];
      }

      if(queryParams["TaskId"] != null){
        this.taskId = queryParams["TaskId"];
      }

      if(queryParams["InstanceId"] != null){
        this.instanceId = queryParams["InstanceId"];
      }

      if(queryParams["ApvReqId"] != null){
        this.ApvReqId = queryParams["ApvReqId"];
      }
    });
  }

  ngOnInit() {
    this.viewVendorBranchObj.viewInput = "./assets/ucviewgeneric/viewVendorGradingMainInformation.json";
    
    var ApvHoldObj = new ApprovalObj();
    ApvHoldObj.TaskId = this.taskId

    this.HoldTask(ApvHoldObj);
    this.initInputApprovalObj();
  }

  HoldTask(obj : any){
    this.http.post(this.UrlConstantNew.ApvHoldTaskUrl, obj).subscribe(
      (response)=>{
      },
      (error) => {
        this.router.navigate(["/Vendor/VendorGrading/Approval/Paging"]);
      }
    )
  }

  onAvailableNextTask(event : any)
  {
    
  }

  onApprovalSubmited(event : any)
  {
    let obj = {
      Tasks: event.Tasks
    }
    this.http.post(this.UrlConstantNew.env.FoundationR3Url + this.UrlConstantNew.SubmitApproval, obj).subscribe(
      (response)=>{
        this.toastr.successMessage(response["Message"]);
        this.router.navigate(["/Vendor/VendorGrading/Approval/Paging"]);
      }
    );
  }

  initInputApprovalObj(){

    this.UcInputApprovalGeneralInfoObj = new UcInputApprovalGeneralInfoObj(this.UrlConstantNew);
    this.UcInputApprovalGeneralInfoObj.PathUrl = "/Approval/GetSingleTaskInfo";
    this.UcInputApprovalGeneralInfoObj.TaskId = this.taskId;
    
    this.InputApprovalHistoryObj = new UcInputApprovalHistoryObj(this.UrlConstantNew);
    this.InputApprovalHistoryObj.PathUrl = this.UrlConstantNew.GetTaskHistory;
    this.InputApprovalHistoryObj.RequestId = this.ApvReqId;

    this.InputApvObj = new UcInputApprovalObj(this.UrlConstantNew);
    this.InputApvObj.TaskId = this.taskId;
    this.InputApvObj.RequestId = this.ApvReqId;
    this.InputApvObj.TrxNo = this.VendorGradingHistNo;
    this.IsReady = true; 
  }

  onCancelClick()
  {
    this.router.navigate(["/Vendor/VendorGrading/Approval/Paging"]);
  }

  GetCallBack(e : any){
    // this.adInsHelperService.OpenProdOfferingViewByCodeAndVersion(e.ViewObj.ProdOfferingCode, e.ViewObj.ProdOfferingVersion);
  }
}
