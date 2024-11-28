import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { HttpClient } from '@angular/common/http';
import { InputFieldObj } from 'app/shared/model/input-field-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { FormBuilder, Validators } from '@angular/forms';
import { CustAddrObj } from 'app/shared/model/cust-addr-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { InputAddressObj } from 'app/shared/model/input-address-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { ResGetListCustAddrObj, ResListCustAddrObj } from 'app/shared/model/response/res-get-list-cust-addr-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UcAddressObj } from 'app/shared/model/uc-address-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { AddressService } from 'app/shared/services/custAddr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcaddressService } from '@adins/ucaddress';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-personal-address-add',
  templateUrl: './customer-personal-address-add.component.html',
  styleUrls: []
})
export class CustomerPersonalAddressAddComponent implements OnInit {
  @Input() AddrId: number;
  @Input() mode: string;
  @Output() outputValue: EventEmitter<object> = new EventEmitter();

  resultData: any;
  tempCustObj: any;
  listCustAddr: Array<ResListCustAddrObj> = new Array<ResListCustAddrObj>();
  listAddressType: Array<KeyValueObj> = new Array();
  getCustomerAddr: any;
  copyCustomerAddr: any;

  inputFieldAddressObj: InputFieldObj;

  custObj: CustObj;
  addressObj: UcAddressObj;
  custAddrObj: GenericObj = new GenericObj();
  addressType: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
  custAddressObj: CustAddrObj;
  houseOwnershipObj: any;

  custAddrFromObj: CustAddrObj;
  copyCustomerAddrFrom: any;

  BirthDt: Date;
  IdExpiredDt: Date;

  IdCust: number;

  IdNo: string;
  Gender: string;
  pageType: string;
  CustName: string;
  GenderDesc: string;
  CustModel: string;
  BirthPlace: string;
  MrIdTypeCode: string;
  CustModelDesc: string;
  MrIdTypeCodeDesc: string;
  MotherMaidenName: string;
  isReady: boolean = false;
  listAddrRequiredOwnership: Array<string> = new Array();

