import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import Stepper from 'bs-stepper';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { DMSObj } from 'app/shared/model/dms/dms-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { DMSLabelValueObj } from 'app/shared/model/dms/dms-label-value-obj.model';
import { CookieService } from 'ngx-cookie';
import { PathConstant } from 'app/shared/PathConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ResSysConfigResultObj } from 'app/shared/model/response/res-sys-config-result-obj,model';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { CustomerPersonalDetailComponent } from '../customer-personal-detail/customer-personal-detail.component';
import { CustomerEmergencyContactComponent } from '../customer-contact-person/customer-emergency-contact/customer-emergency-contact.component';
import { CustFinDataTabComponent } from 'app/customer/cust-fin-data-tab/cust-fin-data-tab.component';
import { CustomerPersonalJobDataComponent } from '../customer-personal-job-data/customer-personal-job-data.component';
import { CustAttrSectionComponent } from 'app/customer/cust-attr-section/cust-attr-section.component';
import { CustomerViewHeaderPersonalComponent } from 'app/customer/customer-view/customer-view-header-personal/customer-view-header-personal.component';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';
@Component({
  selector: 'app-customer-personal-page',
  templateUrl: './customer-personal-page.component.html',
  styleUrls: [],
 // providers: [NGXToastrService],
})
export class CustomerPersonalPageComponent implements OnInit {
  private stepper: Stepper;

