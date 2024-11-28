import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-master-cod-obj.model';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ThirdPartyTrustsocRsltObj } from 'app/shared/model/third-party-rslt/third-party-trustsoc-rslt-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { ReqAddTrxSrcDataForTsObj } from 'app/shared/model/digitalization/req-add-trx-src-data-for-ts-obj.model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';


@Component({
  selector: 'app-trusting-social-req-detail',
  templateUrl: './trusting-social-req-detail.component.html'
})
export class TrustingSocialReqDetailComponent implements OnInit {
  @Input() CustObj: CustObj;
  @Input() CustPersonalObj: CustPersonalObj;

  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;

  CustTypeName: string;

  DetailForm = this.fb.group({
    ThirdPartyTrustsocRslts: new FormArray([]),
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public activeModal: NgbActiveModal,
    private toastr: NGXToastrService, 
    private UrlConstantNew: UrlConstantNew
  ) { }

  ngOnInit() {
    this.getCustTypeDescr();
    this.initGrid();
  }

  getCustTypeDescr() {
    var refMasterObj = new ReqRefMasterByTypeCodeAndMasterCodeObj();
    refMasterObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustType;
    refMasterObj.MasterCode = this.CustObj.MrCustTypeCode;
    this.http.post(this.UrlConstantNew.GetRefMasterByRefMasterTypeCodeAndMasterCode, refMasterObj).subscribe(
      (response) => {
        this.CustTypeName = response["Descr"];
      }
    );
  }

  initGrid() {
    var form = this.DetailForm.controls['ThirdPartyTrustsocRslts'] as FormArray;
    form.push(this.fb.group({
      Relation: [CommonConstant.TrustingSocialRelationCust, [Validators.required, Validators.maxLength(200)]],
      Name: [this.CustObj.CustName, [Validators.required, Validators.maxLength(500)]],
      MobilePhnNo: [this.CustObj.MrCustTypeCode == CommonConstant.MR_CUST_TYPE_CODE_PERSONAL ? this.CustPersonalObj.MobilePhnNo1 : "",
      [Validators.required, Validators.maxLength(50), Validators.pattern("^[0-9]+$")]]
    }));
  }

  AddNewData() {
    if (!this.validateMaxSubj()) {
      return;
    }

    var form = this.DetailForm.controls['ThirdPartyTrustsocRslts'] as FormArray;
    form.push(this.fb.group({
      Relation: ['', [Validators.required, Validators.maxLength(200)]],
      Name: ['', [Validators.required, Validators.maxLength(500)]],
      MobilePhnNo: ['', [Validators.required, Validators.maxLength(50), Validators.pattern("^[0-9]+$")]]
    }));
  }

  DeleteData(i) {
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
      var form = this.DetailForm.controls['ThirdPartyTrustsocRslts'] as FormArray;
      form.removeAt(i);
    }
  }

  SaveForm() {

    if (!this.validateMaxSubj()) {
      return;
    }

    var reqAddTrxSrcDataForTsObj = new ReqAddTrxSrcDataForTsObj();

    reqAddTrxSrcDataForTsObj.TrxNo = this.CustObj.ThirdPartyTrxNo;
    reqAddTrxSrcDataForTsObj.IdNo = this.CustObj.IdNo;
    reqAddTrxSrcDataForTsObj.IdType = this.CustObj.MrIdTypeCode;
    reqAddTrxSrcDataForTsObj.CustType = this.CustObj.MrCustTypeCode;


    for (let i = 0; i < this.DetailForm.controls["ThirdPartyTrustsocRslts"].value.length; i++) {
      var thirdPartyTrustsocObj = new ThirdPartyTrustsocRsltObj();
      thirdPartyTrustsocObj.Relation = this.DetailForm.controls["ThirdPartyTrustsocRslts"].value[i].Relation;
      thirdPartyTrustsocObj.Name = this.DetailForm.controls["ThirdPartyTrustsocRslts"].value[i].Name;
      thirdPartyTrustsocObj.MobilePhnNo = this.DetailForm.controls["ThirdPartyTrustsocRslts"].value[i].MobilePhnNo;
      if (thirdPartyTrustsocObj.MobilePhnNo.substring(0,2) != '62') {
        this.toastr.warningMessage(ExceptionConstant.MOBILE_PHN_NO_INVALID);
        return;
      }
      reqAddTrxSrcDataForTsObj.ThirdPartyTrustsocRsltObjs.push(thirdPartyTrustsocObj);
    }

    if (!this.validateSubj(reqAddTrxSrcDataForTsObj.ThirdPartyTrustsocRsltObjs)) {
      return;
    }
    this.http.post(this.UrlConstantNew.AddTrxSrcDataForTrustingSocialV2, reqAddTrxSrcDataForTsObj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response["Message"]);
        this.activeModal.dismiss('Cross click');
      }
    );
  }

  validateMaxSubj() {
    if (this.DetailForm.controls["ThirdPartyTrustsocRslts"].value.length >= 8) {
      this.toastr.warningMessage(ExceptionConstant.TRUSTING_SOCIAL_MAX_SUBJECT);
      return false;
    }
    return true;
  }

  validateSubj(thirdPartyTrustsocRsltObjs: Array<ThirdPartyTrustsocRsltObj>) {
    var duplCustRelationObjs = thirdPartyTrustsocRsltObjs.filter(x => x.Relation.toLowerCase() == CommonConstant.TrustingSocialRelationCust.toLowerCase());

    if (duplCustRelationObjs.length > 1) {
      this.toastr.warningMessage(ExceptionConstant.TRUSTING_SOCIAL_DUPL_RELATION_CUST);
      return false;
    }

    var groupedMobilePhnNo = this.groupBy(thirdPartyTrustsocRsltObjs, function (item) {
      return [item.MobilePhnNo];
    });

    var duplMobilePhnNo = groupedMobilePhnNo.filter(x => x.length > 1);
    if (duplMobilePhnNo.length > 0) {
      this.toastr.warningMessage(ExceptionConstant.TRUSTING_SOCIAL_DUPL_MOBILE_PHN_NO);
      return false;
    }

    var groupedMobilePhnNo = this.groupBy(thirdPartyTrustsocRsltObjs, function (item) {
      return [item.MobilePhnNo];
    });

    return true;
  }

  groupBy(array, f) {
    let groups = {};
    array.forEach(function (o) {
      var group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    })
  }
}
