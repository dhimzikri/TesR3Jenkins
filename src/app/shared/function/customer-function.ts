import { HttpClient } from "@angular/common/http";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import {environment} from '../../../environments/environment';
import { MatDialogRef } from "@angular/material/dialog";
import { ReqPersonalObj } from "../model/new-cust/req-personal-obj.model";
import { CustPersonalFamilyObj } from "../model/new-cust/cust-personal-family-obj.model";
import { CustPersonalJobDataObj } from "../model/cust-personal-job-data-obj.model";
import { CustAttrContentObj } from "../model/new-cust/cust-attr-content-obj.model";
import { Router } from "@angular/router";
import { CommonConstant } from "../constant/CommonConstant";
import { CustObj } from "../model/cust-obj.model";
import { CustPersonalObj } from "../model/cust-personal-obj.model";
import { CustAddrObj } from "../model/cust-addr-obj.model";
import { CustDocFileObj } from "../model/cust-doc-file/cust-doc-file-obj.model";
import { AdInsHelper } from "../AdInsHelper";
import { ReqDupObj } from "../model/new-cust/req-dup-obj.model";
import { AdInsConstant } from "../AdInstConstant";
import { GenericObj } from "../model/generic/generic-obj.model";
import { NavigationConstant } from "../NavigationConstant";
import { RequestCustPersonalJobDataObj } from "../model/request-cust-personal-job-data-obj.model";
import { CustDocFileFormObj } from "../model/cust-doc-file/cust-doc-file-form-obj.model";
import { CookieService } from "ngx-cookie";
import { ReqNegDupObj } from "../model/new-cust/req-neg-dup-obj.model";
import { ReqCoyObj } from "../model/new-cust/req-coy-obj.model";
import { CustCompanyObj } from "../model/cust-company-obj.model";
import { ExceptionConstant } from "../constant/ExceptionConstant";
import { FormGroup } from "@angular/forms";
import { UcTemplateService } from "@adins/uctemplate";
import { CustPersonalContactPersonObj } from "../model/cust-personal-contact-person-obj.model";
import { CustPersonalObjV2 } from "../model/cust-personal-obj-v2.model";
import { CustCompanylegalDocFile } from "../model/cust-company-legal-doc-file/cust-company-legal-doc-file-obj.model";
import { ReqBouwheerCompanyObj } from "../model/req-bouwheer-company-obj.model";
import { BouwheerObj } from "../model/bouwheer-obj.model";
import { BouwheerCompanyObj } from "../model/bouwheer-company-obj.model";
import { base64StringToBlob } from "blob-util";
import { saveAs } from 'file-saver';
import { CustCompanyObjV2 } from "../model/cust-company-obj-v2.model";
import { ReqAddBeneficiaryOwnerPersonalObj } from "../model/beneficiary-owner/req-add-beneficiary-owner-personal-obj.model";
import { ReqAddBeneficiaryOwnerCompanyObj } from "../model/beneficiary-owner/req-add-beneficiary-owner-company-obj.model";
import enviConfig from "assets/config/enviConfig.json";
import { ExcelService } from "../excel-service/excel-service";

function setJobAddress(parentForm: any, dicts: Record<string, any>, addrType: string, Notes: string)
{
  let jobAddressObj = new CustAddrObj();
  jobAddressObj.CustId = dicts.IdCust;
  jobAddressObj.MrCustAddrTypeCode = addrType;
  jobAddressObj.Addr = parentForm.Addr;
  jobAddressObj.FullAddr = parentForm.Addr + " RT: " + parentForm.AreaCode4 + " RW: " + parentForm.AreaCode3 + " " + parentForm.AreaCode2 + ", " + parentForm.AreaCode1 + " " + parentForm.Zipcode;
  jobAddressObj.AreaCode3 = parentForm.AreaCode3;
  jobAddressObj.AreaCode4 = parentForm.AreaCode4;
  jobAddressObj.Zipcode = parentForm.Zipcode;
  jobAddressObj.AreaCode1 = parentForm.AreaCode1;
  jobAddressObj.AreaCode2 = parentForm.AreaCode2;
  jobAddressObj.City = parentForm.City;
  jobAddressObj.PhnArea1 = parentForm.PhnArea1;
  jobAddressObj.Phn1 = parentForm.Phn1;
  jobAddressObj.PhnExt1 = parentForm.PhnExt1;
  jobAddressObj.PhnArea2 = parentForm.PhnArea2;
  jobAddressObj.Phn2 = parentForm.Phn2;
  jobAddressObj.PhnExt2 = parentForm.PhnExt2;
  jobAddressObj.PhnArea3 = parentForm.PhnArea3;
  jobAddressObj.Phn3 = parentForm.Phn3;
  jobAddressObj.PhnExt3 = parentForm.PhnExt3;
  jobAddressObj.FaxArea = parentForm.FaxArea;
  jobAddressObj.Fax = parentForm.Fax;
  jobAddressObj.MrBuildingOwnershipCode = parentForm.MrHouseOwnershipCode;
  jobAddressObj.Notes = Notes;

  return jobAddressObj;
}

function SetCustomerPersonalDataMode(reqSubmitObj: ReqPersonalObj, Mode: string, From: string) {
    switch (Mode) {
      case CommonConstant.CustMainDataModeCust:
        reqSubmitObj = SetIsTypeDataPersonalMode(reqSubmitObj, From);
        break;
      case CommonConstant.CustMainDataModeFamily:
        reqSubmitObj.CustObj.IsFamily = true;
        break;
      case CommonConstant.CustMainDataModeMgmntShrholder:
        reqSubmitObj.CustObj.IsShareholder = true;
        break;
    }
    return reqSubmitObj;
}

function SetIsTypeDataPersonalMode(reqSubmitObj: ReqPersonalObj, From: string) {
  if (From == CommonConstant.CustFromEditMainData) reqSubmitObj.CustObj.IsCustomer = true;
  if (From == CommonConstant.CustFromCustFamily) reqSubmitObj.CustObj.IsFamily = true;
  if (From == CommonConstant.CustFromCustShareholder) reqSubmitObj.CustObj.IsShareholder = true;

  return reqSubmitObj;
}

function SetCustomerCompanyDataMode(reqSubmitObj: ReqCoyObj, Mode: string, From: string) {
  switch (Mode) {
    case CommonConstant.CustMainDataModeCust:
      reqSubmitObj = SetIsTypeDataCompanyMode(reqSubmitObj, From);
      break;
    case CommonConstant.CustMainDataModeFamily:
      reqSubmitObj.CustObj.IsFamily = true;
      break;
    case CommonConstant.CustMainDataModeMgmntShrholder:
      reqSubmitObj.CustObj.IsShareholder = true;
      break;
  }
  return reqSubmitObj;
}

function SetIsTypeDataCompanyMode(reqSubmitObj: ReqCoyObj, From: string) {
if (From == CommonConstant.CustFromEditMainData) reqSubmitObj.CustObj.IsCustomer = true;
if (From == CommonConstant.CustFromCustFamily) reqSubmitObj.CustObj.IsFamily = true;
if (From == CommonConstant.CustFromCustShareholder) reqSubmitObj.CustObj.IsShareholder = true;

return reqSubmitObj;
}

function SetCustPersonalFamilyData(dicts: Record<string, any>, MrCustRelationship: string) {
    let tempFamilyData: CustPersonalFamilyObj = new CustPersonalFamilyObj();
    tempFamilyData.RowVersion = dicts.RowVersionCustPersonalFamily;

    tempFamilyData.CustId = dicts.CustIdFamily;
    tempFamilyData.FamilyId = dicts.CustId;
    tempFamilyData.MrCustRelationship = MrCustRelationship;

    return tempFamilyData;
}

function SetCustPersonalJobData(parentForm: any, dicts: Record<string, any>, Mode: string) {
    let tempReqObj: CustPersonalJobDataObj = new CustPersonalJobDataObj();
    tempReqObj.CoyName = dicts.CoyName;
    tempReqObj.CustPersonalJobDataId = dicts.CustPersonalJobDataId;
    tempReqObj.EmpNo = dicts.EmpNo;
    tempReqObj.IsMfEmp = dicts.IsMfEmp;
    tempReqObj.IsWellknownCoy = dicts.IsWellknownCoy;
    tempReqObj.JobAddrId = dicts.JobAddrId;
    tempReqObj.JobTitleName = dicts.JobTitleName;
    tempReqObj.MrCoyScaleCode = dicts.MrCoyScaleCode;
    tempReqObj.MrInvestmentTypeCode = dicts.MrInvestmentTypeCode;
    tempReqObj.MrJobStatCode = dicts.MrJobStatCode;
    tempReqObj.MrWellknownCoyCode = dicts.MrWellknownCoyCode;
    tempReqObj.NoOfEmploy = dicts.NoOfEmploy;
    tempReqObj.OthBizAddrId = dicts.OthBizAddrId;
    tempReqObj.OthBizEstablishmentDt = dicts.OthBizEstablishmentDt;
    tempReqObj.OthBizIndustryTypeCode = dicts.OthBizIndustryTypeCode;
    tempReqObj.OthBizJobPosition = dicts.OthBizJobPosition;
    tempReqObj.OthBizName = dicts.OthBizName;
    tempReqObj.OthBizType = dicts.OthBizType;
    tempReqObj.PrevCoyName = dicts.PrevCoyName;
    tempReqObj.PrevEmploymentDt = dicts.PrevEmploymentDt;
    tempReqObj.PrevJobAddrId = dicts.PrevJobAddrId;
    tempReqObj.ProfessionalNo = dicts.ProfessionalNo;
    tempReqObj.RefIndustryTypeId = dicts.RefIndustryTypeId;
    tempReqObj.RowVersion = dicts.RowVersionPersonalJob;

    tempReqObj.CustId = dicts.CustId;

    tempReqObj.RefProfessionId = parentForm.RefProfessionId != 0 ? parentForm.RefProfessionId : null;
    tempReqObj.MrJobPositionCode = parentForm.MrJobPositionCode;
    if (Mode == CommonConstant.CustMainDataModeFamily) {
      tempReqObj.EmploymentEstablishmentDt = parentForm.EmploymentEstablishmentDt;
      if (!tempReqObj.RefProfessionId && !tempReqObj.MrJobPositionCode && !tempReqObj.EmploymentEstablishmentDt) tempReqObj = null;
    } else {
      if (!tempReqObj.RefProfessionId && !tempReqObj.MrJobPositionCode) tempReqObj = null;
    }
    return tempReqObj
}

function SetCustAttrContent(parentForm: any) {
    let tempAttr: Array<CustAttrContentObj> = new Array();
    for (let index = 0; index < parentForm.CustAttrForm.length; index++) {
      let tempAttrToPush: CustAttrContentObj = new CustAttrContentObj();
      tempAttrToPush.RefAttrId = parentForm.CustAttrForm[index].RefAttrId;
      tempAttrToPush.CustId = parentForm.CustAttrForm[index].CustId;
      tempAttrToPush.AttrValue = parentForm.CustAttrForm[index].AttrValue;
      tempAttr.push(tempAttrToPush);
    }
    return tempAttr;
}

