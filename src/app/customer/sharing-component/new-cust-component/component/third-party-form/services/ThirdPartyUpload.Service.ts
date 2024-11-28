import { Injectable } from "@angular/core";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { CommonConstant } from "app/shared/constant/CommonConstant";
import { ExceptionConstant } from "app/shared/constant/ExceptionConstant";
import { CustDocFileFormObj } from "app/shared/model/cust-doc-file/cust-doc-file-form-obj.model";
import { CustDocFileObj } from "app/shared/model/cust-doc-file/cust-doc-file-obj.model";
import { Observable } from "rxjs";
import { String } from 'typescript-string-operations';

@Injectable()
export class ThirdPartyUploadService {
  constructor(private toastr: NGXToastrService) {
  }

  readonly FileExtAllowed: Array<string> = [CommonConstant.FileExtensionPdf, CommonConstant.FileExtensionJpg, CommonConstant.FileExtensionJpeg, CommonConstant.FileExtensionGif, CommonConstant.FileExtensionPng]
  readonly FileExtAllowedAsliRI: Array<string> = [CommonConstant.FileExtensionJpg, CommonConstant.FileExtensionJpeg, CommonConstant.FileExtensionPng, CommonConstant.FileExtensionBmp]


  ValidateFileUpload(CustDocFileFormObjs: Array<CustDocFileFormObj>): Boolean {
    var isValid = true;
    var listRequiredDoc = new Array<string>();
    var listInvalidFormatDoc = new Array<string>();
    var ExtStr = String.Join(", ", this.FileExtAllowed);

    for(let i = 0; i < CustDocFileFormObjs.length; i++){
      if(CustDocFileFormObjs[i].IsRequired && CustDocFileFormObjs[i].File == null){
        listRequiredDoc.push(CustDocFileFormObjs[i].DocTypeName);
        isValid = false;
      }

      if(CustDocFileFormObjs[i].File != null){
        var lastDotIndex = CustDocFileFormObjs[i].File.name.lastIndexOf('.');
        var ext = "." + CustDocFileFormObjs[i].File.name.substring(lastDotIndex + 1);
  
        var extValid = this.FileExtAllowed.find(x => x.toUpperCase() == ext.toUpperCase());
        if(extValid == undefined){
          listInvalidFormatDoc.push(CustDocFileFormObjs[i].DocTypeName);
          isValid = false;
        }
      }   
    }

    if(listRequiredDoc.length > 0){
      var requiredDocStr = String.Join(", ", listRequiredDoc);
      this.toastr.warningMessage(String.Format(ExceptionConstant.DOCUMENT_REQUIRED, requiredDocStr));
    }

    if(listInvalidFormatDoc.length > 0){
      var invalidFormatDocStr = String.Join(", ", listInvalidFormatDoc);
      this.toastr.warningMessage(String.Format(ExceptionConstant.INVALID_FILE_FORMAT_FOR_DOC, invalidFormatDocStr, ExtStr));
    }

    return isValid;
  }

  ValidateFileUploadAsliRI(CustDocFileFormObjs: Array<CustDocFileFormObj>): Boolean {
    var isValid = true;
    var listInvalidFormatDoc = new Array<string>();
    var ExtStrAsliRI = String.Join(", ", this.FileExtAllowedAsliRI);

    for(let i = 0; i < CustDocFileFormObjs.length; i++){
      if(CustDocFileFormObjs[i].File != null && CustDocFileFormObjs[i].DocTypeName == CommonConstant.ASLI_RI_SELFIE){
        var lastDotIndex = CustDocFileFormObjs[i].File.name.lastIndexOf('.');
        var ext = "." + CustDocFileFormObjs[i].File.name.substring(lastDotIndex + 1);
  
        var extValid = this.FileExtAllowedAsliRI.find(x => x.toUpperCase() == ext.toUpperCase());
        if(extValid == undefined){
          listInvalidFormatDoc.push(CustDocFileFormObjs[i].DocTypeName);
          isValid = false;
        }
      }
    }

    if(listInvalidFormatDoc.length > 0){
      var invalidFormatDocStr = String.Join(", ", listInvalidFormatDoc);
      this.toastr.warningMessage(String.Format(ExceptionConstant.INVALID_FILE_FORMAT_FOR_DOC, invalidFormatDocStr, ExtStrAsliRI));
    }

    return isValid;
  }

  async ConvertToCustDocFileObj(CustDocFileFormObjs: Array<CustDocFileFormObj>){
    var custDocFileObjs = new Array<CustDocFileObj>();
    for(let i = 0; i < CustDocFileFormObjs.length; i++){
      if(CustDocFileFormObjs[i].File != null){
        var custDocFileObj = new CustDocFileObj();
        custDocFileObj.MrCustDocTypeCode = CustDocFileFormObjs[i].MrCustDocTypeCode;
        custDocFileObj.FileName = CustDocFileFormObjs[i].File.name;
        custDocFileObj.ByteBase64 = await this.readFileAsDataURL(CustDocFileFormObjs[i].File);
        custDocFileObj.ByteBase64 = custDocFileObj.ByteBase64.substring(custDocFileObj.ByteBase64.lastIndexOf(',') + 1)
  
        custDocFileObjs.push(custDocFileObj);
      }
    }
    return custDocFileObjs;
  }

  async readFileAsDataURL(file) {
    let result_base64 = await new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = (e) => resolve(reader.result);
        reader.readAsDataURL(file);
    });
    return result_base64;
  } 
  
}