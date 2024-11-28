import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UpdateCustFamilyObj } from 'app/shared/model/update-master-cust/update-cust-family-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-custom-update-customer-family',
  templateUrl: './custom-update-customer-family.component.html',
})

export class CustomUpdateCustomerFamilyComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Input() isMarried: boolean = false;
  @Output() ResponseTab: EventEmitter<any>;
  @Output() next: EventEmitter<any> = new EventEmitter<any>();
  ListAppFamily: Array<UpdateCustFamilyObj>;
  ListCustFamily: Array<UpdateCustFamilyObj>;
  ReqCustDataTrxIdObj: GenericObj = new GenericObj();

  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService,
    private router: Router,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.ResponseTab = new EventEmitter<any>();
    this.ListAppFamily = new Array<UpdateCustFamilyObj>();
    this.ListCustFamily = new Array<UpdateCustFamilyObj>();
  }

  ngOnInit() {
    this.ReqCustDataTrxIdObj.Id = this.CustDataTrxId;
    this.http.post(this.UrlConstantNew.GetCustFamilyDataForUpdateMasterCustFamily, this.ReqCustDataTrxIdObj).toPromise().then(
      (response) => {
        this.ListCustFamily = response["MasterCustFamilyList"];
        this.ListAppFamily = response["AppFamilyList"];
        for (const item of this.ListAppFamily) {
          var isExist = false;
          for (const family of this.ListCustFamily) {
            if (item["CustName"] == family["CustName"] && item["CustRelationship"] == family["CustRelationship"]) {
              isExist = true;
              break;
            }
          }
          item["IsMasterData"] = isExist;
        }
        for (const item of this.ListCustFamily) {
          item["IsMasterData"] = true;
        }
        this.ListCustFamily.sort((a, b) => (a["CustName"] > b["CustName"]) ? 1 : -1);
        this.ListAppFamily.sort((a, b) => (a["CustName"] > b["CustName"]) ? 1 : -1);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  addFamilyHandler(idx) {
    this.ListCustFamily.push(this.ListAppFamily[idx]);
    this.ListAppFamily.splice(idx, 1);
    // this.ListCustFamily.sort((a, b) => (a["CustName"] > b["CustName"]) ? 1 : -1);
  }

  cancelFamilyHandler(idx) {
    this.ListAppFamily.push(this.ListCustFamily[idx]);
    this.ListCustFamily.splice(idx, 1);
    // this.ListAppFamily.sort((a, b) => (a["CustName"] > b["CustName"]) ? 1 : -1);
  }

  back() {
    // this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_UPDATE_DATA_PAGING], {});
  }

  SaveValue() {
    var request = new Array<Object>();
    if(this.isMarried){
      if( this.ListAppFamily.length != 0 && this.ListAppFamily.find(x => x.MrCustRelationship == CommonConstant.MasteCodeRelationshipSpouse) != null && (this.ListCustFamily.length == 0 || this.ListCustFamily.find(x => x.MrCustRelationship == CommonConstant.MasteCodeRelationshipSpouse) == null)){
        this.toastr.warningMessage(ExceptionConstant.MUST_CHOOSE_SPOUSE_DATA);
        return;
      }
    }
    for (const item of this.ListCustFamily) {
      if (!item["IsMasterData"]) {
        request.push(item);
      }
    }
    this.http.post(this.UrlConstantNew.UpdateMasterCustFamily, { CustFamilyList: request }, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
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
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }
}
