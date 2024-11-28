import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CustDuplicateObj } from 'app/shared/model/new-cust/cust-duplicate-obj.model';
import { DupCheckOutputSaveObj } from 'app/shared/model/new-cust/dup-check-output-save-obj.model';
import { NegCustDuplicateObj } from 'app/shared/model/new-cust/neg-cust-duplicate-obj.model';
import { ReqCoyObj } from 'app/shared/model/new-cust/req-coy-obj.model';
import { ReqPersonalObj } from 'app/shared/model/new-cust/req-personal-obj.model';

@Component({
  selector: 'app-cust-dup-check-header',
  templateUrl: './cust-dup-check-header.component.html',
})
export class CustDupCheckHeaderComponent implements OnInit {

  @Input() CustPersonalObj: ReqPersonalObj;
  @Input() CustCoyObj: ReqCoyObj;
  @Input() ResultDuplicate: Array<CustDuplicateObj> = new Array();
  @Input() ResultDuplicateNegative: Array<NegCustDuplicateObj> = new Array();
  @Input() DuplicateStatus: string = "";
  @Input() CustType: string = CommonConstant.CustomerPersonal;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust;
  @Output() outputSave: EventEmitter<DupCheckOutputSaveObj> = new EventEmitter();
  @Output() outputCancel: EventEmitter<string> = new EventEmitter();

  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly CustTypeCoy: string = CommonConstant.CustomerCompany;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.CheckDuplicateStatus();
  }

  IsLock: boolean = false;
  CheckDuplicateStatus() {
    let tempStatus: string = this.DuplicateStatus.toLowerCase();
    if (tempStatus == "lock") this.IsLock = true;
  }

  Back() {
    this.outputCancel.emit();
  }

  SaveForm() {
    let tempObj: DupCheckOutputSaveObj = new DupCheckOutputSaveObj();
    tempObj.Key = DupCheckOutputSaveObj.KeyEditSave;
    this.outputSave.emit(tempObj);
  }

  EditCust(item: CustDuplicateObj) {
    let tempObj: DupCheckOutputSaveObj = new DupCheckOutputSaveObj();
    tempObj.Key = DupCheckOutputSaveObj.KeyEditSaveDup;
    tempObj.DuplicateObj = item;
    this.outputSave.emit(tempObj);
  }

  EditNegativeCust(item: NegCustDuplicateObj) {
    let tempObj: DupCheckOutputSaveObj = new DupCheckOutputSaveObj();
    tempObj.Key = DupCheckOutputSaveObj.KeyEditSaveDupNeg;
    tempObj.DuplicateNegativeObj = item;
    this.outputSave.emit(tempObj);
  }
}
