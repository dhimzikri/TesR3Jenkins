import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AdInsHelper } from "app/shared/AdInsHelper";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { CommonConstant } from "app/shared/constant/CommonConstant";
import { URLConstant } from "app/shared/constant/URLConstant";
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";
import { CriteriaObj } from "app/shared/model/criteria-obj.model";
import { GeneralSettingObj } from "app/shared/model/general-setting-obj.model";
import { InputAddressObj } from "app/shared/model/input-address-obj.model";
import { InputFieldObj } from "app/shared/model/input-field-obj.model";
import { InputLookupObj } from "app/shared/model/input-lookup-obj.model";
import { KeyValueObj } from "app/shared/model/key-value/key-value-obj.model";
import { UcDropdownListObj } from "app/shared/model/library/uc-dropdown-list-obj.model";
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from "app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model";
import { NavigationConstant } from "app/shared/NavigationConstant";
import { AddressService } from "app/shared/services/custAddr.service";

@Injectable()
export class NewCustSetData {

  constructor(private http: HttpClient, private toastr: NGXToastrService, private router: Router, private addressService: AddressService, private UrlConstantNew: UrlConstantNew) { }

  public async BindSetLegalAddr(): Promise<InputAddressObj> {
    let listAddrRequiredOwnership: Array<string> = new Array();
    listAddrRequiredOwnership = await this.addressService.GetListAddrTypeOwnershipMandatory();
    let inputFieldObj = new InputFieldObj(this.UrlConstantNew);
    inputFieldObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
    let inputAddressObj = new InputAddressObj(this.UrlConstantNew);
    inputAddressObj.showSubsection = false;
    inputAddressObj.title = "Customer Address";
    inputAddressObj.inputField = inputFieldObj;
    inputAddressObj.showAllPhn = false;
    inputAddressObj.showOwnership = true;
    inputAddressObj.requiredOwnership = listAddrRequiredOwnership.find(addrType => addrType == CommonConstant.CustAddrTypeLegal)? true : false;
    
    return inputAddressObj;
  }

  public BindLookupPositionSlik(): InputLookupObj {
    let inputLookupObjName = new InputLookupObj(this.UrlConstantNew);
    inputLookupObjName.urlJson = "./assets/uclookup/Customer/lookupPositionSlik.json";
    inputLookupObjName.pagingJson = "./assets/uclookup/Customer/lookupPositionSlik.json";
    inputLookupObjName.genericJson = "./assets/uclookup/Customer/lookupPositionSlik.json";
    return inputLookupObjName;
  }

  public BindLookupExistingCust(CustId: number, listCustNoToExclude: Array<string>, MrCustTypeCode: string): InputLookupObj {
    let existingCustomerLookUpObj = new InputLookupObj(this.UrlConstantNew);
    existingCustomerLookUpObj.isReadonly = false;
    existingCustomerLookUpObj.urlJson = "./assets/lookup/lookupExistingCustomer.json";
    existingCustomerLookUpObj.pagingJson = "./assets/lookup/lookupExistingCustomer.json";
    existingCustomerLookUpObj.genericJson = "./assets/lookup/lookupExistingCustomer.json";

    existingCustomerLookUpObj.addCritInput = this.ResetCriteriaExisting(CustId, listCustNoToExclude, MrCustTypeCode);
    if (CustId == 0) existingCustomerLookUpObj.isReady = true;
    return existingCustomerLookUpObj;
  }