function SaveCustPersonal(parentForm: any, dicts: Record<string, any>, Mode: string, From: string)
{
  let reqSubmitObj: ReqPersonalObj = new ReqPersonalObj();

  reqSubmitObj.CustDocFileObjs = new Array<CustDocFileObj>();

  reqSubmitObj.CustObj = new CustObj();
  reqSubmitObj.CustObj.CustId = dicts.CustId;
  reqSubmitObj.CustObj.CustNo = dicts.CustNo;
  reqSubmitObj.CustObj.IsAffiliateWithMf = dicts.IsAffiliateWithMf;
  reqSubmitObj.CustObj.IsCustomer = dicts.IsCustomer;
  reqSubmitObj.CustObj.IsFamily = dicts.IsFamily;
  reqSubmitObj.CustObj.IsGuarantor = dicts.IsGuarantor;
  reqSubmitObj.CustObj.IsShareholder = dicts.IsShareholder;;
  reqSubmitObj.CustObj.OriginalOfficeCode = dicts.OriginalOfficeCode;
  reqSubmitObj.CustObj.RowVersion = dicts.RowVersionCust;
  reqSubmitObj.CustObj.IsVip = dicts.IsVip;
  reqSubmitObj.CustObj.VipNotes = dicts.VipNotes;

  reqSubmitObj.CustObj.CustName = parentForm.CustName;
  reqSubmitObj.CustObj.MrIdTypeCode = parentForm.MrIdTypeCode;
  reqSubmitObj.CustObj.IdNo = parentForm.IdNo;
  reqSubmitObj.CustObj.IdExpiredDt = parentForm.IdExpiredDt;
  reqSubmitObj.CustObj.TaxIdNo = parentForm.TaxIdNo;
  reqSubmitObj.CustObj.MrCustTypeCode = CommonConstant.CustomerPersonal;
  reqSubmitObj.CustObj.MrCustModelCode = parentForm.MrCustModelCode;
  reqSubmitObj.CustObj.ThirdPartyTrxNo = dicts.ThirdPartyTrxNo;
  
  reqSubmitObj.CustPersonalObj = new CustPersonalObj();
  reqSubmitObj.CustPersonalObj.CustId = dicts.CustId;
  reqSubmitObj.CustPersonalObj.CustPersonalId = dicts.CustPersonalId;
  reqSubmitObj.CustPersonalObj.CustPrefixName = dicts.CustPrefixName;
  reqSubmitObj.CustPersonalObj.CustSuffixName = dicts.CustSuffixName;
  reqSubmitObj.CustPersonalObj.Email2 = dicts.Email2;
  reqSubmitObj.CustPersonalObj.Email3 = dicts.Email3;
  reqSubmitObj.CustPersonalObj.FamilyCardNo = dicts.FamilyCardNo;
  reqSubmitObj.CustPersonalObj.IsRestInPeace = dicts.IsRestInPeace;

  reqSubmitObj.CustPersonalObj.MobilePhnNo2 = dicts.MobilePhnNo2;
  reqSubmitObj.CustPersonalObj.MobilePhnNo3 = dicts.MobilePhnNo3;
  reqSubmitObj.CustPersonalObj.MrEducationCode = dicts.MrEducationCode;
  reqSubmitObj.CustPersonalObj.MrReligionCode = dicts.MrReligionCode;
  reqSubmitObj.CustPersonalObj.MrSalutationCode = dicts.MrSalutationCode;
  reqSubmitObj.CustPersonalObj.NickName = dicts.NickName;
  reqSubmitObj.CustPersonalObj.NoOfDependents = dicts.NoOfDependents;
  reqSubmitObj.CustPersonalObj.NoOfResidence = dicts.NoOfResidence;
  reqSubmitObj.CustPersonalObj.RowVersion = dicts.RowVersionCustPersonal;

  reqSubmitObj.CustPersonalObj.CustFullName = parentForm.CustName;
  reqSubmitObj.CustPersonalObj.MrGenderCode = parentForm.MrGenderCode;
  reqSubmitObj.CustPersonalObj.BirthPlace = parentForm.BirthPlace;
  reqSubmitObj.CustPersonalObj.BirthDt = parentForm.BirthDt;
  reqSubmitObj.CustPersonalObj.MotherMaidenName = parentForm.MotherMaidenName;
  reqSubmitObj.CustPersonalObj.MrMaritalStatCode = parentForm.MrMaritalStatCode;
  reqSubmitObj.CustPersonalObj.Email1 = parentForm.Email1;
  reqSubmitObj.CustPersonalObj.MobilePhnNo1 = parentForm.MobilePhnNo1;
  reqSubmitObj.CustPersonalObj.MobilePhnNo2 = parentForm.MobilePhnNo2;
  reqSubmitObj.CustPersonalObj.MobilePhnNo3 = parentForm.MobilePhnNo3;
  reqSubmitObj.CustPersonalObj.IsWaMobilePhnNo1 = parentForm.IsWaMobilePhnNo1;
  reqSubmitObj.CustPersonalObj.IsWaMobilePhnNo2 = parentForm.IsWaMobilePhnNo2;
  reqSubmitObj.CustPersonalObj.IsWaMobilePhnNo3 = parentForm.IsWaMobilePhnNo3;
  if (Mode == CommonConstant.CustMainDataModeFamily) {
    reqSubmitObj.CustPersonalObj.MrNationalityCode = parentForm.MrNationalityCode;
    reqSubmitObj.CustPersonalObj.WnaCountryCode = parentForm.WnaCountryCode;
    reqSubmitObj.CustPersonalFamilyObj = SetCustPersonalFamilyData(dicts, parentForm.MrCustRelationship);
  }

  reqSubmitObj.CustAddr = new CustAddrObj();
  reqSubmitObj.CustAddr.CustAddrId = dicts.CustAddrId;
  reqSubmitObj.CustAddr.Fax = dicts.Fax;
  reqSubmitObj.CustAddr.FaxArea = dicts.FaxArea;
  reqSubmitObj.CustAddr.Notes = dicts.Notes;
  reqSubmitObj.CustAddr.Phn1 = dicts.Phn1;
  reqSubmitObj.CustAddr.Phn2 = dicts.Phn2;
  reqSubmitObj.CustAddr.Phn3 = dicts.Phn3;
  reqSubmitObj.CustAddr.PhnArea1 = dicts.PhnArea1;
  reqSubmitObj.CustAddr.PhnArea2 = dicts.PhnArea2;
  reqSubmitObj.CustAddr.PhnArea3 = dicts.PhnArea3;
  reqSubmitObj.CustAddr.PhnExt1 = dicts.PhnExt1;
  reqSubmitObj.CustAddr.PhnExt2 = dicts.PhnExt2;
  reqSubmitObj.CustAddr.PhnExt3 = dicts.PhnExt3;
  reqSubmitObj.CustAddr.RowVersion = dicts.RowVersionAddress;
  reqSubmitObj.CustAddr.StayLength = dicts.StayLength;
  reqSubmitObj.CustAddr.StaySince = dicts.StaySince;

  reqSubmitObj.CustAddr.CustId = dicts.CustId;
  reqSubmitObj.CustAddr.Addr = parentForm.UcAddress.Addr;
  reqSubmitObj.CustAddr.AreaCode1 = parentForm.UcAddress.AreaCode1;
  reqSubmitObj.CustAddr.AreaCode2 = parentForm.UcAddress.AreaCode2;
  reqSubmitObj.CustAddr.AreaCode3 = parentForm.UcAddress.AreaCode3;
  reqSubmitObj.CustAddr.AreaCode4 = parentForm.UcAddress.AreaCode4;
  reqSubmitObj.CustAddr.City = parentForm.UcAddress.City;
  reqSubmitObj.CustAddr.MrBuildingOwnershipCode = parentForm.UcAddress.MrHouseOwnershipCode;
  reqSubmitObj.CustAddr.Zipcode = parentForm.UcAddress.Zipcode;
  reqSubmitObj.CustAddr.SubZipcode = parentForm.UcAddress.SubZipcode;
  reqSubmitObj.CustAddr.MrCustAddrTypeCode = CommonConstant.AddrTypeLegal;

  if (Mode != CommonConstant.CustMainDataModeCust) {
    reqSubmitObj.CustPersonalJobObj = new CustPersonalJobDataObj();
    reqSubmitObj.CustPersonalJobObj = SetCustPersonalJobData(parentForm, dicts, Mode);

    reqSubmitObj.CustAttrContentObjs = new Array<CustAttrContentObj>();
    reqSubmitObj.CustAttrContentObjs = SetCustAttrContent(parentForm);
  }

  reqSubmitObj = SetCustomerPersonalDataMode(reqSubmitObj, Mode, From);
  if (dicts.UploadFile != undefined)
  {
    reqSubmitObj.CustDocFileObjs = dicts.UploadFile;
  }

  return reqSubmitObj;
}

function SaveCustPersonalV2(parentForm: any, dicts: Record<string, any>, Mode: string, From: string)
{
  let reqSubmitObj: ReqPersonalObj = new ReqPersonalObj();

  reqSubmitObj.CustDocFileObjs = new Array<CustDocFileObj>();

  reqSubmitObj.CustObj = new CustObj();
  reqSubmitObj.CustObj.CustId = dicts.CustId;
  reqSubmitObj.CustObj.CustNo = dicts.CustNo;
  reqSubmitObj.CustObj.IsAffiliateWithMf = dicts.IsAffiliateWithMf;
  reqSubmitObj.CustObj.IsCustomer = dicts.IsCustomer;
  reqSubmitObj.CustObj.IsFamily = dicts.IsFamily;
  reqSubmitObj.CustObj.IsGuarantor = dicts.IsGuarantor;
  reqSubmitObj.CustObj.IsShareholder = dicts.IsShareholder;;
  reqSubmitObj.CustObj.OriginalOfficeCode = dicts.OriginalOfficeCode;
  reqSubmitObj.CustObj.RowVersion = dicts.RowVersionCust;
  reqSubmitObj.CustObj.IsVip = dicts.IsVip;
  reqSubmitObj.CustObj.VipNotes = dicts.VipNotes;

  

  reqSubmitObj.CustObj.CustName = parentForm.CustName;
  reqSubmitObj.CustObj.MrIdTypeCode = parentForm.MrIdTypeCode;
  reqSubmitObj.CustObj.IdNo = parentForm.IdNo;
  reqSubmitObj.CustObj.IdExpiredDt = parentForm.IdExpiredDt;
  reqSubmitObj.CustObj.TaxIdNo = parentForm.TaxIdNo;
  reqSubmitObj.CustObj.MrCustTypeCode = CommonConstant.CustomerPersonal;
  reqSubmitObj.CustObj.MrCustModelCode = parentForm.MrCustModelCode;
  reqSubmitObj.CustObj.ThirdPartyTrxNo = dicts.ThirdPartyTrxNo;
  reqSubmitObj.CustObj.IsCustGrp = parentForm.IsCustGrp;
  
  reqSubmitObj.CustPersonalObj = new CustPersonalObj();
  reqSubmitObj.CustPersonalObj.CustId = dicts.CustId;
  reqSubmitObj.CustPersonalObj.CustPersonalId = dicts.CustPersonalId;
  reqSubmitObj.CustPersonalObj.CustPrefixName = dicts.CustPrefixName;
  reqSubmitObj.CustPersonalObj.CustSuffixName = dicts.CustSuffixName;
  reqSubmitObj.CustPersonalObj.Email2 = dicts.Email2;
  reqSubmitObj.CustPersonalObj.Email3 = dicts.Email3;
  reqSubmitObj.CustPersonalObj.FamilyCardNo = dicts.FamilyCardNo;
  reqSubmitObj.CustPersonalObj.IsRestInPeace = dicts.IsRestInPeace;

  reqSubmitObj.CustPersonalObj.MobilePhnNo2 = dicts.MobilePhnNo2;
  reqSubmitObj.CustPersonalObj.MobilePhnNo3 = dicts.MobilePhnNo3;
  reqSubmitObj.CustPersonalObj.MrEducationCode = dicts.MrEducationCode;
  reqSubmitObj.CustPersonalObj.MrReligionCode = dicts.MrReligionCode;
  reqSubmitObj.CustPersonalObj.MrSalutationCode = dicts.MrSalutationCode;
  reqSubmitObj.CustPersonalObj.NickName = dicts.NickName;
  reqSubmitObj.CustPersonalObj.NoOfDependents = dicts.NoOfDependents;
  reqSubmitObj.CustPersonalObj.NoOfResidence = dicts.NoOfResidence;
  reqSubmitObj.CustPersonalObj.RowVersion = dicts.RowVersionCustPersonal;

  reqSubmitObj.CustPersonalObj.CustFullName = parentForm.CustName;
  reqSubmitObj.CustPersonalObj.MrGenderCode = parentForm.MrGenderCode;
  reqSubmitObj.CustPersonalObj.BirthPlace = parentForm.BirthPlace;
  reqSubmitObj.CustPersonalObj.BirthDt = parentForm.BirthDt;
  reqSubmitObj.CustPersonalObj.MotherMaidenName = parentForm.MotherMaidenName;
  reqSubmitObj.CustPersonalObj.MrMaritalStatCode = parentForm.MrMaritalStatCode;
  reqSubmitObj.CustPersonalObj.Email1 = parentForm.Email1;
  reqSubmitObj.CustPersonalObj.MobilePhnNo1 = parentForm.MobilePhnNo1;
  reqSubmitObj.CustPersonalObj.MobilePhnNo2 = parentForm.MobilePhnNo2;
  reqSubmitObj.CustPersonalObj.MobilePhnNo3 = parentForm.MobilePhnNo3;
  reqSubmitObj.CustPersonalObj.IsWaMobilePhnNo1 = parentForm.IsWaMobilePhnNo1;
  reqSubmitObj.CustPersonalObj.IsWaMobilePhnNo2 = parentForm.IsWaMobilePhnNo2;
  reqSubmitObj.CustPersonalObj.IsWaMobilePhnNo3 = parentForm.IsWaMobilePhnNo3;
  if (Mode == CommonConstant.CustMainDataModeFamily) {
    reqSubmitObj.CustPersonalObj.MrNationalityCode = parentForm.MrNationalityCode;
    reqSubmitObj.CustPersonalObj.WnaCountryCode = parentForm.WnaCountryCode;
    reqSubmitObj.CustPersonalFamilyObj = SetCustPersonalFamilyData(dicts, parentForm.MrCustRelationship);
  }

  reqSubmitObj.CustAddr = new CustAddrObj();
  reqSubmitObj.CustAddr.CustAddrId = dicts.CustAddrId;
  reqSubmitObj.CustAddr.Fax = dicts.Fax;
  reqSubmitObj.CustAddr.FaxArea = dicts.FaxArea;
  reqSubmitObj.CustAddr.Notes = dicts.Notes;
  reqSubmitObj.CustAddr.Phn1 = dicts.Phn1;
  reqSubmitObj.CustAddr.Phn2 = dicts.Phn2;
  reqSubmitObj.CustAddr.Phn3 = dicts.Phn3;
  reqSubmitObj.CustAddr.PhnArea1 = dicts.PhnArea1;
  reqSubmitObj.CustAddr.PhnArea2 = dicts.PhnArea2;
  reqSubmitObj.CustAddr.PhnArea3 = dicts.PhnArea3;
  reqSubmitObj.CustAddr.PhnExt1 = dicts.PhnExt1;
  reqSubmitObj.CustAddr.PhnExt2 = dicts.PhnExt2;
  reqSubmitObj.CustAddr.PhnExt3 = dicts.PhnExt3;
  reqSubmitObj.CustAddr.RowVersion = dicts.RowVersionAddress;
  reqSubmitObj.CustAddr.StayLength = dicts.StayLength;
  reqSubmitObj.CustAddr.StaySince = dicts.StaySince;

  reqSubmitObj.CustAddr.CustId = dicts.CustId;
  reqSubmitObj.CustAddr.Addr = parentForm.UcAddress.Addr;
  reqSubmitObj.CustAddr.AreaCode1 = parentForm.UcAddress.AreaCode1;
  reqSubmitObj.CustAddr.AreaCode2 = parentForm.UcAddress.AreaCode2;
  reqSubmitObj.CustAddr.AreaCode3 = parentForm.UcAddress.AreaCode3;
  reqSubmitObj.CustAddr.AreaCode4 = parentForm.UcAddress.AreaCode4;
  reqSubmitObj.CustAddr.City = parentForm.UcAddress.City;
  reqSubmitObj.CustAddr.MrBuildingOwnershipCode = parentForm.UcAddress.MrHouseOwnershipCode;
  reqSubmitObj.CustAddr.Zipcode = parentForm.UcAddress.Zipcode;
  reqSubmitObj.CustAddr.SubZipcode = parentForm.UcAddress.SubZipcode;
  reqSubmitObj.CustAddr.MrCustAddrTypeCode = CommonConstant.AddrTypeLegal;

  if (Mode != CommonConstant.CustMainDataModeCust) {
    reqSubmitObj.CustPersonalJobObj = new CustPersonalJobDataObj();
    reqSubmitObj.CustPersonalJobObj = SetCustPersonalJobData(parentForm, dicts, Mode);

    reqSubmitObj.CustAttrContentObjs = new Array<CustAttrContentObj>();
    reqSubmitObj.CustAttrContentObjs = SetCustAttrContent(parentForm);
  }

  reqSubmitObj = SetCustomerPersonalDataMode(reqSubmitObj, Mode, From);
  if (dicts.UploadFile != undefined)
  {
    reqSubmitObj.CustDocFileObjs = dicts.UploadFile;
  }

  return reqSubmitObj;
}

