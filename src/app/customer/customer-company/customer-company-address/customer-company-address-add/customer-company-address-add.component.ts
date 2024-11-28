import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InputFieldObj } from 'app/shared/model/input-field-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { FormBuilder } from '@angular/forms';
import { CustAddrObj } from 'app/shared/model/cust-addr-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { InputAddressObj } from 'app/shared/model/input-address-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { ResGetListCustAddrObj, ResListCustAddrObj } from 'app/shared/model/response/res-get-list-cust-addr-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { AddressService } from 'app/shared/services/custAddr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-company-address-add',
  templateUrl: './customer-company-address-add.component.html',
  styleUrls: []
})
export class CustomerCompanyAddressAddComponent implements OnInit {
  @Input() AddrId: number;
  @Input() mode: string;
  @Output() outputValue: EventEmitter<object> = new EventEmitter();

  listCustAddr: Array<ResListCustAddrObj> = new Array<ResListCustAddrObj>();
  listAddressType: Array<KeyValueObj> = new Array();
  copyCustomerAddr: any;
  copyCustomerAddrFrom: any;

  addressObj: CustAddrObj;
  custAddrObj: GenericObj = new GenericObj();
  addressType: ReqRefMasterByTypeCodeAndMappingCodeObj;
  custAddressObj: CustAddrObj;
  inputFieldAddressObj: InputFieldObj;
  isReady: boolean = false;
  IdCust: number;
  pageType: string;
  listAddrRequiredOwnership: Array<string> = new Array();

