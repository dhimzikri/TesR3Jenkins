
import { RefMasterObj } from 'app/shared/model/ref-master-obj.model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';


@Component({
  selector: 'app-master-add-edit',
  templateUrl: './master-add-edit.component.html',
  //providers: [NGXToastrService]
})
export class MasterAddEditComponent implements OnInit {
  refMasterObj: RefMasterObj = new RefMasterObj();
  refMasterTypeObj: any;
  type: string = 'add';
  RefMasterId: any;
  resultData: any;
  dropdownListObj: UcDropdownListObj = new UcDropdownListObj(this.UrlConstantNew);

  RefMasterForm = this.fb.group({
    RefMasterId: [0, [Validators.required]],
    RefMasterTypeCode: ['', [Validators.required]],
    MasterCode: ['', [Validators.required, Validators.maxLength(50)]],
    SeqNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    Descr: ['', [Validators.required]],
    IsActive: [true],
    RowVersion: [''],
    IsDeletable: [true],
    IsSystem: [false],
    ReserveField1: [''],
    ReserveField2: [''],
    ReserveField3: [''],
    ReserveField4: [''],
    ReserveField5: [''],
    DefaultValue: ['']
  });

  readonly CancelLink: string = NavigationConstant.CS_MASTER;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['mode'] != null) {
        this.type = queryParams['mode'];
      }
      if (queryParams['RefMasterId'] != null) {
        this.RefMasterId = queryParams['RefMasterId'];
      }
    });
  }

  ngOnInit() {
    this.dropdownListObj.apiPath = this.UrlConstantNew.GetListActiveRefMasterTypeForDdl;
    this.dropdownListObj.requestObj = {};
    this.GetListMasterType();
    if (this.type == 'edit') {
      this.refMasterObj.RefMasterId = this.RefMasterId;
      
      this.http.post(this.UrlConstantNew.GetRefMasterByRefMasterId, {Id: this.RefMasterId}).subscribe(
        (response) => {
          this.resultData = response;
          this.RefMasterForm.patchValue({
            RefMasterId: this.resultData.RefMasterId,
            RefMasterTypeCode: this.resultData.RefMasterTypeCode,
            MasterCode: this.resultData.MasterCode,
            SeqNo: this.resultData.SeqNo,
            Descr: this.resultData.Descr,
            IsActive: this.resultData.IsActive,
            RowVersion: this.resultData.RowVersion,
            IsDeletable: this.resultData.IsDeletable,
            IsSystem: this.resultData.IsSystem,
            ReserveField1: this.resultData.ReserveField1,
            ReserveField2: this.resultData.ReserveField2,
            ReserveField3: this.resultData.ReserveField3,
            ReserveField4: this.resultData.ReserveField4,
            ReserveField5: this.resultData.ReserveField5,
            DefaultValue: this.resultData.DefaultValue
          });
        }
      );
    }
  }

  Back(): void {
    this.location.back();
  }

  Save() {
    this.spinner.show();
    this.refMasterObj = this.RefMasterForm.value;

    //MODE-ADD
    if (this.type != 'edit') {

      this.http.post(this.UrlConstantNew.AddRefMaster, this.refMasterObj, AdInsConstant.SpinnerOptions).subscribe(
        //SAVE
        (response) => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CS_MASTER], {});
        },
        (error) => {
          this.toastr.typeErrorCustom(error);
        }
      );
    }
    //MODE-EDIT
    else {

      //SAVE
      this.http.post(this.UrlConstantNew.EditRefMaster, this.refMasterObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          //this.location.back();
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CS_MASTER], {});
          this.spinner.hide();
        },
        (error) => {
          this.toastr.typeErrorCustom(error);
          this.spinner.hide();
        }
      );
    }
  }

  GetListMasterType() {
    this.http.post(this.UrlConstantNew.GetListActiveRefMasterType, null).subscribe(
      (response) => {
        this.refMasterTypeObj = response;
      }
    );
  }
}