import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericListObj } from 'app/shared/model/generic/generic-list-obj.model';
import { InputGridObj } from 'app/shared/model/input-grid-obj.model';
import { ShareholderListingObj } from 'app/shared/model/new-cust/shareholder/shareholder-listing-obj.model';

@Component({
  selector: 'app-shareholder-listing-x',
  templateUrl: './shareholder-listing-x.component.html'
})
export class ShareholderListingXComponent implements OnInit {

  @Input() CustId: number = 0;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  PageType: string = CommonConstant.CustPageTypePaging;

  readonly CustPageTypeHeader = CommonConstant.CustPageTypeHeader;
  readonly CustPageTypePaging = CommonConstant.CustPageTypePaging;

  readonly CustDataModeShareholder: string = CommonConstant.CustMainDataModeMgmntShrholder;

  constructor(private http: HttpClient, private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew) { }

  selectedCustId: number = 0;
  selectedCustCompanyMgmntShrholderId: number = 0;
  ngOnInit() {
    this.BindGridViewObj();
    this.GetListPaging();
  }

  tempShareholderListingObj: Array<ShareholderListingObj> = new Array();
  tempTotalSharePrct: number = 0;
  tempIsOwner: boolean = false;
  tempIsSigner: boolean = false;
  listCustNoToExclude: Array<string> = new Array();
  GetListPaging() {
    this.http.post(this.UrlConstantNew.GetListManagementShareholderForListPagingByCustId, { Id: this.CustId }).subscribe(
      (response: GenericListObj) => {
        this.tempShareholderListingObj = response.ReturnObject;
        let tempTotalSharePrct: number = 0;
        let tempIsOwner: boolean = false;
        let tempIsSigner: boolean = false;
        this.listCustNoToExclude = new Array();
        for (let index = 0; index < this.tempShareholderListingObj.length; index++) {
          const element = this.tempShareholderListingObj[index];
          if (element.IsActive) {
            tempTotalSharePrct = Math.round((tempTotalSharePrct + element.SharePrcnt) * 1000000) / 1000000;
          }
          if (element.IsOwner) {
            tempIsOwner = true;
          }
          if (element.IsActive && element.IsSigner) {
            tempIsSigner = true;
          }
          if (element.CustNo) {
            this.listCustNoToExclude.push(element.CustNo);
          }
        }
        this.tempTotalSharePrct = tempTotalSharePrct;
        this.tempIsOwner = tempIsOwner;
        this.tempIsSigner = tempIsSigner;
        this.inputGridObj.resultData["Data"] = new Array();
        this.inputGridObj.resultData.Data = this.tempShareholderListingObj;
      }
    )
  }

  inputGridObj: InputGridObj = new InputGridObj();
  BindGridViewObj() {
    this.inputGridObj = new InputGridObj();
    this.inputGridObj.pagingJson = "./assets/ucgridview/Customer/gridCustShareholder.json";

    this.inputGridObj.resultData = { Data: [] };
  }

  addCustShareHolder(isAdd: boolean = true) {
    this.PageType = this.CustPageTypeHeader;
    if (isAdd) {
      this.CustType = CommonConstant.CustomerPersonal;
      this.selectedCustId = 0;
      this.selectedCustCompanyMgmntShrholderId = 0;
    }
  }

  CustType: string = "";
  event(ev: { Key: string, RowObj: ShareholderListingObj }) {
    this.selectedCustCompanyMgmntShrholderId = ev.RowObj.CustCompanyMgmntShrholderId;
    this.selectedCustId = ev.RowObj.ShareholderId;
    this.CustType = ev.RowObj.ShareholderType;
    this.tempTotalSharePrct = Math.round((this.tempTotalSharePrct - ev.RowObj.SharePrcnt) * 1000000) / 1000000;
    this.addCustShareHolder(false);
  }

  ReloadPaging() {
    this.GetListPaging();
    this.PageType = this.CustPageTypePaging;
  }

  next() {
    if (this.tempTotalSharePrct != 100) {
      this.toastr.warningMessage(ExceptionConstant.TOTAL_SHARE_MUST_100);
      return;
    }
    if (!this.tempIsOwner) {
      this.toastr.warningMessage(ExceptionConstant.Add_Min_1_Owner);
      return;
    }
    if (!this.tempIsSigner) {
      this.toastr.warningMessage(ExceptionConstant.Add_Min_1_Active_Signer);
      return;
    }

    this.outputTab.emit({ stepMode: 'next' });
  }

}
