import { AdInsHelper } from "app/shared/AdInsHelper";
import * as env from "assets/config/enviConfig.json";
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { Router } from "@angular/router";
import { VendorHoObj } from 'app/shared/model/vendor-ho-obj.model';
import { EmployeeAllObj } from 'app/shared/model/employee-all-obj.model';
import { VendorObj } from 'app/shared/model/vendor-obj.model';
import { VendorAddrObj } from 'app/shared/model/vendor-addr-obj.model';
import { CommonConstant } from "app/shared/constant/CommonConstant";
import { VendorAttrContentObj } from "app/shared/model/vendor-attr-content-obj.model";
import { GenericObj } from "app/shared/model/generic/generic-obj.model";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { VendorBranchObj } from "app/shared/model/vendor-branch-obj.model";
import { ExceptionConstant } from "app/shared/constant/ExceptionConstant";
import { VendorAtpmMappingObj } from "app/shared/model/vendor-atpm-mapping-obj.model";
import { NavigationConstant } from "app/shared/NavigationConstant";
import { VendorBranchEmpObjX } from 'app/impl/shared/model/vendor-branch-emp-obj.model-x';
import { RefMasterConstant } from "app/shared/RefMasterConstant";
import { FormGroup } from "@angular/forms";
import { UcTemplateService } from "@adins/uctemplate";
import { URLConstant } from 'app/shared/constant/URLConstant';
import { EmployeeObj } from "app/shared/model/employee-obj.model";
import { EmployeeBankObj } from "app/shared/model/employee-bank-obj.model";
import { EmployeeUserObj } from "app/shared/model/employee-user-obj.model";
import { EmployeeUserRoleObj } from "app/shared/model/employee-user-role-obj.model";
import { EmployeeDetailObj } from "app/shared/model/employee-detail-obj.model";
import { CommonConstantX } from "../constant/CommonConstantX";

const envi = URLConstant.env;