function SaveCustCompany(parentForm: any, dicts: Record<string, any>, Mode: string, From: string)
{
  let reqSubmitObj: ReqCoyObj = new ReqCoyObj();

  reqSubmitObj.CustObj = new CustObj();
  reqSubmitObj.CustObj.CustId = dicts.CustId;
  reqSubmitObj.CustObj.CustNo = dicts.CustNo;
  reqSubmitObj.CustObj.IsAffiliateWithMf = dicts.IsAffiliateWithMf;
  reqSubmitObj.CustObj.IsCustomer = dicts.IsCustomer;
  reqSubmitObj.CustObj.IsFamily = dicts.IsFamily;
  reqSubmitObj.CustObj.IsGuarantor = dicts.IsGuarantor;
  reqSubmitObj.CustObj.IsShareholder = dicts.IsShareholder;;
  reqSubmitObj.CustObj.OriginalOfficeCode = dicts.OriginalOfficeCode;
  reqSubmitObj.CustObj.RowVersion = dicts.RowVersionCust;
  reqSubmitObj.CustObj.IsVip = dicts.IsVip;
  reqSubmitObj.CustObj.VipNotes = dicts.VipNotes;

  reqSubmitObj.CustObj.CustName = parentForm.CoyCustName;
  reqSubmitObj.CustObj.TaxIdNo = parentForm.CoyTaxIdNo;
  reqSubmitObj.CustObj.IdNo = parentForm.CoyTaxIdNo;
  reqSubmitObj.CustObj.MrCustModelCode = parentForm.CoyMrCustModelCode;
  reqSubmitObj.CustObj.MrCustTypeCode = CommonConstant.CustTypeCompany;
  reqSubmitObj.CustObj.ThirdPartyTrxNo = dicts.ThirdPartyTrxNo;

  reqSubmitObj.CustCompanyObj = new CustCompanyObj();
  reqSubmitObj.CustCompanyObj.CustCompanyId = dicts.CustCompanyId;
  reqSubmitObj.CustCompanyObj.CustId = dicts.CustId;
  reqSubmitObj.CustCompanyObj.Email1 = dicts.Email1;
  reqSubmitObj.CustCompanyObj.Email2 = dicts.Email2;
  reqSubmitObj.CustCompanyObj.EstablishmentDt = dicts.EstablishmentDt;
  reqSubmitObj.CustCompanyObj.IsAffiliated = dicts.IsAffiliated;
  reqSubmitObj.CustCompanyObj.IsSkt = dicts.IsSkt;
  reqSubmitObj.CustCompanyObj.LicenseNo = dicts.LicenseNo;
  reqSubmitObj.CustCompanyObj.MrInvestmentTypeCode = dicts.MrInvestmentTypeCode;
  reqSubmitObj.CustCompanyObj.NumOfEmp = dicts.NumOfEmp;
  reqSubmitObj.CustCompanyObj.Phn1 = dicts.Phn1;
  reqSubmitObj.CustCompanyObj.Phn2 = dicts.Phn2;
  reqSubmitObj.CustCompanyObj.PhnArea1 = dicts.PhnArea1;
  reqSubmitObj.CustCompanyObj.PhnArea2 = dicts.PhnArea2;
  reqSubmitObj.CustCompanyObj.PhnExt1 = dicts.PhnExt1;
  reqSubmitObj.CustCompanyObj.PhnExt2 = dicts.PhnExt2;
  reqSubmitObj.CustCompanyObj.RefIndustryTypeId = dicts.RefIndustryTypeId;
  reqSubmitObj.CustCompanyObj.RegistrationNo = dicts.RegistrationNo;
  reqSubmitObj.CustCompanyObj.Website = dicts.Website;
  reqSubmitObj.CustCompanyObj.RowVersion = dicts.RowVersionCustCompany;

  reqSubmitObj.CustCompanyObj.MrCompanyTypeCode = parentForm.MrCompanyTypeCode;

  reqSubmitObj.CustAddr = new CustAddrObj();
  reqSubmitObj.CustAddr.CustAddrId = dicts.CustAddrId;
  reqSubmitObj.CustAddr.Fax = dicts.Fax;
  reqSubmitObj.CustAddr.FaxArea = dicts.FaxArea;
  reqSubmitObj.CustAddr.Notes = dicts.Notes;
  reqSubmitObj.CustAddr.Phn1 = dicts.Phn1;
  reqSubmitObj.CustAddr.Phn2 = dicts.Phn2;
  reqSubmitObj.CustAddr.Phn3 = dicts.Phn3;
  reqSubmitObj.CustAddr.PhnArea1 = dicts.PhnArea1;
  reqSubmitObj.CustAddr.PhnArea2 = dicts.PhnArea2;
  reqSubmitObj.CustAddr.PhnArea3 = dicts.PhnArea3;
  reqSubmitObj.CustAddr.PhnExt1 = dicts.PhnExt1;
  reqSubmitObj.CustAddr.PhnExt2 = dicts.PhnExt2;
  reqSubmitObj.CustAddr.PhnExt3 = dicts.PhnExt3;
  reqSubmitObj.CustAddr.RowVersion = dicts.RowVersionAddress;
  reqSubmitObj.CustAddr.StayLength = dicts.StayLength;
  reqSubmitObj.CustAddr.StaySince = dicts.StaySince;

  reqSubmitObj.CustAddr.CustId = dicts.CustId;
  reqSubmitObj.CustAddr.Addr = parentForm.UcAddress.Addr;
  reqSubmitObj.CustAddr.AreaCode1 = parentForm.UcAddress.AreaCode1;
  reqSubmitObj.CustAddr.AreaCode2 = parentForm.UcAddress.AreaCode2;
  reqSubmitObj.CustAddr.AreaCode3 = parentForm.UcAddress.AreaCode3;
  reqSubmitObj.CustAddr.AreaCode4 = parentForm.UcAddress.AreaCode4;
  reqSubmitObj.CustAddr.City = parentForm.UcAddress.City;
  reqSubmitObj.CustAddr.MrBuildingOwnershipCode = parentForm.UcAddress.MrHouseOwnershipCode;
  reqSubmitObj.CustAddr.Zipcode = parentForm.UcAddress.Zipcode;
  reqSubmitObj.CustAddr.SubZipcode = parentForm.UcAddress.SubZipcode;
  reqSubmitObj.CustAddr.MrCustAddrTypeCode = CommonConstant.AddrTypeLegal;

  reqSubmitObj = SetCustomerCompanyDataMode(reqSubmitObj, Mode, From);

  reqSubmitObj.CustDocFileObjs = new Array<CustDocFileObj>();
  if (dicts.UploadFile != undefined)
  {
    reqSubmitObj.CustDocFileObjs = dicts.UploadFile;
  }

  return reqSubmitObj;
}

function SaveCustCompanyV2(parentForm: any, dicts: Record<string, any>, Mode: string, From: string)
{
  let reqSubmitObj: ReqCoyObj = new ReqCoyObj();

  reqSubmitObj.CustObj = new CustObj();
  reqSubmitObj.CustObj.CustId = dicts.CustId;
  reqSubmitObj.CustObj.CustNo = dicts.CustNo;
  reqSubmitObj.CustObj.IsAffiliateWithMf = dicts.IsAffiliateWithMf;
  reqSubmitObj.CustObj.IsCustomer = dicts.IsCustomer;
  reqSubmitObj.CustObj.IsFamily = dicts.IsFamily;
  reqSubmitObj.CustObj.IsGuarantor = dicts.IsGuarantor;
  reqSubmitObj.CustObj.IsShareholder = dicts.IsShareholder;;
  reqSubmitObj.CustObj.OriginalOfficeCode = dicts.OriginalOfficeCode;
  reqSubmitObj.CustObj.RowVersion = dicts.RowVersionCust;
  reqSubmitObj.CustObj.IsVip = dicts.IsVip;
  reqSubmitObj.CustObj.VipNotes = dicts.VipNotes;

  reqSubmitObj.CustObj.CustName = parentForm.CoyCustName;
  reqSubmitObj.CustObj.TaxIdNo = parentForm.CoyTaxIdNo;
  reqSubmitObj.CustObj.IdNo = parentForm.CoyIdNo;
  reqSubmitObj.CustObj.MrIdTypeCode = parentForm.CoyMrIdTypeCode;
  reqSubmitObj.CustObj.MrCustModelCode = parentForm.CoyMrCustModelCode;
  reqSubmitObj.CustObj.MrCustTypeCode = CommonConstant.CustTypeCompany;
  reqSubmitObj.CustObj.ThirdPartyTrxNo = dicts.ThirdPartyTrxNo;
  reqSubmitObj.CustObj.IsCustGrp = parentForm.CoyIsCustGrp;

  reqSubmitObj.CustCompanyObj = new CustCompanyObj();
  reqSubmitObj.CustCompanyObj.CustCompanyId = dicts.CustCompanyId;
  reqSubmitObj.CustCompanyObj.CustId = dicts.CustId;
  reqSubmitObj.CustCompanyObj.Email1 = dicts.Email1;
  reqSubmitObj.CustCompanyObj.Email2 = dicts.Email2;
  reqSubmitObj.CustCompanyObj.EstablishmentDt = dicts.EstablishmentDt;
  reqSubmitObj.CustCompanyObj.IsAffiliated = dicts.IsAffiliated;
  reqSubmitObj.CustCompanyObj.IsSkt = dicts.IsSkt;
  reqSubmitObj.CustCompanyObj.LicenseNo = dicts.LicenseNo;
  reqSubmitObj.CustCompanyObj.MrInvestmentTypeCode = dicts.MrInvestmentTypeCode;
  reqSubmitObj.CustCompanyObj.NumOfEmp = dicts.NumOfEmp;
  reqSubmitObj.CustCompanyObj.Phn1 = dicts.Phn1;
  reqSubmitObj.CustCompanyObj.Phn2 = dicts.Phn2;
  reqSubmitObj.CustCompanyObj.PhnArea1 = dicts.PhnArea1;
  reqSubmitObj.CustCompanyObj.PhnArea2 = dicts.PhnArea2;
  reqSubmitObj.CustCompanyObj.PhnExt1 = dicts.PhnExt1;
  reqSubmitObj.CustCompanyObj.PhnExt2 = dicts.PhnExt2;
  reqSubmitObj.CustCompanyObj.RefIndustryTypeId = dicts.RefIndustryTypeId;
  reqSubmitObj.CustCompanyObj.RegistrationNo = dicts.RegistrationNo;
  reqSubmitObj.CustCompanyObj.Website = dicts.Website;
  reqSubmitObj.CustCompanyObj.RowVersion = dicts.RowVersionCustCompany;

  reqSubmitObj.CustCompanyObj.MrCompanyTypeCode = parentForm.MrCompanyTypeCode;

  reqSubmitObj.CustAddr = new CustAddrObj();
  reqSubmitObj.CustAddr.CustAddrId = dicts.CustAddrId;
  reqSubmitObj.CustAddr.Fax = dicts.Fax;
  reqSubmitObj.CustAddr.FaxArea = dicts.FaxArea;
  reqSubmitObj.CustAddr.Notes = dicts.Notes;
  reqSubmitObj.CustAddr.Phn1 = dicts.Phn1;
  reqSubmitObj.CustAddr.Phn2 = dicts.Phn2;
  reqSubmitObj.CustAddr.Phn3 = dicts.Phn3;
  reqSubmitObj.CustAddr.PhnArea1 = dicts.PhnArea1;
  reqSubmitObj.CustAddr.PhnArea2 = dicts.PhnArea2;
  reqSubmitObj.CustAddr.PhnArea3 = dicts.PhnArea3;
  reqSubmitObj.CustAddr.PhnExt1 = dicts.PhnExt1;
  reqSubmitObj.CustAddr.PhnExt2 = dicts.PhnExt2;
  reqSubmitObj.CustAddr.PhnExt3 = dicts.PhnExt3;
  reqSubmitObj.CustAddr.RowVersion = dicts.RowVersionAddress;
  reqSubmitObj.CustAddr.StayLength = dicts.StayLength;
  reqSubmitObj.CustAddr.StaySince = dicts.StaySince;

  reqSubmitObj.CustAddr.CustId = dicts.CustId;
  reqSubmitObj.CustAddr.Addr = parentForm.UcAddress.Addr;
  reqSubmitObj.CustAddr.AreaCode1 = parentForm.UcAddress.AreaCode1;
  reqSubmitObj.CustAddr.AreaCode2 = parentForm.UcAddress.AreaCode2;
  reqSubmitObj.CustAddr.AreaCode3 = parentForm.UcAddress.AreaCode3;
  reqSubmitObj.CustAddr.AreaCode4 = parentForm.UcAddress.AreaCode4;
  reqSubmitObj.CustAddr.City = parentForm.UcAddress.City;
  reqSubmitObj.CustAddr.MrBuildingOwnershipCode = parentForm.UcAddress.MrHouseOwnershipCode;
  reqSubmitObj.CustAddr.Zipcode = parentForm.UcAddress.Zipcode;
  reqSubmitObj.CustAddr.SubZipcode = parentForm.UcAddress.SubZipcode;
  reqSubmitObj.CustAddr.MrCustAddrTypeCode = CommonConstant.AddrTypeLegal;

  reqSubmitObj = SetCustomerCompanyDataMode(reqSubmitObj, Mode, From);

  reqSubmitObj.CustDocFileObjs = new Array<CustDocFileObj>();
  if (dicts.UploadFile != undefined)
  {
    reqSubmitObj.CustDocFileObjs = dicts.UploadFile;
  }

  return reqSubmitObj;
}

function separateFileUpload(obj:any, prop:string='CustDocFileObjs')
{
  var reqCustDocFileListObj: {CustId: number, CustDocFileObjs: Array<CustDocFileObj>} = {CustId: 0, CustDocFileObjs:[]};
  if(obj[prop])
  {
    reqCustDocFileListObj.CustDocFileObjs = obj[prop];
    obj[prop] = []
  }
  return {forApi: obj, forUpload: reqCustDocFileListObj};
}

function redirectSaveEditMainData(custId: number, custType: string, Mode: string, From: string, router: Router) {
  if (Mode == CommonConstant.CustMainDataModeCust) {
    let param = { "IdCust": custId, Page: 'Edit', From: From };
    if (custType == CommonConstant.CustTypePersonal) AdInsHelper.RedirectUrl(router, [NavigationConstant.SELF_CUSTOM_CUST_PERSONAL_PAGE], param);
    if (custType == CommonConstant.CustTypeCompany) AdInsHelper.RedirectUrl(router, [NavigationConstant.CUSTOM_CUST_COY_PAGE], param);
    return;
  }
}

