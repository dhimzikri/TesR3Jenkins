import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UpdateCustLegalDocObj } from 'app/shared/model/update-master-cust/update-cust-legal-doc-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-custom-update-customer-company-legal-doc',
  templateUrl: './custom-update-customer-company-legal-doc.component.html',
})

export class CustomUpdateCustomerCompanyLegalDocComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Input() WfTaskListId: any;
  @Output() ResponseTab: EventEmitter<any>;
  @Output() next: EventEmitter<any> = new EventEmitter<any>();
  AppLegalDoc: Array<UpdateCustLegalDocObj>;
  MasterLegalDoc: Array<UpdateCustLegalDocObj>;
  ReqCustDataTrxIdObj: GenericObj = new GenericObj();
  CustCompanyId: number;

  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.ResponseTab = new EventEmitter<any>();
    this.AppLegalDoc = new Array<UpdateCustLegalDocObj>();
    this.MasterLegalDoc = new Array<UpdateCustLegalDocObj>();
  }

  ngOnInit() {
    this.ReqCustDataTrxIdObj.Id = this.CustDataTrxId;
    this.http.post(this.UrlConstantNew.GetLegalDocForUpdateMasterCustCompanyLegalDoc, this.ReqCustDataTrxIdObj).toPromise().then(
      (response) => {
        this.AppLegalDoc = response["AppLegalDocList"];
        this.MasterLegalDoc = response["MasterLegalDocList"];
        this.CustCompanyId = response["CustCompanyId"];
        for (const item of this.MasterLegalDoc) {
          item.IsMasterData = true;
        }
        for (const item of this.AppLegalDoc) {
          var isMasterData = false;
          for (const master of this.MasterLegalDoc) {
            if(item.MrLegalDocTypeCode == master.MrLegalDocTypeCode && item.DocNo == master.DocNo){
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

  addLegalDocHandler(idx){
    this.MasterLegalDoc.push(this.AppLegalDoc[idx]);
    this.AppLegalDoc.splice(idx, 1);
  }

  cancelLegalDocHandler(idx){
    this.AppLegalDoc.push(this.MasterLegalDoc[idx]);
    this.MasterLegalDoc.splice(idx, 1);
  }

  back(){
    // this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_UPDATE_DATA_PAGING], {});
  }

  SaveValue(){
    var request = new Array<UpdateCustLegalDocObj>();
    for (const item of this.MasterLegalDoc) {
      if(!item.IsMasterData){
        request.push(item);
      }
    }

    this.http.post(this.UrlConstantNew.UpdateMasterCustCompanyLegalDocv2, { CustCompanyId: this.CustCompanyId, TaskListId: this.WfTaskListId, LegalDocList: request }, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
        this.router.navigate([NavigationConstant.SELF_CUSTOM_CUST_UPDATE_DATA_PAGING]);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );

  }

}
