import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-cbas-slik-view',
  templateUrl: './cbas-slik-view.component.html'
})
export class CbasSlikViewComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { 

  }

  @Input() ParentForm: FormGroup;
  @Input() InputTrxNo: string;
  KtpNo: string;
  Npwp: string;

  async ngOnInit() {
    let formValue = this.ParentForm.value;
    this.KtpNo = formValue.MrIdTypeCode == CommonConstant.MrIdTypeCodeEKTP ? formValue.IdNo : "";
    this.Npwp = formValue.TaxIdNo;
  }


}
