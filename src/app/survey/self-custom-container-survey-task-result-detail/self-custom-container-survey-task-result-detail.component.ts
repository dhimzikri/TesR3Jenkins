import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { CookieService } from 'ngx-cookie';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { VerfQuestionAnswerCustomObj } from 'app/shared/model/verf-question-answer/verf-question-answer-custom.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { VerifResulHDetailObj } from 'app/shared/model/verf-result-h/verf-result-h-detail-obj.model';
import { VerfResultDObj } from 'app/shared/model/verf-result-d/VerfResultD.model';
import { ReqUpdateSrvyTaskAndAddVerfResultHDObj } from 'app/shared/model/request/srvy-task/req-update-srvy-task-and-add-verf-result-h-d-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ReqGetVerfResultHObj } from 'app/shared/model/request/verf-result-h/req-verf-result-h-obj.model';
import { ResVerfResultHByTrxRefNoAndMrAddrTypeCodeObj } from 'app/shared/model/response/verf-result-h/res-verf-result-h-by-trx-ref-no-and-mr-addr-type-code-obj.model';
import { Subscription } from 'rxjs';
import { UcTemplateService } from '@adins/uctemplate';

@Component({
  selector: 'app-self-custom-container-survey-task-result-detail',
  templateUrl: './self-custom-container-survey-task-result-detail.component.html'
})
export class SelfCustomContainerSurveyTaskResultDetailComponent implements OnInit, OnDestroy {

  @Input() parentForm: FormGroup;
  @Input() dicts: Record<string, any>;

  subscriber: Subscription;
  enjiForm: NgForm;
  isReady: boolean = false;

  ReqGetVerfResultHObj: ReqGetVerfResultHObj = new ReqGetVerfResultHObj();
  ResVerfResultHObj: ResVerfResultHByTrxRefNoAndMrAddrTypeCodeObj = new ResVerfResultHByTrxRefNoAndMrAddrTypeCodeObj();
  ResVerfResultDObj: any;
  ReqSrvyTaskAndAddVerfResultHDObj: ReqUpdateSrvyTaskAndAddVerfResultHDObj = new ReqUpdateSrvyTaskAndAddVerfResultHDObj();
  QuestionObj: VerfQuestionAnswerCustomObj;
  VerfResultHD: VerifResulHDetailObj;

