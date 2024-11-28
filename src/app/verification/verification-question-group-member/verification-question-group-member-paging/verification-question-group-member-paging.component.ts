import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VerfQuestionGrpHObj } from 'app/shared/model/verf-question-grp-h-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-verification-question-group-member-paging',
  templateUrl: './verification-question-group-member-paging.component.html'
})
export class VerificationQuestionGroupMemberPagingComponent implements OnInit {
  verfQuestionGrpHObj: VerfQuestionGrpHObj;
  VerfQuestionGrpHId: any;
  verfQuestionGroup: any;
  listVerfQuestionGrpD: any;

  VerfQuestionGrpCode: any;
  VerfQuestionGrpName: any;
  
  readonly CancelLink: string = NavigationConstant.VERIF_QA_GRP_PAGING;
  readonly AddLink: string = NavigationConstant.VERIF_QA_GRP_MBR_ADD;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VerfQuestionGrpHId = queryParams["VerfQuestionGrpHId"];
   })
  }

  QuestionGroupForm = this.fb.group({
  })

  QuestionGroupListForm = this.fb.group({
  })

  ngOnInit() {
    this.http.post(this.UrlConstantNew.GetQuestionGrpHForUpdateById, {Id : this.VerfQuestionGrpHId}).subscribe(
      (response) => {
        this.verfQuestionGroup = response[CommonConstant.ReturnObj];
          this.VerfQuestionGrpCode = this.verfQuestionGroup.VerfQuestionGrpCode,
          this.VerfQuestionGrpName = this.verfQuestionGroup.VerfQuestionGrpName
      }
    );
    
    this.GetVerfQuestionGrpDByGrpHId();
  }

  Edit(item)
  {
    AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.VERIF_QA_GRP_MBR_EDIT],{ "VerfQuestionGrpDId": item.VerfQuestionGrpDId, "VerfQuestionGrpHId" : this.VerfQuestionGrpHId});
  }

  Delete(verfQuestionGrpDId){
    if (confirm("Are you sure to delete this record?")) {
      var verfGroupDIdObj = {Id: verfQuestionGrpDId};
      this.http.post(this.UrlConstantNew.DeleteVerfQuestionGroupDById, verfGroupDIdObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.GetVerfQuestionGrpDByGrpHId();
        }
      );
    }
  }


  GetVerfQuestionGrpDByGrpHId(){
    this.http.post(this.UrlConstantNew.GetVerfQuestionGrpDByGrpHId, {Id : this.VerfQuestionGrpHId}).subscribe(
      (response) => {
        this.listVerfQuestionGrpD = response[CommonConstant.ReturnObj];
      }
    );
  }
}