export async function addEditvendorBranchX(dicts: Record<string, any>, api: string, next: string, http: HttpClient, toastr: NGXToastrService, router: Router) {
  let url = envi.FoundationR3Url + api;
  let checkTaxNoUrl = envi.FoundationR3Url + "/v1/VendorX/GetVendorByTaxNoX"
  let continueSave = true;
  //tambah validasi kalau tipe supplier confirmation
  if (dicts.formRaw.MrVendorCategoryCode == "SUPPLIER" && dicts.formRaw.IsNpwpExist == true) {
    await http.post(checkTaxNoUrl, { VendorId: dicts.VendorId, TaxNo: dicts.formRaw.TaxIdNo, MrVendorCategoryCode: dicts.formRaw.MrVendorCategoryCode }).toPromise().then(
      async (response) => {
        let result2: any;
        result2 = response;
        let res = result2.ReturnObject
        if (res !== null) {
          let confirmation = confirm("This NPWP " + ExceptionConstant.ALREADY_EXIST + " in vendor supplier " + res.VendorName);
          if (confirmation == false) {
            continueSave = false;
          }
        }
      }
    );
  }
  if (continueSave == true) {
    let vendorBranchObj: any;
    vendorBranchObj = new VendorBranchObj();
    vendorBranchObj.VendorObj = new VendorObj();
    vendorBranchObj.VendorAddrObj = new VendorAddrObj();

    vendorBranchObj.VendorObj.MrVendorCategoryCode = dicts.formRaw.MrVendorCategoryCode;
    vendorBranchObj.VendorObj.VendorCode = dicts.formRaw.VendorCode;
    vendorBranchObj.VendorObj.VendorName = dicts.formRaw.VendorName;
    vendorBranchObj.VendorObj.MrVendorTypeCode = dicts.formRaw.MrVendorTypeCode;

    if (vendorBranchObj.VendorObj.MrVendorTypeCode == CommonConstant.VENDOR_TYPE_PERSONAL) {
      //vendorBranchObj.VendorObj.IdNo = dicts.formRaw.IdNo;
      vendorBranchObj.VendorObj.RegistrationNo = "";
      vendorBranchObj.VendorObj.LicenseNo = "";
      vendorBranchObj.VendorObj.TaxSchmCode = dicts.formRaw.TaxSchmCodePersonal1;
      vendorBranchObj.VendorObj.MrIdTypeCode = CommonConstantX.EKTP;
    }
    else {
      vendorBranchObj.VendorObj.IdNo = "";
      vendorBranchObj.VendorObj.RegistrationNo = dicts.formRaw.RegistrationNo;
      vendorBranchObj.VendorObj.LicenseNo = dicts.formRaw.LicenseNo;
      vendorBranchObj.VendorObj.TaxSchmCode = dicts.formRaw.TaxSchmCodeCompany1;
      vendorBranchObj.VendorObj.MrIdTypeCode = CommonConstantX.TDP;
    }

    //vendorBranchObj.VendorObj.MrIdTypeCode = dicts.formRaw.MrIdTypeCode;
    vendorBranchObj.VendorObj.MobilePhnNo1 = dicts.formRaw.MobilePhnNo1;
    vendorBranchObj.VendorObj.MobilePhnNo2 = dicts.formRaw.MobilePhnNo2;
    vendorBranchObj.VendorObj.Email = dicts.formRaw.Email;
    vendorBranchObj.VendorObj.VendorRating = dicts.formRaw.VendorRating;
    vendorBranchObj.VendorObj.VendorRatingAlias = dicts.formRaw.VendorRatingAlias;
    vendorBranchObj.VendorObj.EstablishmentDt = dicts.formRaw.EstablishmentDt;
    vendorBranchObj.VendorObj.PartnershipDt = dicts.formRaw.PartnershipDt;
    vendorBranchObj.VendorObj.IsActive = dicts.formRaw.IsActive;

    vendorBranchObj.VendorObj.VendorParentId = dicts.formRaw.VendorParentId;
    if (dicts.MrVendorCategoryCode != CommonConstant.SUPPLIER && dicts.MrVendorCategoryCode != CommonConstant.ASSET_INSCO_BRANCH && dicts.MrVendorCategoryCode != CommonConstant.LIFE_INSCO_BRANCH &&
      dicts.MrVendorCategoryCode != CommonConstant.SURVEYOR_BRANCH && dicts.MrVendorCategoryCode != CommonConstant.CRD_INSCO_BRANCH) {
      vendorBranchObj.VendorObj.VendorParentId = "";
    }

    vendorBranchObj.VendorObj.ReservedField2 = "";
    vendorBranchObj.VendorObj.ReservedField3 = "";
    vendorBranchObj.VendorObj.ReservedField4 = "";
    vendorBranchObj.VendorObj.ReservedField5 = "";
    vendorBranchObj.VendorObj.ReservedField6 = "";
    vendorBranchObj.VendorObj.ReservedField9 = "";
    vendorBranchObj.VendorObj.MrTaxCalcMethodCode = dicts.formRaw.MrTaxCalcMethodCode;
    vendorBranchObj.VendorObj.IsVat = dicts.formRaw.IsVat;
    vendorBranchObj.VendorObj.IsNpwpExist = dicts.formRaw.IsNpwpExist;
    vendorBranchObj.VendorObj.IsOneAffiliate = dicts.formRaw.IsOneAffiliate;
    if(dicts.mode == "edit"){
      vendorBranchObj.VendorObj.MrTaxCalcMethodCode = dicts.VendorObj.MrTaxCalcMethodCode;
      vendorBranchObj.VendorObj.IdNo = dicts.formRaw.VendorCode;
    }

    if (vendorBranchObj.VendorObj.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
      vendorBranchObj.VendorObj.ReservedField3 = dicts.formRaw.ReservedField3;
      vendorBranchObj.VendorObj.ReservedField4 = dicts.formRaw.ReservedField4;
      vendorBranchObj.VendorObj.ReservedField5 = dicts.formRaw.ReservedField5;

      if (dicts.formRaw.VendorAttrList !== undefined && dicts.formRaw.VendorAttrList !== null) {
        if (dicts.formRaw.VendorAttrList.AP_DUE_AFTER_GLV !== null) {
          vendorBranchObj.VendorObj.ReservedField6 = dicts.formRaw.VendorAttrList.AP_DUE_AFTER_GLV.VendorAttrValue;
        }
      }
    }

    if (vendorBranchObj.VendorObj.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH) {
      vendorBranchObj.VendorObj.ReservedField2 = dicts.formRaw.ReservedField2;
      vendorBranchObj.VendorObj.ReservedField9 = dicts.formRaw.ReservedField9;
    }

    if (dicts.formRaw.IsNpwpExist == true) {
      vendorBranchObj.VendorObj.TaxIdNo = dicts.formRaw.TaxIdNo;
      vendorBranchObj.VendorObj.TaxpayerName = dicts.formRaw.TaxpayerName;

      vendorBranchObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
      vendorBranchObj.VendorAddrObj.Addr = dicts.formRaw.Addr;
      vendorBranchObj.VendorAddrObj.Zipcode = dicts.formRaw.Zipcode;
      vendorBranchObj.VendorAddrObj.AreaCode2 = dicts.formRaw.AreaCode2;
      vendorBranchObj.VendorAddrObj.AreaCode1 = dicts.formRaw.AreaCode1;
      vendorBranchObj.VendorAddrObj.AreaCode3 = dicts.formRaw.AreaCode3;
      vendorBranchObj.VendorAddrObj.AreaCode4 = dicts.formRaw.AreaCode4;
      vendorBranchObj.VendorAddrObj.City = dicts.formRaw.City;
      vendorBranchObj.VendorAddrObj.Province = dicts.formRaw.Province;
    }
    else if (dicts.mode == "edit") {
      vendorBranchObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
      vendorBranchObj.VendorAddrObj.Addr = dicts.VendorAddrObj.Addr;
      vendorBranchObj.VendorAddrObj.Zipcode = dicts.VendorAddrObj.Zipcode;
      vendorBranchObj.VendorAddrObj.AreaCode2 = dicts.VendorAddrObj.AreaCode2;
      vendorBranchObj.VendorAddrObj.AreaCode1 = dicts.VendorAddrObj.AreaCode1;
      vendorBranchObj.VendorAddrObj.AreaCode3 = dicts.VendorAddrObj.AreaCode3;
      vendorBranchObj.VendorAddrObj.AreaCode4 = dicts.VendorAddrObj.AreaCode4;
      vendorBranchObj.VendorAddrObj.City = dicts.VendorAddrObj.City;
      vendorBranchObj.VendorAddrObj.Province = dicts.VendorAddrObj.Province;
    }

    if (dicts.formRaw.VendorAttrList != undefined) {
      var formValue = dicts.formRaw.VendorAttrList;

      if (Object.keys(formValue).length > 0 && formValue.constructor === Object) {
        let vendorAttrRequest = new Array<VendorAttrContentObj>();

        for (const x in formValue) {
          if (formValue[x]["VendorAttrValue"] != null) {
            let vendorAttr = new VendorAttrContentObj();

            vendorAttr.VendorAttrContentId = formValue[x]["VendorAttrContentId"];
            vendorAttr.VendorId = dicts.VendorId;
            vendorAttr.AttrContent = formValue[x]["VendorAttrValue"];
            vendorAttr.AttrCode = formValue[x]["AttrCode"];
            vendorAttrRequest.push(vendorAttr);
          }
        }
        vendorBranchObj.VendorAttrContentObjs = vendorAttrRequest;
      }
    }

    let MrVendorCategoryCodeParam = dicts.formRaw.MrVendorCategoryCode;

    if (dicts.formRaw.MrVendorCategoryCode == CommonConstant.NOTARY) {
      if (dicts.formRaw.MrVendorTypeCode == CommonConstant.VENDOR_TYPE_PERSONAL) {
        MrVendorCategoryCodeParam = CommonConstant.NOTARY_PERSONAL;
      }
      else {
        MrVendorCategoryCodeParam = CommonConstant.NOTARY_COMPANY;
      }
    }

    if (dicts.mode == "edit") {
      if (dicts.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL || dicts.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY) {
        vendorBranchObj.VendorObj.MrVendorTypeCode = dicts.formRaw.MrVendorTypeCode;
      }
      vendorBranchObj.VendorObj.VendorId = dicts.VendorId;
      vendorBranchObj.VendorAddrObj.VendorAddrId = dicts.VendorAddrObj.VendorAddrId;

      if (dicts.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_BRANCH
        || dicts.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH
        || dicts.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL
        || dicts.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY
        || dicts.MrVendorCategoryCode == CommonConstant.NOTARY_COMPANY
        || dicts.MrVendorCategoryCode == CommonConstant.SUPPLIER
        || dicts.MrVendorCategoryCode == CommonConstant.CRD_INSCO_BRANCH) {
        vendorBranchObj.VendorObj.RowVersion = dicts.RowVersionVendor;
        vendorBranchObj.VendorAddrObj.RowVersion = dicts.RowVersionAddr;
      } else {
        vendorBranchObj.VendorObj.RowVersion = dicts.formRaw.RowVersionVendor;
        vendorBranchObj.VendorAddrObj.RowVersion = dicts.formRaw.RowVersionAddr;
      }
      let reqEditVendorBranchObjX: any = {
        skuNo: dicts.formRaw.SKUNo,
        vendorBranchObj: vendorBranchObj,
      };

      await http.post<GenericObj>(url, reqEditVendorBranchObjX, AdInsConstant.SpinnerOptions).toPromise().then(
        (response) => {
          toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(router, [next], { "VendorId": response.Id, "MrVendorCategoryCode": MrVendorCategoryCodeParam, "mode": "edit" });
        });
    }
    else {
      let reqAddVendorBranchObjX: any = {
        skuNo: dicts.formRaw.SKUNo,
        vendorBranchObj: vendorBranchObj,
      };

      await http.post<GenericObj>(url, reqAddVendorBranchObjX, AdInsConstant.SpinnerOptions).toPromise().then(
        (response) => {
          toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(router, [next], { "VendorId": response.Id, "MrVendorCategoryCode": MrVendorCategoryCodeParam });
        });
    }
  }
}