function SaveCustomerData(dicts: Record<string, any>, Mode: string, From: string, api: any, http: HttpClient, toastr: NGXToastrService, router: Router, cookieService: CookieService)
{
  let url = enviConfig.FoundationR3Url + api;

  let reqPayload = separateFileUpload(dicts.ReqSubmitObj);
  let resSave: GenericObj;
  http.post(url, reqPayload.forApi).subscribe(
    (response: any) => {
      resSave = response
      uploadDocFileMultipart(reqPayload.forUpload, resSave["Message"], resSave.Id, dicts.ReqSubmitObj.CustObj.MrCustTypeCode, Mode, From, toastr, router, cookieService)
  })
}

function uploadDocFileMultipart(objDoc: {CustId: number, CustDocFileObjs: Array<CustDocFileObj>}, successMsg:string, custId:number, custType: string, Mode:string, From: string, toastr: NGXToastrService,  router: Router, cookieService: CookieService)
{
    let urlUpload = enviConfig.FoundationR3Url + "/v2.1/Cust/SaveCustDocFile";

    if(!objDoc.CustDocFileObjs || !objDoc.CustDocFileObjs.length || !custId) 
    {
      toastr.successMessage(successMsg);
      redirectSaveEditMainData(custId, custType, Mode, From, router);
      return;
    }

    // if (environment.SpinnerOnHttpPost) this.spinner.show();

    objDoc.CustId = custId;
    var formData: any = new FormData();
    formData.append('reqPayload', JSON.stringify(objDoc));
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = evnt => {
      if (xhr.readyState !== 4) return;

      // if (environment.SpinnerOnHttpPost) this.spinner.hide();
      if (xhr.status !== 200 && xhr.status !== 201) {
        toastr.errorMessage('Upload Failed !');
        return;
      }
      else {
        var response = JSON.parse(xhr.response);
        if (response.HeaderObj.StatusCode != '200') {
          toastr.errorMessage('Upload Failed ! '+  + response.HeaderObj.Message);
          return
        }
      }

      if (xhr.status === 200) {
        toastr.successMessage(successMsg);
        redirectSaveEditMainData(custId, custType, Mode, From, router);
        return;
      }
    };

    xhr.onerror = evnt => {
      toastr.errorMessage('Upload Failed !');
      return;
    };
    xhr.open('POST', urlUpload, true);
    let value = cookieService.get('XSRF-TOKEN');
    let token = DecryptString(value, environment.ChipperKeyCookie);
    xhr.setRequestHeader('AdInsKey', `${token}`);
    xhr.send(formData);
}

function DecryptString(chipperText: string, chipperKey: string) {
    if (
      chipperKey == undefined || chipperKey.trim() == '' ||
      chipperText == undefined || chipperText.trim() == ''
    ) return chipperText;
    var chipperKeyArr = CryptoJS.enc.Utf8.parse(chipperKey);
    var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);
    var decrypted = CryptoJS.AES.decrypt(chipperText, chipperKeyArr, { iv: iv });
    var plainText = decrypted.toString(CryptoJS.enc.Utf8);
    return plainText;
}

export function editCustomerFamily(parentForm: any, dicts: Record<string, any>, Mode: string, From: string, next: string, api: any, http: HttpClient, toastr: NGXToastrService, router: Router)
{
    let url = enviConfig.FoundationR3Url + api;

    let reqSubmitObj: ReqPersonalObj = new ReqPersonalObj();

    reqSubmitObj = SaveCustPersonal(parentForm, dicts, Mode, From)

    http.post(url, reqSubmitObj).subscribe(
      (response: any) => {
          toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(router, [next]);
      })
}

export function addCustToDuplicate(parentForm: any, dicts: Record<string, any>, next: string, router: Router)
{
  if (parentForm.MrCustTypeCode == CommonConstant.CustTypePersonal)
  {
    let reqSubmitObj: ReqPersonalObj = new ReqPersonalObj();
    reqSubmitObj = SaveCustPersonal(parentForm, dicts, "CUST", "EditMainData")
    dicts["ReqSubmitObj"] = reqSubmitObj;
  }

  if (parentForm.MrCustTypeCode == CommonConstant.CustTypeCompany)
  {
    let reqSubmitObj: ReqCoyObj = new ReqCoyObj();
    reqSubmitObj = SaveCustCompany(parentForm, dicts, "CUST", "EditMainData")
    dicts["ReqSubmitObj"] = reqSubmitObj;
  }

  dicts["AddCustForm"] = parentForm;
  dicts["CustDuplicate"] = dicts.ReturnObject.CustDuplicate;
  dicts["NegativeCustDuplicate"] = dicts.ReturnObject.NegativeCustDuplicate;
  dicts["mode"] = "edit";

  localStorage.setItem('dicts', JSON.stringify(dicts)); // notes: set dicts ke localStorage dulu untuk kirim dicts ke page yang berbeda
  AdInsHelper.RedirectUrl(router, [next], {}, true);
}

export function addBeneficiaryOwnerToDuplicate(parentForm: any, dicts: Record<string, any>, next: string, router: Router)
{
  if (parentForm.MrCustTypeCode == CommonConstant.CustTypePersonal)
  {
    let reqSubmitObj: ReqAddBeneficiaryOwnerPersonalObj = new ReqAddBeneficiaryOwnerPersonalObj();
    reqSubmitObj.rAddBeneficiaryOwnerObj.BeneficiaryOwnerName = parentForm.BeneficiaryOwnerNamePersonal;
    reqSubmitObj.rAddBeneficiaryOwnerObj.MrCustTypeCode = parentForm.MrCustTypeCode;
    reqSubmitObj.rAddBeneficiaryOwnerObj.MrIdTypeCode = parentForm.MrIdTypeCode;
    reqSubmitObj.rAddBeneficiaryOwnerObj.IdNo = parentForm.IdNo;
    reqSubmitObj.rAddBeneficiaryOwnerObj.IdExpiredDt = parentForm.IdExpiredDt;
    reqSubmitObj.rAddBeneficiaryOwnerObj.TaxIdNo = parentForm.TaxIdNo;
    reqSubmitObj.rAddBeneficiaryOwnerPersonalObj.BirthDt = parentForm.BirthDt;
    reqSubmitObj.rAddBeneficiaryOwnerPersonalObj.BirthPlace = parentForm.BirthPlace;
    reqSubmitObj.rAddBeneficiaryOwnerPersonalObj.MrGenderCode = parentForm.MrGenderCode;
    dicts["ReqSubmitObj"] = reqSubmitObj;

    let customObj = {
      BeneficiaryOwnerName: parentForm.BeneficiaryOwnerNamePersonal,
      MrCustTypeCode: parentForm.MrCustTypeCode,
      MrIdTypeCode: parentForm.MrIdTypeCode,
      IdNo: parentForm.IdNo,
      IdExpiredDt: parentForm.IdExpiredDt,
      TaxIdNo: parentForm.TaxIdNo,
      BirthDt: parentForm.BirthDt,
      BirthPlace: parentForm.BirthPlace,
      MrGenderCode: parentForm.MrGenderCode,
    };

  dicts["AddCustForm"] = customObj;
  }

  if (parentForm.MrCustTypeCode == CommonConstant.CustTypeCompany)
  {
    let reqSubmitObj: ReqAddBeneficiaryOwnerCompanyObj = new ReqAddBeneficiaryOwnerCompanyObj();
    reqSubmitObj.rAddBeneficiaryOwnerObj.BeneficiaryOwnerName = parentForm.BeneficiaryOwnerNameCompany;
    reqSubmitObj.rAddBeneficiaryOwnerObj.MrCustTypeCode = parentForm.MrCustTypeCode;
    reqSubmitObj.rAddBeneficiaryOwnerObj.MrIdTypeCode = parentForm.CoyMrIdTypeCode;
    reqSubmitObj.rAddBeneficiaryOwnerObj.IdNo = parentForm.CoyIdNo;
    reqSubmitObj.rAddBeneficiaryOwnerObj.IdExpiredDt = parentForm.CoyIdExpiredDt;
    reqSubmitObj.rAddBeneficiaryOwnerObj.TaxIdNo = parentForm.CoyTaxIdNo;
    reqSubmitObj.rAddBeneficiaryOwnerCompanyObj.MrCompanyTypeCode = parentForm.MrCompanyTypeCode;
    dicts["ReqSubmitObj"] = reqSubmitObj;

    
    let customObj = {
      BeneficiaryOwnerName: parentForm.BeneficiaryOwnerNameCompany,
      MrCustTypeCode: parentForm.MrCustTypeCode,
      MrIdTypeCode: parentForm.CoyMrIdTypeCode,
      IdNo: parentForm.CoyIdNo,
      IdExpiredDt: parentForm.CoyIdExpiredDt,
      TaxIdNo: parentForm.CoyTaxIdNo,
      MrCompanyTypeCode: parentForm.MrCompanyTypeCode,
    };
    dicts["AddCustForm"] = customObj;
  }

  // dicts["AddCustForm"] = parentForm;
  dicts["NegativeCustDuplicate"] = dicts.ReturnObject.NegativeCustDuplicate;
  dicts["mode"] = "edit";

  localStorage.setItem('dicts', JSON.stringify(dicts)); // notes: set dicts ke localStorage dulu untuk kirim dicts ke page yang berbeda
  AdInsHelper.RedirectUrl(router, [next], {}, true);
}

export function backFromCustDuplicate(dicts: Record<string, any>, next: string, router: Router)
{
  dicts["mode"] = dicts.ReqSubmitObj.CustObj.MrCustTypeCode == CommonConstant.CustTypePersonal? "addeditPersonal" : "addeditCompany";
  dicts["MrCustTypeCode"] = dicts.ReqSubmitObj.CustObj.MrCustTypeCode;

  localStorage.setItem('dicts', JSON.stringify(dicts)); // notes: set dicts ke localStorage dulu untuk kirim dicts ke page yang berbeda
  AdInsHelper.RedirectUrl(router, [next], {}, true);
}

export function addEditCustomer(parentForm: any, dicts: Record<string, any>, Mode: string, From: string, api: any, http: HttpClient, toastr: NGXToastrService, router: Router, cookieService: CookieService)
{
  let url = enviConfig.FoundationR3Url + api;
  
  if (parentForm.MrCustTypeCode == CommonConstant.CustTypePersonal)
  {
    let reqSubmitObj: ReqPersonalObj = new ReqPersonalObj();
    reqSubmitObj = SaveCustPersonal(parentForm, dicts, Mode, From)
    dicts["ReqSubmitObj"] = reqSubmitObj;

    if (dicts.CustId != 0)
    {

      var reqPayload = separateFileUpload(reqSubmitObj);
      var resSave;
      http.post(url, reqPayload.forApi, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          resSave = response;
          uploadDocFileMultipart(reqPayload.forUpload, resSave["Message"], dicts.CustId, parentForm.MrCustTypeCode, Mode, From, toastr, router, cookieService)
        });
    }
    else
    {
      SaveCustomerData(dicts, Mode, From, api, http, toastr, router, cookieService)
    }
  }

  if (parentForm.MrCustTypeCode == CommonConstant.CustTypeCompany)
  {
    let reqSubmitObj: ReqCoyObj = new ReqCoyObj();
    reqSubmitObj = SaveCustCompany(parentForm, dicts, Mode, From)
    dicts["ReqSubmitObj"] = reqSubmitObj;

    if (dicts.CustId != 0)
    {
      var reqPayload = separateFileUpload(reqSubmitObj);
      var resSave;
      http.post(url, reqPayload.forApi, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          resSave = response;
          uploadDocFileMultipart(reqPayload.forUpload, resSave["Message"], dicts.CustId, parentForm.MrCustTypeCode, Mode, From, toastr, router, cookieService)
        });
    }
    else
    {
      SaveCustomerData(dicts, Mode, From, api, http, toastr, router, cookieService)
    }
  }
}

export function addEditCustomerV2(parentForm: any, dicts: Record<string, any>, Mode: string, From: string, api: any, http: HttpClient, toastr: NGXToastrService, router: Router, cookieService: CookieService)
{
  let url = enviConfig.FoundationR3Url + api;
  
  if (parentForm.MrCustTypeCode == CommonConstant.CustTypePersonal)
  {
    let reqSubmitObj: ReqPersonalObj = new ReqPersonalObj();
    reqSubmitObj = SaveCustPersonalV2(parentForm, dicts, Mode, From)
    dicts["ReqSubmitObj"] = reqSubmitObj;

    if (dicts.CustId != 0)
    {

      var reqPayload = separateFileUpload(reqSubmitObj);
      var resSave;
      http.post(url, reqPayload.forApi, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          resSave = response;
          uploadDocFileMultipart(reqPayload.forUpload, resSave["Message"], dicts.CustId, parentForm.MrCustTypeCode, Mode, From, toastr, router, cookieService)
        });
    }
    else
    {
      SaveCustomerData(dicts, Mode, From, api, http, toastr, router, cookieService)
    }
  }

  if (parentForm.MrCustTypeCode == CommonConstant.CustTypeCompany)
  {
    let reqSubmitObj: ReqCoyObj = new ReqCoyObj();
    reqSubmitObj = SaveCustCompanyV2(parentForm, dicts, Mode, From)
    dicts["ReqSubmitObj"] = reqSubmitObj;

    if (dicts.CustId != 0)
    {
      var reqPayload = separateFileUpload(reqSubmitObj);
      var resSave;
      http.post(url, reqPayload.forApi, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          resSave = response;
          uploadDocFileMultipart(reqPayload.forUpload, resSave["Message"], dicts.CustId, parentForm.MrCustTypeCode, Mode, From, toastr, router, cookieService)
        });
    }
    else
    {
      SaveCustomerData(dicts, Mode, From, api, http, toastr, router, cookieService)
    }
  }
}

