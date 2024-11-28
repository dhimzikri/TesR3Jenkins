import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CabinetWithListRackObj } from 'app/shared/model/document-management/cabinet-with-list-rack-obj.model';
import { RackObj } from 'app/shared/model/document-management/rack-obj.model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CabinetObj } from 'app/shared/model/document-management/cabinet-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-rack-add-edit',
  templateUrl: './rack-add-edit.component.html'
})
export class RackAddEditComponent implements OnInit {
  RackCode: string;
  Mode: string;
  CabinetCode: string;
  CabinetId: number;
  title: string = "ADD RACK";
  rack: RackObj = new RackObj();
  cabinetWithRackObj: CabinetWithListRackObj = new CabinetWithListRackObj();
  readonly ViewLink: string = NavigationConstant.DOC_MNGMNT_VIEW_CABINET;
  Cabinet: CabinetObj = new CabinetObj();

  RackForm = this.fb.group({
    RackCode: ['', [Validators.required, Validators.maxLength(50)]],
    RackName: ['', [Validators.required, Validators.maxLength(100)]],
    RackInformation: ['', Validators.maxLength(4000)],
    IsActive: [true]
  });
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService, 
    private UrlConstantNew: UrlConstantNew) { 
    this.activeRoute.queryParams.subscribe(
      params => {
        if(params['RackCode'] !== null){
          this.RackCode = params['RackCode']
        }
        if(params['Mode'] !== null){
          this.Mode = params['Mode']
        }
        if(params['CabinetCode'] !== null){
          this.CabinetCode = params['CabinetCode'];
        }
      }
    );
  }

  ngOnInit() {
    console.log(this.CabinetCode);
    this.http.post<CabinetObj>(this.UrlConstantNew.GetCabinetByCode, {Code: this.CabinetCode}).subscribe(
      (response) => {
        this.Cabinet = response;
        this.CabinetId = this.Cabinet.CabinetId;
        console.log(this.CabinetId);
        if((this.Mode !== null || this.Mode !== undefined) && this.CabinetId != null && this.Mode === 'Edit'){
          this.title = "EDIT RACK";
          this.RackForm.controls.RackCode.disable();
          this.rack.RackCode = this.RackCode;
          console.log(this.CabinetId);
          this.http.post<CabinetWithListRackObj>(this.UrlConstantNew.GetCabinetAndRackByRackCodeAndCabinetId, {RackCode: this.RackCode, CabinetId: this.CabinetId}).subscribe(
            (response) => {
              this.cabinetWithRackObj = response;
              this.RackForm.controls['RackCode'].patchValue(response.ListRack[0].RackCode);
              this.RackForm.controls['RackName'].patchValue(response.ListRack[0].RackName);
              this.RackForm.controls['RackInformation'].patchValue(response.ListRack[0].RackInfo);
              this.RackForm.controls['IsActive'].patchValue(response.ListRack[0].IsActive);
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
  }

  SaveForm(){
    this.rack.RackCode = this.RackForm.controls['RackCode'].value;
    this.rack.RackName = this.RackForm.controls['RackName'].value;
    this.rack.RackInfo = this.RackForm.controls['RackInformation'].value;
    this.rack.IsActive = this.RackForm.controls['IsActive'].value;
    
    if(this.Mode === 'Edit'){
      this.rack.CabinetId = this.cabinetWithRackObj.CabinetId;
      this.rack.CurrentRackCode = this.RackCode;
      this.http.post(this.UrlConstantNew.EditRack, this.rack, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage("Success.");
          this.router.navigate([NavigationConstant.DOC_MNGMNT_RACK_PAGING], { queryParams: { CabinetCode: this.CabinetCode } });
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      this.rack.CabinetCode = this.CabinetCode;
      this.rack.CabinetId = this.Cabinet.CabinetId;
      this.http.post(this.UrlConstantNew.AddRack, this.rack, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage("Success.");
          this.router.navigate([NavigationConstant.DOC_MNGMNT_RACK_PAGING], { queryParams: { CabinetCode: this.CabinetCode } });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  backClick(){
    this.router.navigate([NavigationConstant.DOC_MNGMNT_RACK_PAGING], { queryParams: { CabinetCode: this.CabinetCode } });
  }
}