  VerfSchemeHId: number = 0;
  isQuestionLoaded: boolean = true;
  isStatScs: boolean = false;
  ListVerfAnswer = [];

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService, 
    private UrlConstantNew: UrlConstantNew,
    private ucTemplateSvc: UcTemplateService) { }

  async ngOnInit() {
    this.enjiForm = this.ucTemplateSvc.container.getEnjiForm();

    await this.getQuestion();
    await this.getData();

    await this.waitFor(_ => this.dicts.formRaw != undefined);
    await this.waitFor(_ => this.dicts.formRaw.MrVerfResultHStatCode != undefined);
    if (this.dicts.formRaw != undefined && this.dicts.formRaw.MrVerfResultHStatCode != undefined)
    {
      this.isStatScs = this.dicts.formRaw.MrVerfResultHStatCode == "SCS"? true : false;
    }

    this.subscriber = await this.ucTemplateSvc.callback.subscribe((ev) => {
      if (ev != undefined && !ev.hasOwnProperty("pageId")) {
        if (ev === "MrVerfResultHStatCode") {
          const _MrVerfResultHStatCode = this.dicts.formRaw.MrVerfResultHStatCode;
          if (_MrVerfResultHStatCode) {
            this.ChangeResult();
            this.isStatScs = _MrVerfResultHStatCode == "SCS"? true : false;
          }
        }
      }
    });

    this.isReady = true;
  }

  waitFor(conditions) {
    const vote = resolve => {
      if (conditions()) resolve();
      else setTimeout(_ => vote(resolve), 250);
    }

    return new Promise(vote);
  }

  ngOnDestroy(): void {
    if(this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }

  async getQuestion(){
    this.dicts["VerfSchemeHId"] = 0;
    this.dicts["IsQuestionLoaded"] = true;

    let ReqGenericObj = new GenericObj();
    ReqGenericObj.Id = this.dicts.SrvyFormSchmId;

    await this.http.post(this.UrlConstantNew.GetSrvyFormSchmBySrvyFormSchmId, ReqGenericObj).toPromise().then(
      (response) => {
        if(response["VerfSchemeHId"] != null){
        this.VerfSchemeHId = response["VerfSchemeHId"];
        this.dicts["VerfSchemeHId"] = response["VerfSchemeHId"];
        this.dicts["QuestionObj"] = null;
      

      ReqGenericObj = new GenericObj();
      ReqGenericObj.Id = this.VerfSchemeHId; 
      this.http.post(this.UrlConstantNew.GetVerfQuestionAnswerListByVerfSchemeHId, ReqGenericObj).toPromise().then(
      (response) => {
        if(response["ReturnObject"]!=null){
          this.QuestionObj = response[CommonConstant.ReturnObj];
          this.dicts["QuestionObj"] = this.QuestionObj;
          this.GenerateFormVerfQuestion();
        }else{
          this.isQuestionLoaded = false;
          this.dicts["IsQuestionLoaded"] = false;
        }
      });
      }
    });
  }

  dictAnswer: { [id: string]: string } = {};
  dictNotes: { [id: string]: string } = {};
  async getData(){
    this.dicts["PageType"] = "Add";
    this.dicts["VerfResultHId"] = 0;
    this.ReqGetVerfResultHObj.TrxRefNo = this.dicts.SrvyTaskNo;
    this.ReqGetVerfResultHObj.MrAddrTypeCode = this.dicts.MrSrvyObjTypeCode;
    await this.http.post(this.UrlConstantNew.GetVerfResultHDsByTrxRefNoAndMrAddrTypeCode, this.ReqGetVerfResultHObj).toPromise().then(
      (response) => {
        if(response["VerfResultH"] != null){
          this.ResVerfResultHObj = response["VerfResultH"];
          this.ResVerfResultDObj = response["VerfResultD"];

          this.dicts["VerfResultHId"] = this.ResVerfResultHObj.VerfResultHId;

          for(let a=0;a<this.ResVerfResultDObj.length;a++){
            const element = this.ResVerfResultDObj[a];
            this.dictAnswer[element.VerfQuestionText] = element.Answer;
            this.dictNotes[element.VerfQuestionText] = element.Notes;
          }

          for (let i = 0; i < this.QuestionObj.VerfQuestionAnswerListObj.length; i++)
          {
            for (let j = 0; j < this.QuestionObj.VerfQuestionAnswerListObj[i].verfQuestionAnswerList.length; j++)
            {
              var checkName = (this.parentForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"]["controls"]["VerfQuestionText"].value).toUpperCase();
              this.parentForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"].patchValue({
                Answer: this.dictAnswer[checkName],
                Notes: this.dictNotes[checkName]
              })
            }
          }

          this.dicts["PageType"] = "Edit"
        }
      }
    );
  }

  GenerateFormVerfQuestion() {
    var parentFormGroup = new Object();
    
    var grpListObj = this.QuestionObj.VerfQuestionAnswerListObj;

    for (let i = 0; i < grpListObj.length; i++) {
      var QuestionFormGrp = new Object();

      QuestionFormGrp["VerfQuestionGrpCode"] = [grpListObj[i].VerfQuestionGrpCode];
      QuestionFormGrp["VerfQuestionGrpName"] = [grpListObj[i].VerfQuestionGrpName];
      QuestionFormGrp["VerfQuestionAnswerList"] = this.fb.group({});

      var QuestionList = grpListObj[i].verfQuestionAnswerList;

      this.ListVerfAnswer.push([]);
      var QuestionAnswerListFormGrp = new Object();
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
          
          QuestionAnswerListFormGrp[j] = QuestionResultGrp;
        }
        QuestionFormGrp["VerfQuestionAnswerList"] = this.fb.group(QuestionAnswerListFormGrp);
      }

      parentFormGroup[i] = this.fb.group(QuestionFormGrp);
    }

    this.parentForm.addControl("QuestionObjs", this.fb.group(parentFormGroup));

    this.ChangeResult();
  }

  ChangeResult() {
    this.isReady = false;

    if (this.dicts.formRaw == undefined || this.dicts.formRaw.MrVerfResultHStatCode == undefined) return;

    if (this.parentForm.controls.MrVerfResultHStatCode.value == CommonConstant.VerfResultStatSuccess)
    {
      for (let i = 0; i < this.QuestionObj.VerfQuestionAnswerListObj.length; i++)
      {
        for (let j = 0; j < this.QuestionObj.VerfQuestionAnswerListObj[i].verfQuestionAnswerList.length; j++)
        {
          this.parentForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"]["controls"]["Answer"].setValidators([Validators.required]);
          this.parentForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"]["controls"]["Answer"].updateValueAndValidity();
        }
      }
    }
    else
    {
      for (let i = 0; i < this.QuestionObj.VerfQuestionAnswerListObj.length; i++)
      {
        for (let j = 0; j < this.QuestionObj.VerfQuestionAnswerListObj[i].verfQuestionAnswerList.length; j++)
        {
          this.parentForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"]["controls"]["Answer"].clearValidators();
          this.parentForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"]["controls"]["Answer"].updateValueAndValidity();
        }
      }
    }

    setTimeout(() => { this.isReady = true; }, 100);
  }
}
