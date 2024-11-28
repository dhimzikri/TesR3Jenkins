import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ThirdPartyRsltHObj } from 'app/shared/model/third-party-rslt/third-party-rslt-h-obj.model';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';


@Component({
  selector: 'app-trusting-social-req-header',
  templateUrl: './trusting-social-req-header.component.html',
})
export class TrustingSocialReqHeaderComponent implements OnInit {
  @Input() CustObj: CustObj;
  @Input() CustPersonalObj: CustPersonalObj;

  ThirdPartyRsltHObj: ThirdPartyRsltHObj = new ThirdPartyRsltHObj();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public activeModal: NgbActiveModal, 
    private UrlConstantNew: UrlConstantNew
  ) { }

  ngOnInit() {
    this.checkConsent();
  }

  checkConsent(){
    this.http.post(this.UrlConstantNew.GetFirstRequestedThirdPartyRsltHByTrxNoAndSvcTypeCode, { TrxNo: this.CustObj.ThirdPartyTrxNo, SvcTypeCode: CommonConstant.DigitalizationSvcTypeTrustingSocial }).subscribe(
      (response: ThirdPartyRsltHObj) => {
        this.ThirdPartyRsltHObj = response;
      }
    );
  }

  OutUpload(e: ThirdPartyRsltHObj){
    this.ThirdPartyRsltHObj = e;
  }
}
