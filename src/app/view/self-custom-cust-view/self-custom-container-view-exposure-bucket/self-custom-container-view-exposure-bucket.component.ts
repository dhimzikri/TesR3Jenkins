import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CustExpsrBucketObj } from 'app/shared/model/credit-review/cust-expsr-bucket-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CustExpsrInfoObj } from 'app/shared/model/credit-review/cust-expsr-info-obj.model';
import { CrdExpsrAppAgrHistObj } from 'app/shared/model/credit-review/crd-expsr-app-agr-hist-obj.model';

@Component({
  selector: 'app-self-custom-container-view-exposure-bucket',
  templateUrl: './self-custom-container-view-exposure-bucket.component.html'
})
export class SelfCustomContainerViewExposureBucketComponent implements OnInit {

  @Input() CustId: number;
  @Input() ExposureType: string = CommonConstant.ExposureCustTypeCode;

  CustExpsrInfo: any;
  isReady: boolean = false;

  SummaryData: {
    CustomerExposureAmt: number,
    FamilyExposureAmt: number,
    GuarantorExposureAmt: number,
    ShareholderExposureAmt: number,
    ObligorExposureAmt: number,
  };

  //#region Role Type
  readonly RoleCust: string = CommonConstant.RoleCustData;
  readonly RoleFam: string = CommonConstant.RoleFamilyData;
  readonly RoleGuarantor: string = CommonConstant.RoleGuarantorData;
  readonly RoleShareholder: string = CommonConstant.RoleShareholder;
  //#endregion

  constructor(private http: HttpClient, 
    private UrlConstantNew: UrlConstantNew) { }

  async ngOnInit() {
    await this.GetCustExpsrInfoByCustId();
    await this.GetListCustExpsrBucketByCustExpsrDId();
    await this.initSummaryData();

    if (this.ExposureType == CommonConstant.ExposureObligorTypeCode)
    {
      await this.GetListCustExpsrAppAgrHistByCustExpsrHId()
    }
  }

  async GetCustExpsrInfoByCustId() {
    await this.http.post<CustExpsrInfoObj>(this.UrlConstantNew.GetCustExpsrInfoByCustIdAndExposureTypeForTemplate, { Id: this.CustId, Code: this.ExposureType }).toPromise().then(
      (response) => {
        this.CustExpsrInfo = response;
      }
    );
  }

  ListCustExpsrBucketObj: Array<CustExpsrBucketObj> = new Array<CustExpsrBucketObj>();
  async GetListCustExpsrBucketByCustExpsrDId() {
    if (this.CustExpsrInfo.CustExpsrHId == 0) return;
    await this.http.post<{ ListCustExpsrBucketObj: Array<CustExpsrBucketObj> }>(this.UrlConstantNew.GetListCustExpsrBucketByCustExpsrDId, { Id: this.CustExpsrInfo.CustExpsrDId }).toPromise().then(
      (response) => {
        this.ListCustExpsrBucketObj = response.ListCustExpsrBucketObj;
      }
    );
  }

  initSummaryData() {
    this.SummaryData = {
      CustomerExposureAmt: 0,
      FamilyExposureAmt: 0,
      GuarantorExposureAmt: 0,
      ShareholderExposureAmt: 0,
      ObligorExposureAmt: 0,
    };
  }

  async GetListCustExpsrAppAgrHistByCustExpsrHId() {
    if (this.CustExpsrInfo.CustExpsrHId == 0)
    {
      this.isReady = true;
      return;
    }
    await this.http.post<{ ListCrdExpsrAppAgrHistObj: Array<CrdExpsrAppAgrHistObj> }>(this.UrlConstantNew.GetListCustExpsrAppAgrHistByCustExpsrHId, { Id: this.CustExpsrInfo.CustExpsrHId }).toPromise().then(
      (response) => {
        console.log(response);
        for (let index = 0; index < response.ListCrdExpsrAppAgrHistObj.length; index++) {
          const element = response.ListCrdExpsrAppAgrHistObj[index];
          element.OverdueDays = element.OverdueDays == undefined ? 0 : element.OverdueDays;
          element.OverdueAmt = element.OverdueAmt == undefined ? 0 : element.OverdueAmt;
          if (element.RoleCust == this.RoleCust) {
            this.SummaryData.CustomerExposureAmt += element.OsPrincipal;
          }
          else if (element.RoleCust == this.RoleFam) {
            this.SummaryData.FamilyExposureAmt += element.OsPrincipal;
          }
          else if (element.RoleCust == this.RoleGuarantor) {
            this.SummaryData.GuarantorExposureAmt += element.OsPrincipal;
          }
          else if (element.RoleCust == this.RoleShareholder) {
            this.SummaryData.ShareholderExposureAmt += element.OsPrincipal;
          }
          this.SummaryData.ObligorExposureAmt += element.OsPrincipal;
        }

        this.isReady = true
      }
    );
  }

}
