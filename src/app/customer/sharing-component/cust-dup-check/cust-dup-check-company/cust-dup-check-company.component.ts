import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericKeyValueListObj } from 'app/shared/model/generic/generic-key-value-list-obj.model';
import { ReqCoyObj } from 'app/shared/model/new-cust/req-coy-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';

@Component({
  selector: 'app-cust-dup-check-company',
  templateUrl: './cust-dup-check-company.component.html',
})
export class CustDupCheckCompanyComponent implements OnInit {

  @Input() CustObj: ReqCoyObj;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust;
  
  readonly RefMasterTypeCodeCompanyType: string = CommonConstant.RefMasterTypeCodeCompanyType;
  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel;
  constructor(private http: HttpClient, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.InitCustMainDataMode();
    this.initRefMaster(this.RefMasterTypeCodeCompanyType);
    this.initRefMaster(this.RefMasterTypeCodeCustModel, CommonConstant.CustTypeCompany, this.UrlConstantNew.GetListActiveRefMasterWithMappingCodeAll);
  }

  CustNameLabel: string = "Customer";
  InitCustMainDataMode() {
    switch (this.CustDataMode) {
      case CommonConstant.CustMainDataModeCust:
        this.CustNameLabel = "Customer";
        break;
      case CommonConstant.CustMainDataModeFamily:
        this.CustNameLabel = "Family";
        break;
      case CommonConstant.CustMainDataModeMgmntShrholder:
        this.CustNameLabel = "Share Legal";
        break;
      default:
    }
  }

  DictRefMaster: { [id: string]: { [code: string]: string } } = {};
  initRefMaster(refMasterTypeCode: string, mappingCode: string = null, urlApi: string = this.UrlConstantNew.GetListActiveRefMaster) {
    let refMasterObjMrIdTypeCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: refMasterTypeCode,
      MappingCode: mappingCode
    };
    this.DictRefMaster[refMasterTypeCode] = {};
    this.http.post(urlApi, refMasterObjMrIdTypeCode).subscribe(
      (response: GenericKeyValueListObj) => {
        for (let index = 0; index < response.ReturnObject.length; index++) {
          const element = response.ReturnObject[index];
          this.DictRefMaster[refMasterTypeCode][element.Key] = element.Value;
        }
      }
    )
  }
}
