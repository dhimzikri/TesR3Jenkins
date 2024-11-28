import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReqAddTrxSrcDataForAsliRIObj } from 'app/shared/model/asli-ri/req-add-trx-src-data-for-asli-ri-obj.model';
import { CustDocFileFormObj } from 'app/shared/model/cust-doc-file/cust-doc-file-form-obj.model';
import { CustObj } from 'app/shared/model/cust-obj.model';

@Component({
  selector: 'app-asli-ri-req-header',
  templateUrl: './asli-ri-req-header.component.html',
})
export class AsliRiReqHeaderComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  @Input() parentForm: FormGroup;
  @Input() MrCustTypeCode: string;
  @Input() custObj: CustObj;
  @Input() custDocFileFormObj: CustDocFileFormObj;
  @Input() height: number;
  @Input() width: number;
  @Input() url: any;

  isConfirmation: boolean = false;
  reqAddTrxSrcDataForAsliRIObj: ReqAddTrxSrcDataForAsliRIObj = new ReqAddTrxSrcDataForAsliRIObj();

  ngOnInit() {
  }

  nextConfirm(ev: boolean)
  {
    this.isConfirmation = ev;
  }

  outputForm(ev: ReqAddTrxSrcDataForAsliRIObj)
  {
    this.reqAddTrxSrcDataForAsliRIObj = ev;
  }

}
