import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { CustAddrObj } from 'app/shared/model/cust-addr-obj.model';
import { CustPersonalJobDataObj } from 'app/shared/model/cust-personal-job-data-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { InputAddressObj } from 'app/shared/model/input-address-obj.model';
import { InputFieldObj } from 'app/shared/model/input-field-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-job-addr-section',
  templateUrl: './job-addr-section.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class JobAddrSectionComponent implements OnInit {

  @Input() CustPersonalJobDataObj: CustPersonalJobDataObj = new CustPersonalJobDataObj();
  @Input() CustId: number = 0;
  @Input() DictCustAddr: { [Id: string]: CustAddrObj } = {};
  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private cookieService: CookieService, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.AddControlFormJobAddr();
    this.BindJobAdd(this.JobAddr);
    this.BindJobAdd(this.PrevJobAddr);
    this.BindJobAdd(this.OthBizAddr);
  }

  businessDtMin: Date;
  AddControlFormJobAddr() {
    this.parentForm.addControl("JobAddrId", this.fb.control(''));
    this.parentForm.addControl("PrevCoyName", this.fb.control(''));
    this.parentForm.addControl("PrevEmploymentDt", this.fb.control(''));
    this.parentForm.addControl("PrevJobAddrId", this.fb.control(''));
    this.parentForm.addControl("OthBizName", this.fb.control(''));
    this.parentForm.addControl("OthBizType", this.fb.control(''));
    this.parentForm.addControl("OthBizIndustryTypeCode", this.fb.control(''));
    this.parentForm.addControl("OthBizJobPosition", this.fb.control(''));
    this.parentForm.addControl("OthBizEstablishmentDt", this.fb.control(''));
    this.parentForm.addControl("OthBizAddrId", this.fb.control(''));

    // JobAddrId: [0],
    // PrevCoyName: [''],
    // PrevEmploymentDt: [''],
    // PrevJobAddrId: [0],
    // OthBizName: [''],
    // OthBizType: [''],
    // OthBizIndustryTypeCode: [''],
    // OthBizJobPosition: [''],
    // OthBizEstablishmentDt: [''],
    // OthBizAddrId: [0],
    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);

    if (this.CustPersonalJobDataObj.CustPersonalJobDataId != 0) {
      let datePipe = new DatePipe("en-US");
      this.parentForm.patchValue({
        PrevCoyName: this.CustPersonalJobDataObj.PrevCoyName,
        PrevEmploymentDt: datePipe.transform(this.CustPersonalJobDataObj.PrevEmploymentDt, 'yyyy-MM-dd'),
        OthBizName: this.CustPersonalJobDataObj.OthBizName,
        OthBizType: this.CustPersonalJobDataObj.OthBizType,
        OthBizIndustryTypeCode: this.CustPersonalJobDataObj.OthBizIndustryTypeCode,
        OthBizJobPosition: this.CustPersonalJobDataObj.OthBizJobPosition,
        OthBizEstablishmentDt: datePipe.transform(this.CustPersonalJobDataObj.OthBizEstablishmentDt, 'yyyy-MM-dd'),
      })
    }

    this.GetExistingAddr(this.JobAddr);
    this.GetExistingAddr(this.PrevJobAddr);
    this.GetExistingAddr(this.OthBizAddr);
  }

  dictJobAddr: { [Id: string]: InputAddressObj } = {};
  readonly JobAddr: string = CommonConstant.CustAddrTypeJob;
  readonly PrevJobAddr: string = CommonConstant.CustAddrTypePreJob;
  readonly OthBizAddr: string = CommonConstant.CustAddrTypeOthBiz;
  BindJobAdd(addrType: string) {
    this.dictJobAddr[addrType] = new InputAddressObj(this.UrlConstantNew);
    let inputAddressObj = new InputFieldObj(this.UrlConstantNew);
    inputAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
    let title: string = "";
    switch (addrType) {
      case this.JobAddr:
        title = "Job Address";
        break;
      case this.OthBizAddr:
        title = "Other Business Address";
        this.dictJobAddr[addrType].isRequired = false;
        inputAddressObj.inputLookupObj.isRequired = false;
        break;
      case this.PrevJobAddr:
        title = "Previous Job Address";
        this.dictJobAddr[addrType].isRequired = false;
        inputAddressObj.inputLookupObj.isRequired = false;
        break;
    }
    this.dictJobAddr[addrType].inputField = inputAddressObj;
    this.dictJobAddr[addrType].showSubsection = false;
    this.dictJobAddr[addrType].title = title;
  }

  GetExistingAddr(addrTypeCode: string) {
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = this.CustId;
    reqObj.Code = addrTypeCode;
    this.http.post(this.UrlConstantNew.GetCustAddrByMrCustAddrType, reqObj).subscribe(
      (response: CustAddrObj) => {
        console.log(response);
        this.DictCustAddr[addrTypeCode] = new CustAddrObj();
        if (response || response.CustAddrId != 0) {
          this.DictCustAddr[addrTypeCode] = response;

          let inputAddressObj = new InputFieldObj(this.UrlConstantNew);
          inputAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
          if (addrTypeCode == this.OthBizAddr || addrTypeCode == this.PrevJobAddr) inputAddressObj.inputLookupObj.isRequired = false;
          inputAddressObj.inputLookupObj.nameSelect = response.Zipcode;
          inputAddressObj.inputLookupObj.jsonSelect = { Zipcode: response.Zipcode };
          this.dictJobAddr[addrTypeCode].inputField = inputAddressObj;
          this.dictJobAddr[addrTypeCode].default = response;
          return;
        }
      }
    );
  }

  TurnValidator() {
    let tempCustModel: string = this.parentForm.get("MrCustModelCode").value;
    switch (tempCustModel) {
      case CommonConstant.CUST_MODEL_NONPROF:
        break;
      default:
        break;
    }
  }
}
