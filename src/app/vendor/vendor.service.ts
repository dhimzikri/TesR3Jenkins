import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from "app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model";
import { GenericByIdObj } from "app/shared/model/generic/generic-by-id-obj.model";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";

@Injectable({
    providedIn: 'root'
})
export class VendorService {
    constructor(private http: HttpClient, private UrlConstantNew: UrlConstantNew) { }

    GetListVendorBankAccByVendorId(Obj: any): Observable<Object> {
        return this.http.post(this.UrlConstantNew.GetListVendorBankAccByVendorId, Obj);
    }

    AddVendorBankAcc(Obj: any): Observable<Object> {
        return this.http.post(this.UrlConstantNew.AddVendorBankAcc, Obj, AdInsConstant.SpinnerOptions);
    }

    EditVendorBankAcc(Obj: any): Observable<Object> {
        return this.http.post(this.UrlConstantNew.EditVendorBankAcc, Obj, AdInsConstant.SpinnerOptions);
    }

    GetVendorBankAccByVendorBankAccId(Obj: any): Observable<Object> {
        return this.http.post(this.UrlConstantNew.GetVendorBankAccByVendorBankAccId, Obj);
    }

    DeleteVendorBankAcc(Obj: any): Observable<Object> {
        return this.http.post(this.UrlConstantNew.DeleteVendorBankAcc, Obj, AdInsConstant.SpinnerOptions);
    }

    GetRefMasterListKeyValuePair(Obj: any): Observable<Object> {
        return this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, Obj);
    }

    GetListActiveRefMasterWithMappingCodeAll(Obj: ReqRefMasterByTypeCodeAndMappingCodeObj): Observable<Object> {
        return this.http.post(this.UrlConstantNew.GetListActiveRefMasterWithMappingCodeAll, Obj);
    }

    GetVendorAndVendorAddrByVendorId(Obj: GenericByIdObj): Observable<Object> {
        return this.http.post(this.UrlConstantNew.GetVendorAndVendorAddr, Obj);
    }

    EditVendorHolding(Obj: any): Observable<Object> {
        return this.http.post(this.UrlConstantNew.EditVendorHolding, Obj, AdInsConstant.SpinnerOptions);
    }

    AddVendorHolding(Obj: any): Observable<Object> {
        return this.http.post(this.UrlConstantNew.AddVendorHolding, Obj, AdInsConstant.SpinnerOptions);
    }

    EditVendorATPM(Obj: any): Observable<Object> {
        return this.http.post(this.UrlConstantNew.EditVendorATPM, Obj, AdInsConstant.SpinnerOptions);
    }

    AddVendorATPM(Obj: any): Observable<Object> {
        return this.http.post(this.UrlConstantNew.AddVendorATPM, Obj, AdInsConstant.SpinnerOptions);
    }

    GetListVendorBankAccByVendorEmpId(Obj: any): Observable<Object> {
        return this.http.post(this.UrlConstantNew.GetListVendorBankAccByVendorEmpId, Obj);
    }

    GetAuctionCompanyByVendorIdForEdit(Obj: any): Observable<Object> {
        return this.http.post(this.UrlConstantNew.GetVendorByIdForEdit, Obj);
    }

    EditAuctionCompany(Obj: any): Observable<Object> {
        return this.http.post(this.UrlConstantNew.EditAuctionCompany, Obj, AdInsConstant.SpinnerOptions);
    }
}