export function addEditvendorHOX(dicts: Record<string, any>, api: string, next: string, http: HttpClient, toastr: NGXToastrService, router: Router) {
  let url = envi.FoundationR3Url + api;

  let vendorHoObj = new VendorHoObj();

  vendorHoObj.VendorObj = new VendorObj();
  vendorHoObj.VendorObj.Email = dicts.formRaw.Email;
  vendorHoObj.VendorObj.EstablishmentDt = dicts.formRaw.EstablishmentDt;
  vendorHoObj.VendorObj.IdNo = dicts.formRaw.IdNo;
  vendorHoObj.VendorObj.IsActive = dicts.formRaw.IsActive;
  vendorHoObj.VendorObj.IsNpwpExist = dicts.formRaw.IsNpwpExist;
  vendorHoObj.VendorObj.IsOneAffiliate = dicts.formRaw.IsOneAffiliate;
  vendorHoObj.VendorObj.IsVat = dicts.formRaw.IsVat;
  vendorHoObj.VendorObj.LicenseNo = dicts.formRaw.LicenseNo;
  vendorHoObj.VendorObj.MobilePhnNo1 = dicts.formRaw.MobilePhnNo1;
  vendorHoObj.VendorObj.MobilePhnNo2 = dicts.formRaw.MobilePhnNo2;
  vendorHoObj.VendorObj.MrIdTypeCode = dicts.formRaw.MrIdTypeCode;
  vendorHoObj.VendorObj.MrTaxCalcMethodCode = dicts.formRaw.MrTaxCalcMethodCode;
  vendorHoObj.VendorObj.MrVendorCategoryCode = dicts.formRaw.MrVendorCategoryCode;
  vendorHoObj.VendorObj.MrKonvenSyariahCode = dicts.formRaw.MrKonvenSyariahCode;
  vendorHoObj.VendorObj.MrVendorClass = CommonConstant.HeadOffice;
  vendorHoObj.VendorObj.MrVendorTypeCode = dicts.formRaw.MrVendorTypeCode;
  vendorHoObj.VendorObj.PartnershipDt = dicts.formRaw.PartnershipDt;
  vendorHoObj.VendorObj.RegistrationNo = dicts.formRaw.RegistrationNo;
  vendorHoObj.VendorObj.VendorCode = dicts.formRaw.VendorCode;
  vendorHoObj.VendorObj.VendorName = dicts.formRaw.VendorName;

  vendorHoObj.VendorObj.VendorRating = dicts.formRaw.VendorRating;

  if (dicts.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO) {
    vendorHoObj.VendorObj.VendorParentId = dicts.formRaw.VendorParentId;
  }

  vendorHoObj.VendorAddrObj = new VendorAddrObj();
  vendorHoObj.VendorAddrObj.MrAddrTypeCode = "";
  vendorHoObj.VendorAddrObj.Addr = "";
  vendorHoObj.VendorAddrObj.Zipcode = "";
  vendorHoObj.VendorAddrObj.AreaCode2 = "";
  vendorHoObj.VendorAddrObj.AreaCode1 = "";
  vendorHoObj.VendorAddrObj.City = "";
  vendorHoObj.VendorAddrObj.Province = "";

  if (dicts.formRaw.IsNpwpExist == true) {
    vendorHoObj.VendorObj.TaxIdNo = dicts.formRaw.TaxIdNo;
    vendorHoObj.VendorObj.TaxpayerName = dicts.formRaw.TaxpayerName;
    vendorHoObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
    vendorHoObj.VendorAddrObj.Addr = dicts.formRaw.Addr;
    vendorHoObj.VendorAddrObj.Zipcode = dicts.formRaw.Zipcode;
    vendorHoObj.VendorAddrObj.AreaCode2 = dicts.formRaw.AreaCode2;
    vendorHoObj.VendorAddrObj.AreaCode1 = dicts.formRaw.AreaCode1;
    vendorHoObj.VendorAddrObj.AreaCode3 = dicts.formRaw.AreaCode3;
    vendorHoObj.VendorAddrObj.AreaCode4 = dicts.formRaw.AreaCode4;
    vendorHoObj.VendorAddrObj.City = dicts.formRaw.City;
    vendorHoObj.VendorAddrObj.Province = dicts.formRaw.Province;
  }

  if (dicts.formRaw.VendorAttrList != undefined) {
    let formValue = dicts.formRaw.VendorAttrList;
    if (Object.keys(formValue).length > 0 && formValue.constructor === Object) {
      let vendorAttrRequest = new Array<VendorAttrContentObj>();

      for (const x in formValue) {
        let vendorAttr = new VendorAttrContentObj();
        vendorAttr.VendorAttrContentId = formValue[x]["VendorAttrContentId"];
        vendorAttr.VendorId = dicts.VendorId;
        vendorAttr.AttrContent = formValue[x]["VendorAttrValue"];
        vendorAttr.AttrCode = formValue[x]["AttrCode"];
        vendorAttrRequest.push(vendorAttr);
      }

      vendorHoObj.VendorAttrContentObjs = vendorAttrRequest;
    }
  }

  if (dicts.vendorAtpmList != undefined && dicts.vendorAtpmList.length > 0) {
    vendorHoObj.VendorAtpmMappingObjs = new Array<VendorAtpmMappingObj>();

    for (let i = 0; i < dicts.vendorAtpmList.length; i++) {

      let vendorAtpmMappingObj = new VendorAtpmMappingObj();
      vendorAtpmMappingObj.VendorAtpmId = dicts.vendorAtpmList[i].VendorAtpmId;

      vendorHoObj.VendorAtpmMappingObjs.push(vendorAtpmMappingObj);
    }
  }

  if (dicts.mode != undefined && dicts.mode == "edit") {
    vendorHoObj.VendorObj.VendorId = dicts.VendorId;
    vendorHoObj.VendorAddrObj.VendorAddrId = dicts.VendorAddrObj.VendorAddrId;
    vendorHoObj.VendorObj.RowVersion = dicts.RowVersionVendor;
    vendorHoObj.VendorAddrObj.RowVersion = dicts.RowVersionAddr;
  }

  let reqVendorHOObjX: any = {
    isSyariah: dicts.formRaw.IsSyariah,
    acquisitionCost: dicts.formRaw.AcquisitionCost,
    vendorHoObj: vendorHoObj,
  };

  http.post<GenericObj>(url, reqVendorHOObjX, AdInsConstant.SpinnerOptions).subscribe(
    (response) => {
      toastr.successMessage(response["message"]);
      AdInsHelper.RedirectUrl(router, [next], { "VendorId": response.Id, "MrVendorCategoryCode": dicts.formRaw.MrVendorCategoryCode });
    });
}

