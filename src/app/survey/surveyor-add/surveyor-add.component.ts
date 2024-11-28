import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { SurveyorObj } from 'app/shared/model/surveyor-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UclookupgenericComponent } from '@adins/uclookupgeneric';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-surveyor-add',
  templateUrl: './surveyor-add.component.html'
})
export class SurveyorAddComponent implements OnInit {
  private uclookupUsername: UclookupgenericComponent;
  @ViewChild('lookupUsername') set content(content: UclookupgenericComponent) {
    if (content) {
      this.uclookupUsername = content;
    }
  }

  readonly CancelLink: string = NavigationConstant.SURVEYOR_PAGING;

  lookupUsernameObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  lookupSurveyorGrpObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  lookupVendorObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);

  surveyorObj: SurveyorObj;

  pageType: string;
  userId: number;
  officeId: number;
  surveyorId: number;
  vendorId: number;
  dropdownSurveyType: [];

  isEdit: boolean = false;
  isAdd: boolean = false;
  isExternal: boolean = false;

  SurveyorForm = this.fb.group({
    SurveyorType: ['INTERNAL_SURVEYOR', Validators.required],
    UserId: ['', Validators.required],
    SurveyorGroupId: ['', Validators.required],
    VendorGroupId: [''],
    SurveyorNo: ['', Validators.required],
    Workload: ['', Validators.required],
    CurrWorkloadAmt: ['', Validators.required],
    IsActive: [false]
  })

  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['SurveyorId'] != null) {
        this.isEdit = true;
        this.pageType = "edit";
        this.surveyorId = queryParams['SurveyorId'];
      }
      else {
        this.isEdit = false;
        this.pageType = "add";
      }
    });
  }

  setDropDown() {
    let tempReq: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: "SURVEYOR_TYPE", MappingCode: null };
    this.http.post(this.UrlConstantNew.GetListActiveRefMaster, tempReq).subscribe(
      (response) => {
        this.dropdownSurveyType = response['ReturnObject'];
      }
    )
  }

  onSurveyorTypeSelect(event) {
    this.SurveyorForm.patchValue({
      SurveyorType: event.target.value
    });

    if (event.target.value == "EXTERNAL_SURVEYOR") {
      this.isExternal = true;

      this.lookupUsernameObj.addCritInput = new Array();
      var critObj = new CriteriaObj();
      critObj.propName = "RE.IS_EXT";
      critObj.restriction = AdInsConstant.RestrictionEq;
      critObj.value = '1';
      this.lookupUsernameObj.addCritInput.push(critObj);
      this.uclookupUsername.setAddCritInput();
    }
    else {
      this.isExternal = false;
      this.lookupUsernameObj.addCritInput = new Array();

      var critObj = new CriteriaObj();
      critObj.propName = "RE.IS_EXT";
      critObj.restriction = AdInsConstant.RestrictionEq;
      critObj.value = "0";
      this.lookupUsernameObj.addCritInput.push(critObj);

      this.uclookupUsername.setAddCritInput();
    }
  }

  getLookupUsername(event) {
    this.SurveyorForm.patchValue({
      UserId: event.UserId
    });
    this.lookupUsernameObj.nameSelect = event.Username;
    this.userId = event.UserId;
  }

  getLookupSurveyorGroup(event) {
    this.SurveyorForm.patchValue({
      SurveyorGroupId: event.CenterGrpId
    });
    this.lookupSurveyorGrpObj.nameSelect = event.CenterGrpName;
    this.officeId = event.CenterGrpId;
  }

  getLookupVendorGroup(event) {
    this.SurveyorForm.patchValue({
      VendorGroupId: event.VendorId
    });
    this.lookupVendorObj.nameSelect = event.ReferantorCode;
  }

  ngOnInit() {
    this.setDropDown();
    this.lookupUsernameObj.urlJson = "./assets/lookup/lookupUsername.json";
    this.lookupUsernameObj.pagingJson = "./assets/lookup/lookupUsername.json";
    this.lookupUsernameObj.genericJson = "./assets/lookup/lookupUsername.json";
    this.lookupUsernameObj.isRequired = true;

    this.lookupSurveyorGrpObj.urlJson = "./assets/lookup/lookupOfficeSrvyGrp.json";
    this.lookupSurveyorGrpObj.pagingJson = "./assets/lookup/lookupOfficeSrvyGrp.json";
    this.lookupSurveyorGrpObj.genericJson = "./assets/lookup/lookupOfficeSrvyGrp.json";
    this.lookupSurveyorGrpObj.isRequired = true;

    this.lookupVendorObj.urlJson = "./assets/uclookup/vendor/lookupVendor.json";
    this.lookupVendorObj.pagingJson = "./assets/uclookup/vendor/lookupVendor.json";
    this.lookupVendorObj.genericJson = "./assets/uclookup/vendor/lookupVendor.json";
    this.lookupVendorObj.isRequired = true;

    if (this.pageType == "edit") {
      this.surveyorObj = new SurveyorObj();
      this.SurveyorForm.controls['SurveyorType'].disable();
      this.SurveyorForm.controls['SurveyorNo'].disable();
      this.http.post<SurveyorObj>(this.UrlConstantNew.GetSurveyorBySurveyorId, { Id: this.surveyorId }).subscribe(
        (response) => {
          this.surveyorObj = response;
          this.SurveyorForm.patchValue({
            SurveyorType: this.surveyorObj.MrSurveyorTypeCode,
            UserId: this.surveyorObj.RefUserId,
            SurveyorGroupId: this.surveyorObj.CenterGrpId,
            VendorGroupId: this.surveyorObj.VendorId,
            SurveyorNo: this.surveyorObj.SurveyorNo,
            Workload: this.surveyorObj.WorkloadAmt,
            CurrWorkloadAmt: this.surveyorObj.CurrWorkloadAmt,
            IsActive: this.surveyorObj.IsActive
          });

          this.http.post(this.UrlConstantNew.GetCenterGrpById, { Id: this.surveyorObj.CenterGrpId }).subscribe(
            (response) => {
              this.lookupSurveyorGrpObj.nameSelect = response['CenterGrpName'];
              this.lookupSurveyorGrpObj.jsonSelect = response;
            }
          )

          if (this.surveyorObj['MrSurveyorTypeCode'] == CommonConstant.EXTERNAL_SURVEYOR) {
            this.isExternal = true;
            this.http.post(this.UrlConstantNew.GetVendorByVendorId, { Id: this.surveyorObj.VendorId }).subscribe(
              (response) => {
                this.lookupVendorObj.nameSelect = response['VendorName'];
                this.lookupVendorObj.jsonSelect = response['VendorId'];
              }
            )
          }

          this.http.post(this.UrlConstantNew.GetRefUserById, { Id: this.surveyorObj.RefUserId }).subscribe(
            (response) => {
              this.lookupUsernameObj.nameSelect = response['Username'];
              this.lookupVendorObj.jsonSelect = response;
            }
          )
        }
      )
    }
  }

  SaveForm() {
    this.surveyorObj = new SurveyorObj();
    this.surveyorObj.MrSurveyorTypeCode = this.SurveyorForm.getRawValue().SurveyorType;
    this.surveyorObj.RefUserId = this.SurveyorForm.value.UserId;
    this.surveyorObj.CenterGrpId = this.SurveyorForm.value.SurveyorGroupId;
    this.surveyorObj.VendorId = this.SurveyorForm.value.VendorGroupId;
    this.surveyorObj.SurveyorNo = this.SurveyorForm.getRawValue().SurveyorNo;
    this.surveyorObj.WorkloadAmt = this.SurveyorForm.value.Workload;
    this.surveyorObj.CurrWorkloadAmt = this.SurveyorForm.value.CurrWorkloadAmt;
    this.surveyorObj.IsActive = this.SurveyorForm.value.IsActive;

    if (this.pageType == "add") {
      this.http.post(this.UrlConstantNew.AddSurveyor, this.surveyorObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.SURVEYOR_PAGING], {});
        }
      )
    }
    else {
      this.surveyorObj.SurveyorId = this.surveyorId;
      this.surveyorObj.RowVersion = '';
      this.http.post(this.UrlConstantNew.EditSurveyor, this.surveyorObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.SURVEYOR_PAGING], {});
        }
      )
    }
  }
}