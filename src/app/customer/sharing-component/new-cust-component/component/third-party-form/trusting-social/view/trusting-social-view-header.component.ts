import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ReqPersonalObj } from 'app/shared/model/new-cust/req-personal-obj.model';
import { ReqCoyObj } from 'app/shared/model/new-cust/req-coy-obj.model';
import { ThirdPartyRsltHObj } from 'app/shared/model/third-party-rslt/third-party-rslt-h-obj.model';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';


@Component({
  selector: 'app-trusting-social-view-header',
  templateUrl: './trusting-social-view-header.component.html',
})
export class TrustingSocialViewHeaderComponent implements OnInit {
  @Input() ThirdPartyTrxNo: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }
}
