import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ReqUpdateSrvyTaskAndAddVerfResultHDObj } from 'app/shared/model/request/srvy-task/req-update-srvy-task-and-add-verf-result-h-d-obj.model';
import { ReqGetVerfResultObj } from 'app/shared/model/request/verf-result/req-get-verf-result-obj.model';
import { ReqGetVerfResultHObj } from 'app/shared/model/request/verf-result-h/req-verf-result-h-obj.model';
import { ResSrvyTaskObj } from 'app/shared/model/response/srvy-task/res-srvy-task.model';
import { ResVerfResultHByTrxRefNoAndMrAddrTypeCodeObj } from 'app/shared/model/response/verf-result-h/res-verf-result-h-by-trx-ref-no-and-mr-addr-type-code-obj.model';
import { VerfQuestionAnswerCustomObj } from 'app/shared/model/verf-question-answer/verf-question-answer-custom.model';
import { VerfResultDObj } from 'app/shared/model/verf-result-d/VerfResultD.model';
import { VerifResulHDetailObj } from 'app/shared/model/verf-result-h/verf-result-h-detail-obj.model';
import { VerfResultObj } from 'app/shared/model/verf-result-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CookieService } from 'ngx-cookie';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-survey-task-result-detail',
  templateUrl: './survey-task-result-detail.component.html'
})
export class SurveyTaskResultDetailComponent implements OnInit {
  @Input() SrvyTaskId:number;
  @Input() SrvyOrderId: number;
  @Input() SurveyorName: string;
  @Input() Type: string;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  ResultObj: Array<KeyValueObj>;
  ResVerfResultHObj: ResVerfResultHByTrxRefNoAndMrAddrTypeCodeObj = new ResVerfResultHByTrxRefNoAndMrAddrTypeCodeObj();
  ResVerfResultDObj: any;
  ResSrvyTaskObj: ResSrvyTaskObj = new ResSrvyTaskObj();
  ReqGenericObj: GenericObj = new GenericObj();
  QuestionObj: VerfQuestionAnswerCustomObj;
  VerfResultHD: VerifResulHDetailObj;
  ReqSrvyTaskAndAddVerfResultHDObj: ReqUpdateSrvyTaskAndAddVerfResultHDObj = new ReqUpdateSrvyTaskAndAddVerfResultHDObj();
  addVerifResultObj: VerfResultObj;
  ReqGetVerfResultHObj: ReqGetVerfResultHObj = new ReqGetVerfResultHObj();
  PageType: string = "Add";

  SrvyTaskForm = this.fb.group({
    MrVerfResultHStatCode: ['', [Validators.required, Validators.maxLength(50)]],
    Notes: ['', [Validators.required, Validators.maxLength(4000)]],
    QuestionObjs: new FormArray([])
  });