export function addEditEmployeeX(
  dicts: Record<string, any>,
  api: string,
  next: string,
  http: HttpClient,
  toastr: NGXToastrService,
  router: Router
) {
  let url = envi.FoundationR3Url + api;
  let employeeAllObj = new EmployeeAllObj();

  // Assigning nested RefEmpV2Obj structure
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj = new EmployeeObj();
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj = new EmployeeDetailObj();
  
  // Populating RefEmployeeObj with data
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.EmpNo = dicts.formRaw.EmpNo;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.EmpName = dicts.formRaw.EmpName;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.JoinDt = dicts.formRaw.JoinDt;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Addr = dicts.formRaw.Addr || "-";
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Zipcode = dicts.formRaw.Zipcode;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.AreaCode1 = dicts.formRaw.AreaCode1;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.AreaCode2 = dicts.formRaw.AreaCode2;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.AreaCode3 = dicts.formRaw.AreaCode3;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.AreaCode4 = dicts.formRaw.AreaCode4;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.City = dicts.formRaw.City || "-";
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.PhnArea1 = dicts.formRaw.PhnArea1;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Phn1 = dicts.formRaw.Phn1 || "0";
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.PhnExt1 = dicts.formRaw.PhnExt1;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.PhnArea2 = dicts.formRaw.PhnArea2;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Phn2 = dicts.formRaw.Phn2;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.PhnExt2 = dicts.formRaw.PhnExt2;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.PhnArea3 = dicts.formRaw.PhnArea3;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Phn3 = dicts.formRaw.Phn3;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.PhnExt3 = dicts.formRaw.PhnExt3;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.FaxArea = dicts.formRaw.FaxArea;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Fax = dicts.formRaw.Fax;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.MobilePhnNo1 = dicts.formRaw.MobilePhnNo1;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.MobilePhnNo2 = dicts.formRaw.MobilePhnNo2;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Email1 = dicts.formRaw.Email1;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Email2 = dicts.formRaw.Email2;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.IsExt = dicts.formRaw.IsExt;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.TaxIdNo = dicts.formRaw.TaxIdNo;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.MrIdTypeCode = dicts.formRaw.IdType;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.IdNo = dicts.formRaw.IdNum;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.ImageLocation = dicts.formRaw.ImageLocation;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Loginsoftphone = dicts.formRaw.Loginsoftphone;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.IsLeave = dicts.formRaw.LeaveStatus;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.IsActive = dicts.formRaw.ActiveStatus;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.RowVersion = dicts.formRaw.RefEmployeeObjRowVersion;

  // Populating MrEmpGradeLvlTypeCode and ExpectedEndDt
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.MrEmpGradeLvlTypeCode = dicts.formRaw.MrEmpGradeLvlTypeCode;
  employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.ExpectedEndDt = dicts.formRaw.ExpectedEndDt;

  // Assigning RefUserObj inside RefEmpV2Wrapper
  employeeAllObj.RefEmpV2Obj.RefUserObj = new EmployeeUserObj();
  employeeAllObj.RefEmpV2Obj.RefUserObj.Username = dicts.formRaw.Username;
  employeeAllObj.RefEmpV2Obj.RefUserObj.Password = dicts.formRaw.Password;
  employeeAllObj.RefEmpV2Obj.RefUserObj.FailPwdCount = dicts.formRaw.FailPwdCount;
  employeeAllObj.RefEmpV2Obj.RefUserObj.IsLockedOut = dicts.formRaw.IsLockedOut;
  employeeAllObj.RefEmpV2Obj.RefUserObj.IsActive = dicts.formRaw.ActiveStatus;
  employeeAllObj.RefEmpV2Obj.RefUserObj.IsLoggedIn = dicts.formRaw.IsLoggedIn;
  employeeAllObj.RefEmpV2Obj.RefUserObj.LoggedInMethod = dicts.formRaw.LoggedInMethod;
  employeeAllObj.RefEmpV2Obj.RefUserObj.PasswordExpirationDt = dicts.formRaw.PasswordExpirationDt;
  employeeAllObj.RefEmpV2Obj.RefUserObj.IsNeedUpdatePassword = dicts.formRaw.IsNeedUpdatePassword;
  employeeAllObj.RefEmpV2Obj.RefUserObj.RowVersion = dicts.formRaw.RefUserObjRowVersion;

  // Assigning RefUserRoleObj inside RefEmpV2Wrapper
  employeeAllObj.RefEmpV2Obj.RefUserRoleObj = new EmployeeUserRoleObj();
  employeeAllObj.RefEmpV2Obj.RefUserRoleObj.RefBizUnitId = dicts.formRaw.RefBizUnitId;
  employeeAllObj.RefEmpV2Obj.RefUserRoleObj.RefJobTitleId = dicts.formRaw.RefJobTitleId;
  employeeAllObj.RefEmpV2Obj.RefUserRoleObj.SpvId = dicts.formRaw.SpvId;
  employeeAllObj.RefEmpV2Obj.RefUserRoleObj.RefRoleId = dicts.formRaw.RefRoleId;
  employeeAllObj.RefEmpV2Obj.RefUserRoleObj.RefOfficeId = dicts.formRaw.RefOfficeId;
  employeeAllObj.RefEmpV2Obj.RefUserRoleObj.IsActive = dicts.formRaw.ActiveStatus;

  // Assigning new properties for MedicalCoverage and EmployeeStatus
  employeeAllObj.MedicalCoverage = dicts.formRaw.MedicalCoverage; // default value
  employeeAllObj.EmployeeStatus = dicts.formRaw.EmployeeStatus; // default value

  // Handling edit mode
  if (dicts.mode !== undefined && dicts.mode === "edit") {
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmpId = dicts.RefEmpObj.RefEmpId;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.MrEmpGradeLvlTypeCode = dicts.formRaw.MrEmpGradeLvlTypeCode;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.ExpectedEndDt = dicts.formRaw.ExpectedEndDt;
    employeeAllObj.RefEmpV2Obj.RefUserObj.RefUserId = dicts.RefUserObj.RefUserId;
    employeeAllObj.RefEmpV2Obj.RefUserObj.APIKey = dicts.formRaw.APIKey;
    employeeAllObj.RefEmpV2Obj.RefUserRoleObj.RefUserRoleId = dicts.formRaw.RefUserRoleId;
  }

  // Make the HTTP POST request
  http.post<GenericObj>(url, employeeAllObj, AdInsConstant.SpinnerOptions).subscribe(
    (response) => {
      toastr.successMessage(response["message"]);
      AdInsHelper.RedirectUrl(router, [next], {});
    }
  );
}


