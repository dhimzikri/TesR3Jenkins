import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { CustAddrObj } from 'app/shared/model/cust-addr-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { InputAddressObj } from 'app/shared/model/input-address-obj.model';
import { InputFieldObj } from 'app/shared/model/input-field-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { ShareholderPublicObj } from 'app/shared/model/new-cust/shareholder/shareholder-public-obj.model';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-master-cod-obj.model';
import { RefMasterObj } from 'app/shared/model/ref-master-obj.model';
import { UcAddressObj } from 'app/shared/model/uc-address-obj.model';
import { NewCustSetData } from '../NewCustSetData.Service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';

@Component({
  selector: 'app-new-cust-public',
  templateUrl: './new-cust-public.component.html',
})
export class NewCustPublicComponent implements OnInit {

  @Input() CustId: number = 0;
  @Input() CustCompanyMgmntShrholderId: number = 0;
  @Input() tempTotalSharePrct: number = 0;
  @Input() isSubmit: boolean = false;
  @Output() outputCancel: EventEmitter<string> = new EventEmitter();

  isHideAddress = false;
  CustomerForm: FormGroup = this.fb.group({});
  inputAddressObj: InputAddressObj = new InputAddressObj(this.UrlConstantNew);
  readonly CurrencyMaskPrct = CommonConstant.CurrencyMaskPrct;
  constructor(private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService, private newCustService: NewCustSetData, private UrlConstantNew: UrlConstantNew) { }

  readonly RefMasterTypeCodePublicType: string = CommonConstant.RefMasterTypeCodePublicType;

