import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { URLConstant } from "app/shared/constant/URLConstant";
import { CommonConstant } from "app/shared/constant/CommonConstant";
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";

@Injectable({
    providedIn: 'root'
})
export class RegexService {
    constructor(private http: HttpClient, private UrlConstantNew: UrlConstantNew) { }

  getErrMessage(pattern: string): string {
    let errMessage: string = "";
    switch (pattern) {
      case "^[0-9]{16}$":
        errMessage = 'must be numeric and 16 characters';
        break;
      case "^[0-9]{15}$":
        errMessage = 'must be numeric and 15 characters';
        break;
      case "^\\d{0,20}$":
        errMessage = 'must be numeric and between 20 characters';
        break;
      case "^[a-zA-Z0-9]{1,9}$":
        errMessage = 'must be alpanumeric and max 9 characters';
        break;
      case "^[0-9]{15,16}$":
        errMessage = 'must be numeric and max 16 characters';
        break;
      default:
        errMessage = 'Not yet setting';
        break;
    }
    return errMessage;
  }

    getListPattern(): Observable<Object> {
        var RefMasterPatternCode = {
          RefMasterTypeCode: CommonConstant.RefMasterTypeCodeRegularExpression,
          RowVersion: ""
        }
        return this.http.post(this.UrlConstantNew.GetListActiveRefMaster, RefMasterPatternCode);
    }
}
