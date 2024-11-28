
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefOfficeAreaObj } from 'app/shared/model/ref-office-area-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-office-area-add-edit',
  templateUrl: './office-area-add-edit.component.html',
 // providers: [NGXToastrService]
})
export class OfficeAreaAddEditComponent implements OnInit {
  refOfficeAreaObj: RefOfficeAreaObj;
  RefOfficeAreaId: number = 0;
  pageType: any;
  result: any;
  title: string = "Area-Add"
  mode: string = "add";

  readonly CancelLink: string = NavigationConstant.OFFICE_AREA;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.RefOfficeAreaId = queryParams["RefOfficeAreaId"];
      this.mode = queryParams["mode"];
    })
  }

  OfficeAreaForm = this.fb.group({
    AreaCode: ['', Validators.required],
    AreaName: ['', Validators.required],
    IsActive: [true],
    RowVersion: ['']
  })

  ngOnInit() {
    if (this.mode == "edit") {
      this.title = "Area-Edit";
      this.refOfficeAreaObj = new RefOfficeAreaObj();
      this.refOfficeAreaObj.RefOfficeAreaId = this.RefOfficeAreaId;
      this.OfficeAreaForm.controls.AreaCode.disable();
      this.http.post(this.UrlConstantNew.GetRefOfficeAreaByRefOfficeAreaId, {Id : this.RefOfficeAreaId}).subscribe(
        (response) => {
          this.result = response;
          this.OfficeAreaForm.patchValue({
            AreaCode: this.result.AreaCode,
            AreaName: this.result.AreaName,
            IsActive: this.result.IsActive,
            RowVersion: this.result.RowVersion,
          });
        }
      );
    }
  }

  SaveForm() {
    this.refOfficeAreaObj = new RefOfficeAreaObj();
    this.refOfficeAreaObj = this.OfficeAreaForm.value;
    if (this.mode == "edit") {
      this.refOfficeAreaObj.AreaCode = this.result.AreaCode;
      this.refOfficeAreaObj.RefOfficeAreaId = this.RefOfficeAreaId;

      this.http.post(this.UrlConstantNew.EditRefOfficeArea, this.refOfficeAreaObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.OFFICE_AREA],{});
        });
    }
    else {
      this.refOfficeAreaObj.RefOfficeAreaId = 0;
      this.http.post(this.UrlConstantNew.AddRefOfficeArea, this.refOfficeAreaObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.OFFICE_AREA],{});
        });
    }
  }
}
