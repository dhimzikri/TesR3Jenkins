import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ReqGetVerfResultHObj } from 'app/shared/model/request/verf-result-h/req-verf-result-h-obj.model';
import { ResSrvyTaskObj } from 'app/shared/model/response/srvy-task/res-srvy-task.model';
import { ResVerfResultHCustomObj } from 'app/shared/model/response/verf-result-h/res-verf-result-h-custom-obj.model';

@Component({
  selector: 'app-view-survey-task-detail',
  templateUrl: './view-survey-task-detail.component.html'
})
export class ViewSurveyTaskDetailComponent implements OnInit {

  @Input() SrvyTaskId: number;
  isMobile: boolean = false;
  ListResVerfResultHCustomObj: Array<ResVerfResultHCustomObj> = new Array<ResVerfResultHCustomObj>();
  ResSrvyTaskObj: ResSrvyTaskObj = new ResSrvyTaskObj();
  ReqVerfResultHObj: ReqGetVerfResultHObj = new ReqGetVerfResultHObj();
  ReqByIdObj: GenericObj = new GenericObj();
  ReqByCodeObj: GenericObj = new GenericObj();
  htmlCode: string;
  mobileassignmentid: number;
  ViewSurveyFromMobile: string;
  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew) { }

  async ngOnInit() {
    await this.getSrvyTask();

    if(this.ResSrvyTaskObj.MobileAssignmentId != null && this.ResSrvyTaskObj.MobileAssignmentId != 0){
      await this.getHtmlCodeFromMobile();
      this.isMobile = true;
    }else{
      await this.getVerfResult();
      this.isMobile = false;
    }
  }

  async getVerfResult(){
    this.ReqVerfResultHObj.MrAddrTypeCode = this.ResSrvyTaskObj.MrSrvyObjTypeCode;
    this.ReqVerfResultHObj.TrxRefNo = this.ResSrvyTaskObj.SrvyTaskNo;
    await this.http.post(this.UrlConstantNew.GetVerfResultHByTrxRefNoAndMrAddrTypeCode, this.ReqVerfResultHObj).toPromise().then(
      (response)=>{
        if(response["VerfResultHId"] !=null || response["VerfResultId"] != 0){
          this.ReqByIdObj = new GenericObj();
          this.ReqByIdObj.Id = response["VerfResultHId"];

          this.http.post(this.UrlConstantNew.GetListVerfResultDInQuestionGrp, this.ReqByIdObj).toPromise().then(
            (response)=>{
              if(response != null){
                this.ListResVerfResultHCustomObj = response[CommonConstant.ReturnObj];
                console.log(this.ListResVerfResultHCustomObj);
              }
            }
          )
        }
      }
    )
  }

  async getSrvyTask(){
    this.ReqByIdObj.Id = this.SrvyTaskId;
    await this.http.post(this.UrlConstantNew.GetSrvyTaskBySrvyTaskId, this.ReqByIdObj).toPromise().then(
      (response : ResSrvyTaskObj)=>{
        // this.MobileAssignmentId = response["MobileAssignmentId"];
        // this.Result = response["Result"];
        // this.Notes = response["Notes"];
        // this.SrvyTaskNo = response["SrvyTaskNo"];
        this.ResSrvyTaskObj = response;
      }
    )
  }

    async getHtmlCodeFromMobile(){
    await this.http.post(this.UrlConstantNew.GetUrlViewSurveyFromMobile, this.ReqByIdObj).toPromise().then(
      (response) => {
        this.ViewSurveyFromMobile = response["UrlViewSurvey"];
      }
    );
  }
}
