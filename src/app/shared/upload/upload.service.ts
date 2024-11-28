import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { GenericObj } from "../model/generic/generic-obj.model";
import { UrlConstantNew } from "../constant/URLConstantNew";

// GetListUploadTypeKeyValue

// GetUploadTypePaging
// UploadFile

export interface IAuthStatus {
}

@Injectable({
    providedIn: 'root'
})

export class UploadService {
    GetUploadTypeByUploadTypeId: any;
    GetUploadSettingHIdByUploadTypeId: any;
    GetListUploadSettingDIdByUploadSettingHId: any;
    GetListUploadSettingDIdByUploadTypeId: any;
    AssignRoleToUploadSetting: any;
    GetListRefRoleByUploadTypeId: any;
    GetListUploadSettingDByUploadSettingHId: any;
    ReqGenericObj: GenericObj = new GenericObj();

    constructor(private http: HttpClient, private UrlConstantNew: UrlConstantNew) {
        this.GetUploadTypeByUploadTypeId = this.UrlConstantNew.GetUploadTypeByUploadTypeId;
        this.GetUploadSettingHIdByUploadTypeId = this.UrlConstantNew.GetUploadSettingHIdByUploadTypeId;
        this.GetListUploadSettingDIdByUploadSettingHId = this.UrlConstantNew.GetListUploadSettingDIdByUploadSettingHId;
        this.GetListUploadSettingDIdByUploadTypeId = this.UrlConstantNew.GetListUploadSettingDIdByUploadTypeId;
        this.AssignRoleToUploadSetting = this.UrlConstantNew.AssignRoleToUploadSetting;
        this.GetListRefRoleByUploadTypeId = this.UrlConstantNew.GetListRefRoleByUploadTypeId
        this.GetListUploadSettingDByUploadSettingHId = this.UrlConstantNew.env.FoundationR3Url + this.UrlConstantNew.GetListUploadSettingDByUploadSettingHId;
    }

    getUploadTypeByUploadTypeId(uploadSettingObject: any): Observable<Object> {
        return this.http.post(this.GetUploadTypeByUploadTypeId, uploadSettingObject);
    }

    getUploadSettingHIdByUploadTypeId(uploadSettingObject: any): Observable<Object> {
        return this.http.post(this.GetUploadSettingHIdByUploadTypeId, uploadSettingObject);
    }

    getListUploadSettingDIdByUploadSettingHId(uploadSettingObject: any): Observable<Object> {
        return this.http.post(this.GetListUploadSettingDIdByUploadSettingHId, uploadSettingObject);
    }

    getListUploadSettingDIdByUploadTypeId(uploadSettingObject: any): Observable<Object> {
        return this.http.post(this.GetListUploadSettingDIdByUploadTypeId, uploadSettingObject);
    }

    assignRoleToUploadSetting(uploadSettingObject: any): Observable<Object> {
        return this.http.post(this.AssignRoleToUploadSetting, uploadSettingObject);
    }

    getListRefRoleByUploadTypeId(uploadSettingObject: any): Observable<Object> {
        return this.http.post(this.GetListRefRoleByUploadTypeId, uploadSettingObject);
    }

    getListUploadSettingDByUploadSettingHId(uploadSettingObject: any): Observable<Object> {
      this.ReqGenericObj.Id = uploadSettingObject.UploadSettingHId;
      return this.http.post(this.GetListUploadSettingDByUploadSettingHId, this.ReqGenericObj);
  }
}