export function addCustomerPersonalAfterDuplicate(dicts: Record<string, any>, RowObj: any, key: string, Mode: string, From: string, api: any, http: HttpClient, toastr: NGXToastrService, router: Router, cookieService: CookieService)
{
  console.log(RowObj)

  let url = enviConfig.FoundationR3Url + api;

  if (key == "SAVE")
  {
    SaveCustomerData(dicts, Mode, From, api, http, toastr, router, cookieService)
  }

  if (key == "SAVE_DUP")
  {
    let reqEditDupCheck: ReqDupObj = new ReqDupObj();
    reqEditDupCheck.CustNo = RowObj.CustNo;
    reqEditDupCheck.CustDataMode = Mode;
    reqEditDupCheck.ThirdPartyTrxNo = dicts.ReqSubmitObj.CustObj.ThirdPartyTrxNo;

    if (Mode == CommonConstant.CustMainDataModeFamily) {
      reqEditDupCheck.CustPersonalFamilyObj = dicts.ReqSubmitObj.CustPersonalFamilyObj;
    }
    if (Mode == CommonConstant.CustMainDataModeMgmntShrholder) {
      reqEditDupCheck.CustCompanyMgmntShrholderObj = dicts.ReqSubmitObj.CustCompanyMgmntShrholderObj;
    }

    reqEditDupCheck.CustPersonalJobObj = dicts.ReqSubmitObj.CustPersonalJobObj;
    reqEditDupCheck.CustAttrContentObjs = dicts.ReqSubmitObj.CustAttrContentObjs;
    reqEditDupCheck.CustDocFileObjs = dicts.ReqSubmitObj.CustDocFileObjs;

    let reqPayload = separateFileUpload(reqEditDupCheck);
    let resSave: GenericObj;
    http.post(url, reqPayload.forApi, AdInsConstant.SpinnerOptions).toPromise().then(
      (response: GenericObj) => {
        resSave = response;
        uploadDocFileMultipart(reqPayload.forUpload, resSave["Message"], resSave.Id, dicts.AddCustForm.MrCustTypeCode, Mode, From, toastr, router, cookieService)
      }
    );
  }

  if (key == "SAVE_DUP_NEG")
  {
    let NegativeCustObj: ReqNegDupObj = new ReqNegDupObj();
    NegativeCustObj.NegativeCustId = RowObj.NegativeCustId;
    NegativeCustObj.CustDataMode = Mode;
    NegativeCustObj.ThirdPartyTrxNo = dicts.ReqSubmitObj.CustObj.ThirdPartyTrxNo;

    if (Mode == CommonConstant.CustMainDataModeFamily) {
      NegativeCustObj.CustPersonalFamilyObj = dicts.ReqSubmitObj.CustPersonalFamilyObj;
    }
    if (Mode == CommonConstant.CustMainDataModeMgmntShrholder) {
      NegativeCustObj.CustCompanyMgmntShrholderObj = dicts.ReqSubmitObj.CustCompanyMgmntShrholderObj;
    }
    NegativeCustObj.CustPersonalJobObj = dicts.ReqSubmitObj.CustPersonalJobObj;
    NegativeCustObj.CustAttrContentObjs = dicts.ReqSubmitObj.CustAttrContentObjs;
    NegativeCustObj.CustDocFileObjs = dicts.ReqSubmitObj.CustDocFileObjs;
    
    http.post<GenericObj>(url, NegativeCustObj, AdInsConstant.SpinnerOptions).subscribe(
    (response) => {
      redirectSaveEditMainData(response.Id, dicts.AddCustForm.MrCustTypeCode, Mode, From, router);
    }); 
  }

}

export function addCustomerCompanyAfterDuplicate(dicts: Record<string, any>, RowObj: any, key: string, Mode: string, From: string, api: any, http: HttpClient, toastr: NGXToastrService, router: Router, cookieService: CookieService)
{
  console.log(RowObj)

  let url = enviConfig.FoundationR3Url + api;

  if (key == "SAVE")
  {
    SaveCustomerData(dicts, Mode, From, api, http, toastr, router, cookieService)
  }

  if (key == "SAVE_DUP")
  {
    let reqEditDupCheck: ReqDupObj = new ReqDupObj();
    reqEditDupCheck.CustNo = RowObj.CustNo;
    reqEditDupCheck.CustDataMode = Mode;
    reqEditDupCheck.ThirdPartyTrxNo = dicts.ReqSubmitObj.CustObj.ThirdPartyTrxNo;

    if (Mode == CommonConstant.CustMainDataModeMgmntShrholder) {
      reqEditDupCheck.CustCompanyMgmntShrholderObj = dicts.ReqSubmitObj.CustCompanyMgmntShrholderObj;
    }
    reqEditDupCheck.CustDocFileObjs = dicts.ReqSubmitObj.CustDocFileObjs;

    let reqPayload = separateFileUpload(reqEditDupCheck);
    let resSave: GenericObj;
    http.post(url, reqPayload.forApi, AdInsConstant.SpinnerOptions).toPromise().then(
      (response: GenericObj) => {
        resSave = response;
        uploadDocFileMultipart(reqPayload.forUpload, resSave["Message"], resSave.Id, dicts.AddCustForm.MrCustTypeCode, Mode, From, toastr, router, cookieService)
      }
    );
  }

  if (key == "SAVE_DUP_NEG")
  {
    let NegativeCustObj: ReqNegDupObj = new ReqNegDupObj();
    NegativeCustObj.NegativeCustId = RowObj.NegativeCustId;
    NegativeCustObj.CustDataMode = Mode;
    NegativeCustObj.MrCompanyTypeCode = dicts.ReqSubmitObj.CustCompanyObj.MrCompanyTypeCode;
    NegativeCustObj.ThirdPartyTrxNo = dicts.ReqSubmitObj.CustObj.ThirdPartyTrxNo;
    NegativeCustObj.CustDocFileObjs = dicts.ReqSubmitObj.CustDocFileObjs;

    if (Mode == CommonConstant.CustMainDataModeMgmntShrholder) {
      NegativeCustObj.CustCompanyMgmntShrholderObj = dicts.ReqSubmitObj.CustCompanyMgmntShrholderObj;
    }

    NegativeCustObj.CustDocFileObjs = dicts.ReqSubmitObj.CustDocFileObjs;
    
    http.post<GenericObj>(url, NegativeCustObj, AdInsConstant.SpinnerOptions).subscribe(
    (response) => {
      redirectSaveEditMainData(response.Id, dicts.AddCustForm.MrCustTypeCode, Mode, From, router);
    }); 
  }

}

export function backCust(dicts: Record<string, any>, router: Router)
{
  if (dicts.From == "" || dicts.From == undefined)
  {
    AdInsHelper.RedirectUrl(router, [NavigationConstant.SELF_CUSTOM_CUST_PAGING]);
  }

  if (dicts.From == CommonConstant.CustFromEditMainData)
  {
    AdInsHelper.RedirectUrl(router, [NavigationConstant.SELF_CUSTOM_CUST_EDIT_MAIN_DATA_PAGING]);
  }
}

export function addEditCustAsset(parentForm: any, CustId: number, CustAssetId: number, api: any, RowVersion: any, http: HttpClient, toastr: NGXToastrService, DialogRef: MatDialogRef<any>)
{
    let url = enviConfig.FoundationR3Url + api;
    let AssetTotalValue = parentForm.AssetValue * parentForm.AssetQty;

    let obj = {
        "AssetDescr" : parentForm.AssetDescr,
        "AssetQty" : parentForm.AssetQty,
        "AssetTotalValue" : AssetTotalValue,
        "CustAssetId": CustAssetId,
        "AssetValue": parentForm.AssetValue,
        "CustId": CustId,
        "MrCustAssetTypeCode": parentForm.MrCustAssetTypeCode,
        "RowVersion": RowVersion
    }

    http.post(url, obj).subscribe(
    (response: any) => {
        toastr.successMessage(response["message"]);
        DialogRef.close()
    })
}

export function addEditCustAddr(parentForm: any, CustId: number, CustAddrId: number, api: any, RowVersion: any, http: HttpClient, toastr: NGXToastrService, DialogRef: MatDialogRef<any>)
{
    let url = enviConfig.FoundationR3Url + api;
    let FullAddr = parentForm.UcAddress.Addr + " RT: " + parentForm.UcAddress.AreaCode4 + " RW: " + parentForm.UcAddress.AreaCode3 + " " + parentForm.UcAddress.AreaCode2 + ", " + parentForm.UcAddress.AreaCode1 + " " + parentForm.UcAddress.Zipcode;

    let obj = {
        "CustAddrId": CustAddrId,
        "RowVersion": RowVersion,
        "CustId": CustId,
        "MrCustAddrTypeCode": parentForm.MrCustAddrTypeCode,
        "Addr": parentForm.UcAddress.Addr,
        "FullAddr": FullAddr,
        "AreaCode3": parentForm.UcAddress.AreaCode3,
        "AreaCode4": parentForm.UcAddress.AreaCode4,
        "Zipcode": parentForm.UcAddress.Zipcode,
        "AreaCode1": parentForm.UcAddress.AreaCode1,
        "AreaCode2": parentForm.UcAddress.AreaCode2,
        "City": parentForm.UcAddress.City,
        "PhnArea1": parentForm.UcAddress.PhnArea1,
        "Phn1": parentForm.UcAddress.Phn1,
        "PhnExt1": parentForm.UcAddress.PhnExt1,
        "PhnArea2": parentForm.UcAddress.PhnArea2,
        "Phn2": parentForm.UcAddress.Phn2,
        "PhnExt2": parentForm.UcAddress.PhnExt2,
        "PhnArea3": parentForm.UcAddress.PhnArea3,
        "Phn3": parentForm.UcAddress.Phn3,
        "PhnExt3": parentForm.UcAddress.PhnExt3,
        "FaxArea": parentForm.UcAddress.FaxArea,
        "Fax": parentForm.UcAddress.Fax,
        "MrBuildingOwnershipCode": parentForm.UcAddress.MrHouseOwnershipCode,
        "Notes": parentForm.Notes
    }

    http.post(url, obj).subscribe(
    (response: any) => {
        toastr.successMessage(response["message"]);
        DialogRef.close()
    })
}

export function addEditCustJobData(dicts: Record<string, any>, api: any, http: HttpClient, toastr: NGXToastrService, templateService: UcTemplateService)
{
  let url = enviConfig.FoundationR3Url + api;

  let reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj();
  let custPersonalJobDataObj = new CustPersonalJobDataObj();

  if (dicts.formRaw.MrCustModelCode == CommonConstant.CUST_MODEL_NONPROF)
  {
    custPersonalJobDataObj.RefProfessionId = dicts.formRaw.NonProfRefProfessionId;
    custPersonalJobDataObj.JobTitleName = dicts.formRaw.NonProfJobTitleName;
    
    custPersonalJobDataObj.MrCustModelCode = CommonConstant.CUST_MODEL_NONPROF;
  }
  else
  {
    custPersonalJobDataObj.JobAddrId = dicts.JobAddrId;
    custPersonalJobDataObj.PrevJobAddrId = dicts.CustAddrIdPrevAddr;
    custPersonalJobDataObj.OthBizAddrId = dicts.OthBizAddrId;

    custPersonalJobDataObj.PrevCoyName = dicts.formRaw.PrevIndustryName;
    custPersonalJobDataObj.PrevEmploymentDt = dicts.formRaw.PrevEmploymentDate;
    custPersonalJobDataObj.OthBizName = dicts.formRaw.OtherBusinessName;
    custPersonalJobDataObj.OthBizType = dicts.formRaw.OtherBusinessType;
    custPersonalJobDataObj.OthBizIndustryTypeCode = dicts.formRaw.OtherBusinessIndustry;
    custPersonalJobDataObj.OthBizJobPosition = dicts.formRaw.OtherJobPosition;
    custPersonalJobDataObj.OthBizEstablishmentDt = dicts.formRaw.OthBizEstablishmentDate;
    
    reqCustPersonalJobDataObj.JobAddr = setJobAddress(dicts.formRaw.Address, dicts, CommonConstant.CustAddrTypeJob, dicts.formRaw.NotesAddr);
    reqCustPersonalJobDataObj.PreJobAddr = setJobAddress(dicts.formRaw.PrevAddress, dicts, CommonConstant.CustAddrTypePreJob, dicts.formRaw.NotesPrevAddr);
    reqCustPersonalJobDataObj.OthBizAddr = setJobAddress(dicts.formRaw.OthBizAddress, dicts, CommonConstant.CustAddrTypeOthBiz, dicts.formRaw.NotesOthBiz);
  }

  if (dicts.formRaw.MrCustModelCode == CommonConstant.CUST_MODEL_PROF)
  {
    custPersonalJobDataObj.RefProfessionId = dicts.formRaw.ProfRefProfessionId;
    custPersonalJobDataObj.ProfessionalNo = dicts.formRaw.ProfProfessionalNo;
    custPersonalJobDataObj.JobTitleName = dicts.formRaw.ProfJobTitleName;
    custPersonalJobDataObj.CoyName = dicts.formRaw.ProfIndustryName;
    custPersonalJobDataObj.IsWellknownCoy = dicts.formRaw.ProfIsWellknownCoy;
    custPersonalJobDataObj.MrWellknownCoyCode = dicts.formRaw.ProfMrWellknownCoyCode;
    custPersonalJobDataObj.RefIndustryTypeId = dicts.formRaw.ProfRefIndustryTypeId;
    custPersonalJobDataObj.EmploymentEstablishmentDt = dicts.formRaw.ProfEstablishmentDt;

    custPersonalJobDataObj.MrCustModelCode = CommonConstant.CUST_MODEL_PROF;
  }

  if (dicts.formRaw.MrCustModelCode == CommonConstant.CUST_MODEL_EMP)
  {
    custPersonalJobDataObj.RefProfessionId = dicts.formRaw.EmpRefProfessionId;
    custPersonalJobDataObj.MrJobPositionCode = dicts.formRaw.EmpJobPosition;
    custPersonalJobDataObj.JobTitleName = dicts.formRaw.EmpJobTitleName;
    custPersonalJobDataObj.MrJobStatCode = dicts.formRaw.EmpJobStatus;
    custPersonalJobDataObj.CoyName = dicts.formRaw.EmpIndustryName;
    custPersonalJobDataObj.IsMfEmp = dicts.formRaw.EmpInternalEmployee;
    custPersonalJobDataObj.IsWellknownCoy = dicts.formRaw.EmpIsWellknownCoy;
    custPersonalJobDataObj.MrWellknownCoyCode = dicts.formRaw.EmpMrWellknownCoyCode;
    custPersonalJobDataObj.RefIndustryTypeId = dicts.formRaw.EmpRefIndustryTypeId;
    custPersonalJobDataObj.NoOfEmploy = dicts.formRaw.EmpNoOfEmploy;
    custPersonalJobDataObj.MrCoyScaleCode = dicts.formRaw.EmpCompanyScale;
    custPersonalJobDataObj.EmploymentEstablishmentDt = dicts.formRaw.EmpEstablishmentDt;

    custPersonalJobDataObj.MrCustModelCode = CommonConstant.CUST_MODEL_EMP;
  }

  if (dicts.formRaw.MrCustModelCode == CommonConstant.CUST_MODEL_SME)
  {
    custPersonalJobDataObj.RefProfessionId = dicts.formRaw.SmeRefProfessionId;
    custPersonalJobDataObj.MrJobPositionCode = dicts.formRaw.SmeJobPosition;
    custPersonalJobDataObj.JobTitleName = dicts.formRaw.SmeJobTitleName;
    custPersonalJobDataObj.CoyName = dicts.formRaw.SmeIndustryName;
    custPersonalJobDataObj.RefIndustryTypeId = dicts.formRaw.SmeRefIndustryTypeId;
    custPersonalJobDataObj.MrCoyScaleCode = dicts.formRaw.SmeCompanyScale;
    custPersonalJobDataObj.NoOfEmploy = dicts.formRaw.SmeNoOfEmploy;
    custPersonalJobDataObj.EmploymentEstablishmentDt = dicts.formRaw.SmeEstablishmentDt;
    custPersonalJobDataObj.IsWellknownCoy = dicts.formRaw.SmeIsWellknownCoy;
    custPersonalJobDataObj.MrWellknownCoyCode = dicts.formRaw.SmeMrWellknownCoyCode;
    custPersonalJobDataObj.MrInvestmentTypeCode = dicts.formRaw.SmeMrInvestmentTypeCode;

    custPersonalJobDataObj.MrCustModelCode = CommonConstant.CUST_MODEL_SME;
  }

  custPersonalJobDataObj.CustId = dicts.IdCust;
  custPersonalJobDataObj.CustPersonalJobDataId = dicts.CustPersonalJobDataId;
  custPersonalJobDataObj.RowVersion = dicts.RowVersionJob;

  reqCustPersonalJobDataObj.CustPersonalJobData = custPersonalJobDataObj;

  http.post(url, reqCustPersonalJobDataObj, AdInsConstant.SpinnerOptions).subscribe(
    (response) => {
      toastr.successMessage(response["message"]);
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

      templateService.publish({Actions: actions});
      // NextStep();
    }
  );
}