  CustDataCompanyForm = this.fb.group({
    Notes: [''],
    LuasBangunan: [''],
    LuasTanah: [''],
    KapasitasListrik: [''],
    LocationClass: [''],
    PriceEstimates: [''],
    StayLength: [''],
    MrCustAddrTypeCode: [''],
    CopyAddrFrom: ['']
  });
  inputAddressObj: InputAddressObj;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder, private CustSetData: NewCustSetData,
    private toastr: NGXToastrService, private addressService: AddressService, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["IdCust"] != null) {
        this.IdCust = queryParams["IdCust"];
      }
    });
  }

  async ngOnInit() {
    this.pageType = this.mode;

    this.inputAddressObj = new InputAddressObj(this.UrlConstantNew);
    this.inputAddressObj.showSubsection = false;
    this.inputAddressObj.title = "Customer Address";
    this.inputAddressObj.showOwnership = true;
    this.inputAddressObj.requiredPhn1 = true;

    this.inputFieldAddressObj = new InputFieldObj(this.UrlConstantNew);
    this.inputFieldAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);

    this.addressType = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    this.addressType.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustAddrType;
    this.addressType.MappingCode = CommonConstant.CustTypeCompany;

    await this.getAddrTypeOwnershipRequired();

    await this.http.post(this.UrlConstantNew.GetListActiveRefMasterWithMappingCodeAll, this.addressType).toPromise().then(
      async (response) => {
        this.listAddressType = response[CommonConstant.ReturnObj];
        this.listAddressType = await this.CustSetData.FilterAddr(this.listAddressType);
        this.CustDataCompanyForm.patchValue({
          MrCustAddrTypeCode: this.listAddressType[0].Key
        })
        this.setOwnership(this.CustDataCompanyForm.controls.MrCustAddrTypeCode.value);
      }
    );

    this.custAddrObj.Id = this.IdCust;
    this.http.post(this.UrlConstantNew.GetListCustAddr, this.custAddrObj).toPromise().then(
      (response : ResGetListCustAddrObj) => {
        this.listCustAddr = response[CommonConstant.ReturnObj];
        if (this.listCustAddr.length > 0) {
          this.CustDataCompanyForm.patchValue({ CopyAddrFrom: response[CommonConstant.ReturnObj][0]['CustAddrId'] });
        }
      }
    );

    if (this.pageType == "edit") {
      this.custAddrObj = new GenericObj();
      this.custAddrObj.Id = this.AddrId;
      await this.http.post(this.UrlConstantNew.GetCustAddr, this.custAddrObj).toPromise().then(
        (response) => {
          this.copyCustomerAddr = response;
          this.CustDataCompanyForm.patchValue({
            Notes: this.copyCustomerAddr.Notes,
            MrCustAddrTypeCode: this.copyCustomerAddr.MrCustAddrTypeCode
          });

          this.addressObj = new CustAddrObj();
          this.addressObj.Addr = this.copyCustomerAddr.Addr;
          this.addressObj.AreaCode3 = this.copyCustomerAddr.AreaCode3;
          this.addressObj.AreaCode4 = this.copyCustomerAddr.AreaCode4;
          this.addressObj.AreaCode1 = this.copyCustomerAddr.AreaCode1;
          this.addressObj.AreaCode2 = this.copyCustomerAddr.AreaCode2;
          this.addressObj.City = this.copyCustomerAddr.City;
          this.addressObj.PhnArea1 = this.copyCustomerAddr.PhnArea1;
          this.addressObj.Phn1 = this.copyCustomerAddr.Phn1;
          this.addressObj.PhnExt1 = this.copyCustomerAddr.PhnExt1;
          this.addressObj.PhnArea2 = this.copyCustomerAddr.PhnArea2;
          this.addressObj.Phn2 = this.copyCustomerAddr.Phn2;
          this.addressObj.PhnArea2 = this.copyCustomerAddr.PhnArea2;
          this.addressObj.PhnExt2 = this.copyCustomerAddr.PhnExt2;
          this.addressObj.PhnArea3 = this.copyCustomerAddr.PhnArea3;
          this.addressObj.Phn3 = this.copyCustomerAddr.Phn3;
          this.addressObj.PhnExt3 = this.copyCustomerAddr.PhnExt3;
          this.addressObj.FaxArea = this.copyCustomerAddr.FaxArea;
          this.addressObj.Fax = this.copyCustomerAddr.Fax;
          this.addressObj.MrHouseOwnershipCode = this.copyCustomerAddr.MrBuildingOwnershipCode;

          this.inputFieldAddressObj = new InputFieldObj(this.UrlConstantNew);
          this.inputFieldAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
          this.inputFieldAddressObj.inputLookupObj.nameSelect = this.copyCustomerAddr.Zipcode;
          this.inputFieldAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.copyCustomerAddr.Zipcode };
          this.inputAddressObj.default = this.addressObj;
          this.inputAddressObj.inputField = this.inputFieldAddressObj;
          this.setOwnership(this.CustDataCompanyForm.controls.MrCustAddrTypeCode.value);
        }
      );
    }

    this.isReady = true;
  }

  async getAddrTypeOwnershipRequired(){
    this.listAddrRequiredOwnership = await this.addressService.GetListAddrTypeOwnershipMandatory();
  }
  
  checkCustAddrType() {
    this.setOwnership(this.CustDataCompanyForm.controls.MrCustAddrTypeCode.value);
  }

  setOwnership(MrCustAddrTypeCode: string) {
    if(this.listAddrRequiredOwnership.find(addrType => addrType == MrCustAddrTypeCode)){
      this.inputAddressObj.requiredOwnership = true;
      return
    }
    this.inputAddressObj.requiredOwnership = false;
  }

  copyAddress() {
    if(this.listCustAddr.length < 1) {
      return;
    }

    let CustAddrIdObj = new GenericObj();
    CustAddrIdObj.Id = this.CustDataCompanyForm.controls["CopyAddrFrom"].value;
    this.http.post(this.UrlConstantNew.GetCustAddr, CustAddrIdObj).subscribe(
      (response) => {
        this.copyCustomerAddrFrom = response;
        this.CustDataCompanyForm.patchValue({
          Notes: this.copyCustomerAddrFrom.Notes
        });

        this.addressObj = new CustAddrObj();
        this.addressObj.Addr = this.copyCustomerAddrFrom.Addr;
        this.addressObj.AreaCode3 = this.copyCustomerAddrFrom.AreaCode3;
        this.addressObj.AreaCode4 = this.copyCustomerAddrFrom.AreaCode4;
        this.addressObj.AreaCode1 = this.copyCustomerAddrFrom.AreaCode1;
        this.addressObj.AreaCode2 = this.copyCustomerAddrFrom.AreaCode2;
        this.addressObj.City = this.copyCustomerAddrFrom.City;
        this.addressObj.PhnArea1 = this.copyCustomerAddrFrom.PhnArea1;
        this.addressObj.Phn1 = this.copyCustomerAddrFrom.Phn1;
        this.addressObj.PhnExt1 = this.copyCustomerAddrFrom.PhnExt1;
        this.addressObj.PhnArea2 = this.copyCustomerAddrFrom.PhnArea2;
        this.addressObj.Phn2 = this.copyCustomerAddrFrom.Phn2;
        this.addressObj.PhnExt2 = this.copyCustomerAddrFrom.PhnExt2;
        this.addressObj.PhnArea3 = this.copyCustomerAddrFrom.PhnArea3;
        this.addressObj.Phn3 = this.copyCustomerAddrFrom.Phn3;
        this.addressObj.PhnExt3 = this.copyCustomerAddrFrom.PhnExt3;
        this.addressObj.FaxArea = this.copyCustomerAddrFrom.FaxArea;
        this.addressObj.Fax = this.copyCustomerAddrFrom.Fax;
        this.addressObj.MrHouseOwnershipCode = this.copyCustomerAddrFrom.MrBuildingOwnershipCode;

        this.inputFieldAddressObj = new InputFieldObj(this.UrlConstantNew);
        this.inputFieldAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
        this.inputFieldAddressObj.inputLookupObj.nameSelect = this.copyCustomerAddrFrom.Zipcode;
        this.inputFieldAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.copyCustomerAddrFrom.Zipcode };
        this.inputAddressObj.default = this.addressObj;
        this.inputAddressObj.inputField = this.inputFieldAddressObj;
      }
    );
  }

  setCustAddr() {
    this.custAddressObj.CustId = this.IdCust;
    this.custAddressObj.MrCustAddrTypeCode = this.CustDataCompanyForm.controls["MrCustAddrTypeCode"].value;
    this.custAddressObj.Addr = this.CustDataCompanyForm.controls["custAddress"]["controls"].Addr.value;
    this.custAddressObj.FullAddr = this.CustDataCompanyForm.controls["custAddress"]["controls"].Addr.value + " RT: " + this.CustDataCompanyForm.controls["custAddress"]["controls"].AreaCode4.value + " RW: " + this.CustDataCompanyForm.controls["custAddress"]["controls"].AreaCode3.value + " " + this.CustDataCompanyForm.controls["custAddress"]["controls"].AreaCode2.value + ", " + this.CustDataCompanyForm.controls["custAddress"]["controls"].AreaCode1.value + " " + this.CustDataCompanyForm.controls["custAddressZipcode"]["controls"].value.value;
    this.custAddressObj.AreaCode3 = this.CustDataCompanyForm.controls["custAddress"]["controls"].AreaCode3.value;
    this.custAddressObj.AreaCode4 = this.CustDataCompanyForm.controls["custAddress"]["controls"].AreaCode4.value;
    this.custAddressObj.Zipcode = this.CustDataCompanyForm.controls["custAddressZipcode"]["controls"].value.value;
    this.custAddressObj.AreaCode1 = this.CustDataCompanyForm.controls["custAddress"]["controls"].AreaCode1.value;
    this.custAddressObj.AreaCode2 = this.CustDataCompanyForm.controls["custAddress"]["controls"].AreaCode2.value;
    this.custAddressObj.City = this.CustDataCompanyForm.controls["custAddress"]["controls"].City.value;
    this.custAddressObj.PhnArea1 = this.CustDataCompanyForm.controls["custAddress"]["controls"].PhnArea1.value;
    this.custAddressObj.Phn1 = this.CustDataCompanyForm.controls["custAddress"]["controls"].Phn1.value;
    this.custAddressObj.PhnExt1 = this.CustDataCompanyForm.controls["custAddress"]["controls"].PhnExt1.value;
    this.custAddressObj.PhnArea2 = this.CustDataCompanyForm.controls["custAddress"]["controls"].PhnArea2.value;
    this.custAddressObj.Phn2 = this.CustDataCompanyForm.controls["custAddress"]["controls"].Phn2.value;
    this.custAddressObj.PhnExt2 = this.CustDataCompanyForm.controls["custAddress"]["controls"].PhnExt2.value;
    this.custAddressObj.PhnArea3 = this.CustDataCompanyForm.controls["custAddress"]["controls"].PhnArea3.value;
    this.custAddressObj.Phn3 = this.CustDataCompanyForm.controls["custAddress"]["controls"].Phn3.value;
    this.custAddressObj.PhnExt3 = this.CustDataCompanyForm.controls["custAddress"]["controls"].PhnExt3.value;
    this.custAddressObj.FaxArea = this.CustDataCompanyForm.controls["custAddress"]["controls"].FaxArea.value;
    this.custAddressObj.Fax = this.CustDataCompanyForm.controls["custAddress"]["controls"].Fax.value;
    this.custAddressObj.MrBuildingOwnershipCode = this.CustDataCompanyForm.controls["custAddress"]["controls"].MrHouseOwnershipCode.value;
    this.custAddressObj.Notes = this.CustDataCompanyForm.controls["Notes"].value;
  }

  SaveForm() {
    this.custAddressObj = new CustAddrObj();
    this.setCustAddr();
    if (this.pageType == "add") {
      this.http.post(this.UrlConstantNew.AddCustAddr, this.custAddressObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.outputValue.emit({ mode: 'check' });
        }
      );
    }
    else {
      this.custAddressObj.CustAddrId = this.AddrId;
      this.custAddressObj.RowVersion = this.copyCustomerAddr.RowVersion;
      this.http.post(this.UrlConstantNew.EditCustAddr, this.custAddressObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.outputValue.emit({ mode: 'check' });
        }
      );
    }
  }

  back() {
    this.outputValue.emit({ mode: 'check' });
  }
}