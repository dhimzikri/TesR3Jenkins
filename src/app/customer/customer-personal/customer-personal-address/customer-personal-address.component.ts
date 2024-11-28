import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CustAddrObj } from 'app/shared/model/cust-addr-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';


@Component({
  selector: 'app-customer-personal-address',
  templateUrl: './customer-personal-address.component.html',
  styleUrls: []
})
export class CustomerPersonalAddressComponent implements OnInit {

  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  mode: string;
  AddrId: number;
  IdCust: number;
  legalAddr: CustAddrObj;
  residenceAddr: CustAddrObj;
  custAddrObj: CustAddrObj;
  constructor(private http: HttpClient, private route: ActivatedRoute, private toastr: NGXToastrService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["IdCust"] != null) {
        this.IdCust = queryParams["IdCust"];
      }
    });
  }

  ngOnInit() {
    this.mode = "check";
  }
  terimaValue(ev) {
    this.mode = ev.mode;
    this.AddrId = ev.AddrId;


  }
  next() {
    this.custAddrObj = new CustAddrObj();
    this.custAddrObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeLegal;
    this.custAddrObj.CustId = this.IdCust;
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = this.IdCust;
    reqObj.Code = CommonConstant.CustAddrTypeLegal;
    this.http.post(this.UrlConstantNew.GetCustAddrByMrCustAddrType, reqObj).subscribe(
      (response: CustAddrObj) => {
        this.legalAddr = response;
        reqObj.Code = CommonConstant.CustAddrTypeResidence;
        this.http.post(this.UrlConstantNew.GetCustAddrByMrCustAddrType, reqObj).subscribe(
          (response: CustAddrObj) => {
            this.residenceAddr = response;
            if (this.legalAddr.Addr == null || this.residenceAddr.Addr == null) {
              let warningMsg: string = ExceptionConstant.PLEASE_COMPLETE_LEGAL_AND_RESIDENCE_ADDRESS;
              if (this.legalAddr.Addr != null && this.residenceAddr.Addr == null) {
                warningMsg = ExceptionConstant.PLEASE_COMPLETE_RESIDENCE_ADDRESS;
              }
              if (this.legalAddr.Addr == null && this.residenceAddr.Addr != null) {
                warningMsg = ExceptionConstant.PLEASE_COMPLETE_LEGAL_ADDRESS;
              }
              this.toastr.warningMessage(warningMsg);
            }
            if (this.legalAddr.Addr != null && this.residenceAddr.Addr != null) {
              this.outputTab.emit({ stepMode: "next" });
            }
          });
      });
  }
  // back(){
  //   this.outputTab.emit({ stepMode: "previous"});
  // }
}
