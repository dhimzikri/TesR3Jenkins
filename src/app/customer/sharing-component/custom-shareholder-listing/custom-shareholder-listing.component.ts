import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { GenericListObj } from 'app/shared/model/generic/generic-list-obj.model';
import { InputGridObj } from 'app/shared/model/input-grid-obj.model';
import { ShareholderListingObj } from 'app/shared/model/new-cust/shareholder/shareholder-listing-obj.model';


@Component({
  selector: 'app-custom-shareholder-listing',
  templateUrl: './custom-shareholder-listing.component.html'
})
export class CustomShareholderListingComponent implements OnInit {

  @Output()
  next: EventEmitter<any> = new EventEmitter<any>();

  IdCust: number = 0;
  CustNo: string;

  @Input() CustId: number = 0;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  PageType: string = CommonConstant.CustPageTypePaging;

  readonly CustPageTypeHeader = CommonConstant.CustPageTypeHeader;
  readonly CustPageTypePaging = CommonConstant.CustPageTypePaging;

  readonly CustDataModeShareholder: string = CommonConstant.CustMainDataModeMgmntShrholder;

  selectedCustId: number = 0;
  selectedCustCompanyMgmntShrholderId: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, 
    private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["IdCust"] != null) {
        this.IdCust = queryParams["IdCust"];
      }
    });
   }

  ngOnInit(): void {
    this.IsAddSpouse = false;
    this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: this.IdCust }).subscribe(
      (response: CustObj) => {
        this.CustNo = response.CustNo;
      }
    );

    this.BindGridViewObj();
    this.GetListPaging();
  }

  tempShareholderListingObj: Array<ShareholderListingObj> = new Array();
  tempTotalSharePrct: number = 0;
  tempIsOwner: boolean = false;
  tempIsSigner: boolean = false;
  listCustNoToExclude: Array<string> = new Array();
  GetListPaging() {
    this.http.post(this.UrlConstantNew.GetListManagementShareholderForListPagingByCustIdV2, { Id: this.CustId }).subscribe(
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

  IsAddSpouse: boolean = false;
  SelectedCustSpouseId: number = 0;
  addCustShareHolder(isAdd: boolean = true, isAddSpouse: boolean = false) {
    this.PageType = this.CustPageTypeHeader;
    if(isAddSpouse) this.IsAddSpouse = true;
    else this.IsAddSpouse = false;
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
    if(ev.Key == "addspouse")
    {
      this.IsAddSpouse = true;
      this.SelectedCustSpouseId = ev.RowObj.ShareholderId;
      this.addCustShareHolder(true, true);
    }else{
      this.addCustShareHolder(false, false);
    }
  }

  ReloadPaging() {
    this.GetListPaging();
    this.PageType = this.CustPageTypePaging;
  }

  SaveAndSync()
  {
    this.http.post(this.UrlConstantNew.SendCustomerDataToRabbitMq, { CustNo: this.CustNo }, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        if (response["StatusCode"] == 200) {
          this.toastr.successMessage("Sync Customer Succses");
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.SELF_CUSTOM_CUST_PAGING], {});
        }
      }
    )
  }

  SaveAndContinue(ev: any)
  {
    const actions = [
      {
        'result': {
          'type': 'function',
          'target': 'self',
          'alias': '',
          'methodName': 'NextStep',
          'params': []
        },
        'conditions': []
      }
    ];

    this.next.emit({Actions: actions});
  }

}
