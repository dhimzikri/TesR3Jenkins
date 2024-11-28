import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UpdateCustCompanyShareholderObj } from 'app/shared/model/update-master-cust/update-cust-company-shareholder-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-custom-update-customer-mgmnt-shareholder',
  templateUrl: './custom-update-customer-mgmnt-shareholder.component.html',
})
export class CustomUpdateCustomerMgmntShareholderComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Output() ResponseTab: EventEmitter<any>;
  @Output() next: EventEmitter<any> = new EventEmitter<any>();
  ReqCustDataTrxIdObj: GenericObj = new GenericObj();
  AppShareholder: Array<UpdateCustCompanyShareholderObj>;
  MasterShareholder: Array<UpdateCustCompanyShareholderObj>;
  CustId: number;

  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.ResponseTab = new EventEmitter<any>();
    this.MasterShareholder = new Array<UpdateCustCompanyShareholderObj>();
    this.AppShareholder = new Array<UpdateCustCompanyShareholderObj>();
  }

  ngOnInit() {
    this.ReqCustDataTrxIdObj.Id = this.CustDataTrxId;
    this.http.post(this.UrlConstantNew.GetShareholderForUpdateMasterCustCompanyShareholder, this.ReqCustDataTrxIdObj).toPromise().then(
      (response) => {
        console.log("Response Shareholder: " + JSON.stringify(response));
        this.MasterShareholder = response["MasterCustShareholder"];
        this.AppShareholder = response["AppCustSHareholder"];
        this.CustId = response["CustId"];

        for (const item of this.MasterShareholder) {
          item.IsMasterData = true;
        }
        for (const item of this.AppShareholder) {
          var isMasterData = false;
          for (const master of this.MasterShareholder) {
            if(item.ShareholderId == master.ShareholderId){
              isMasterData = true;
              break;
            }
          }
          item.IsMasterData = isMasterData;
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  addShareholderHandler(idx){
    this.MasterShareholder.push(this.AppShareholder[idx]);
    this.AppShareholder.splice(idx, 1);
  }

  cancelShareholderHandler(idx){
    this.AppShareholder.push(this.MasterShareholder[idx]);
    this.MasterShareholder.splice(idx, 1);
  }

  back(){
    // this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_UPDATE_DATA_PAGING], {});
  }

  SaveValue(){
    var request = new Array<UpdateCustCompanyShareholderObj>();
    for (const item of this.MasterShareholder) {
      if(!item.IsMasterData){
        request.push(item);
      }
    }
    this.http.post(this.UrlConstantNew.UpdateMasterCustCompanyShareholder, { CustId: this.CustId, ShareholderList: request }, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
    const actions = [
      {
        'result': {
          'type': 'function',
          'target': 'self',
          'alias': '',
          'methodName': 'NextStep',
          'params': []
        },
        'conditions': []
      }
    ];

    this.next.emit({Actions: actions});
  }
}
