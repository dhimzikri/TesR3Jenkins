import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-self-custom-container-new-cust-header',
  templateUrl: './self-custom-container-new-cust-header.component.html',
  styleUrls: ['./self-custom-container-new-cust-header.component.css']
})
export class SelfCustomContainerNewCustHeaderComponent implements OnInit {

  @Input() CustId: number = 0;
  @Input() CustType: string = CommonConstant.CustomerPersonal;
  @Output() OutputCustType: EventEmitter<object> = new EventEmitter<object>();

  constructor(private UrlConstantNew: UrlConstantNew, private http: HttpClient) {
  }

  ngOnInit(): void {
    if (this.CustType == undefined)
    {
      this.CustType = CommonConstant.CustomerPersonal;
    }
    this.GetListCustType();
  }

  listCustType: Array<KeyValueObj> = new Array();
  async GetListCustType() {
    let tempCode = CommonConstant.RefMasterTypeCodeCustType;
    let tempReq: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: tempCode, MappingCode: null };
    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, tempReq).toPromise().then(
      (response) => {
        this.listCustType = response[CommonConstant.ReturnObj];
      });
  }

  ChangeType() {
    console.log(this.CustType);
    alert(this.CustType)
    this.OutputCustType.emit({alue: {Actions: "", Data: {MrCustTypeCode: this.CustType}}});
  }
}