async function saveCustPersonalDetail(dicts: Record<string, any>, api: any, http: HttpClient, toastr: NGXToastrService)
{
  let url = enviConfig.FoundationR3Url + api;

  let custPersonalObj = new CustPersonalObj();
  custPersonalObj.BirthDt = dicts.BirthDt;
  custPersonalObj.BirthPlace = dicts.BirthPlace;
  custPersonalObj.CustFullName = dicts.CustName;
  custPersonalObj.CustPersonalId = dicts.CustPersonalId;
  custPersonalObj.Email1 = dicts.Email1;
  custPersonalObj.Email2 = dicts.Email2;
  custPersonalObj.Email3 = dicts.Email3;
  custPersonalObj.MobilePhnNo1 = dicts.MobilePhnNo1;
  custPersonalObj.MobilePhnNo2 = dicts.MobilePhnNo2;
  custPersonalObj.MobilePhnNo3 = dicts.MobilePhnNo3;
  custPersonalObj.MotherMaidenName = dicts.MotherMaidenName;
  custPersonalObj.MrGenderCode = dicts.MrGenderCode;
  custPersonalObj.MrMaritalStatCode = dicts.MrMaritalStatCode;
  custPersonalObj.MrGenderCode = dicts.MrGenderCode;
  custPersonalObj.MrGenderCode = dicts.MrGenderCode;
  custPersonalObj.MrGenderCode = dicts.MrGenderCode;
  custPersonalObj.MrGenderCode = dicts.MrGenderCode;
  custPersonalObj.MrGenderCode = dicts.MrGenderCode;

  custPersonalObj.CustPrefixName = dicts.formRaw.CustPrefixName;
  custPersonalObj.CustSuffixName = dicts.formRaw.CustSuffixName;
  custPersonalObj.FamilyCardNo = dicts.formRaw.FamilyCardNo;
  custPersonalObj.IsAffiliateWithMf = dicts.formRaw.IsAffiliateWithMf;
  custPersonalObj.IsRestInPeace = dicts.formRaw.IsRestInPeace;
  custPersonalObj.IsVip = dicts.formRaw.IsVip;
  custPersonalObj.MrMaritalStatCode = dicts.MrMaritalStatCode
  custPersonalObj.MrEducationCode = dicts.formRaw.MrEducationCode;
  custPersonalObj.MrNationalityCode = dicts.formRaw.MrNationalityCode;
  custPersonalObj.MrReligionCode = dicts.formRaw.MrReligionCode;
  custPersonalObj.MrSalutationCode = dicts.formRaw.MrSalutationCode;
  custPersonalObj.NickName = dicts.formRaw.NickName;
  custPersonalObj.NoOfResidence = dicts.formRaw.NoOfResidence;
  custPersonalObj.VipNotes = dicts.formRaw.VipNotes;
  custPersonalObj.WnaCountryCode = dicts.formRaw.WnaCountryCode;
  custPersonalObj.RowVersion = dicts.RowVersionPersonal;
  custPersonalObj.ParentCustId = dicts.formRaw.ParentCustId;

  await http.post(url, custPersonalObj, AdInsConstant.SpinnerOptions).toPromise().then(
    response => {
      toastr.successMessage(response["Message"]);
    }
  );
}



async function saveCustPersonalDetailV2(dicts: Record<string, any>, api: any, http: HttpClient, toastr: NGXToastrService)
{
  let url = enviConfig.FoundationR3Url + api;

  let custPersonalObj = new CustPersonalObjV2();
  custPersonalObj.BirthDt = dicts.BirthDt;
  custPersonalObj.BirthPlace = dicts.BirthPlace;
  custPersonalObj.CustFullName = dicts.CustName;
  custPersonalObj.CustPersonalId = dicts.CustPersonalId;
  custPersonalObj.Email1 = dicts.Email1;
  custPersonalObj.Email2 = dicts.Email2;
  custPersonalObj.Email3 = dicts.Email3;
  custPersonalObj.MobilePhnNo1 = dicts.MobilePhnNo1;
  custPersonalObj.MobilePhnNo2 = dicts.MobilePhnNo2;
  custPersonalObj.MobilePhnNo3 = dicts.MobilePhnNo3;
  custPersonalObj.IsWaMobilePhnNo1 = dicts.IsWaMobilePhnNo1;
  custPersonalObj.IsWaMobilePhnNo2 = dicts.IsWaMobilePhnNo2;
  custPersonalObj.IsWaMobilePhnNo3 = dicts.IsWaMobilePhnNo3;
  custPersonalObj.MotherMaidenName = dicts.MotherMaidenName;
  custPersonalObj.MrGenderCode = dicts.MrGenderCode;
  custPersonalObj.MrMaritalStatCode = dicts.MrMaritalStatCode;
  custPersonalObj.MrGenderCode = dicts.MrGenderCode;

  custPersonalObj.CustPrefixName = dicts.formRaw.CustPrefixName;
  custPersonalObj.CustSuffixName = dicts.formRaw.CustSuffixName;
  custPersonalObj.FamilyCardNo = dicts.formRaw.FamilyCardNo;
  custPersonalObj.IsAffiliateWithMf = dicts.formRaw.IsAffiliateWithMf;
  custPersonalObj.IsRestInPeace = dicts.formRaw.IsRestInPeace;
  custPersonalObj.IsVip = dicts.formRaw.IsVip;
  custPersonalObj.MrMaritalStatCode = dicts.MrMaritalStatCode
  custPersonalObj.MrEducationCode = dicts.formRaw.MrEducationCode;
  custPersonalObj.MrNationalityCode = dicts.formRaw.MrNationalityCode;
  custPersonalObj.MrReligionCode = dicts.formRaw.MrReligionCode;
  custPersonalObj.MrSalutationCode = dicts.formRaw.MrSalutationCode;
  custPersonalObj.NickName = dicts.formRaw.NickName;
  custPersonalObj.NoOfResidence = dicts.formRaw.NoOfResidence;
  custPersonalObj.VipNotes = dicts.formRaw.VipNotes;
  custPersonalObj.WnaCountryCode = dicts.formRaw.WnaCountryCode;
  custPersonalObj.RowVersion = dicts.RowVersionPersonal;
  custPersonalObj.ParentCustId = dicts.formRaw.ParentCustId;
  custPersonalObj.CustApuPptObj.IsEdd = dicts.formRaw.IsEdd;
  custPersonalObj.CustApuPptObj.MrCategory1TypeCode = dicts.formRaw.MrCategory1TypeCode;
  custPersonalObj.CustApuPptObj.MrCategory2TypeCode = dicts.formRaw.MrCategory2TypeCode;
  custPersonalObj.CustApuPptObj.MrCategory3TypeCode = dicts.formRaw.MrCategory3TypeCode;
  custPersonalObj.CustApuPptObj.reason = dicts.formRaw.Reason;
  custPersonalObj.CustApuPptObj.RowVersion = dicts.formRaw.RowVersionCustApuPpt;

  await http.post(url, custPersonalObj, AdInsConstant.SpinnerOptions).toPromise().then(
    response => {
      toastr.successMessage(response["Message"]);
    }
  );
}


async function saveCustCompanyDetail(dicts: Record<string, any>, api: any, http: HttpClient, toastr: NGXToastrService)
{
  let url = enviConfig.FoundationR3Url + api;

  let custCompanyObj = new CustCompanyObj();
  custCompanyObj.CustCompanyId = dicts.CustCompanyId;
  custCompanyObj.CustId = dicts.IdCust;
  custCompanyObj.Email1 = dicts.Email1;
  custCompanyObj.Email2 = dicts.Email2;
  custCompanyObj.EstablishmentDt = dicts.form.EstablishmentDt;
  custCompanyObj.IsAffiliateWithMf = dicts.form.IsAffiliateWithMf;
  custCompanyObj.IsAffiliated = dicts.IsAffiliated;
  custCompanyObj.IsSkt = dicts.form.IsSkt;
  custCompanyObj.IsVip = dicts.form.IsVip;
  custCompanyObj.LicenseNo = dicts.LicenseNo;
  custCompanyObj.MrCompanyTypeCode = dicts.MrCompanyTypeCode;
  custCompanyObj.MrCustModelCode = dicts.MrCustModelCode;
  custCompanyObj.MrInvestmentTypeCode = dicts.MrInvestmentTypeCode;
  custCompanyObj.NumOfEmp = dicts.form.NumOfEmp;
  custCompanyObj.ParentCustId = dicts.form.ParentCustId;
  custCompanyObj.Phn1 = dicts.Phn1;
  custCompanyObj.Phn2 = dicts.Phn2;
  custCompanyObj.PhnArea1 = dicts.PhnArea1;
  custCompanyObj.PhnArea2 = dicts.PhnArea2;
  custCompanyObj.PhnExt1 = dicts.PhnExt1;
  custCompanyObj.PhnExt2 = dicts.PhnExt2;
  custCompanyObj.RefIndustryTypeId = dicts.RefIndustryTypeId
  custCompanyObj.RegistrationNo = dicts.RegistrationNo;
  custCompanyObj.VipNotes = dicts.formRaw.VipNotes;
  custCompanyObj.RowVersion = dicts.form.RowVersion;
  custCompanyObj.Website = dicts.Website;

  await http.post(url, custCompanyObj, AdInsConstant.SpinnerOptions).toPromise().then(
    response => {
      toastr.successMessage(response["Message"]);
    }
  );
}

async function saveCustCompanyDetailV2(dicts: Record<string, any>, api: any, http: HttpClient, toastr: NGXToastrService)
{
  let url = enviConfig.FoundationR3Url + api;

  let custCompanyObj = new CustCompanyObjV2();
  custCompanyObj.CustCompanyId = dicts.CustCompanyId;
  custCompanyObj.CustId = dicts.IdCust;
  custCompanyObj.Email1 = dicts.Email1;
  custCompanyObj.Email2 = dicts.Email2;
  custCompanyObj.EstablishmentDt = dicts.form.EstablishmentDt;
  custCompanyObj.IsAffiliateWithMf = dicts.form.IsAffiliateWithMf;
  custCompanyObj.IsAffiliated = dicts.IsAffiliated;
  custCompanyObj.IsSkt = dicts.form.IsSkt;
  custCompanyObj.IsVip = dicts.form.IsVip;
  custCompanyObj.LicenseNo = dicts.LicenseNo;
  custCompanyObj.MrCompanyTypeCode = dicts.MrCompanyTypeCode;
  custCompanyObj.MrCustModelCode = dicts.MrCustModelCode;
  custCompanyObj.MrInvestmentTypeCode = dicts.MrInvestmentTypeCode;
  custCompanyObj.NumOfEmp = dicts.form.NumOfEmp;
  custCompanyObj.ParentCustId = dicts.form.ParentCustId;
  custCompanyObj.Phn1 = dicts.Phn1;
  custCompanyObj.Phn2 = dicts.Phn2;
  custCompanyObj.PhnArea1 = dicts.PhnArea1;
  custCompanyObj.PhnArea2 = dicts.PhnArea2;
  custCompanyObj.PhnExt1 = dicts.PhnExt1;
  custCompanyObj.PhnExt2 = dicts.PhnExt2;
  custCompanyObj.RefIndustryTypeId = dicts.RefIndustryTypeId
  custCompanyObj.RegistrationNo = dicts.RegistrationNo;
  custCompanyObj.VipNotes = dicts.formRaw.VipNotes;
  custCompanyObj.RowVersion = dicts.form.RowVersionCoy;
  custCompanyObj.Website = dicts.Website;
  custCompanyObj.CustApuPptObj.IsEdd = dicts.formRaw.IsEdd;
  custCompanyObj.CustApuPptObj.MrCategory1TypeCode = dicts.formRaw.MrCategory1TypeCode;
  custCompanyObj.CustApuPptObj.MrCategory2TypeCode = dicts.formRaw.MrCategory2TypeCode;
  custCompanyObj.CustApuPptObj.MrCategory3TypeCode = dicts.formRaw.MrCategory3TypeCode;
  custCompanyObj.CustApuPptObj.reason = dicts.formRaw.Reason;
  custCompanyObj.CustApuPptObj.RowVersion = dicts.formRaw.RowVersionCustApuPpt;

  await http.post(url, custCompanyObj, AdInsConstant.SpinnerOptions).toPromise().then(
    response => {
      toastr.successMessage(response["Message"]);
    }
  );
}

