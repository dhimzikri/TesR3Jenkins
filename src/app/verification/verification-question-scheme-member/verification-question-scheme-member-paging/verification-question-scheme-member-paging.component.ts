import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VerfSchemeHObj } from 'app/shared/model/verf-scheme-h-obj.model';
import { ToastrService } from 'ngx-toastr';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-verification-question-scheme-member-paging',
  templateUrl: './verification-question-scheme-member-paging.component.html'
})
export class VerificationQuestionSchemeMemberPagingComponent implements OnInit {
  verfSchemeHObj: VerfSchemeHObj;
  VerfSchemeHId: number;
  VerfSchemeCode: string;
  VerfSchemeName: string;
  isActive: boolean = true;
  verfQuestionScheme: any;
  listQuestionGroupD: any;
  verfSchemeObj: any;

  readonly AddLink: string = NavigationConstant.VERIF_QA_SCHM_MBR_ADD;
  readonly CancelLink: string = NavigationConstant.VERIF_QA_SCHM_PAGING;
  constructor(private router: Router, private route: ActivatedRoute,
    private http: HttpClient, public toastr: ToastrService, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VerfSchemeHId = queryParams["VerfSchemeHId"];
    })
  }

  ngOnInit() {
    this.http.post(this.UrlConstantNew.GetVerfSchemeHById, {Id : this.VerfSchemeHId}).subscribe(
      (response) => {
        this.verfQuestionScheme = response;
        this.VerfSchemeCode = this.verfQuestionScheme.VerfSchemeCode;
        this.VerfSchemeName = this.verfQuestionScheme.VerfSchemeName;
      }
    );
    this.GetListVerfSchmD();
  }

  GetListVerfSchmD() {
    this.http.post(this.UrlConstantNew.GetVerfSchemeDataByVerfSchemeHId, {Id : this.VerfSchemeHId}).subscribe(
      (response) => {
        this.listQuestionGroupD = response[CommonConstant.ReturnObj];
      }
    );
  }

  Edit(item) {
    AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.VERIF_QA_SCHM_MBR_EDIT],{ "VerfSchemeHId": this.VerfSchemeHId, "VerfSchemeDId": item.VerfSchemeDId, "VerfQuestionGrpHId": item.VerfQuestionGrpHId });
  }

  DeleteData(VerfSchemeDId) {
    if (confirm("Are you sure to delete this record?")) {
      var VerfSchemeDObj = {
        Id: VerfSchemeDId
      };
      this.http.post(this.UrlConstantNew.DeleteVerfSchemeD, VerfSchemeDObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.success(response['message'], 'Success!');
          this.GetListVerfSchmD();
        });
    }
  }

}