  public ResetCriteriaExisting(CustId: number, listCustNoToExclude: Array<string>, MrCustTypeCode: string, IsMarried: boolean = false, ParentGenderCode: string = ""): Array<CriteriaObj> {
    let criteriaListCust = new Array();
    if (listCustNoToExclude.length > 0) {

      let criteriaCustObj = new CriteriaObj();
      criteriaCustObj.DataType = "text";
      criteriaCustObj.restriction = AdInsConstant.RestrictionNotIn;
      criteriaCustObj.propName = 'C.CUST_NO';
      criteriaCustObj.listValue = listCustNoToExclude;
      criteriaListCust.push(criteriaCustObj);
    }
    if (CustId != 0 || CustId == null) {
      let criteriaCustObj = new CriteriaObj();
      criteriaCustObj.DataType = "text";
      criteriaCustObj.restriction = AdInsConstant.RestrictionNeq;
      criteriaCustObj.propName = 'C.CUST_ID';
      criteriaCustObj.value = CustId.toString();
      criteriaListCust.push(criteriaCustObj);
    }

    if (IsMarried) {
      let criteriaCustObj = new CriteriaObj();
      criteriaCustObj.DataType = "text";
      criteriaCustObj.restriction = AdInsConstant.RestrictionEq;
      criteriaCustObj.propName = 'CP.MR_MARITAL_STAT_CODE';
      criteriaCustObj.value = CommonConstant.MR_MARITAL_STAT_CODE_MARRIED;
      criteriaListCust.push(criteriaCustObj);

      // criteriaCustObj = new CriteriaObj();
      // criteriaCustObj.DataType = "text";
      // criteriaCustObj.restriction = AdInsConstant.RestrictionEq;
      // criteriaCustObj.propName = 'CP.MR_GENDER_CODE';
      // criteriaCustObj.value = ParentGenderCode == CommonConstant.GENDER_MALE ? CommonConstant.GENDER_FEMALE : CommonConstant.GENDER_MALE;
      // criteriaListCust.push(criteriaCustObj);
    }

    let criteriaCustObj = new CriteriaObj();
    criteriaCustObj.DataType = "text";
    criteriaCustObj.restriction = AdInsConstant.RestrictionEq;
    criteriaCustObj.propName = 'MR_CUST_TYPE_CODE';
    criteriaCustObj.value = MrCustTypeCode;
    criteriaListCust.push(criteriaCustObj);

    return criteriaListCust;
  }

  public initDdlRefMaster(refMasterTypeCode: string, mappingCode: string = null, isSelectOutput: boolean = false, apiUrl: string = this.UrlConstantNew.GetListActiveRefMaster, masterCode: string = ""): UcDropdownListObj {
    let tempDdlObj: UcDropdownListObj = new UcDropdownListObj(this.UrlConstantNew);
    let ReqRefMasterObj: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: refMasterTypeCode,
      MappingCode: mappingCode
    };
    tempDdlObj.apiUrl = apiUrl;
    tempDdlObj.requestObj = ReqRefMasterObj;
    tempDdlObj.isSelectOutput = isSelectOutput;
    if (apiUrl == this.UrlConstantNew.GetListActiveRefMasterDetail) {
      tempDdlObj.customKey = "MasterCode";
      tempDdlObj.customValue = "Descr";
    }
    if (apiUrl == this.UrlConstantNew.GetListActiveRefMasterByRefMasterTypeCodeAndMasterCode) {
      tempDdlObj.customKey = "MasterCode";
      tempDdlObj.customValue = "Descr";
      tempDdlObj.requestObj = {RefMasterTypeCode : refMasterTypeCode, MasterCode : masterCode};
    }
    
    tempDdlObj.isReady = true;
    return tempDdlObj;
  }

  public async FilterAddr(listAddr: Array<KeyValueObj>): Promise<Array<KeyValueObj>> {
    await this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, { Code: CommonConstant.GSCodeFilterAddr }).toPromise().then(
      (result: GeneralSettingObj) => {
        if (result.GsValue) {
          let listAddrToFilter: Array<string> = result.GsValue.split(';');
          for (let index = 0; index < listAddrToFilter.length; index++) {
            const element = listAddrToFilter[index];
            let idxFound = listAddr.findIndex(x => x.Key == element);
            if (idxFound >= 0) listAddr.splice(idxFound, 1);
          }
        }
      }
    );
    return listAddr;
  }

  public async SendCustomerDataToRabbitMq(CustNo: string, UrlBack: string = NavigationConstant.CUST_PAGING) {
    await this.http.post(this.UrlConstantNew.SendCustomerDataToRabbitMq, { CustNo: CustNo }, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        if (response["StatusCode"] == 200) {
          this.toastr.successMessage("Sync Customer Succses");
          AdInsHelper.RedirectUrl(this.router, [UrlBack], {});
        }
      }
    )
  }

  public static markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}