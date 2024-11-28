import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RefJobTitleObj } from 'app/shared/model/ref-job-title-obj.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-ref-job-title-add',
  templateUrl: './ref-job-title-add.component.html'
})
export class RefJobTitleAddComponent implements OnInit {

  pageType: string = "add";
  refJobTitleId: any;
  rjtObj: RefJobTitleObj;
  resultData: any;
  apiUrl: any;
  addUrl: any;
  editUrl: any;

  RefJobTitleForm = this.fb.group({
    JobTitleCode: ['', [Validators.required, Validators.maxLength(50)]],
    JobTitleName: ['', [Validators.required, Validators.maxLength(100)]],
    Descr: ['', Validators.maxLength(4000)],
    IsActive: [true]
  });

  readonly CancelLink: string = NavigationConstant.ORG_JOB_TITLE;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.apiUrl = this.UrlConstantNew.GetRefJobTitleById;
    this.addUrl = this.UrlConstantNew.AddRefJobTitle;
    this.editUrl = this.UrlConstantNew.EditRefJobTitle;

    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["param"] != null) {
        this.pageType = queryParams["param"];
      }
      if (queryParams["refJobTitleId"] != null) {
        this.refJobTitleId = queryParams["refJobTitleId"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.rjtObj = new RefJobTitleObj();
      this.rjtObj.RefJobTitleId = this.refJobTitleId;
      this.http.post(this.apiUrl, {Id: this.refJobTitleId}).subscribe(
        response => {
          this.resultData = response;
          this.refJobTitleId = this.resultData.RefJobTitleId;
          this.RefJobTitleForm.patchValue({
            JobTitleCode: this.resultData.JobTitleCode,
            JobTitleName: this.resultData.JobTitleName,
            Descr: this.resultData.Descr,
            IsActive: this.resultData.IsActive
          });

        }
      );
    }
  }

  SaveForm() {
    this.rjtObj = new RefJobTitleObj();
    this.rjtObj = this.RefJobTitleForm.value;
    if (this.pageType == "add") {
      this.rjtObj.RowVersion = "";
      this.http.post(this.addUrl, this.rjtObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ORG_JOB_TITLE],{});
        }
      );
    } else {
      this.rjtObj.RefJobTitleId = this.refJobTitleId;
      this.rjtObj.RowVersion = this.resultData.RowVersion;
      this.http.post(this.editUrl, this.rjtObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ORG_JOB_TITLE],{});
        }
      );
    }
  }
}
