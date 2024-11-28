import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CustExpsrHObj } from 'app/shared/model/credit-review/cust-expsr-h-obj.model';
import { CustExpsrInfoObj } from 'app/shared/model/credit-review/cust-expsr-info-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cust-exposure-view',
  templateUrl: './cust-exposure-view.component.html',
})
export class CustExposureViewComponent implements OnInit {
  CustId: number = 0;
  IsReady: boolean = false;
  CustNoObj: GenericObj = new GenericObj();
  readonly whiteIndicator: string = CommonConstant.WhiteIndicator;

  //#region Exposure Type
  readonly ExposureCustTypeCode: string = CommonConstant.ExposureCustTypeCode;
  readonly ExposureCustGroupTypeCode: string = CommonConstant.ExposureCustGroupTypeCode;
  readonly ExposureObligorTypeCode: string = CommonConstant.ExposureObligorTypeCode;
  //#endregion

  readonly CaptureStatReq: string = CommonConstant.CaptureStatReq;
  readonly CaptureStatScs: string = CommonConstant.CaptureStatScs;
  readonly CaptureStatFail: string = CommonConstant.CaptureStatFail;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService, 
    private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService,
    private adInsHelperService: AdInsHelperService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["CustId"] != null) {
        this.CustId = queryParams["CustId"];
      }
    });
  }

  async ngOnInit() {
    await this.GetCustExpsrInfoByCustId();
    this.IsReady = true;
  }

  //#region Get Data  
  CustExpsrHObj: CustExpsrHObj = new CustExpsrHObj();
  CustExpsrInfoObj: CustExpsrInfoObj = new CustExpsrInfoObj();
  async GetCustExpsrInfoByCustId() {
    await this.http.post<CustExpsrInfoObj>(this.UrlConstantNew.GetCustExpsrInfoByCustId, { Id: this.CustId }).toPromise().then(
      (response) => {
        this.CustExpsrInfoObj = response;
        this.CustExpsrHObj = response.CustExpsrHObj;
      }
    );
  }
  //#endregion

  async ReqExposure() {
    if (this.CustExpsrInfoObj.CaptureStat == this.CaptureStatReq) {
      return this.toastr.warning(ExceptionConstant.CUST_EXPR_REQ);
    }

    await this.http.post(this.UrlConstantNew.RequestExposureV2, { CustId: this.CustId }).toPromise().then(
      (response) => { }
    );
  }

  openCustView(custNo: string) {
    this.CustNoObj.CustNo = custNo;
    this.http.post(this.UrlConstantNew.GetCustByCustNo, {TrxNo : custNo}).subscribe(
      (response) => {
        this.adInsHelperService.OpenCustomerViewByCustId(response["CustId"]);
      }
    );
  }
}