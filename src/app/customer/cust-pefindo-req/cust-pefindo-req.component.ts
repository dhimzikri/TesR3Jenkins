import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { PefindoReqComponent } from '../sharing-component/new-cust-component/component/third-party-form/pefindo/request/pefindo-req.component';
import { ThirdPartyUploadService } from '../sharing-component/new-cust-component/component/third-party-form/services/ThirdPartyUpload.Service';
import { ReqPefindoSmartSearchV2Obj } from 'app/shared/model/digitalization/req-pefindo-smart-search-v2-obj.model';
import { ReqCustDocFileObj } from 'app/shared/model/cust-doc-file/req-cust-doc-file-obj.model';
import { CustDocFileFormObj } from 'app/shared/model/cust-doc-file/cust-doc-file-form-obj.model';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-cust-pefindo-req',
  templateUrl: './cust-pefindo-req.component.html'
})
export class CustPefindoReqComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  CustDocFileFormObjs: Array<CustDocFileFormObj> = new Array<CustDocFileFormObj>();

  constructor(
    private http: HttpClient, private toastr: NGXToastrService, private modalService: NgbModal, 
    private thirdPartyUploadService: ThirdPartyUploadService, private UrlConstantNew: UrlConstantNew,
    private adInsHelperService: AdInsHelperService) { }

  async ngOnInit() {
    
    this.inputPagingObj._url = "./assets/ucpaging/searchCustPefindoReq.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCustPefindoReq.json";
    await this.checkIsPefindoMulti();
  }

  async getEvent(event: any){
    if (event.Key == "view_pefindo") {
      await this.ViewPefindo(event.RowObj)
    }
    else if (event.Key == "request") {
      await this.ReqPefindo(event.RowObj)
    }
  }

  async ViewPefindo(event: any) {
    await this.checkIsPefindoMulti();
    if (this.pefindoMultiResMax > 0)
    {
      let TrxNo = event.ThirdPartyRsltHGroupNo;

      if (event.CustId > 0)
      {
        await this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: event.CustId }).toPromise().then(
          (response) => {
            TrxNo = response["ThirdPartyGroupTrxNo"];
          });
      }

      if (TrxNo == null || TrxNo == "")
      {
        this.toastr.warningMessage("Please request Pefindo first!");
        return;
      }

      this.adInsHelperService.OpenPefindoMultiResultView(TrxNo, event.MrCustTypeCode);
    }
    else
    {
      let TrxNo = event.ThirdPartyTrxNo;
      if (TrxNo == null || TrxNo == "")
      {
        this.toastr.warningMessage("Please request Pefindo first!");
        return;
      }
      this.adInsHelperService.OpenPefindoView(TrxNo, event.MrCustTypeCode);
    }
  }

  pefindoMultiResMax: number = 0;
  async checkIsPefindoMulti()
  {
    await this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, { Code: CommonConstant.GsPefindoMultiResultMax }).toPromise().then(
      (response) => {
        this.pefindoMultiResMax = parseInt(response["GsValue"]);
      });
  }

  inqPefindoCustReq: string = "";
  RowVersion: string = "";
  thirdPartyGroupTrxNo: string = null;
  thirdPartyTrxNo: string = null;
  custObj: CustObj = new CustObj();
  async ReqPefindo(event: any) {
    if (!this.thirdPartyUploadService.ValidateFileUpload(this.CustDocFileFormObjs)) {
      return;
    }

    await this.checkIsPefindoMulti();

    let reqPefindoSmartSearchObj = new ReqPefindoSmartSearchV2Obj();

    reqPefindoSmartSearchObj.CustName = event.CustName;
    reqPefindoSmartSearchObj.CustType = event.MrCustTypeCode;
    reqPefindoSmartSearchObj.BirthDt = event.BirthDt;

    await this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, { Code: CommonConstant.GsInqPefindoCustReq }).toPromise().then(
      (result) => {
        this.inqPefindoCustReq = result["GsValue"];
      }
    );
    reqPefindoSmartSearchObj.MrPefindoInquiryReasonCode = this.inqPefindoCustReq;

    if (event.MrCustTypeCode == CommonConstant.MR_CUST_TYPE_CODE_PERSONAL) {
      reqPefindoSmartSearchObj.IdType = event.MrIdTypeCode;
      reqPefindoSmartSearchObj.IdNo = event.IdNo;
    } else {
      reqPefindoSmartSearchObj.IdType = CommonConstant.MrIdTypeCodeNPWP;
      reqPefindoSmartSearchObj.IdNo = event.TaxIdNo;
    }

    await this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: event.CustId }).toPromise().then(
      (response) => {
        this.RowVersion = response["RowVersion"];
    })

    if(event.CustId > 0) {
      var custDocFileObjs: ReqCustDocFileObj = new ReqCustDocFileObj();
      custDocFileObjs.CustId = event.CustId;
      custDocFileObjs.CustDocFileObjs = await this.thirdPartyUploadService.ConvertToCustDocFileObj(this.CustDocFileFormObjs);
      this.http.post(this.UrlConstantNew.SaveCustDocFile, custDocFileObjs).subscribe(
        (response) => {
          const modalRef = this.modalService.open(PefindoReqComponent);
          modalRef.componentInstance.ReqPefindoSmartSearchObj = reqPefindoSmartSearchObj;
          modalRef.componentInstance.ThirdPartyTrxNo = event.ThirdPartyTrxNo;
          modalRef.componentInstance.CustId = event.CustId;
          modalRef.componentInstance.RowVersion = this.RowVersion;
          modalRef.componentInstance.IsCustPefindoReq = true;

          if (this.pefindoMultiResMax > 0)
          {
            modalRef.result.then((res) => {
              this.thirdPartyGroupTrxNo = res["ThirdPartyRsltHGroupNo"];
              this.custObj.ThirdPartyGroupTrxNo = res["ThirdPartyRsltHGroupNo"];
              this.custObj.RowVersion = res["RowVersion"];
            })
          }
          else
          {
            modalRef.result.then((res) => {
              this.thirdPartyTrxNo = res["Code"];
              this.custObj.ThirdPartyTrxNo = res["Code"];
              this.custObj.RowVersion = res["RowVersion"];
            })
          }
        }
      );
    }
    else {
      const modalRef = this.modalService.open(PefindoReqComponent);
      modalRef.componentInstance.ReqPefindoSmartSearchObj = reqPefindoSmartSearchObj;
      modalRef.componentInstance.ThirdPartyTrxNo = event.ThirdPartyTrxNo;
      if (this.pefindoMultiResMax > 0)
      {
        modalRef.result.then((res) => {
          this.thirdPartyGroupTrxNo = res["ThirdPartyRsltHGroupNo"];
          this.custObj.ThirdPartyGroupTrxNo = res["ThirdPartyRsltHGroupNo"];
        })
      }
      else
      {
        modalRef.result.then((res) => {
          this.thirdPartyTrxNo = res["Code"];
          this.custObj.ThirdPartyTrxNo = res["Code"];
        })
      }
    }
  }
}