  @ViewChild('viewCustPers') viewCustPers: CustomerViewHeaderPersonalComponent;
  IdCust: number;
  CustPersonalId: number;
  CustStepIndex: number = 1;
  isMarried: boolean = false;
  isJob: boolean;
  isGroup: boolean;
  isOther: boolean;
  isDetail: boolean;
  isAddress: boolean;
  isContact: boolean;
  isFinancial: boolean;
  Page: string;
  From: string;
  CustNo: string = "";
  dmsObj: DMSObj;
  SysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj()

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, 
    private cookieService: CookieService, private CustSetData: NewCustSetData, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["IdCust"] != null) {
        this.IdCust = queryParams["IdCust"];
      }
      if (queryParams["Page"] != null) {
        this.Page = queryParams["Page"];
      }
      if (queryParams["From"] != null) {
        this.From = queryParams["From"];
      }
    });
  }


  CustStep = {
    "Detail": 1,
    "Address": 2,
    "Family": 3,
    "Contact": 4,
    "Job": 5,
    "Financial": 6,
    "CustAsset": 7,
    "Upload": 8,
    "CustAttr": 9
  }

  SetUrlBack(): string {
    let urlBack: string = NavigationConstant.CUST_PAGING;
    if (this.From) urlBack = "/" + PathConstant.LR_CUST + "/" + this.From + "/" + PathConstant.PAGING;
    return urlBack;
  }

  back() {
    AdInsHelper.RedirectUrl(this.ngxRouter, [this.SetUrlBack()], {});
  }

  async ngOnInit(): Promise<void> {
    await this.http.post(this.UrlConstantNew.GetCustPersonalbyCustId, { Id: this.IdCust }).toPromise().then(
      (response: any) => {
        this.CustPersonalId = response['CustPersonalId'];
      }
    );

    //check DMS
    await this.http.post<ResSysConfigResultObj>(this.UrlConstantNew.GetSysConfigPncplResultByCode, { Code: CommonConstant.ConfigCodeIsUseDms }).toPromise().then(
      (response) => {
        this.SysConfigResultObj = response;
      });
    await this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: this.IdCust }).toPromise().then(
      (response: CustObj) => {
        this.CustNo = response.CustNo;
      }
    );

    if (this.SysConfigResultObj.ConfigValue == '1') {
      let currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
      this.dmsObj = new DMSObj();
      this.dmsObj.User = currentUserContext.UserName;
      this.dmsObj.Role = currentUserContext.RoleCode;
      this.dmsObj.ViewCode = CommonConstant.DmsViewCodeCust;
      this.dmsObj.MetadataParent = null;
      this.dmsObj.MetadataObject.push(new DMSLabelValueObj(CommonConstant.DmsNoCust, this.CustNo));
      this.dmsObj.Option.push(new DMSLabelValueObj(CommonConstant.DmsOverideSecurity, CommonConstant.DmsOverideUploadDownloadView));
    }

    await this.http.post<CustPersonalObj>(this.UrlConstantNew.GetCustPersonalbyCustId, { Id: this.IdCust }).toPromise().then(
      (response) => {
        if (response.MrMaritalStatCode == CommonConstant.MasteCodeMartialStatsMarried) {
          this.isMarried = true;
        }
      }
    );

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
    this.EnterTab("Detail");
    this.CustStepIndex = 1;
    this.stepper.to(this.CustStepIndex);
  }

  EnterTab(type) {
    if (type == "Detail") {
      this.CustStepIndex = 1;
    }

    if (type == "Address") {
      this.CustStepIndex = 2;
    }
    if (type == "Family") {
      this.CustStepIndex = 3;
    }
    if (type == "Contact") {
      this.CustStepIndex = 4;
    }
    if (type == "Job") {
      this.CustStepIndex = 5;
    }
    if (type == "Financial") {
      this.CustStepIndex = 6;
    }
    if (type == "CustAsset") {
      this.CustStepIndex = 7;
    }
    if (type == "Upload") {
      this.CustStepIndex = 8;
    }
    if (type == "CustAttr") {
      this.CustStepIndex = 9;
    }
    this.stepper.to(this.CustStepIndex);
  }

  getValue(ev: any) {
    if (ev.stepMode != undefined) {
      if (ev.stepMode == "next") {
        this.stepper.next();
        this.CustStepIndex++;

        //skip dms
        if (this.CustStepIndex == 8 && this.SysConfigResultObj.ConfigValue != '1') {
          this.stepper.next();
          this.CustStepIndex++;
        }
      }
      else {
        this.stepper.previous();
        this.CustStepIndex--;

        //skip dms
        if (this.CustStepIndex == 8 && this.SysConfigResultObj.ConfigValue != '1') {
          this.stepper.previous();
          this.CustStepIndex--;
        }
      }
      this.viewCustPers.ReloadUcViewGeneric();
    }
  }

  endStepper(ev: any) {
    if (this.From) {
      AdInsHelper.RedirectUrl(this.ngxRouter, ["/" + PathConstant.LR_CUST + "/" + this.From + "/" + PathConstant.PAGING], {});
    } else {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CUST_PAGING], {});
    }
  }

  @ViewChild('CustPersDetail') private CustPersDetail: CustomerPersonalDetailComponent;
  @ViewChild('CustEmrgcyCtc') private CustEmrgcyCtc: CustomerEmergencyContactComponent;
  @ViewChild('CustFinData') private CustFinData: CustFinDataTabComponent;
  @ViewChild('CustJobData') private CustJobData: CustomerPersonalJobDataComponent;
  @ViewChild('CustAttrData') private CustAttrData: CustAttrSectionComponent;
  async SendToR2() {
    console.log(this.CustStepIndex);
    if(!await this.SaveData(this.CustStepIndex)) return;
    await this.CustSetData.SendCustomerDataToRabbitMq(this.CustNo, this.SetUrlBack());
  }
  async SaveData(stepIdx: number): Promise<boolean> {
    let flag: boolean = true;
    switch (stepIdx) {
      case 1:
        flag = await this.CustPersDetail.SaveValue(true);
        break;
      case 4:
        flag = await this.CustEmrgcyCtc.SaveValue(true);
        break;
      case 6:
        flag = await this.CustFinData.saveCustAttrContentAndNext(true);
        break;
      case 5:
        flag = await this.CustJobData.SaveData();
        break;
      case 9:
        flag = await this.CustAttrData.SaveForm();
        break;
    }
    return flag;
  }
}