  IsReady: boolean = false;
  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  async ngOnInit() {
    await this.InitData();
    this.DictUcDDLObj[this.RefMasterTypeCodePublicType] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodePublicType, null, true, this.UrlConstantNew.GetListActiveRefMasterDetail);
    this.GetCustAddrToCopy();
    await this.GetExisting();
    this.IsReady = true;
    await this.hideaddr();
  }

  positionSlikLookUpObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  ClearForm(item: ShareholderPublicObj = null) {
    this.CustomerForm = this.fb.group({
      MrPositionSlikCode: [item == null ? '' : item.MrPositionSlikCode, Validators.required],
      MrPublicTypeCode: [item == null ? '' : item.MrPublicTypeCode, Validators.required],
      PublicName: [item == null ? '' : item.PublicName, Validators.required],
      PublicIdentityNo: [item == null ? '' : item.PublicIdentityNo, Validators.required],
      SharePrcnt: [item == null ? 0 : item.SharePrcnt, [Validators.required, Validators.min(0), Validators.max(100)]],
      IsActive: [item == null ? true : item.IsActive, Validators.required],
    });

    if (item != null) {
      //#region patch address
      let inputFieldObj = new InputFieldObj(this.UrlConstantNew);
      inputFieldObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
      inputFieldObj.inputLookupObj.nameSelect = item.PublicZipcode;
      inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: item.PublicZipcode };
      let tempUcAddObj: UcAddressObj = new UcAddressObj();
      tempUcAddObj.AreaCode1 = item.PublicAreaCode1;
      tempUcAddObj.AreaCode2 = item.PublicAreaCode2;
      tempUcAddObj.AreaCode3 = item.PublicAreaCode3;
      tempUcAddObj.AreaCode4 = item.PublicAreaCode4;
      tempUcAddObj.Addr = item.PublicAddr;
      tempUcAddObj.City = item.PublicCity;
      this.inputAddressObj.default = tempUcAddObj;
      this.inputAddressObj.inputField = inputFieldObj;
      //#endregion

      //#region patch positionSlik
      let reqMasterObj: ReqRefMasterByTypeCodeAndMasterCodeObj = {
        MasterCode: item.MrPositionSlikCode,
        RefMasterTypeCode: CommonConstant.RefMasterTypeCodePositionSlik
      };
      this.http.post(this.UrlConstantNew.GetRefMasterByRefMasterTypeCodeAndMasterCode, reqMasterObj).subscribe(
        (response: RefMasterObj) => {
          this.positionSlikLookUpObj.nameSelect = response.Descr;
          this.positionSlikLookUpObj.jsonSelect = { Jabatan: response.Descr };
          this.positionSlikLookUpObj.isReady = true;
        }
      )
      //#endregion

      this.disableOrEnableForm();
    }
  }

  async InitData() {
    this.ClearForm();
    this.inputAddressObj = await this.newCustService.BindSetLegalAddr();
    this.inputAddressObj.showOwnership = false;
    this.inputAddressObj.requiredOwnership = false;
    this.positionSlikLookUpObj = this.newCustService.BindLookupPositionSlik();
  }

  IsLockCopyAddrBtn: boolean = false;
  tempExisting: ShareholderPublicObj = new ShareholderPublicObj();
  async GetExisting() {
    if (this.CustCompanyMgmntShrholderId == 0) return;
    await this.http.post(this.UrlConstantNew.GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId, { Id: this.CustCompanyMgmntShrholderId }).toPromise().then(
      (response: ShareholderPublicObj) => {
        this.tempExisting = response;
        this.ClearForm(response);
        this.IsLockCopyAddrBtn = true;
      }
    )
  }

  tempCustAddrToCopy: CustAddrObj = new CustAddrObj();
  async GetCustAddrToCopy() {
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = this.CustId;
    reqObj.Code = CommonConstant.CustAddrTypeLegal;
    await this.http.post(this.UrlConstantNew.GetCustAddrByMrCustAddrType, reqObj).subscribe(
      (response: CustAddrObj) => {
        this.tempCustAddrToCopy = response;
      }
    );
  }

  async SaveForm() {
    let tempForm = this.CustomerForm.getRawValue();
    let reqSubmitObj: ShareholderPublicObj = this.tempExisting;

    reqSubmitObj.CustId = this.CustId;
    reqSubmitObj.PublicName = tempForm["PublicName"];
    reqSubmitObj.MrPositionSlikCode = tempForm["MrPositionSlikCode"];
    reqSubmitObj.MrPublicTypeCode = tempForm["MrPublicTypeCode"];
    reqSubmitObj.PublicIdentityNo = tempForm["PublicIdentityNo"];
    reqSubmitObj.SharePrcnt = tempForm["SharePrcnt"];
    reqSubmitObj.IsActive = tempForm["IsActive"];

    if (reqSubmitObj.IsActive) {
      let tempTotalSharePrctTobeAdd = this.tempTotalSharePrct + reqSubmitObj.SharePrcnt;
      if (tempTotalSharePrctTobeAdd > 100) {
        this.toastr.warningMessage(ExceptionConstant.TOTAL_SHARE_CAN_NOT_100);
        this.toastr.warningMessage("Total Share now is " + this.tempTotalSharePrct + "%");
        return;
      }
    }
    reqSubmitObj.PublicAddr = tempForm["UcAddress"]["Addr"];
    reqSubmitObj.PublicAreaCode1 = tempForm["UcAddress"]["AreaCode1"];
    reqSubmitObj.PublicAreaCode2 = tempForm["UcAddress"]["AreaCode2"];
    reqSubmitObj.PublicAreaCode3 = tempForm["UcAddress"]["AreaCode3"];
    reqSubmitObj.PublicAreaCode4 = tempForm["UcAddress"]["AreaCode4"];
    reqSubmitObj.PublicCity = tempForm["UcAddress"]["City"];
    reqSubmitObj.PublicZipcode = tempForm["UcAddressZipcode"]["value"];

    this.isSubmit = true;

    await this.http.post(this.SetUrlApi(), reqSubmitObj, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        if(response == undefined)
        {
          this.isSubmit = false;
        }
        else
        {
          this.Cancel();
        }
      }
    )
  }

  SetUrlApi(): string {
    let urlApi: string = this.UrlConstantNew.AddCustCompanyMgmntShrholderPublic;
    if (this.CustCompanyMgmntShrholderId != 0) urlApi = this.UrlConstantNew.EditCustCompanyMgmntShrholderPublic;
    return urlApi;
  }

  //#region Change
  Cancel() {
    this.outputCancel.emit();
  }

  getLookUpSlik(ev: { Code: string, Jabatan: string }) {
    let tempMrPositionSlikCode = this.CustomerForm.get("MrPositionSlikCode");
    tempMrPositionSlikCode.patchValue(ev.Code);
  }

  onOptionsSelected(ev: { selectedIndex: number, selectedObj: RefMasterObj, selectedValue: string }) {
    let tempPublicName = this.CustomerForm.get("PublicName");
    let tempPublicIdentityNo = this.CustomerForm.get("PublicIdentityNo");

    if (ev.selectedValue == RefMasterConstant.MR_PUBLIC_TYPE_CODE_CMTY){
      this.inputAddressObj.isRequired = false;
      this.inputAddressObj.inputField.inputLookupObj.isRequired = false;

      setTimeout(() => { this.isHideAddress = true; }, 100);

    }
    else{
      this.inputAddressObj.isRequired = true;
      this.inputAddressObj.inputField.inputLookupObj.isRequired = true;
      this.isHideAddress = false;

    }

    if (ev.selectedValue == RefMasterConstant.MR_PUBLIC_TYPE_CODE_CMTY || ev.selectedValue == RefMasterConstant.MR_PUBLIC_TYPE_CODE_PRI) {
      tempPublicName.patchValue(ev.selectedObj.Descr);
      tempPublicIdentityNo.patchValue(ev.selectedObj.ReserveField1);
      this.disableOrEnableForm();
      return;
    }
    tempPublicIdentityNo.patchValue("");
    tempPublicName.patchValue("");
    this.disableOrEnableForm();
  }

  disableOrEnableForm() {
    let tempMrPublicTypeCode = this.CustomerForm.get("MrPublicTypeCode");
    let tempPublicName = this.CustomerForm.get("PublicName");
    let tempPublicIdentityNo = this.CustomerForm.get("PublicIdentityNo");
    if (tempMrPublicTypeCode.value == RefMasterConstant.MR_PUBLIC_TYPE_CODE_CMTY || tempMrPublicTypeCode.value == RefMasterConstant.MR_PUBLIC_TYPE_CODE_PRI) {
      tempPublicName.disable();
      tempPublicIdentityNo.disable();
      return;
    }
    tempPublicIdentityNo.enable();
    tempPublicName.enable();
  }

  CopyLegalAddr() {
    let inputFieldObj = new InputFieldObj(this.UrlConstantNew);
    inputFieldObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
    inputFieldObj.inputLookupObj.isReadonly = false;
    inputFieldObj.inputLookupObj.nameSelect = this.tempCustAddrToCopy.Zipcode;
    inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: this.tempCustAddrToCopy.Zipcode };
    let tempUcAddObj: UcAddressObj = new UcAddressObj();
    tempUcAddObj.AreaCode1 = this.tempCustAddrToCopy.AreaCode1;
    tempUcAddObj.AreaCode2 = this.tempCustAddrToCopy.AreaCode2;
    tempUcAddObj.AreaCode3 = this.tempCustAddrToCopy.AreaCode3;
    tempUcAddObj.AreaCode4 = this.tempCustAddrToCopy.AreaCode4;
    tempUcAddObj.Addr = this.tempCustAddrToCopy.Addr;
    tempUcAddObj.City = this.tempCustAddrToCopy.City;
    this.inputAddressObj.default = tempUcAddObj;
    this.inputAddressObj.inputField = inputFieldObj;
  }

  async hideaddr(){
    let tempMrPublicTypeCode = this.CustomerForm.get("MrPublicTypeCode");
    if(tempMrPublicTypeCode.value == RefMasterConstant.MR_PUBLIC_TYPE_CODE_CMTY){
      this.inputAddressObj.isRequired = false;
      this.inputAddressObj.inputField.inputLookupObj.isRequired = false;
      setTimeout(() => { this.isHideAddress = true; }, 100);
    }
  }
  //#endregion
}
