import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VerfQuestionAnswerObj } from 'app/shared/model/verf-question-answer-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import { RegexService } from 'app/customer/regex.service';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { String } from 'typescript-string-operations';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-verification-question-answer-add-edit',
  templateUrl: './verification-question-answer-add-edit.component.html'
})
export class VerificationQuestionAnswerAddEditComponent implements OnInit {
  verfQuestionAnswerObj: VerfQuestionAnswerObj;
  VerfQuestionAnswerId: number;
  mode: string = "add";
  isActive: boolean = true;
  itemVerfQuestionAnswer: any;
  verfQuestionAnswer: any;
  answerTypeCode: string = "DDL";
  isHidden: boolean = true;
  dropdownListObj: UcDropdownListObj = new UcDropdownListObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.VERIF_QA_PAGING;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private regexService: RegexService, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VerfQuestionAnswerId = queryParams["VerfQuestionAnswerId"];
      this.mode = queryParams["mode"];
      if (this.mode == "edit")
        this.mode = "edit";
    })
  }

  QuestionAnswerForm = this.fb.group({
    VerfQuestionCode: ['', Validators.required],
    VerfQuestionText: ['', Validators.required],
    RefVerfAnswerTypeId: ['', Validators.required],
    VerfAnswer: ['', Validators.required],
    IsActive: [true],
    IsMandatory: [false],
    RowVersion: ['']
  })

  customPattern: Array<CustomPatternObj> = new Array<CustomPatternObj>();
  pattern: string;
  separator: string = ';';

  async ngOnInit() {
    this.dropdownListObj.apiUrl = this.UrlConstantNew.GetActiveRefVerfAnswerTypes;
    this.dropdownListObj.requestObj = {};
    this.dropdownListObj.customKey = "RefVerfAnswerTypeId";
    this.dropdownListObj.customValue = "VerfAnswerTypeDescr";
    this.dropdownListObj.ddlType = "blank";
    this.dropdownListObj.isSelectOutput = true;
    await this.GetGsValue();
    this.GetListActiveRefAnswerType();
    
    var refAnswerObj = {}
    if (this.mode == "edit") {
      this.http.post(this.UrlConstantNew.GetVerfQuestionAnswerForUpdateById, {Id : this.VerfQuestionAnswerId}).subscribe(
      (response) => {
        this.verfQuestionAnswer = response[CommonConstant.ReturnObj];
        refAnswerObj = { RefVerfAnswerTypeId: this.verfQuestionAnswer.RefVerfAnswerTypeId }
        this.http.post(this.UrlConstantNew.GetRefVerfAnswerTypeById, {Id : this.verfQuestionAnswer.RefVerfAnswerTypeId}).subscribe(
          (respond) => {
            this.answerTypeCode = respond["VerfAnswerTypeCode"];
          }
        )

        this.QuestionAnswerForm.patchValue({
          VerfQuestionCode: this.verfQuestionAnswer.VerfQuestionCode,
          VerfQuestionText: this.verfQuestionAnswer.VerfQuestionText,
          VerfAnswer: this.verfQuestionAnswer.VerfAnswer,
          RefVerfAnswerTypeId: this.verfQuestionAnswer.RefVerfAnswerTypeId,
          IsActive: this.verfQuestionAnswer.IsActive,
          IsMandatory: this.verfQuestionAnswer.IsMandatory,
          RowVersion: this.verfQuestionAnswer.RowVersion
        });

        this.AnswerTypeChanged(this.verfQuestionAnswer.RefVerfAnswerTypeId);
      });
    }
  }

  AnswerTypeChanged(RefVerfAnswerTypeId) {
    var object = this.itemVerfQuestionAnswer.find(x => x.RefVerfAnswerTypeId == RefVerfAnswerTypeId);
    if (object.VerfAnswerTypeCode != "DDL") {
      this.QuestionAnswerForm.controls.VerfAnswer.clearValidators();
      this.isHidden = true;
    }
    else {
      this.QuestionAnswerForm.controls.VerfAnswer.setValidators([Validators.required,Validators.pattern(this.pattern)]);
      this.isHidden = false;
    }
    this.QuestionAnswerForm.controls.VerfAnswer.updateValueAndValidity();
  }

  GetListActiveRefAnswerType() {
    var url = this.UrlConstantNew.GetActiveRefVerfAnswerTypes;
    this.http.post(url, {}).subscribe(
      (response) => {
        this.itemVerfQuestionAnswer = response[CommonConstant.ReturnObj];
        this.dropdownListObj.isReady = true;
        if (this.itemVerfQuestionAnswer.length > 0) {
          let VerfAnswerData = this.itemVerfQuestionAnswer.find(x => x.VerfAnswerTypeCode == "DDL");
          this.QuestionAnswerForm.patchValue({
            RefVerfAnswerTypeId: VerfAnswerData.RefVerfAnswerTypeId
          });
          this.AnswerTypeChanged(this.QuestionAnswerForm.controls.RefVerfAnswerTypeId.value);
        }
      }
    );
  }

  async GetGsValue(){
    let reqByCode: GenericObj = new GenericObj();
    reqByCode.Code = CommonConstant.GSCodeDefSeparatorDDLVerfQuest;
    await this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, reqByCode).toPromise().then(
      (response) => {
        if(response != null){
          this.separator = response["GsValue"];
        }
      }
    );

    reqByCode.Code = CommonConstant.GSCodeRegexDDLSeparator;
    await this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, reqByCode).toPromise().then(
      (response) => {
        if(response != null){
          this.pattern = response["GsValue"];
        }
      }
    );

    this.setPatternFromGsValue(this.separator, this.pattern);
  }

  setPatternFromGsValue(separator: string, regex: string){
    let patternObj: CustomPatternObj = new CustomPatternObj();
    let pattern = String.Format(regex, separator);

    patternObj.pattern = pattern;
    patternObj.invalidMsg = "must use " + separator + " as separator (second or more option)";
    this.customPattern.push(patternObj);
    this.pattern = pattern;
  }

  selectedValueHandler(ev){
    this.QuestionAnswerForm.patchValue({
      RefVerfAnswerTypeId: ev.selectedValue
    });
    this.AnswerTypeChanged(this.QuestionAnswerForm.controls.RefVerfAnswerTypeId.value);
  }

  SaveForm() {
    this.verfQuestionAnswerObj = new VerfQuestionAnswerObj();
    this.verfQuestionAnswerObj = this.QuestionAnswerForm.value;
    this.verfQuestionAnswerObj.VerfQuestionCode = this.verfQuestionAnswerObj.VerfQuestionCode;
    this.verfQuestionAnswerObj.VerfQuestionText = this.verfQuestionAnswerObj.VerfQuestionText;
    this.verfQuestionAnswerObj.RefVerfAnswerTypeId = this.verfQuestionAnswerObj.RefVerfAnswerTypeId;
    this.verfQuestionAnswerObj.IsActive = this.verfQuestionAnswerObj.IsActive;
    this.verfQuestionAnswerObj.IsMandatory = this.verfQuestionAnswerObj.IsMandatory;

    if (this.mode == "edit") {
      this.verfQuestionAnswerObj.VerfQuestionAnswerId = this.VerfQuestionAnswerId;
      this.verfQuestionAnswerObj.RowVersion = this.verfQuestionAnswerObj.RowVersion;
      this.http.post(this.UrlConstantNew.EditVerfQuestionAnswer, this.verfQuestionAnswerObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.VERIF_QA_PAGING],{});
        });
    }
    else {
      this.verfQuestionAnswerObj.VerfQuestionAnswerId = 0;
      this.http.post(this.UrlConstantNew.AddVerfQuestionAnswer, this.verfQuestionAnswerObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.VERIF_QA_PAGING],{});
        });
    }
  }
}
