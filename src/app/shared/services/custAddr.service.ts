import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonConstant } from "../constant/CommonConstant";
import { UrlConstantNew } from "../constant/URLConstantNew";
import { GeneralSettingObj } from "../model/general-setting-obj.model";

@Injectable()
export class AddressService{

    constructor(private http: HttpClient, private UrlConstantNew: UrlConstantNew) { }

    public async IsAddrOwnershipMandatory(MrCustAddrTypeCode: string): Promise<boolean>{
        let GsValues : Array<string> = new Array();

        await this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeOwnershipMandatoryAddrType }).toPromise().then(
            (response: GeneralSettingObj) => {
                GsValues = response.GsValue.split(','); 
            }
        );

        if(GsValues.find(addrType => addrType == MrCustAddrTypeCode)){
            return true;
        }
        else{
            return false;
        }
    }

    public async GetListAddrTypeOwnershipMandatory(): Promise<Array<string>>{
        let GsValues : Array<string> = new Array();

        await this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeOwnershipMandatoryAddrType }).toPromise().then(
            (response: GeneralSettingObj) => {
                GsValues = response.GsValue.split(','); 
            }
        );

        return GsValues;
    }

}