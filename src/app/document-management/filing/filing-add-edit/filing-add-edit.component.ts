import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RackWithListFilingObj } from 'app/shared/model/document-management/rack-with-list-filing-obj.model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FilingObj } from 'app/shared/model/document-management/filing-obj.model';
import { CabinetWithListRackObj } from 'app/shared/model/document-management/cabinet-with-list-rack-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { RackObj } from 'app/shared/model/document-management/rack-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-filing-add-edit',
  templateUrl: './filing-add-edit.component.html'
})
export class FilingAddEditComponent implements OnInit {
  Cabinet: CabinetWithListRackObj = new CabinetWithListRackObj();
  FilingCode: string;
  RackId: number;
  Mode: string;
  title: string = "ADD FILING";
  filing: FilingObj = new FilingObj();
  rackWithListFilling: RackWithListFilingObj = new RackWithListFilingObj();
  readonly ViewLink: string = NavigationConstant.DOC_MNGMNT_VIEW_CABINET;
  Rack: RackObj = new RackObj();
  RackCode: string;

  FillingForm = this.fb.group({
    FilingCode: ['', [Validators.required, Validators.maxLength(50)]],
    FilingName: ['', [Validators.required, Validators.maxLength(100)]],
    FilingInformation: ['', Validators.maxLength(4000)],
    IsActive: [true]
  });
  
  constructor(private fb: FormBuilder, private router: Router, private activeRoute: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew) { 
    this.activeRoute.queryParams.subscribe(
      params => {
        if(params['RackCode'] !== null && params['CabinetCode'] !== null){
          this.rackWithListFilling.RackCode = params['RackCode'],
          this.Cabinet.CabinetCode = params['CabinetCode'],
          this.RackCode = params['RackCode']
        }
        if(params['RackCode'] !== null && params['CabinetCode'] !== null && params['FilingCode'] !== null){
          this.rackWithListFilling.RackCode = params['RackCode'],
          this.Cabinet.CabinetCode = params['CabinetCode'],
          this.FilingCode = params['FilingCode']
        }
        // if(params['FilingCode'] !== null){
        //   this.FilingCode = params['FilingCode']
        // }
        // if(params['RackCode'] !== null){
        //   this.RackCode = params['RackCode']
        // }
        if(params['Mode'] !== null){
          this.Mode = params['Mode'];
        }
        // if(params['CabinetCode'] !== null){
        //   this.CabinetCode = params['CabinetCode']
        // }
      }
    );
  }

  ngOnInit() {
    this.http.post<RackObj>(this.UrlConstantNew.GetRackByCode, {RackCode: this.RackCode, CabinetCode: this.Cabinet.CabinetCode}).subscribe(
      (response) => {
        this.Rack = response;
        this.RackId = this.Rack.RackId;
        console.log(this.RackId);
        if((this.Mode !== null || this.Mode !== undefined) && this.RackId != null && this.Mode === 'Edit'){
          this.title = "EDIT FILING";
          this.FillingForm.controls.FilingCode.disable();
          this.filing.FilingCode = this.FilingCode;
          console.log(this.RackId);
          this.http.post<any>(this.UrlConstantNew.GetRackAndListFilingByFilingCodeAndRackId, {FilingCode: this.FilingCode, RackId: this.RackId}).subscribe(
            (response) => {
              this.rackWithListFilling = response;
              this.FillingForm.controls['FilingCode'].patchValue(response.ListFiling[0].FilingCode);
              this.FillingForm.controls['FilingName'].patchValue(response.ListFiling[0].FilingName);
              this.FillingForm.controls['FilingInformation'].patchValue(response.ListFiling[0].FilingInfo);
              this.FillingForm.controls['IsActive'].patchValue(response.ListFiling[0].IsActive);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.http.post<RackWithListFilingObj>(this.UrlConstantNew.GetRackAndListFilingByRackCodeAndCabinetCode, {RackCode: this.RackCode, CabinetCode: this.Cabinet.CabinetCode}).subscribe(
      (response) => {
        this.rackWithListFilling = response;
      },
      (error) => {
        console.log(error);
      }
    );

    let GetCabinetAndListRackByCabinetCode: GenericObj = new GenericObj();
    GetCabinetAndListRackByCabinetCode.Code = this.Cabinet.CabinetCode;
    this.http.post<CabinetWithListRackObj>(this.UrlConstantNew.GetCabinetAndListRackByCabinetCode, GetCabinetAndListRackByCabinetCode).subscribe(
      (response) => {
        this.Cabinet = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  SaveForm(){
    console.log(this.Cabinet.CabinetCode);
    this.filing.FilingCode = this.FillingForm.controls['FilingCode'].value;
    this.filing.FilingName = this.FillingForm.controls['FilingName'].value;
    this.filing.FilingInfo = this.FillingForm.controls['FilingInformation'].value;
    this.filing.IsActive = this.FillingForm.controls['IsActive'].value;

    if(this.Mode === 'Edit'){
      this.filing.RackId = this.rackWithListFilling.RackId;
      this.filing.CurrentFilingCode = this.FilingCode;
      this.http.post(this.UrlConstantNew.EditFiling, this.filing, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage("Success.");
          this.router.navigate([NavigationConstant.DOC_MNGMNT_FILING_PAGING], { queryParams: { CabinetCode: this.Cabinet.CabinetCode, RackCode: this.rackWithListFilling.RackCode } });
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      this.filing.RackCode = this.rackWithListFilling.RackCode;
      this.filing.RackId = this.Rack.RackId;
      console.log(this.filing);
      this.http.post(this.UrlConstantNew.AddFiling, this.filing, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage("Success.");
          this.router.navigate([NavigationConstant.DOC_MNGMNT_FILING_PAGING], { queryParams: { CabinetCode: this.Cabinet.CabinetCode, RackCode: this.rackWithListFilling.RackCode } });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  backClick(){
    this.router.navigate([NavigationConstant.DOC_MNGMNT_FILING_PAGING], { queryParams: { CabinetCode: this.Cabinet.CabinetCode, RackCode: this.rackWithListFilling.RackCode} });
  }
}