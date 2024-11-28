import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AdInsConstant } from "app/shared/AdInstConstant";

@Injectable({
    providedIn: 'root'
})
export class VerificationService {
    constructor(private http: HttpClient) { }

    // GetListVendorBankAccIdByVendorId(Obj: any): Observable<Object> {
    //     return this.http.post(AdInsConstant.GetListVendorBankAccByVendorId, Obj);
    // }

    // AddVendorBankAcc(Obj: any): Observable<Object> {
    //     return this.http.post(AdInsConstant.AddVendorBankAcc, Obj);
    // }

    // EditVendorBankAcc(Obj: any): Observable<Object> {
    //     return this.http.post(AdInsConstant.EditVendorBankAcc, Obj);
    // }

    // GetVendorBankAccByVendorBankAccId(Obj: any): Observable<Object> {
    //     return this.http.post(AdInsConstant.GetVendorBankAccByVendorBankAccId, Obj);
    // }
}