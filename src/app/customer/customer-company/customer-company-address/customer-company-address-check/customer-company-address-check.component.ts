import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ResGetListCustAddrObj, ResListCustAddrObj } from 'app/shared/model/response/res-get-list-cust-addr-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-company-address-check',
  templateUrl: './customer-company-address-check.component.html',
  styleUrls: []
})
export class CustomerCompanyAddressCheckComponent implements OnInit {

  @Output() outputValue: EventEmitter<object> = new EventEmitter();
  IdCust: number;
  custAddrObj: GenericObj = new GenericObj();
  listCustAddr: Array<ResListCustAddrObj> = new Array<ResListCustAddrObj>();
  From: string;
  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, 
    private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
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
    this.custAddrObj.Id = this.IdCust;
    this.http.post(this.UrlConstantNew.GetListCustAddr, this.custAddrObj).subscribe(
      (response: ResGetListCustAddrObj) => {
        this.listCustAddr = response["ReturnObject"];
        let idxCompany = this.listCustAddr.findIndex(x => x.MrCustAddrTypeCode == CommonConstant.CustAddrTypeCompany);
        if (idxCompany != -1) this.listCustAddr.splice(idxCompany, 1);
        let idxEmergency = this.listCustAddr.findIndex(x => x.MrCustAddrTypeCode == CommonConstant.CustAddrTypeEmergency);
        if (idxEmergency != -1) this.listCustAddr.splice(idxEmergency, 1);
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
          this.listAddressType.push(CommonConstant.CustAddrTypeContactInfo);
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
    this.outputValue.emit({ mode: 'edit', AddrId: custAddrObj.CustAddrId });
  }
  addAddr() {
    this.outputValue.emit({ mode: 'add' });
  }
}
