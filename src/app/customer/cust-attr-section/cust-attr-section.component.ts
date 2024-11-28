import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { CustOtherInfoObj } from 'app/shared/model/cust-other-info-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { CustAttrFormComponent } from '../sharing-component/new-cust-component/component/cust-attr-form/cust-attr-form.component';
import { CustPersonalJobDataObj } from 'app/shared/model/cust-personal-job-data-obj.model';
import { RefProfessionObj } from 'app/shared/model/ref-profession-obj.model';
import { CustAttrContentObj } from 'app/shared/model/new-cust/cust-attr-content-obj.model';
import { CustAttrListComponent } from '../cust-attr-list/cust-attr-list.component';
import { NewCustSetData } from '../sharing-component/new-cust-component/NewCustSetData.Service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-cust-attr-section',
  templateUrl: './cust-attr-section.component.html',
  styles: [],
 // providers: [NGXToastrService]
})
export class CustAttrSectionComponent implements OnInit {

  @ViewChild('CustAttrForm') custAttrForm: CustAttrFormComponent;
  @ViewChild('CustAttrFormOld') custAttrFormOld: CustAttrListComponent;
  @Input() CustId: number;
  @Input() MrCustTypeCode: string;
  @Output() outputTab: EventEmitter<Object> = new EventEmitter<Object>();
  pageType: string;
  isLookupReady: boolean;
  attrGroup: string;
  From: string;
  CustOtherInfo: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
    this.pageType = "add";
    this.isLookupReady = false;
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["IdCust"] != null) {
        this.From = queryParams["From"];
      }
    });
  }

  OtherInformationForm = this.fb.group({
    LbppmsDebtGrpId: ['', [Validators.required]],
    LbppmsCntrprtId: ['', [Validators.required]],
    LbppmsBizSustainId: ['', [Validators.required]],
    LbppmsBizSclId: ['', [Validators.required]]
  });
  inputDebitorGroupLookupObj: InputLookupObj;
  inputDebitorBusinessScaleLookupObj: InputLookupObj;
  inputCounterpartCategoryLookupObj: InputLookupObj;
  inputSustaianableFinancialBusinessLookupObj: InputLookupObj;

  isExistData: boolean = false;
  async ngOnInit() {
    this.attrGroup = this.MrCustTypeCode == CommonConstant.CustTypeCompany ? CommonConstant.AttrGroupCustCompanyOther : CommonConstant.AttrGroupCustPersonalOther;
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = this.CustId;
    await this.http.post(this.UrlConstantNew.GetCustOtherInfoByCustId, reqObj).toPromise().then(
      (response: any) => {
        this.CustOtherInfo = response;
      });
    this.inputDebitorGroupLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.inputDebitorGroupLookupObj.urlJson = "./assets/lookup/lookupDebitorGroup.json";
    this.inputDebitorGroupLookupObj.pagingJson = "./assets/lookup/lookupDebitorGroup.json";
    this.inputDebitorGroupLookupObj.genericJson = "./assets/lookup/lookupDebitorGroup.json";
    this.inputDebitorGroupLookupObj.isReady = true;

    this.inputDebitorBusinessScaleLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.inputDebitorBusinessScaleLookupObj.urlJson = "./assets/lookup/lookupDebitorBusinessScale.json";
    this.inputDebitorBusinessScaleLookupObj.pagingJson = "./assets/lookup/lookupDebitorBusinessScale.json";
    this.inputDebitorBusinessScaleLookupObj.genericJson = "./assets/lookup/lookupDebitorBusinessScale.json";
    this.inputDebitorBusinessScaleLookupObj.isReady = true;

    this.inputCounterpartCategoryLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.inputCounterpartCategoryLookupObj.urlJson = "./assets/lookup/lookupCounterpartCategory.json";
    this.inputCounterpartCategoryLookupObj.pagingJson = "./assets/lookup/lookupCounterpartCategory.json";
    this.inputCounterpartCategoryLookupObj.genericJson = "./assets/lookup/lookupCounterpartCategory.json";
    this.inputCounterpartCategoryLookupObj.isReady = true;

    this.inputSustaianableFinancialBusinessLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.inputSustaianableFinancialBusinessLookupObj.urlJson = "./assets/lookup/lookupSustainableFinancialBusiness.json";
    this.inputSustaianableFinancialBusinessLookupObj.pagingJson = "./assets/lookup/lookupSustainableFinancialBusiness.json";
    this.inputSustaianableFinancialBusinessLookupObj.genericJson = "./assets/lookup/lookupSustainableFinancialBusiness.json";
    this.inputSustaianableFinancialBusinessLookupObj.isReady = true;
    if (this.CustOtherInfo.CustOtherInfoId != 0) {
      this.isExistData = true;
      this.inputDebitorGroupLookupObj.jsonSelect = { Descr: this.CustOtherInfo.LbppmsDebtGrpDescr };
      this.inputDebitorBusinessScaleLookupObj.jsonSelect = { Descr: this.CustOtherInfo.LbppmsBizSclDescr };
      this.inputCounterpartCategoryLookupObj.jsonSelect = { Descr: this.CustOtherInfo.LbppmsCntrprtDescr };
      this.inputSustaianableFinancialBusinessLookupObj.jsonSelect = { Descr: this.CustOtherInfo.LbppmsBizSustainDescr };

      this.OtherInformationForm.patchValue({
        LbppmsDebtGrpId: this.CustOtherInfo.LbppmsDebtGrpId,
        LbppmsCntrprtId: this.CustOtherInfo.LbppmsCntrprtId,
        LbppmsBizSustainId: this.CustOtherInfo.LbppmsBizSustainId,
        LbppmsBizSclId: this.CustOtherInfo.LbppmsBizSclId
      });
    }
    this.isLookupReady = true;
    await this.GetExistingProfession();
    // this.http.post(this.UrlConstantNew.GetListCustAttrContentByCustIdForCust, { CustId: this.CustId }).pipe(first()).subscribe(
    //   (response) => {
    //     var parentFormGroup = new Object();
    //     this.listCustAttrContent = response["NewCustAttrContentObjs"];
    //     if(this.listCustAttrContent[0]["CustAttrContentId"] > 0){
    //       this.pageType = "edit";
    //     }
    //     for (const custAttr of this.listCustAttrContent) {
    //       var formGroupObject = new Object();
    //       formGroupObject["CustAttrContentId"] = [custAttr["CustAttrContentId"], [Validators.required]];
    //       formGroupObject["RefAttrId"] = [custAttr["RefAttrId"], [Validators.required]];
    //       formGroupObject["AttrValue"] = [custAttr["AttrValue"], [Validators.required]];
    //       parentFormGroup[custAttr["AttrCode"]] = this.fb.group(formGroupObject);
    //     }
    //     this.CustAttrContentForm = this.fb.group(parentFormGroup);
    //     this.isCustAttrReady = true;
    //     // console.log("CustAttrContentForm: " + JSON.stringify(this.CustAttrContentForm.controls[this.listCustAttrContent[0]["AttrCode"]].value));
    //     // console.log("listCustAttrContent: " + JSON.stringify(this.listCustAttrContent));
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }


  async GetExistingProfession(custId: number = this.CustId) {
    if (this.MrCustTypeCode != CommonConstant.CustTypePersonal || custId == 0) return;
    await this.http.post(this.UrlConstantNew.GetCustPersonalJobDataByCustId, { Id: custId }).toPromise().then(
      async (response: CustPersonalJobDataObj) => {
        if (!response.RefProfessionId) return;
        await this.http.post(this.UrlConstantNew.GetRefProfessionByRefProfessionId, { Id: response.RefProfessionId }).subscribe(
          (response: RefProfessionObj) => {
            if (this.custAttrForm) this.custAttrForm.SetSearchListInputType(CommonConstant.AttrCodeDeptAml, response.ProfessionCode);
            if (this.custAttrFormOld) this.custAttrFormOld.SetSearchListInputType(CommonConstant.AttrCodeDeptAml, response.ProfessionCode);
          });
      }
    )
  }

  identifierCustAttr: string = "CustAttrForm";
  async SaveForm(isRedirectAfterSuccess:boolean = false): Promise<boolean> {
    if (this.OtherInformationForm.invalid) {
      NewCustSetData.markFormGroupTouched(this.OtherInformationForm);
      return false;
    }
    let formValue = this.OtherInformationForm.get(this.identifierCustAttr).value;
    if (Object.keys(formValue).length > 0) {
      let custOtherInfo = new CustOtherInfoObj();
      custOtherInfo = this.OtherInformationForm.getRawValue();
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
            if (this.From === "EditMainData") {
              AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CUST_EDIT_MAIN_DATA_PAGING], {});
            }
            else if (this.From === "CustFamily") {
              AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CUST_FAMILY_PAGING], {});
            }
            else if (this.From === "CustShareholder") {
              AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CUST_SHRHLDR_PAGING], {});
            } else {
              AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CUST_PAGING], {});
            }
          }
        });
      return true;
    }

    this.toastr.errorMessage("No Attribute To Save");
    return false;
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

  getLookupDebitorGroup(e) {
    this.OtherInformationForm.patchValue({
      LbppmsDebtGrpId: e.LbppmsDebtGrpId
    });
  }

  getLookupDebitorBusinessScale(e) {
    this.OtherInformationForm.patchValue({
      LbppmsBizSclId: e.LbppmsBizSclId
    });
  }

  getLookupCounterpartCategory(e) {
    this.OtherInformationForm.patchValue({
      LbppmsCntrprtId: e.LbppmsCntrprtId
    });
  }

  getLookupSustainableFinancialBusiness(e) {
    this.OtherInformationForm.patchValue({
      LbppmsBizSustainId: e.LbppmsBizSustainId
    });
  }
}