  CustDataPersonalForm = this.fb.group({
    Notes: [''],
    LuasBangunan: [''],
    LuasTanah: [''],
    KapasitasListrik: [''],
    LocationClass: [''],
    PriceEstimates: [''],
    StaySince:[''],
    StayLength: [''],
    MrCustAddrTypeCode: [''],
    CopyAddrFrom: ['']
  });
  inputAddressObj: InputAddressObj;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder, 
    private toastr: NGXToastrService, private CustSetData: NewCustSetData, private addressService: AddressService, 
    private UrlConstantNew: UrlConstantNew, private ucaddrSvc: UcaddressService,
    private ngxRouter: NgxRouterService) {
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
    this.inputFieldAddressObj = new InputFieldObj(this.UrlConstantNew);
    this.inputFieldAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);

    this.addressType.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustAddrType;
    this.addressType.MappingCode = CommonConstant.CustTypePersonal;

    this.buildingOwnership();
    await this.getAddrTypeOwnershipRequired();

    await this.http.post(this.UrlConstantNew.GetListActiveRefMasterWithMappingCodeAll, this.addressType).toPromise().then(
      async (response) => {
        this.listAddressType = response[CommonConstant.ReturnObj];
        this.listAddressType = await this.CustSetData.FilterAddr(this.listAddressType);
        this.CustDataPersonalForm.patchValue({ MrCustAddrTypeCode: response[CommonConstant.ReturnObj][0]['Key'] });
      });

    this.custAddrObj.Id = this.IdCust;
    await this.http.post(this.UrlConstantNew.GetListCustAddr, this.custAddrObj).toPromise().then(
      (response : ResGetListCustAddrObj) => {
        this.listCustAddr = response[CommonConstant.ReturnObj];
        this.CustDataPersonalForm.patchValue({ CopyAddrFrom: response[CommonConstant.ReturnObj][0]['CustAddrId'] });
      });


    if (this.pageType == "edit") {
      this.custAddrObj = new GenericObj();
      this.custAddrObj.Id = this.AddrId;
      await this.http.post(this.UrlConstantNew.GetCustAddr, this.custAddrObj).toPromise().then(
        (response) => {
          this.getCustomerAddr = response;
          this.CustDataPersonalForm.patchValue({
            Notes: this.getCustomerAddr.Notes,
            MrCustAddrTypeCode: this.getCustomerAddr.MrCustAddrTypeCode
          });

          this.addressObj = new CustAddrObj();
          this.addressObj.Addr = this.getCustomerAddr.Addr;
          this.addressObj.AreaCode3 = this.getCustomerAddr.AreaCode3;
          this.addressObj.AreaCode4 = this.getCustomerAddr.AreaCode4;
          this.addressObj.AreaCode1 = this.getCustomerAddr.AreaCode1;
          this.addressObj.AreaCode2 = this.getCustomerAddr.AreaCode2;
          this.addressObj.City = this.getCustomerAddr.City;
          this.addressObj.PhnArea1 = this.getCustomerAddr.PhnArea1;
          this.addressObj.Phn1 = this.getCustomerAddr.Phn1;
          this.addressObj.PhnExt1 = this.getCustomerAddr.PhnExt1;
          this.addressObj.PhnArea2 = this.getCustomerAddr.PhnArea2;
          this.addressObj.Phn2 = this.getCustomerAddr.Phn2;
          this.addressObj.PhnExt2 = this.getCustomerAddr.PhnExt2;
          this.addressObj.PhnArea3 = this.getCustomerAddr.PhnArea3;
          this.addressObj.Phn3 = this.getCustomerAddr.Phn3;
          this.addressObj.PhnExt3 = this.getCustomerAddr.PhnExt3;
          this.addressObj.FaxArea = this.getCustomerAddr.FaxArea;
          this.addressObj.Fax = this.getCustomerAddr.Fax;

          var isContain = this.checkBuildingOwnership(this.getCustomerAddr.MrBuildingOwnershipCode)
          this.addressObj.MrHouseOwnershipCode = isContain? this.getCustomerAddr.MrBuildingOwnershipCode : '';
          this.addressObj.StaySince = this.getCustomerAddr.StaySince;
          this.addressObj.StayLength = this.getCustomerAddr.StayLength;

          this.inputFieldAddressObj = new InputFieldObj(this.UrlConstantNew);
          this.inputFieldAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
          this.inputFieldAddressObj.inputLookupObj.nameSelect = this.getCustomerAddr.Zipcode;
          this.inputFieldAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.getCustomerAddr.Zipcode };
          this.inputAddressObj.default = this.addressObj;
          this.inputAddressObj.inputField = this.inputFieldAddressObj;
          if (this.getCustomerAddr.MrCustAddrTypeCode == CommonConstant.CustAddrTypeResidence || this.getCustomerAddr.MrCustAddrTypeCode == CommonConstant.CustAddrTypeLegal) {
            this.inputAddressObj.showStayLength = true;
            this.inputAddressObj.useStaySince = true;
          }
          if (this.getCustomerAddr.MrCustAddrTypeCode == CommonConstant.CustAddrTypeJob) {
            this.inputAddressObj.showOwnership = false;
          }
        });
    }
    this.setOwnership(this.CustDataPersonalForm.controls.MrCustAddrTypeCode.value);
    this.isReady = true;
  }

  async getAddrTypeOwnershipRequired(){
    this.listAddrRequiredOwnership = await this.addressService.GetListAddrTypeOwnershipMandatory();
  }

  setOwnership(MrCustAddrTypeCode: string) {
    if(this.listAddrRequiredOwnership.find(addrType => addrType == MrCustAddrTypeCode)){
      this.inputAddressObj.requiredOwnership = true;
      return
    }
    this.inputAddressObj.requiredOwnership = false;
  }

  checkCustAddrType() {
    let addrType: string = this.CustDataPersonalForm.get('MrCustAddrTypeCode').value;
    this.inputAddressObj.showOwnership = true;

    if (addrType == CommonConstant.CustAddrTypeJob) {
      this.inputAddressObj.showOwnership = false;
    }
    if (addrType == CommonConstant.CustAddrTypeResidence || addrType == CommonConstant.CustAddrTypeLegal) {
      this.inputAddressObj.showStayLength = true;
      this.inputAddressObj.useStaySince = true;
      this.CustDataPersonalForm.controls["custAddress"]["controls"].StaySince.setValidators([Validators.required]); //solusi sementara sampai perbaikan pada lib-ucaddress
    }
    else {
      this.inputAddressObj.showStayLength = false;
      this.inputAddressObj.useStaySince = false;
      this.CustDataPersonalForm.controls["custAddress"]["controls"].StaySince.clearValidators(); //solusi sementara sampai perbaikan pada lib-ucaddress
    }
    this.CustDataPersonalForm.controls["custAddress"]["controls"].StaySince.updateValueAndValidity(); //solusi sementara sampai perbaikan pada lib-ucaddress
    this.setOwnership(this.CustDataPersonalForm.controls.MrCustAddrTypeCode.value);
  }

  copyAddress() {

    if (this.listCustAddr.length < 1) {
      return
    }
    this.custAddrFromObj = new CustAddrObj();
    this.custAddrFromObj.CustAddrId = this.CustDataPersonalForm.controls["CopyAddrFrom"].value;
    this.http.post(this.UrlConstantNew.GetCustAddr, { Id: this.custAddrFromObj.CustAddrId }).subscribe(
      (response) => {
        this.copyCustomerAddrFrom = response;
        this.CustDataPersonalForm.patchValue({
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

        var isContain = this.checkBuildingOwnership(this.copyCustomerAddrFrom.MrBuildingOwnershipCode)
        this.addressObj.MrHouseOwnershipCode = isContain? this.copyCustomerAddrFrom.MrBuildingOwnershipCode : '';

        this.addressObj.StaySince = this.ucaddrSvc.FormatDateToYYYYMM(new Date(this.copyCustomerAddrFrom.StaySince));
        this.addressObj.StayLength = this.copyCustomerAddrFrom.StayLength;
        this.inputFieldAddressObj = new InputFieldObj(this.UrlConstantNew);
        this.inputFieldAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
        this.inputFieldAddressObj.inputLookupObj.nameSelect = this.copyCustomerAddrFrom.Zipcode;
        this.inputFieldAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.copyCustomerAddrFrom.Zipcode };
        this.inputAddressObj.default = this.addressObj;
        this.inputAddressObj.inputField = this.inputFieldAddressObj;
      });
  }

  setCustAddr() {
    this.custAddressObj.CustId = this.IdCust;
    this.custAddressObj.MrCustAddrTypeCode = this.CustDataPersonalForm.controls["MrCustAddrTypeCode"].value;
    this.custAddressObj.Addr = this.CustDataPersonalForm.controls["custAddress"]["controls"].Addr.value;
    this.custAddressObj.FullAddr = this.CustDataPersonalForm.controls["custAddress"]["controls"].Addr.value + " RT: " + this.CustDataPersonalForm.controls["custAddress"]["controls"].AreaCode4.value + " RW: " + this.CustDataPersonalForm.controls["custAddress"]["controls"].AreaCode3.value + " " + this.CustDataPersonalForm.controls["custAddress"]["controls"].AreaCode2.value + ", " + this.CustDataPersonalForm.controls["custAddress"]["controls"].AreaCode1.value + " " + this.CustDataPersonalForm.controls["custAddressZipcode"]["controls"].value.value;
    this.custAddressObj.AreaCode3 = this.CustDataPersonalForm.controls["custAddress"]["controls"].AreaCode3.value;
    this.custAddressObj.AreaCode4 = this.CustDataPersonalForm.controls["custAddress"]["controls"].AreaCode4.value;
    this.custAddressObj.Zipcode = this.CustDataPersonalForm.controls["custAddressZipcode"]["controls"].value.value;
    this.custAddressObj.AreaCode1 = this.CustDataPersonalForm.controls["custAddress"]["controls"].AreaCode1.value;
    this.custAddressObj.AreaCode2 = this.CustDataPersonalForm.controls["custAddress"]["controls"].AreaCode2.value;
    this.custAddressObj.City = this.CustDataPersonalForm.controls["custAddress"]["controls"].City.value;
    this.custAddressObj.PhnArea1 = this.CustDataPersonalForm.controls["custAddress"]["controls"].PhnArea1.value;
    this.custAddressObj.Phn1 = this.CustDataPersonalForm.controls["custAddress"]["controls"].Phn1.value;
    this.custAddressObj.PhnExt1 = this.CustDataPersonalForm.controls["custAddress"]["controls"].PhnExt1.value;
    this.custAddressObj.PhnArea2 = this.CustDataPersonalForm.controls["custAddress"]["controls"].PhnArea2.value;
    this.custAddressObj.Phn2 = this.CustDataPersonalForm.controls["custAddress"]["controls"].Phn2.value;
    this.custAddressObj.PhnExt2 = this.CustDataPersonalForm.controls["custAddress"]["controls"].PhnExt2.value;
    this.custAddressObj.PhnArea3 = this.CustDataPersonalForm.controls["custAddress"]["controls"].PhnArea3.value;
    this.custAddressObj.Phn3 = this.CustDataPersonalForm.controls["custAddress"]["controls"].Phn3.value;
    this.custAddressObj.PhnExt3 = this.CustDataPersonalForm.controls["custAddress"]["controls"].PhnExt3.value;
    this.custAddressObj.FaxArea = this.CustDataPersonalForm.controls["custAddress"]["controls"].FaxArea.value;
    this.custAddressObj.Fax = this.CustDataPersonalForm.controls["custAddress"]["controls"].Fax.value;
    this.custAddressObj.MrBuildingOwnershipCode = this.CustDataPersonalForm.controls["custAddress"]["controls"].MrHouseOwnershipCode.value;
    if (this.custAddressObj.MrCustAddrTypeCode == 'RESIDENCE' || this.custAddressObj.MrCustAddrTypeCode == 'LEGAL') {
      this.custAddressObj.StaySince = this.CustDataPersonalForm.controls["custAddress"]["controls"].StaySince.value;
      this.custAddressObj.StayLength = this.CustDataPersonalForm.controls["custAddress"]["controls"].StayLength.value;
    }
    this.custAddressObj.Notes = this.CustDataPersonalForm.controls["Notes"].value;
  }

  SaveForm() {
    this.custAddressObj = new CustAddrObj();
    this.setCustAddr();

    if (this.pageType == "add") {
      this.http.post(this.UrlConstantNew.AddCustAddr, this.custAddressObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          // this.router.navigate(
          //   ["/Customer/CustomerPersonal/Address"], 
          //   { queryParams: { "IdCust": this.IdCust }}
          //   );
          this.outputValue.emit({ mode: 'check' });
        }
      );
    } else {
      this.custAddressObj.CustAddrId = this.AddrId;
      this.custAddressObj.RowVersion = this.getCustomerAddr.RowVersion;
      this.http.post(this.UrlConstantNew.EditCustAddr, this.custAddressObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          // this.router.navigate(
          //   ["/Customer/CustomerPersonal/Address"], 
          //   { queryParams: { "IdCust": this.IdCust }}
          //   );
          this.outputValue.emit({ mode: 'check' });
        }
      );
    }
  }
  back() {
    this.outputValue.emit({ mode: 'check' });
  }

  async buildingOwnership()
  {
    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: "BUILDING_OWNERSHIP" }).toPromise().then(
      (response) => {
        this.houseOwnershipObj = response["ReturnObject"];
      }
    );
  }

  checkBuildingOwnership(event: any)
  {
    var isContain = this.houseOwnershipObj.some(x => x.Key == event)
    return isContain;
  }
}
