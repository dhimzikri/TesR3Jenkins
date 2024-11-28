import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RefEmpLeaveMngmntObj } from 'app/shared/model/ref-emp-leave-mngmnt-obj.model';
import { formatDate, DatePipe } from '@angular/common';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { RefEmpObj } from '../../../shared/model/ref-emp-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-leave-maintenance-add-edit',
  templateUrl: './leave-maintenance-add-edit.component.html'
})
export class LeaveMaintenanceAddEditComponent implements OnInit {
  pageType: string = "add";
  refEmpLeaveMngmntId: any;
  relmObj: RefEmpLeaveMngmntObj;
  resultData: any;
  inputEmpLookupObj;
  refEmp: RefEmpObj;
  resultEmpData: any;
  empName: any;
  RefEmpId : number = 0;

  RefEmpLeaveMngmntForm = this.fb.group({
    StartDt: ['', Validators.required],
    EndDt: ['', Validators.required]
  });
  businessDt: Date;

  readonly CancelLink: string = NavigationConstant.EMP_LEAVE_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private cookieService: CookieService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {

    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["param"] != null) {
        this.pageType = queryParams["param"];
      }
      if (queryParams["refEmpLeaveMngmntId"] != null) {
        this.refEmpLeaveMngmntId = queryParams["refEmpLeaveMngmntId"];
      }
    });
  }

  ngOnInit() {
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDt = new Date(context[CommonConstant.BUSINESS_DT]);

    this.inputEmpLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.inputEmpLookupObj.urlJson = "./assets/lookup/lookupEmpLeave.json";
    this.inputEmpLookupObj.pagingJson = "./assets/lookup/lookupEmpLeave.json";
    this.inputEmpLookupObj.genericJson = "./assets/lookup/lookupEmpLeave.json";

    if (this.pageType == "edit") {
      this.relmObj = new RefEmpLeaveMngmntObj();
      this.relmObj.RefEmpLeaveMngmntId = this.refEmpLeaveMngmntId;
      this.http.post(this.UrlConstantNew.GetRefEmpLeaveMngmntById, {Id : this.refEmpLeaveMngmntId}).subscribe(
        response => {
          this.resultData = response;
          this.refEmpLeaveMngmntId = this.resultData.RefEmpLeaveMngmntId;
          this.inputEmpLookupObj.idSelect = this.resultData.RefEmpId;
          this.RefEmpId = this.resultData.RefEmpId;
          this.RefEmpLeaveMngmntForm.patchValue({
            StartDt: formatDate(this.resultData.StartDt, 'yyyy-MM-dd', 'en-US'),
            EndDt: formatDate(this.resultData.EndDt, 'yyyy-MM-dd', 'en-US'),
            RefEmpId: this.resultData.RefEmpId,
            IsPassed: this.resultData.IsPassed
          });
          this.refEmp = new RefEmpObj();
          this.refEmp.RefEmpId = this.resultData.RefEmpId;
          this.http.post(this.UrlConstantNew.GetRefEmployeeById, {Id : this.resultData.RefEmpId}).subscribe(
            (response) => {
              this.resultEmpData = response;
              this.empName = this.resultEmpData.EmpName;
              this.inputEmpLookupObj.jsonSelect = this.resultEmpData;
              this.inputEmpLookupObj.nameSelect = this.resultEmpData.EmpName;
            });
        });
    }
  }

  SaveForm() {
    var businessDtRaw = new Date(AdInsHelper.GetCookie(this.cookieService, CommonConstant.BUSINESS_DATE_RAW));
    var StartDt = new Date(this.RefEmpLeaveMngmntForm.controls["StartDt"].value);
    if (StartDt < businessDtRaw) {
      this.toastr.warningMessage(ExceptionConstant.START_DATE_MUST_EQUAL_OR_MORE_THAN + "Business Date");
    }
    else if (this.RefEmpLeaveMngmntForm.controls["EndDt"].value < this.RefEmpLeaveMngmntForm.controls["StartDt"].value) {
      this.toastr.warningMessage(ExceptionConstant.END_DATE_MUST_EQUAL_OR_MORE_THAN + "Start Date");
    }
    else {
      this.relmObj = new RefEmpLeaveMngmntObj();
      this.relmObj = this.RefEmpLeaveMngmntForm.value;
      var Business_Date = AdInsHelper.GetCookie(this.cookieService, CommonConstant.BUSINESS_DATE);
      var datePipe = new DatePipe("en-US");
      var value = datePipe.transform(Business_Date, "yyyy-MM-dd");
      var businessDt = new Date(value);
      var relmObj_date = new Date(this.relmObj.EndDt);
      if (relmObj_date <= businessDt) {
        this.relmObj.IsPassed = true
      }
      else {
        this.relmObj.IsPassed = false
      }
   
      if (this.pageType == "add") {
        this.relmObj.RefEmpId = this.inputEmpLookupObj.jsonSelect.refEmpId;
        this.http.post(this.UrlConstantNew.AddRefEmpLeaveMngmnt, this.relmObj, AdInsConstant.SpinnerOptions).subscribe(
          response => {
            this.toastr.successMessage(response["message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.EMP_LEAVE_PAGING],{});
          }
        );
      } else {
        this.relmObj.RefEmpId = this.RefEmpId;
        this.relmObj.RefEmpLeaveMngmntId = this.refEmpLeaveMngmntId;
        this.relmObj.RowVersion = this.resultData.RowVersion;
        this.http.post(this.UrlConstantNew.EditRefEmpLeaveMngmnt, this.relmObj, AdInsConstant.SpinnerOptions).subscribe(
          response => {
            this.toastr.successMessage(response["message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.EMP_LEAVE_PAGING],{});
          }
        );
      }
    }
  }
}
