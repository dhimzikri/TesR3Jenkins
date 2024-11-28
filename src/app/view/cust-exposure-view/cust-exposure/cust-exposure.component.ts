import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CrdExpsrAppAgrHistObj } from 'app/shared/model/credit-review/crd-expsr-app-agr-hist-obj.model';
import { CustExpsrBucketObj } from 'app/shared/model/credit-review/cust-expsr-bucket-obj.model';
import { CustExpsrDObj } from 'app/shared/model/credit-review/cust-expsr-d-obj.model';
import { CustExpsrHObj } from 'app/shared/model/credit-review/cust-expsr-h-obj.model';

@Component({
  selector: 'app-cust-exposure',
  templateUrl: './cust-exposure.component.html'
})
export class CustExposureComponent implements OnInit {

  @Input() exposureHObj: CustExpsrHObj = new CustExpsrHObj();
  @Input() exposureType: string = CommonConstant.ExposureCustTypeCode;

  //#region Role Type
  readonly RoleCust: string = CommonConstant.RoleCustData;
  readonly RoleCustGrp: string = CommonConstant.RoleCustGrpData;
  readonly RoleFam: string = CommonConstant.RoleFamilyData;
  readonly RoleGuarantor: string = CommonConstant.RoleGuarantorData;
  readonly RoleShareholder: string = CommonConstant.RoleShareholder;
  //#endregion

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient, 
    private UrlConstantNew: UrlConstantNew
    // private fb: FormBuilder
  ) { }

  ExposureDObj: CustExpsrDObj = new CustExpsrDObj();
  IsReady: boolean = false;
  IsCustGrpExposureView: boolean = false;
  async ngOnInit() {
    this.IsCustGrpExposureView = this.exposureType == CommonConstant.ExposureCustGroupTypeCode;
    this.SetExposureDObj();
    await this.GetListCustExpsrBucketByCustExpsrDId();
    await this.GetListCustExpsrAppAgrHistByCustExpsrHId();
    this.IsReady = true;
  }

  SetExposureDObj() {
    if (this.exposureHObj == null) return;
    if (this.exposureHObj.ListCustExpsrDObj.length > 0) {
      let tempObj: CustExpsrDObj = this.exposureHObj.ListCustExpsrDObj.find(x => x.ExposureType == this.exposureType);
      if (tempObj != null) {
        this.ExposureDObj = tempObj;
      }
    }
  }

  ListCustExpsrBucketObj: Array<CustExpsrBucketObj> = new Array<CustExpsrBucketObj>();
  async GetListCustExpsrBucketByCustExpsrDId() {
    if (this.exposureHObj == null) return;
    await this.http.post<{ ListCustExpsrBucketObj: Array<CustExpsrBucketObj> }>(this.UrlConstantNew.GetListCustExpsrBucketByCustExpsrDId, { Id: this.ExposureDObj.CustExpsrDId }).toPromise().then(
      (response) => {
        this.ListCustExpsrBucketObj = response.ListCustExpsrBucketObj;
      }
    );
  }

  ListCrdExpsrAppAgrHistCustObj: Array<CrdExpsrAppAgrHistObj> = new Array<CrdExpsrAppAgrHistObj>();
  ListCrdExpsrAppAgrHistCustGrpObj: Array<CrdExpsrAppAgrHistObj> = new Array<CrdExpsrAppAgrHistObj>();
  async GetListCustExpsrAppAgrHistByCustExpsrHId() {
    if (this.exposureHObj == null) return;
    await this.http.post<{ ListCrdExpsrAppAgrHistObj: Array<CrdExpsrAppAgrHistObj> }>(this.UrlConstantNew.GetListCustExpsrAppAgrHistByCustExpsrHId, { Id: this.exposureHObj.CustExpsrHId }).toPromise().then(
      (response) => {
        for (let index = 0; index < response.ListCrdExpsrAppAgrHistObj.length; index++) {
          const element = response.ListCrdExpsrAppAgrHistObj[index];
          element.OverdueDays = element.OverdueDays == undefined ? 0 : element.OverdueDays;
          element.OverdueAmt = element.OverdueAmt == undefined ? 0 : element.OverdueAmt;
          if (element.RoleCust == this.RoleCust) 
          {
            this.ListCrdExpsrAppAgrHistCustObj.push(element);
          }
          else if (this.IsCustGrpExposureView && element.RoleCust == this.RoleCustGrp)
          {
            this.ListCrdExpsrAppAgrHistCustGrpObj.push(element);
          }
        }
      }
    );
  }

}
