import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { CustAttrContentObj } from 'app/shared/model/new-cust/cust-attr-content-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CustAttrFormComponent } from 'app/customer/sharing-component/new-cust-component/component/cust-attr-form/cust-attr-form.component';
import { CustAttrListComponent } from 'app/customer/cust-attr-list/cust-attr-list.component';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { CustOtherInfoObj } from 'app/shared/model/cust-other-info-obj.model';
import { CustPersonalJobDataObj } from 'app/shared/model/cust-personal-job-data-obj.model';
import { RefProfessionObj } from 'app/shared/model/ref-profession-obj.model';
import { NewCustSetData } from '../sharing-component/new-cust-component/NewCustSetData.Service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-custom-cust-attr-section',
  templateUrl: './custom-cust-attr-section.component.html'
})
export class CustomCustAttrSectionComponent implements OnInit {

  @ViewChild('CustAttrForm') custAttrForm: CustAttrFormComponent;
  @ViewChild('CustAttrFormOld') custAttrFormOld: CustAttrListComponent;
  @Input() MrCustTypeCode: string;
  @Input() CustId: number = 0;
  @Output() outputTab: EventEmitter<Object> = new EventEmitter<Object>();
  @Input()
  dicts: Record<string, any> = {};

  attrGroup: string;
  From: string;
  CustOtherInfo: any;
  identifierCustAttr: string = "CustAttrForm";
  isExistData: boolean = false;
  CustNo: string;
  IdCust: number = 0;

  OtherInformationForm = this.fb.group({
    LbppmsDebtGrpId: ['', [Validators.required]],
    LbppmsCntrprtId: ['', [Validators.required]],
    LbppmsBizSustainId: ['', [Validators.required]],
    LbppmsBizSclId: ['', [Validators.required]]
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: NGXToastrService,
    private http: HttpClient,
    private fb: FormBuilder, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
      this.route.queryParams.subscribe(params => {
        const queryParams = this.ngxRouter.getQueryParams(params);
        if (queryParams["IdCust"] != null) {
          this.IdCust = queryParams["IdCust"];
        }
      });
    }

  async ngOnInit() {

    this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: this.IdCust }).subscribe(
      (response: CustObj) => {
        this.CustNo = response.CustNo;
      }
    );
    console.log("test data:", this.CustId, this.MrCustTypeCode)
    this.attrGroup = this.MrCustTypeCode == CommonConstant.CustTypeCompany ? CommonConstant.AttrGroupCustCompanyOther : CommonConstant.AttrGroupCustPersonalOther;
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = this.CustId;
    await this.http.post(this.UrlConstantNew.GetCustOtherInfoByCustId, reqObj).toPromise().then(
      (response: any) => {
        this.CustOtherInfo = response;
      });
    
    // console.log("FormGroup: ", this.OtherInformationForm.value);
    // console.log("IdentifierCustAttr: ", this.identifierCustAttr);
    // console.log("AttrGroup: ", this.attrGroup);
    // console.log("Dicts: ", this.dicts);

  }

  SetCustAttrContentOld(): Array<Object> {
    let formValue = this.OtherInformationForm.get(this.identifierCustAttr).value;
    let custAttrRequest = new Array<Object>();
    for (const key in formValue) {
      if (formValue[key]["AttrValue"] != null) {
        let custAttr = {
          CustId: this.CustId,
          RefAttrId: formValue[key]["RefAttrId"],
          AttrValue: formValue[key]["AttrValue"],
          AttrGroup: this.attrGroup
        };
        custAttrRequest.push(custAttr);
      }
    }
    return custAttrRequest;
  }

  SetCustAttrContent(): Array<CustAttrContentObj> {
    let tempAttr: Array<CustAttrContentObj> = new Array();
    let tempFormArray = this.OtherInformationForm.get(this.identifierCustAttr) as FormArray;
    for (let index = 0; index < tempFormArray.length; index++) {
      const element = tempFormArray.get(index.toString()).value;
      let tempAttrToPush: CustAttrContentObj = new CustAttrContentObj();
      tempAttrToPush.RefAttrId = element["RefAttrId"];
      tempAttrToPush.CustId = element["CustId"];
      tempAttrToPush.AttrValue = element["AttrValue"];
      tempAttrToPush.AttrGroup = this.attrGroup;
      tempAttr.push(tempAttrToPush);
    }
    return tempAttr;
  }

  getUrlSave(): string {
    if (this.isExistData) {
      return this.UrlConstantNew.EditCustOtherInfo;
    }
    return this.UrlConstantNew.AddCustOtherInfo;
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

  async SaveForm(isRedirectAfterSuccess:boolean = false): Promise<boolean> {
    let formValue = this.OtherInformationForm.get(this.identifierCustAttr).value;
    if (Object.keys(formValue).length > 0) {
      let custOtherInfo = new CustOtherInfoObj();
      custOtherInfo.LbppmsBizSclId = this.dicts.LbppmsBizSclId;
      custOtherInfo.LbppmsBizSustainId = this.dicts.LbppmsBizSustainId;
      custOtherInfo.LbppmsCntrprtId = this.dicts.LbppmsCntrprtId;
      custOtherInfo.LbppmsDebtGrpId = this.dicts.LbppmsDebtGrpId;
      custOtherInfo.CustId = this.CustId;

      let RequestAppCustOtherInfoObj = {
        CustAttrContentObjs: this.custAttrFormOld != undefined ? this.SetCustAttrContentOld() : this.SetCustAttrContent(),
        RCustOtherInfoObj: custOtherInfo
      };

      await this.http.post(this.getUrlSave(), RequestAppCustOtherInfoObj, AdInsConstant.SpinnerOptions).toPromise().then(
        (response) => {
          this.toastr.successMessage(response["Message"]);

          if(isRedirectAfterSuccess)
          {
              AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.SELF_CUSTOM_CUST_PAGING], {});
          }
        });
      return true;
    }

    this.toastr.errorMessage("No Attribute To Save");
    return false;
  }

}