export function cancelHORegistrationX(dicts: Record<string, any>, router: Router) {
  if (dicts.mode != undefined && dicts.mode == "edit") {
    AdInsHelper.RedirectUrl(router, [NavigationConstant.VENDOR_HO_REG_X], { "VendorId": dicts.VendorId, "MrVendorCategoryCode": dicts.MrVendorCategoryCode });
  }
  else {
    AdInsHelper.RedirectUrl(router, [NavigationConstant.VENDOR_PAGING_X], { "MrVendorCategoryCode": dicts.MrVendorCategoryCode });
  }
}

export async function addEditVendorBranchEmpX(dicts: Record<string, any>, next: string, api: string, http: HttpClient, toastr: NGXToastrService, router: Router, parentForm: FormGroup, templateService: UcTemplateService) {
  let continueToSave = 1;
  let url = envi.FoundationR3Url + api;
  let GetVendorEmpXByTaxNoXAndIdNo = envi.FoundationR3Url + '/v1/VendorEmpX/GetVendorEmpXByTaxNoXAndIdNo';

  if (dicts.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
    //tambah validasi kalau tipe supplier confirmation
    if (dicts.formRaw.MrIdTypeCode == RefMasterConstant.EKtp) {
      await http
        .post(GetVendorEmpXByTaxNoXAndIdNo, {
          IdNo: dicts.formRaw.IdNumber,
          MrIdTypeCode: dicts.formRaw.MrIdTypeCode,
          TaxNo: dicts.formRaw.TaxIdNo,
          VendorEmpId: dicts.VendorEmpIdTemp,
          MrVendorCategoryCode: dicts.MrVendorCategoryCode,
        }).toPromise().then((response) => {
          let result2: any;
          result2 = response;
          let res = result2.ReturnObject;
          if (res !== null) {
            //get vendor id
            let confirmationMessageId: string;
            let confirmationTaxNo: string;
            confirmationMessageId = "";
            confirmationTaxNo = "";
            if (res.VendorEmpXByIdNo != null) {
              confirmationMessageId = "This " + dicts.formRaw.MrIdTypeCode + " " +
                ExceptionConstant.ALREADY_EXIST +
                " in Supplier Employee " +
                res.VendorEmpXByIdNo.VendorEmpName + " Of Supplier " + res.VendorEmpXByIdNo.VendorName + "\n\n";
            }

            if (dicts.formRaw.NpwpExist == true) {
              if (res.VendorEmpXByTaxNo != null) {
                confirmationTaxNo = "This NPWP " +
                  ExceptionConstant.ALREADY_EXIST +
                  " in Supplier Employee " +
                  res.VendorEmpXByTaxNo.VendorEmpName + " Of Supplier " + res.VendorEmpXByTaxNo.VendorName + "\n\n";
              }
            }
            if (confirmationMessageId != "" || confirmationTaxNo != "") {
              let confirmation = confirm(
                confirmationMessageId + confirmationTaxNo
                + "Do you still want to save?"
              );
              if (confirmation == false) {
                continueToSave = 0;
              }
            }
          }
        });
    } else if (dicts.formRaw.MrIdTypeCode != RefMasterConstant.EKtp && dicts.formRaw.NpwpExist == true) {
      await http
        .post(GetVendorEmpXByTaxNoXAndIdNo, {
          TaxNo: dicts.formRaw.TaxIdNo,
          VendorEmpId: dicts.VendorEmpIdTemp,
          MrVendorCategoryCode: dicts.MrVendorCategoryCode,
        }).toPromise().then((response) => {
          let result2: any;
          result2 = response;
          let res = result2.ReturnObject;
          if (res !== null) {
            let confirmationTaxNo: string;
            confirmationTaxNo = "";
            if (res.VendorEmpXByTaxNo != null) {
              confirmationTaxNo = "This NPWP " +
                ExceptionConstant.ALREADY_EXIST +
                " in Supplier Employee " +
                res.VendorEmpXByTaxNo.VendorEmpName + " Of Supplier " + res.VendorEmpXByTaxNo.VendorName + "\n\n";
            }
            if (confirmationTaxNo != "") {
              let confirmation = confirm(
                confirmationTaxNo
                + "Do you still want to save?"
              );
              if (confirmation == false) {
                continueToSave = 0;
              }
            }
          }
        });
    }
  }

  if (continueToSave == 1) {
    let vendorBranchEmpObjX = new VendorBranchEmpObjX();

    vendorBranchEmpObjX.VendorEmpObj.BirthDate = dicts.formRaw.BirthDate;
    vendorBranchEmpObjX.VendorEmpObj.BirthPlace = dicts.formRaw.BirthPlace;
    vendorBranchEmpObjX.VendorEmpObj.Email = dicts.formRaw.Email;
    vendorBranchEmpObjX.VendorEmpObj.IdNo = dicts.formRaw.IdNumber;
    vendorBranchEmpObjX.VendorEmpObj.IsActive = dicts.formRaw.IsActive;
    vendorBranchEmpObjX.VendorEmpObj.IsContactPerson = dicts.formRaw.ContactPerson;
    vendorBranchEmpObjX.VendorEmpObj.IsInternalEmployee = dicts.formRaw.IsInternalEmployee;
    vendorBranchEmpObjX.VendorEmpObj.IsNpwpExist = dicts.formRaw.NpwpExist;
    vendorBranchEmpObjX.VendorEmpObj.IsOwner = dicts.formRaw.Owner;
    vendorBranchEmpObjX.VendorEmpObj.JoinDt = dicts.formRaw.JoinDate;
    vendorBranchEmpObjX.VendorEmpObj.MobilePhnNo1 = dicts.formRaw.MobilePhn1;
    vendorBranchEmpObjX.VendorEmpObj.MobilePhnNo2 = dicts.formRaw.MobilePhn2;
    vendorBranchEmpObjX.VendorEmpObj.MrIdTypeCode = dicts.formRaw.MrIdTypeCode;
    vendorBranchEmpObjX.VendorEmpObj.MrTaxCalcMethodCode = dicts.formRaw.TaxCalcMethod;
    vendorBranchEmpObjX.VendorEmpObj.MrVendorEmpPositionCode = dicts.formRaw.EmpPosition;
    vendorBranchEmpObjX.VendorEmpObj.RowVersion = dicts.formRaw.RowVersionEmpInfo;
    vendorBranchEmpObjX.VendorEmpObj.SupervisorId = dicts.formRaw.SupervisorId;
    vendorBranchEmpObjX.VendorEmpObj.TaxIdNo = dicts.formRaw.TaxIdNo;
    vendorBranchEmpObjX.VendorEmpObj.VendorEmpName = dicts.formRaw.EmpName;
    vendorBranchEmpObjX.VendorEmpObj.VendorEmpNo = dicts.formRaw.EmpCode;
    vendorBranchEmpObjX.VendorEmpObj.VendorEmpRating = dicts.VendorEmpRating;
    vendorBranchEmpObjX.VendorEmpObj.VendorId = dicts.VendorIdTemp;

    if(dicts.formRaw.NpwpExist == true || dicts.mode == "edit") {
      vendorBranchEmpObjX.VendorEmpObj.TaxpayerName = dicts.formRaw.TaxpayerName;
      vendorBranchEmpObjX.VendorAddrObj.Addr = dicts.formRaw.Addr;
      vendorBranchEmpObjX.VendorAddrObj.AreaCode1 = dicts.formRaw.AreaCode1;
      vendorBranchEmpObjX.VendorAddrObj.AreaCode2 = dicts.formRaw.AreaCode2;
      vendorBranchEmpObjX.VendorAddrObj.AreaCode3 = dicts.formRaw.AreaCode3;
      vendorBranchEmpObjX.VendorAddrObj.AreaCode4 = dicts.formRaw.AreaCode4;
      vendorBranchEmpObjX.VendorAddrObj.City = dicts.formRaw.City;
      vendorBranchEmpObjX.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
      vendorBranchEmpObjX.VendorAddrObj.Province = dicts.formRaw.Province;
      vendorBranchEmpObjX.VendorAddrObj.RowVersion = dicts.formRaw.RowVersionTaxInfo;
      vendorBranchEmpObjX.VendorAddrObj.Zipcode = dicts.formRaw.Zipcode;

      if (dicts.mode == "edit") {
        vendorBranchEmpObjX.VendorEmpObj.TaxpayerNo = dicts.formRaw.TaxpayerNo;
        vendorBranchEmpObjX.VendorEmpObj.VendorEmpId = dicts.VendorEmpIdTemp;
        vendorBranchEmpObjX.VendorAddrObj.VendorAddrId = dicts.VendorAddrObj.VendorAddrId;
        vendorBranchEmpObjX.VendorEmpXObj.VendorEmpXId = dicts.ResponseVendorEmpXObjX.VendorEmpXId;
      }
    }
    vendorBranchEmpObjX.VendorEmpXObj.IsVerified = dicts.formRaw.IsVerified;
    vendorBranchEmpObjX.VendorEmpXObj.Notes = dicts.formRaw.Notes;
    vendorBranchEmpObjX.VendorEmpXObj.IsSigner = dicts.formRaw.IsSigner;

    await http.post<GenericObj>(url, vendorBranchEmpObjX, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        toastr.successMessage(response["message"]);
        let Id = response["Id"];
        const actions = [
          {
            'result': {
              'type': 'function',
              'target': 'self',
              'alias': '',
              'methodName': 'NextStep',
              'params': []
            },
            'conditions': []
          }
        ];

        templateService.publish({ Actions: actions });

        if (dicts.mode == "add") {
          localStorage.setItem('dicts', JSON.stringify({VendorEmpIdTemp: Id, mode: 'edit'}));
          // dicts['VendorEmpIdTemp'] = 4444;
          // dicts['mode'] = 'edit';
          if(dicts.MrVendorCategoryCode == CommonConstant.SUPPLIER){
            let nextSupplier:string = '/Vendor/Supplier/Employee/DetailX'; 
            AdInsHelper.RedirectUrl(router, [nextSupplier], { "mode": "edit" });
          }
          else{
            AdInsHelper.RedirectUrl(router, [next], { "mode": "edit" });
          }
        }
      });
  }
}