  ListVerfAnswer = [];
  SrvyOrderNo: string = "";
  VerfSchemeHId: number = 0;
  VerfResultId: number = 0;
  LobCode: string = "";
  CustName: string ="";
  TrxRefNo: string = "";
  IsDataReady: boolean = false;
  isQuestionLoaded: boolean = true;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
    });
  }

  async ngOnInit(): Promise<void> {
    this.bindResultObj();
    await this.getSrvyOrder();
    await this.getSrvyOrderData();
    await this.GetVerfResultData();
    await this.getSrvyTask();
    await this.getQuestion();
    await this.getData();
  }

  dictAnswer: { [id: string]: string } = {};
  dictNotes: { [id: string]: string } = {};
  async getData(){
    this.ReqGetVerfResultHObj.TrxRefNo = this.ResSrvyTaskObj.SrvyTaskNo;
    this.ReqGetVerfResultHObj.MrAddrTypeCode = this.ResSrvyTaskObj.MrSrvyObjTypeCode;
    await this.http.post(this.UrlConstantNew.GetVerfResultHDsByTrxRefNoAndMrAddrTypeCode, this.ReqGetVerfResultHObj).toPromise().then(
      (response) => {
        if(response["VerfResultH"] != null){
          this.ResVerfResultHObj = response["VerfResultH"];
          this.ResVerfResultDObj = response["VerfResultD"];

          for(let a=0;a<this.ResVerfResultDObj.length;a++){
            const element = this.ResVerfResultDObj[a];
            this.dictAnswer[element.VerfQuestionText] = element.Answer;
            this.dictNotes[element.VerfQuestionText] = element.Notes;
          }

          this.SrvyTaskForm.patchValue({
            MrVerfResultHStatCode: this.ResVerfResultHObj.MrVerfResultHStatCode,
            Notes: this.ResVerfResultHObj.Notes
          })

          for (let i = 0; i < this.SrvyTaskForm.controls["QuestionObjs"]["controls"].length; i++) {
            for (let j = 0; j < this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"].length; j++) {
              var checkName = this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"]["controls"]["VerfQuestionText"].value;
              
              this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"].patchValue({
                Answer: this.dictAnswer[checkName],
                Notes: this.dictNotes[checkName]
              })
            }
          }

          this.PageType = "Edit";
        }
      }
    );
  }

  async GetVerfResultData() {
    let verfResObj: ReqGetVerfResultObj = { TrxRefNo: this.SrvyOrderNo, MrVerfTrxTypeCode: CommonConstant.VerfTrxTypeCodeSurvey, };
    await this.http.post(this.UrlConstantNew.GetVerfResultByTrxRefNoAndVerfTrxTypeCode, verfResObj).toPromise().then(
      (response) => {
        this.VerfResultId = response["VerfResultId"];
      }
    );
    if (this.VerfResultId == 0) {
      var Business_Date = new Date(AdInsHelper.GetCookie(this.cookieService, CommonConstant.BUSINESS_DATE));
      var datePipe = new DatePipe("en-US");
      var value = datePipe.transform(Business_Date, "yyyy-MM-dd");
      var businessDt = new Date(value);

      this.addVerifResultObj = new VerfResultObj();

      this.addVerifResultObj.TrxRefNo = this.SrvyOrderNo;
      this.addVerifResultObj.VerfDt = businessDt;
      this.addVerifResultObj.EmpNo = "-";
      this.addVerifResultObj.MrVerfResultStatCode = CommonConstant.VerfResultStatCodeNew;
      this.addVerifResultObj.MrVerfTrxTypeCode = CommonConstant.VerfTrxTypeCodeSurvey;
      this.addVerifResultObj.LobCode = this.LobCode;
      this.addVerifResultObj.LobName = this.LobCode;
      this.addVerifResultObj.Notes = "-";

      await this.http.post(this.UrlConstantNew.AddVerfResult, this.addVerifResultObj, AdInsConstant.SpinnerOptions).toPromise().then(
        (response) => {
          this.VerfResultId = response["Id"];
        }
      );
    }
  }  

  async getSrvyOrderData(){
    this.ReqGenericObj.Id = this.SrvyOrderId;
    await this.http.post(this.UrlConstantNew.GetSrvyOrderDataBySrvyOrderId, this.ReqGenericObj).toPromise().then(
      (response) => {
        this.LobCode = response["LobCode"];
      });
  }

  async getSrvyOrder(){
    this.ReqGenericObj.Id = this.SrvyOrderId;
    await this.http.post(this.UrlConstantNew.GetSrvyOrderBySrvyOrderId, this.ReqGenericObj).toPromise().then(
      (response) => {
        this.TrxRefNo = response["TrxRefNo"];
        this.CustName = response["CustName"];
        this.SrvyOrderNo = response["SrvyOrderNo"];
      });
  }

  async getSrvyTask(){
    this.ReqGenericObj.Id = this.SrvyTaskId;
    await this.http.post(this.UrlConstantNew.GetSrvyTaskBySrvyTaskId, this.ReqGenericObj).toPromise().then(
      (response:ResSrvyTaskObj) => {
        this.ResSrvyTaskObj = response;
      });

      this.IsDataReady = true;
  }

  async getQuestion(){
    this.ReqGenericObj = new GenericObj();
    this.ReqGenericObj.Id = this.ResSrvyTaskObj.SrvyFormSchmId;

    await this.http.post(this.UrlConstantNew.GetSrvyFormSchmBySrvyFormSchmId, this.ReqGenericObj).toPromise().then(
      (response) => {
        if(response["VerfSchemeHId"] != null){
        this.VerfSchemeHId = response["VerfSchemeHId"];
      

      this.ReqGenericObj = new GenericObj();
      this.ReqGenericObj.Id = this.VerfSchemeHId; 
      this.http.post(this.UrlConstantNew.GetVerfQuestionAnswerListByVerfSchemeHId, this.ReqGenericObj).toPromise().then(
      (response) => {
        if(response["ReturnObject"]!=null){
          this.QuestionObj = response[CommonConstant.ReturnObj];
          this.GenerateFormVerfQuestion();
        }else{
          this.isQuestionLoaded = false;
        }
      });
      }
    });
  }

  bindResultObj() {
    this.http.post(this.UrlConstantNew.GetListActiveRefStatusByStatusGrpCode, { Code: CommonConstant.StatusGrpVerfResultStat }).subscribe(
      (response) => {
        this.ResultObj = response[CommonConstant.ReturnObj];
        if (this.ResultObj.length > 0) {
          this.SrvyTaskForm.patchValue({
            MrVerfResultHStatCode: this.ResultObj[0].Key
          });

        }
      }
    );
  }

  GenerateFormVerfQuestion() {
    var grpListObj = this.QuestionObj.VerfQuestionAnswerListObj;

    for (let i = 0; i < grpListObj.length; i++) {
      var QuestionGrp = this.fb.group({
        VerfQuestionGrpCode: grpListObj[i].VerfQuestionGrpCode,
        VerfQuestionGrpName: grpListObj[i].VerfQuestionGrpName,
        VerfQuestionAnswerList: this.fb.array([])
      }) as FormGroup;
      (this.SrvyTaskForm.controls["QuestionObjs"] as FormArray).push(QuestionGrp);
      var ResultGrp = this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"] as FormArray;
      var QuestionList = grpListObj[i].verfQuestionAnswerList;

      this.ListVerfAnswer.push([]);
      if (QuestionList.length != 0) {
        for (let j = 0; j < QuestionList.length; j++) {
          var QuestionResultGrp = this.fb.group({
            QuestionGrp: this.fb.group({
              VerfQuestionAnswerId: QuestionList[j].VerfQuestionAnswerId,
              RefVerfAnswerTypeId: QuestionList[j].RefVerfAnswerTypeId,
              VerfQuestionCode: QuestionList[j].VerfQuestionCode,
              VerfQuestionText: QuestionList[j].VerfQuestionText,
              VerfAnswer: QuestionList[j].VerfAnswer,
              IsActive: QuestionList[j].IsActive,
              VerfSchemeHId: QuestionList[j].VerfSchemeHId,
              VerfQuestionGrpCode: QuestionList[j].VerfQuestionGrpCode,
              VerfQuestionGrpName: QuestionList[j].VerfQuestionGrpName,
              VerfAnswerTypeCode: QuestionList[j].VerfAnswerTypeCode,
              VerfAnswerTypeDescr: QuestionList[j].VerfAnswerTypeDescr
            }),
            ResultGrp: this.fb.group({
              VerfResultDId: 0,
              VerfResultHId: 0,
              VerfQuestionAnswerId: QuestionList[j].VerfQuestionAnswerId,
              VerfQuestionText: QuestionList[j].VerfQuestionText,
              Answer: "",
              Notes: "",
              SeqNo: j + 1,
              Score: 0,
              VerfQuestionGroupCode: grpListObj[i].VerfQuestionGrpCode
            })
          }) as FormGroup;
          if (QuestionList[j].VerfAnswerTypeCode == CommonConstant.VerfAnswerTypeCodeDdl) {
            if (QuestionList[j].VerfAnswer != "") {
              var ddlList = QuestionList[j].VerfAnswer.split(";");
              this.ListVerfAnswer[i].push(ddlList);
              QuestionResultGrp.controls.ResultGrp.patchValue({
                Answer: this.ListVerfAnswer[i][j][0]
              })
            } else {
              this.ListVerfAnswer[i].push("");
            }
            QuestionResultGrp.controls.ResultGrp["controls"].Answer.setValidators([Validators.required])
          } else if (QuestionList[j].VerfAnswerTypeCode == CommonConstant.VerfAnswerTypeCodeUcInputNumber) {
            QuestionResultGrp.controls.ResultGrp["controls"].Answer.setValidators([Validators.required]);
            this.ListVerfAnswer[i].push("");
          } else {
            QuestionResultGrp.controls.ResultGrp["controls"].Answer.setValidators([Validators.required])
            this.ListVerfAnswer[i].push("");
          }
          ResultGrp.push(QuestionResultGrp);
        }
        this.ChangeResult();
      }
    }
  }

  ChangeResult() {
    if (this.SrvyTaskForm.controls["MrVerfResultHStatCode"].value == CommonConstant.VerfResultStatSuccess) {
      for (let i = 0; i < this.SrvyTaskForm.controls["QuestionObjs"]["controls"].length; i++) {
        for (let j = 0; j < this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"].length; j++) {
          this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"]["controls"]["Answer"].setValidators([Validators.required]);
          this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"]["controls"]["Answer"].updateValueAndValidity();
        }
      }
    }
    else {
      for (let i = 0; i < this.SrvyTaskForm.controls["QuestionObjs"]["controls"].length; i++) {
        for (let j = 0; j < this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"].length; j++) {
          this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"]["controls"]["Answer"].clearValidators();
          this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"]["controls"]["Answer"].updateValueAndValidity();
        }
      }
    }
  }

  setSurveyVerifData() {

    var businessDt = new Date(AdInsHelper.GetCookie(this.cookieService, CommonConstant.BUSINESS_DATE_RAW));
    var todaydate = new Date();
    businessDt.setHours(todaydate.getHours(), todaydate.getMinutes(), todaydate.getSeconds());
    var usertimezone = businessDt.getTimezoneOffset() * 60000;
    businessDt = new Date(businessDt.getTime() - usertimezone);

    this.VerfResultHD = new VerifResulHDetailObj();
    this.VerfResultHD.VerfResultDListObj = new Array<VerfResultDObj>();
    this.VerfResultHD.VerfResultHObj.VerfResultId = this.VerfResultId;
    this.VerfResultHD.VerfResultHObj.VerfSchemeHId = this.VerfSchemeHId;
    this.VerfResultHD.VerfResultHObj.MrVerfObjectCode = this.Type;
    this.VerfResultHD.VerfResultHObj.MrVerfSubjectRelationCode = this.Type;
    this.VerfResultHD.VerfResultHObj.MrVerfSubjectRelationName = this.ResSrvyTaskObj.CustName;
    this.VerfResultHD.VerfResultHObj.VerfDt = businessDt;
    this.VerfResultHD.VerfResultHObj.MrVerfResultHStatCode = this.SrvyTaskForm.controls["MrVerfResultHStatCode"].value;
    this.VerfResultHD.VerfResultHObj.Phn = this.ResSrvyTaskObj.CustPhone;
    this.VerfResultHD.VerfResultHObj.PhnType = CommonConstant.VerfResultPhnTypeMobile;
    this.VerfResultHD.VerfResultHObj.Notes = this.SrvyTaskForm.controls["Notes"].value;
    this.VerfResultHD.VerfResultHObj.Addr = this.ResSrvyTaskObj.Addr;
    this.VerfResultHD.VerfResultHObj.MrAddrTypeCode = this.ResSrvyTaskObj.MrSrvyObjTypeCode;
    this.VerfResultHD.VerfResultHObj.TrxRefNo = this.ResSrvyTaskObj.SrvyTaskNo;
    this.VerfResultHD.VerfResultHObj.RowVersion = this.ResSrvyTaskObj.RowVersion;

    if (this.SrvyTaskForm.controls["MrVerfResultHStatCode"].value == CommonConstant.VerfResultStatSuccess) {
      for (let i = 0; i < this.SrvyTaskForm.controls["QuestionObjs"].value.length; i++) {
        var currGrp = this.SrvyTaskForm.controls["QuestionObjs"].value[i].VerfQuestionAnswerList;
        for (let j = 0; j < currGrp.length; j++) {
          var currAnswer = currGrp[j].ResultGrp;
          var question = new VerfResultDObj();
          question.VerfQuestionAnswerId = currAnswer.VerfQuestionAnswerId;
          question.VerfQuestionText = currAnswer.VerfQuestionText;
          question.Answer = currAnswer.Answer;
          question.Notes = currAnswer.Notes;
          question.SeqNo = currAnswer.SeqNo;
          question.VerfQuestionGroupCode = currAnswer.VerfQuestionGroupCode;
          this.VerfResultHD.VerfResultDListObj.push(question);
        }
      }
    }
  }

  Save(){
    if (this.isQuestionLoaded == false) {
      this.toastr.warningMessage("Can't process further because questions are not loaded");
    }
    else {
      if(this.PageType == "Add"){
        this.setSurveyVerifData();
        this.ReqSrvyTaskAndAddVerfResultHDObj.SrvyTaskId = this.SrvyTaskId;
        this.ReqSrvyTaskAndAddVerfResultHDObj.VerfResultHD = this.VerfResultHD;
        this.http.post(this.UrlConstantNew.UpdateSrvyTaskAndAddVerfResultH, this.ReqSrvyTaskAndAddVerfResultHDObj, AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
            this.toastr.successMessage(response["message"]);

            if(response["StatusCode"] == '200'){
              this.outputTab.emit({ stepMode: "next" });
            }
          });

      }else if(this.PageType == "Edit"){
        this.setSurveyVerifData();
        this.ReqSrvyTaskAndAddVerfResultHDObj.SrvyTaskId = this.SrvyTaskId;
        this.ReqSrvyTaskAndAddVerfResultHDObj.VerfResultHD = this.VerfResultHD;
        this.ReqSrvyTaskAndAddVerfResultHDObj.VerfResultHD.VerfResultHId = this.ResVerfResultHObj.VerfResultHId;
        this.http.post(this.UrlConstantNew.UpdateSrvyTaskAndEditVerfResultH, this.ReqSrvyTaskAndAddVerfResultHDObj, AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
            this.toastr.successMessage(response["message"]);

            if(response["StatusCode"] == '200'){
              this.outputTab.emit({ stepMode: "next" });
            }
          });
      }
    }
  }

  Cancel() {
    AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.SURVEY_TASK_RESULT_PAGING],{});
  }
}