async function saveAddEditEmergencyCntcPerson(dicts: Record<string, any>, api: any, http: HttpClient, toastr: NGXToastrService)
{
  let url = enviConfig.FoundationR3Url + api;

  let custPersonalContactPersonObj = new CustPersonalContactPersonObj();
  custPersonalContactPersonObj.BirthPlace = dicts.formRaw.BirthPlace;
  custPersonalContactPersonObj.BirthDt = dicts.formRaw.BirthDt;
  custPersonalContactPersonObj.ContactPersonCustNo = dicts.formRaw.ContactPersonCustNo;
  custPersonalContactPersonObj.ContactPersonName = dicts.formRaw.ContactPersonName;
  custPersonalContactPersonObj.CustId = dicts.IdCust;
  custPersonalContactPersonObj.CustPersonalContactPersonId = dicts.CustPersonalContactPersonId;
  custPersonalContactPersonObj.Email = dicts.formRaw.Email;
  custPersonalContactPersonObj.IdExpiredDt = dicts.formRaw.IdExpiredDt;
  custPersonalContactPersonObj.IdNo = dicts.formRaw.IdNo;
  custPersonalContactPersonObj.MobilePhnNo1 = dicts.formRaw.MobilePhnNo1;
  custPersonalContactPersonObj.MobilePhnNo2 = dicts.formRaw.MobilePhnNo2;
  custPersonalContactPersonObj.MobilePhnNo3 = dicts.formRaw.MobilePhnNo3;
  custPersonalContactPersonObj.IsWaMobilePhnNo1 = dicts.formRaw.IsWaMobilePhnNo1;
  custPersonalContactPersonObj.IsWaMobilePhnNo2 = dicts.formRaw.IsWaMobilePhnNo2;
  custPersonalContactPersonObj.IsWaMobilePhnNo3 = dicts.formRaw.IsWaMobilePhnNo3;
  custPersonalContactPersonObj.MrCustRelationshipCode = dicts.formRaw.MrCustRelationshipCode;
  custPersonalContactPersonObj.MrGenderCode = dicts.formRaw.MrGenderCode;
  custPersonalContactPersonObj.MrIdTypeCode = dicts.formRaw.MrIdTypeCode;
  custPersonalContactPersonObj.RowVersion = dicts.RowVersionCntcPerson;

  custPersonalContactPersonObj.Addr = dicts.formRaw.UcAddress.Addr;
  custPersonalContactPersonObj.AreaCode1 = dicts.formRaw.UcAddress.AreaCode1;
  custPersonalContactPersonObj.AreaCode2 = dicts.formRaw.UcAddress.AreaCode2;
  custPersonalContactPersonObj.AreaCode3 = dicts.formRaw.UcAddress.AreaCode3;
  custPersonalContactPersonObj.AreaCode4 = dicts.formRaw.UcAddress.AreaCode4;
  custPersonalContactPersonObj.City = dicts.formRaw.UcAddress.City;
  custPersonalContactPersonObj.Phn1 = dicts.formRaw.UcAddress.Phn1;
  custPersonalContactPersonObj.Phn2 = dicts.formRaw.UcAddress.Phn2;
  custPersonalContactPersonObj.Phn3 = dicts.formRaw.UcAddress.Phn3;
  custPersonalContactPersonObj.PhnArea1 = dicts.formRaw.UcAddress.PhnArea1;
  custPersonalContactPersonObj.PhnArea2 = dicts.formRaw.UcAddress.PhnArea2;
  custPersonalContactPersonObj.PhnArea3 = dicts.formRaw.UcAddress.PhnArea3;
  custPersonalContactPersonObj.PhnExt1 = dicts.formRaw.UcAddress.PhnExt1;
  custPersonalContactPersonObj.PhnExt2 = dicts.formRaw.UcAddress.PhnExt2;
  custPersonalContactPersonObj.PhnExt3 = dicts.formRaw.UcAddress.PhnExt3;
  custPersonalContactPersonObj.Zipcode = dicts.formRaw.UcAddress.Zipcode;

  await http.post(url, custPersonalContactPersonObj, AdInsConstant.SpinnerOptions).toPromise().then(
    response => {
      toastr.successMessage(response["Message"]);
    }
  );
}

async function saveAddEditCustJobData(dicts: Record<string, any>, api: any, http: HttpClient, toastr: NGXToastrService)
{
  let url = enviConfig.FoundationR3Url + api;

  let reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj();
  let custPersonalJobDataObj = new CustPersonalJobDataObj();

  if (dicts.formRaw.MrCustModelCode == CommonConstant.CUST_MODEL_NONPROF)
  {
    custPersonalJobDataObj.RefProfessionId = dicts.formRaw.NonProfRefProfessionId;
    custPersonalJobDataObj.JobTitleName = dicts.formRaw.NonProfJobTitleName;
    
    custPersonalJobDataObj.MrCustModelCode = CommonConstant.CUST_MODEL_NONPROF;
  }
  else
  {
    custPersonalJobDataObj.JobAddrId = dicts.JobAddrId; 
    custPersonalJobDataObj.PrevJobAddrId = dicts.CustAddrIdPrevAddr;
    custPersonalJobDataObj.OthBizAddrId = dicts.OthBizAddrId;

    custPersonalJobDataObj.PrevCoyName = dicts.formRaw.PrevIndustryName;
    custPersonalJobDataObj.PrevEmploymentDt = dicts.formRaw.PrevEmploymentDate;
    custPersonalJobDataObj.OthBizName = dicts.formRaw.OtherBusinessName;
    custPersonalJobDataObj.OthBizType = dicts.formRaw.OtherBusinessType;
    custPersonalJobDataObj.OthBizIndustryTypeCode = dicts.formRaw.OtherBusinessIndustry;
    custPersonalJobDataObj.OthBizJobPosition = dicts.formRaw.OtherJobPosition;
    custPersonalJobDataObj.OthBizEstablishmentDt = dicts.formRaw.OthBizEstablishmentDate;
    
    reqCustPersonalJobDataObj.JobAddr = setJobAddress(dicts.formRaw.Address, dicts, CommonConstant.CustAddrTypeJob, dicts.formRaw.NotesAddr);
    reqCustPersonalJobDataObj.PreJobAddr = setJobAddress(dicts.formRaw.PrevAddress, dicts, CommonConstant.CustAddrTypePreJob, dicts.formRaw.NotesPrevAddr);
    reqCustPersonalJobDataObj.OthBizAddr = setJobAddress(dicts.formRaw.OthBizAddress, dicts, CommonConstant.CustAddrTypeOthBiz, dicts.formRaw.NotesOthBiz);
  }

  if (dicts.formRaw.MrCustModelCode == CommonConstant.CUST_MODEL_PROF)
  {
    custPersonalJobDataObj.RefProfessionId = dicts.formRaw.ProfRefProfessionId;
    custPersonalJobDataObj.ProfessionalNo = dicts.formRaw.ProfProfessionalNo;
    custPersonalJobDataObj.JobTitleName = dicts.formRaw.ProfJobTitleName;
    custPersonalJobDataObj.CoyName = dicts.formRaw.ProfIndustryName;
    custPersonalJobDataObj.IsWellknownCoy = dicts.formRaw.ProfIsWellknownCoy;
    custPersonalJobDataObj.MrWellknownCoyCode = dicts.formRaw.ProfMrWellknownCoyCode;
    custPersonalJobDataObj.RefIndustryTypeId = dicts.formRaw.ProfRefIndustryTypeId;
    custPersonalJobDataObj.EmploymentEstablishmentDt = dicts.formRaw.ProfEstablishmentDt;

    custPersonalJobDataObj.MrCustModelCode = CommonConstant.CUST_MODEL_PROF;
  }

  if (dicts.formRaw.MrCustModelCode == CommonConstant.CUST_MODEL_EMP)
  {
    custPersonalJobDataObj.RefProfessionId = dicts.formRaw.EmpRefProfessionId;
    custPersonalJobDataObj.MrJobPositionCode = dicts.formRaw.EmpJobPosition;
    custPersonalJobDataObj.JobTitleName = dicts.formRaw.EmpJobTitleName;
    custPersonalJobDataObj.MrJobStatCode = dicts.formRaw.EmpJobStatus;
    custPersonalJobDataObj.CoyName = dicts.formRaw.EmpIndustryName;
    custPersonalJobDataObj.IsMfEmp = dicts.formRaw.EmpInternalEmployee;
    custPersonalJobDataObj.IsWellknownCoy = dicts.formRaw.EmpIsWellknownCoy;
    custPersonalJobDataObj.MrWellknownCoyCode = dicts.formRaw.EmpMrWellknownCoyCode;
    custPersonalJobDataObj.RefIndustryTypeId = dicts.formRaw.EmpRefIndustryTypeId;
    custPersonalJobDataObj.NoOfEmploy = dicts.formRaw.EmpNoOfEmploy;
    custPersonalJobDataObj.MrCoyScaleCode = dicts.formRaw.EmpCompanyScale;
    custPersonalJobDataObj.EmploymentEstablishmentDt = dicts.formRaw.EmpEstablishmentDt;

    custPersonalJobDataObj.MrCustModelCode = CommonConstant.CUST_MODEL_EMP;
  }

  if (dicts.formRaw.MrCustModelCode == CommonConstant.CUST_MODEL_SME)
  {
    custPersonalJobDataObj.RefProfessionId = dicts.formRaw.SmeRefProfessionId;
    custPersonalJobDataObj.MrJobPositionCode = dicts.formRaw.SmeJobPosition;
    custPersonalJobDataObj.JobTitleName = dicts.formRaw.SmeJobTitleName;
    custPersonalJobDataObj.CoyName = dicts.formRaw.SmeIndustryName;
    custPersonalJobDataObj.RefIndustryTypeId = dicts.formRaw.SmeRefIndustryTypeId;
    custPersonalJobDataObj.MrCoyScaleCode = dicts.formRaw.SmeCompanyScale;
    custPersonalJobDataObj.NoOfEmploy = dicts.formRaw.SmeNoOfEmploy;
    custPersonalJobDataObj.EmploymentEstablishmentDt = dicts.formRaw.SmeEstablishmentDt;
    custPersonalJobDataObj.IsWellknownCoy = dicts.formRaw.SmeIsWellknownCoy;
    custPersonalJobDataObj.MrWellknownCoyCode = dicts.formRaw.SmeMrWellknownCoyCode;
    custPersonalJobDataObj.MrInvestmentTypeCode = dicts.formRaw.SmeMrInvestmentTypeCode;

    custPersonalJobDataObj.MrCustModelCode = CommonConstant.CUST_MODEL_SME;
  }

  custPersonalJobDataObj.CustId = dicts.IdCust;
  custPersonalJobDataObj.CustPersonalJobDataId = dicts.CustPersonalJobDataId;
  custPersonalJobDataObj.RowVersion = dicts.RowVersionJob;

  reqCustPersonalJobDataObj.CustPersonalJobData = custPersonalJobDataObj;

  http.post(url, reqCustPersonalJobDataObj, AdInsConstant.SpinnerOptions).subscribe(
    (response) => {
      toastr.successMessage(response["message"]);
    }
  );
}

export async function saveDataOrSaveAndSync(dicts: Record<string, any>, from: any, isSaveAndSync: string, http: HttpClient, toastr: NGXToastrService, router: Router, templateService: UcTemplateService, StepIndex: number )
{
  if (!dicts.formValid) return;

  let next = ""
  let api = ""

  if (StepIndex == 1)
  {
      api = "/v1/CustPersonal/EditCustPersonal";
      await saveCustPersonalDetail(dicts, api, http, toastr)
  }

  if (StepIndex == 4)
  {
    api = dicts.CustPersonalContactPersonId == 0? "/v2/CustPersonalContactPerson/AddCustPersonalEmergencyContact" : "/v2/CustPersonalContactPerson/EditCustPersonalEmergencyContact";
    await saveAddEditEmergencyCntcPerson(dicts, api, http, toastr);
    next = "CustJobData"
  }

  if (StepIndex == 5)
  {
    api = dicts.CustPersonalJobDataId == 0? "/v1/CustPersonalJobData/AddCustPersonalJobData" : "/v1/CustPersonalJobData/EditCustPersonalJobData";
    await saveAddEditCustJobData(dicts, api, http, toastr)
    next = "CustFinData"
  }
  
  if (StepIndex == 6)
  {
    alert("CustFinData")
  }

  if (StepIndex == 9)
  {
    alert("CustAttrData")
  }

  if (isSaveAndSync == "true")
  {
    let UrlBack = NavigationConstant.SELF_CUSTOM_CUST_PAGING;
    if (from == CommonConstant.CustFromEditMainData) UrlBack = NavigationConstant.SELF_CUSTOM_CUST_EDIT_MAIN_DATA_PAGING;

    let url = enviConfig.FoundationR3Url + "/v1/Cust/SendCustomerDataToRabbitMq"
    http.post(url, { CustNo: dicts.CustNo }, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        if (response["StatusCode"] == 200) {
          toastr.successMessage("Sync Customer Succses");
          AdInsHelper.RedirectUrl(router, [UrlBack], {});
        }
      }
    )
  }
  else
  {
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

    templateService.publish({Actions: actions, Data: {"stepCode": next}});
  }
}


export async function saveDataOrSaveAndSyncCompany(dicts: Record<string, any>, from: any, isSaveAndSync: string, http: HttpClient, toastr: NGXToastrService, router: Router, templateService: UcTemplateService, StepIndex: number )
{
  if (!dicts.formValid) return;

  let next = ""
  let api = ""

  if (StepIndex == 1)
  {
      api = "/v1/CustCompany/EditCustCompany";
      await saveCustCompanyDetail(dicts, api, http, toastr)
    
  }

  if (isSaveAndSync == "true")
  {
    let UrlBack = NavigationConstant.SELF_CUSTOM_CUST_PAGING;
    if (from == CommonConstant.CustFromEditMainData) UrlBack = NavigationConstant.SELF_CUSTOM_CUST_EDIT_MAIN_DATA_PAGING;

    let url = enviConfig.FoundationR3Url + "/v1/Cust/SendCustomerDataToRabbitMq"
    http.post(url, { CustNo: dicts.CustNo }, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        if (response["StatusCode"] == 200) {
          toastr.successMessage("Sync Customer Succses");
          AdInsHelper.RedirectUrl(router, [UrlBack], {});
        }
      }
    )
  }
  else
  {
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

    templateService.publish({Actions: actions, Data: {"stepCode": next}});
  }
}

export async function saveDataOrSaveAndSyncCompanyV2(dicts: Record<string, any>, from: any, isSaveAndSync: string, http: HttpClient, toastr: NGXToastrService, router: Router, templateService: UcTemplateService, StepIndex: number )
{
  if (!dicts.formValid) return;

  let next = ""
  let api = ""

  if (StepIndex == 1)
  {
      api = "/v2/CustCompany/EditCustCompany";
      await saveCustCompanyDetailV2(dicts, api, http, toastr)
    
  }

  if (isSaveAndSync == "true")
  {
    let UrlBack = NavigationConstant.SELF_CUSTOM_CUST_PAGING;
    if (from == CommonConstant.CustFromEditMainData) UrlBack = NavigationConstant.SELF_CUSTOM_CUST_EDIT_MAIN_DATA_PAGING;

    let url = enviConfig.FoundationR3Url + "/v1/Cust/SendCustomerDataToRabbitMq"
    http.post(url, { CustNo: dicts.CustNo }, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        if (response["StatusCode"] == 200) {
          toastr.successMessage("Sync Customer Succses");
          AdInsHelper.RedirectUrl(router, [UrlBack], {});
        }
      }
    )
  }
  else
  {
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

    templateService.publish({Actions: actions, Data: {"stepCode": next}});
  }
}

