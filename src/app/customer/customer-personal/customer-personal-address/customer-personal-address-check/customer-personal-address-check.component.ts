import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder } from '@angular/forms';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ResGetListCustAddrObj, ResListCustAddrObj } from 'app/shared/model/response/res-get-list-cust-addr-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-personal-address-check',
  templateUrl: './customer-personal-address-check.component.html',
  styleUrls: []
})
export class CustomerPersonalAddressCheckComponent implements OnInit {
  @Output() outputValue: EventEmitter<object> = new EventEmitter();

  custObj: any;
  resultData: any;
  listCustAddr: Array<ResListCustAddrObj> = new Array<ResListCustAddrObj>();

  objCust: CustObj;
  custAddrObj: GenericObj = new GenericObj();

  BirthDt: Date;
  IdExpiredDt: Date;

  IdCust: number;
  IdCustPersonal: number;

  IdNo: string;
  addUrl: string;  
  Gender: string;
  CustName: string;
  GenderDesc: string;
  CustModel: string;
  BirthPlace: string;
  MrIdTypeCode: string;
  CustModelDesc: string;
  MrIdTypeCodeDesc: string;
  MotherMaidenName: string;

  From : string;
  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, 
    private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) { 

    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["IdCust"] != null) {
         this.IdCust = queryParams["IdCust"];
       }
       if (queryParams["From"] != null) {
        this.From = queryParams["From"];
      }
     });
  }

  ngOnInit() {
    this.GetListToBeEdit();
    this.objCust = new CustObj();
    this.objCust.CustId = this.IdCust;
    this.http.post(this.UrlConstantNew.GetCustByCustId, {Id : this.IdCust}).subscribe(
      (response) => {
          this.custObj = response;
      });

      this.custAddrObj.Id = this.IdCust;
      this.http.post(this.UrlConstantNew.GetListCustAddr, this.custAddrObj).subscribe(
        (response : ResGetListCustAddrObj) => {
            this.listCustAddr = response[CommonConstant.ReturnObj];
            let idxEmergency = this.listCustAddr.findIndex(x => x.MrCustAddrTypeCode == CommonConstant.CustAddrTypeEmergency);
            if(idxEmergency != -1) this.listCustAddr.splice(idxEmergency, 1)
        });
  }

  listAddressType: Array<string> = new Array();
  GetListToBeEdit() {
    this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, { Code: CommonConstant.GSCodeFilterAddr }).toPromise().then(
      (result: GeneralSettingObj) => {
        if (result.GsValue) {
          let listAddrToFilter: Array<string> = result.GsValue.split(';');
          this.listAddressType = listAddrToFilter;
          this.listAddressType.push(CommonConstant.AddrTypeLegal);
        }
      }
    );
  }

  CheckListToBeEdit(MrCustAddrTypeCode: string): boolean {
    let idx: number = this.listAddressType.findIndex(x => x.toLowerCase() == MrCustAddrTypeCode.toLowerCase());
    if (idx >= 0) return true;
    return false;
  }

  editItem(custAddrObj: any) {
    this.outputValue.emit({ mode: 'edit', AddrId: custAddrObj.CustAddrId});
  }

  // deleteItem(custAddrObj: any) {
  //   var custAddr = new CustAddrObj();
  //   custAddr.CustAddrId = custAddrObj.CustAddrId;
  //   this.http.post(this.deleteCustAddr, custAddr).subscribe(
  //     (response: any) => {
  //       this.toastr.successMessage(response["message"]);
  //     }
  //   );
  //   //this.outputTab.emit({ mode: 'edit', AddrId: custAddrObj.CustAddrId });
  // }

  addAddr() {
    this.outputValue.emit({ mode: 'add' });
  }
  
}
