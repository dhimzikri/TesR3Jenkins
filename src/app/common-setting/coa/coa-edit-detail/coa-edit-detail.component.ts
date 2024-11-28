import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { RefCoaObj } from 'app/shared/model/common-setting/ref-coa-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-coa-edit-detail',
  templateUrl: './coa-edit-detail.component.html'
})
export class CoaEditDetailComponent implements OnInit {
  refCoaId: string = ""
  refCoaObj: RefCoaObj = new RefCoaObj()
  CoaForm = this.fb.group(
    {
      Coa: ['', Validators.required]
    }
  );

  readonly CancelLink: string = NavigationConstant.CS_COA_PAGING;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: NGXToastrService,
    private http: HttpClient,
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['RefCoaId'] != null) {
        this.refCoaId = queryParams['RefCoaId'];
      }
    });
  }

  ngOnInit() {
    this.GetInitialData()
  }

  GetInitialData() {
    this.http.post<RefCoaObj>(this.UrlConstantNew.GetRefCoaByRefCoaId, {Id: this.refCoaId }).subscribe(
      (response) => {
        this.refCoaObj = response

        this.CoaForm.patchValue({
          Coa: this.refCoaObj.Coa
        })
      },
      (error) => {
        console.log(error)
      }
    );
  }

  Submit() {
    this.refCoaObj.Coa = this.CoaForm.controls["Coa"].value

    this.http.post(this.UrlConstantNew.SubmitCoa, this.refCoaObj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.ngxRouter.navigate([NavigationConstant.CS_COA_PAGING], {});
        this.toastr.successMessage(response["Message"]);
      },
      (error) => {
        this.toastr.typeErrorCustom(error);
      }
    );
  }
}