export async function saveDataOrSaveAndSyncV2(dicts: Record<string, any>, from: any, isSaveAndSync: string, http: HttpClient, toastr: NGXToastrService, router: Router, templateService: UcTemplateService, StepIndex: number )
{
  if (!dicts.formValid) return;

  let next = ""
  let api = ""

  if (StepIndex == 1)
  {
    api = "/v2/CustPersonal/EditCustPersonal";
    await saveCustPersonalDetailV2(dicts, api, http, toastr)
  }

  if (StepIndex == 4)
  {
    api = dicts.CustPersonalContactPersonId == 0? "/v2/CustPersonalContactPerson/AddCustPersonalEmergencyContact" : "/v2/CustPersonalContactPerson/EditCustPersonalEmergencyContact";
    await saveAddEditEmergencyCntcPerson(dicts, api, http, toastr);
    next = "CustJobData"
  }

  if (StepIndex == 5)
  {
    api = dicts.CustPersonalJobDataId == 0? "/v1/CustPersonalJobData/AddCustPersonalJobData" : "/v1/CustPersonalJobData/EditCustPersonalJobData";
    await saveAddEditCustJobData(dicts, api, http, toastr)
    next = "CustFinData"
  }
  
  if (StepIndex == 6)
  {
    alert("CustFinData")
  }

  if (StepIndex == 9)
  {
    alert("CustAttrData")
  }

  if (isSaveAndSync == "true")
  {
    let UrlBack = NavigationConstant.SELF_CUSTOM_CUST_PAGING;
    if (from == CommonConstant.CustFromEditMainData) UrlBack = NavigationConstant.SELF_CUSTOM_CUST_EDIT_MAIN_DATA_PAGING;

    let url = enviConfig.FoundationR3Url + "/v1/Cust/SendCustomerDataToRabbitMq"
    http.post(url, { CustNo: dicts.CustNo }, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        if (response["StatusCode"] == 200) {
          toastr.successMessage("Sync Customer Succses");
          AdInsHelper.RedirectUrl(router, [UrlBack], {});
        }
      }
    )
  }
  else
  {
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

    templateService.publish({Actions: actions, Data: {"stepCode": next}});
  }
}

export function addEditCustCompanyLegalDoc(parentForm: any, dicts: Record<string, any>, http: HttpClient, toastr: NGXToastrService, router: Router, cookieService: CookieService, DialogRef: MatDialogRef<any>) {
  let url = enviConfig.FoundationR3Url;

  let reqObj = { ...parentForm };
  reqObj.CustCompanyId = dicts.CustCompanyId;
  let isAddMode: Boolean = false;
  if (typeof dicts.CustCompanyLegalDocId === "undefined" || dicts.CustCompanyLegalDocId === 0) {
    url += '/v1/CustCompanyLegalDoc/AddCustCompanyLegalDoc';
    reqObj.CustCompanyLegalDocId = 0;
    isAddMode = true;
  } else {
    url += '/v1/CustCompanyLegalDoc/EditCustCompanyLegalDoc';
    reqObj.CustCompanyLegalDocId = dicts.CustCompanyLegalDocId;
    reqObj.RowVersion = dicts.RowVersion;
    isAddMode = false;
  }

  http.post(url, reqObj, AdInsConstant.SpinnerOptions).subscribe(
    (response) => {
      var resSave;
      resSave = response;
      // toastr.successMessage(resSave["Message"]);
      DialogRef.close()
      if (dicts.UploadFile && dicts.UploadFile.DocUploadName === "") {
        return;
      }

      let reqFileUpl: CustCompanylegalDocFile = new CustCompanylegalDocFile();
      reqFileUpl.ByteBase64 = dicts.UploadFile.ByteBase64;
      reqFileUpl.DocUploadName = dicts.UploadFile.DocUploadName;
      reqFileUpl.CustCompanyLegalDocId = resSave["Id"];

      // uploadDocFileLegalMultipart(reqFileUpl, resSave["Message"], toastr, cookieService, DialogRef)
      sendXhr(
        reqFileUpl, 
        resSave["Message"], 
        toastr, 
        cookieService, 
        "/v1/CustCompanyLegalDoc/UploadCustCompanyLegalDoc",
        enviConfig.FoundationR3Url,
        "reqUploadCustCompanyLegalDocObj"
        )
      .then(() => {
        // Berhasil diunggah
        DialogRef.close()
      })
      .catch((error) => {
        // Gagal unggah, error dapat digunakan untuk menampilkan pesan kesalahan
      });
    }
  );
}

export function sendXhr(
  fileUpload: any, 
  successMsg: string, 
  toastr: NGXToastrService, 
  cookieService: CookieService, 
  apiUrl: string,
  baseUrl: string = enviConfig.FoundationR3Url,
  reqDtoName: string,
  ): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const urlUpload = baseUrl + apiUrl;
    const formData: FormData = new FormData();
    formData.append(reqDtoName, JSON.stringify(fileUpload));
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200 && xhr.status !== 201) {
        toastr.errorMessage('Upload Failed !');
        reject(new Error('Upload Failed !'));
        return;
      } else {
        const response = JSON.parse(xhr.response);
        if (response.HeaderObj.StatusCode !== '200') {
          const errorMessage = `Upload Failed ! ${response.HeaderObj.Message}`;
          toastr.errorMessage(errorMessage);
          reject(new Error(errorMessage));
          return;
        }
      }

      if (xhr.status === 200) {
        toastr.successMessage(successMsg);
        resolve();
        return;
      }
    };

    xhr.onerror = () => {
      toastr.errorMessage('Upload Failed !');
      reject(new Error('Upload Failed !'));
      return;
    };

    xhr.open('POST', urlUpload, true);
    const value = cookieService.get('XSRF-TOKEN');
    const token = DecryptString(value, environment.ChipperKeyCookie);
    xhr.setRequestHeader('AdInsKey', token);
    xhr.send(formData);
  });
}

// export function uploadDocFileLegalMultipart(fileUpload: CustCompanylegalDocFile, successMsg: string, toastr: NGXToastrService, cookieService: CookieService, DialogRef: MatDialogRef<any>, baseUrl: string = enviConfig.FoundationR3Url) {
//   let urlUpload = baseUrl + "/v1/CustCompanyLegalDoc/UploadCustCompanyLegalDoc";

//   var formData: any = new FormData();
//   formData.append('reqUploadCustCompanyLegalDocObj', JSON.stringify(fileUpload));
//   const xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = evnt => {
//     if (xhr.readyState !== 4) return;

//     if (xhr.status !== 200 && xhr.status !== 201) {
//       toastr.errorMessage('Upload Failed !');
//       return;
//     }
//     else {
//       var response = JSON.parse(xhr.response);
//       if (response.HeaderObj.StatusCode != '200') {
//         toastr.errorMessage('Upload Failed ! ' + + response.HeaderObj.Message);
//         return
//       }
//     }

//     if (xhr.status === 200) {
//       toastr.successMessage(successMsg);
//       // DialogRef.close()
//       return;
//     }
//   };

//   xhr.onerror = evnt => {
//     toastr.errorMessage('Upload Failed !');
//     return;
//   };
//   xhr.open('POST', urlUpload, true);
//   let value = cookieService.get('XSRF-TOKEN');
//   let token = DecryptString(value, environment.ChipperKeyCookie);
//   xhr.setRequestHeader('AdInsKey', `${token}`);
//   xhr.send(formData);
// }

export function addBouwheerCompany(parentForm: any, dicts: Record<string, any>, api: any, http: HttpClient, toastr: NGXToastrService, router: Router, cookieService: CookieService)
{
  let url = enviConfig.FoundationR3Url + api;
  let reqSubmitObj: ReqBouwheerCompanyObj = new ReqBouwheerCompanyObj();
  reqSubmitObj.rAddBouwheerObj = new BouwheerObj();
  reqSubmitObj.rAddBouwheerObj.BouwheerName = parentForm.BouwheerNameCompany;
  reqSubmitObj.rAddBouwheerObj.IdNo = parentForm.IdNoCompany;
  reqSubmitObj.rAddBouwheerObj.MrIdTypeCode = parentForm.MrIdTypeCodeCompany;
  reqSubmitObj.rAddBouwheerObj.IdExpiredDt = parentForm.IdExpiredDtCompany;
  reqSubmitObj.rAddBouwheerObj.TaxIdNo = parentForm.TaxIdNoCompany;
  reqSubmitObj.rAddBouwheerObj.MrCustTypeCode = parentForm.MrCustTypeCode;
  reqSubmitObj.rAddBouwheerObj.BouwheerAsCustNo = parentForm.BouwheerAsCustNoCompany;;
  reqSubmitObj.rAddBouwheerObj.LimitPlafondAmt = parentForm.LimitPlafondAmtCompany;
  reqSubmitObj.rAddBouwheerObj.IsDebtor = parentForm.IsDebtorCompanyEdit;
  
  reqSubmitObj.rAddBouwheerCompanyObj = new BouwheerCompanyObj()
  reqSubmitObj.rAddBouwheerCompanyObj.MrCompanyTypeCode = parentForm.MrCompanyTypeCode;

  let forAddApi: any ;
  let forUpload: any ;

  if(dicts.ListBouwheerIndustryInfo != undefined)
  {
    forAddApi = dicts.ListBouwheerIndustryInfo.map(item => ({
      RefIndustryTypeCode: item.RefIndustryTypeCode,
      BusinessStartDate: item.BusinessStartDate,
      IsMain: item.IsMain,
      Notes: item.Notes,
      BouwheerCompanyIndustryInfoId: item.BouwheerCompanyIndustryInfoId,
      BouwheerCompanyId: item.BouwheerCompanyId
    }));
  
    forUpload = dicts.ListBouwheerIndustryInfo.map(item => ({
      RefIndustryTypeCode: item.RefIndustryTypeCode,
      ByteBase64: item.ByteBase64,
      DocUploadName: item.DocUploadName,
    }));
  
    reqSubmitObj.rAddBouwheerCompanyIndustryInfoObj = forAddApi;
  }

  var resSave;
  http.post(url, reqSubmitObj, AdInsConstant.SpinnerOptions).subscribe(
    async (response) => {
      resSave = response;

      if (Array.isArray(forUpload) && forUpload.length > 0 && forUpload.every(obj => obj.ByteBase64?.trim() && obj.DocUploadName?.trim())) 
      {
        let reqFileUpl = {
          BouwheerId: resSave["Id"] ,
          uploadIndustryDocs: forUpload
        };

        sendXhr(
          reqFileUpl, 
          resSave["Message"], 
          toastr, 
          cookieService, 
          "/v1/BouwheerCompanyIndustryInfo/UploadBouwheerCompanyIndustryDoc",
          enviConfig.FoundationR3Url,
          "reqObj"
          )
        .then(async () => {
          await router.navigate(['/Customer/SelfCustom/Bouwheer/Paging']);
        })
        .catch((error) => {
        });

      }
      else{
        // toastr.successMessage(resSave["Message"])
        await router.navigate(['/Customer/SelfCustom/Bouwheer/Paging']);
      }
    });

}

export async function downloadDmsDocument(
  http: HttpClient, 
  toastr: NGXToastrService, 
  RowObj: any) {
  const url = `${enviConfig.FoundationR3Url}/v1/DMS/DownloadDmsDocument`;
  const documentId = RowObj.DocDmsId;

  if(documentId == null)
  {
    toastr.errorMessage('There are no documents uploaded for this record.');
    return;
  }

  try {
    const response = await http.post(url, { DocumentId: documentId }).toPromise();

    if (response && Array.isArray(response['Data']) && response['Data'].length > 0) {
      const content = response['Data'][0]['Content'];
      const contentType = 'application/pdf';
      const blob = base64StringToBlob(content, contentType);

      const metadata = response['Data'][0]['Metadata'];
      const fileName = metadata.find((item: { label: string; value: string }) => item.label === 'Document Name')?.value;

      if (fileName) {
        saveAs(blob, fileName);
      } else {
        toastr.errorMessage('File name not found in metadata.');
        return;
      }
    } else {
      toastr.errorMessage('Invalid response from the server.');
      return;
    }
  } catch (error) {
    toastr.errorMessage('An error occurred while downloading the document.');
    return;
  }
}

export function redirectSubmitProject(toastr: NGXToastrService, router: Router) {
  toastr.successMessage("Success");
  router.navigate([NavigationConstant.CS_SELF_CUSTOM_PROJECT])
  return;
}


export async function submitIntegrityCheckingNonGeneral(
  api: string,
  dicts: Record<string, any>,
  http: HttpClient,
  toastr: NGXToastrService,
  DialogRef: MatDialogRef<any>,
) {

  const codes: string[] = dicts.listChecked.map(item => item.ModuleCode);

  const reqObj = {
    codes : codes
  };

  const url = environment.FoundationR3Url + api;

  try {
    const response = await http
      .post(url, reqObj, AdInsConstant.SpinnerOptions)
      .toPromise();
    toastr.successMessage(response['Message']);
  } catch (error) {
    console.error('Error occurred:', error);
    // toastr.errorMessage('An error occurred while saving data.');
  } finally {
    const eventData = {};
    DialogRef.close(eventData)
  }
}

export async function exportToExcel( 
  api: string,
  dicts: Record<string, any>,
  http: HttpClient,
  toastr: NGXToastrService,
  excelService: ExcelService) {

  const reqObj = {
    Id : dicts.TrxId,
    Code : dicts.PageType
  };

  const url = environment.FoundationR3Url + api;

  try {
    const response = await http
      .post(url, reqObj, AdInsConstant.SpinnerOptions)
      .toPromise();
    // toastr.successMessage(response['Message']);

    const data1 = response['ReturnObject'];
  
    const timestamp = Date.now().toString();
  
    excelService.createExcelWithSheets([data1], 'RESULT_VALIDATION' + '_' + timestamp);
  } catch (error) {
    console.error('Error occurred:', error);
    // toastr.errorMessage('An error occurred while saving data.');
  }

  
}

