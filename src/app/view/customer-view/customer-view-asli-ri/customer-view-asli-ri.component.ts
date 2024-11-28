import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CustObj } from 'app/shared/model/cust-obj.model';

@Component({
  selector: 'app-customer-view-asli-ri',
  templateUrl: './customer-view-asli-ri.component.html'
})
export class CustomerViewAsliRiComponent implements OnInit {

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) 
  {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['CustId'] != null) {
        this.CustId = queryParams['CustId'];
      }
      if (queryParams['CustNo'] != null) {
        this.CustNo = queryParams['CustNo'];
      }
    });
  }
  @Input() InputCustObj: CustObj;
  @Input() parentForm: FormGroup;
  @Input() ActiveModal: NgbActiveModal;
  @Input() MrCustTypeCode: string;

  CustId: string = null;
  CustNo: string = null;
  custObj: CustObj = new CustObj();
  code: string;
  MrCustModelName: string;
  IDType: string;
  DataAsliRi: any;
  isReady: boolean = false;
  img: any;
  url: string;

  async ngOnInit() {

    await this.GetDataCustObj()

    if(this.custObj.MrCustTypeCode == CommonConstant.CustTypePersonal)
    {
      this.code = ""
      if(this.custObj.MrIdTypeCode == CommonConstant.MrIdTypeCodeEKTP)
      {
        this.code = this.custObj.IdNo
      }
    }
    else
    {
      this.code = this.custObj.TaxIdNo
    }

    await this.http.post(this.UrlConstantNew.GetRefMasterByMasterCode, {Code : this.custObj.MrCustModelCode}).toPromise().then(
      (res: any) => {
        this.MrCustModelName = res.Descr;
    })

    if(this.custObj.MrIdTypeCode != null)
    {
      await this.http.post(this.UrlConstantNew.GetRefMasterByMasterCode, {Code : this.custObj.MrIdTypeCode}).toPromise().then(
        (res: any) => {
          this.IDType = res.Descr;
      })
    }

    await this.GetData()
    await this.convertImage()
  }

  async GetDataCustObj()
  {
    if(typeof this.InputCustObj != "undefined" && this.InputCustObj.CustId != 0){
      this.custObj = this.InputCustObj;
      return;      
    }
    if(this.CustId != null)
    {
      await this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: this.CustId }).toPromise().then(
        (response: CustObj) => {
          this.custObj = response;
        }
      );
    }
    else if (this.CustNo != null)
    {
      await this.http.post(this.UrlConstantNew.GetCustByCustNo, { CustNo: this.CustNo }).toPromise().then(
        (response: CustObj) => {
          this.custObj = response;
        }
      );
    }
    else
    {
      this.custObj.MrCustTypeCode = this.MrCustTypeCode;
      this.custObj.CustName = this.parentForm.controls.CustName.value;
      this.custObj.MrCustModelCode = this.parentForm.controls.MrCustModelCode.value;
      this.custObj.TaxIdNo = this.parentForm.controls.TaxIdNo.value;
      if(this.MrCustTypeCode == CommonConstant.CustTypePersonal)
      {
        this.custObj.MrIdTypeCode = this.parentForm.controls.MrIdTypeCode.value;
        this.custObj.IdNo = this.parentForm.controls.IdNo.value;
      }
      else
      {
        this.custObj.MrIdTypeCode = CommonConstant.MrIdTypeCodeNPWP;
        this.custObj.IdNo = this.parentForm.controls.TaxIdNo.value;
      }
    }
  }

  async GetData()
  {
    await this.http.post(this.UrlConstantNew.GetTrxSrcDataForAsliRi, {Code: this.code}).toPromise().then(
      (res: any) => {
        this.DataAsliRi = res;
        this.isReady = true;
      })
  }

  async convertImage()
  {
    if (!this.DataAsliRi || !this.DataAsliRi.ReqAsliRiObj || !this.DataAsliRi.ReqAsliRiObj.SelfiePhoto) return;
    this.url = "data:image/jpg|jpeg|png|bmp;base64"
    this.img = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.url}, ${this.DataAsliRi.ReqAsliRiObj.SelfiePhoto}`);
  }
}