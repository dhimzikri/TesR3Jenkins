import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ScoreCategorySchmHObj } from 'app/shared/model/score-category/score-category-Schm-h-obj.model';
import { RefMasterObj } from 'app/shared/model/ref-master-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-score-category-type',
  templateUrl: './score-category-type.component.html',
 // providers: [NGXToastrService]
})
export class ScoreCategoryTypeComponent implements OnInit {
  scoreCategorySchmHObj: ScoreCategorySchmHObj = new ScoreCategorySchmHObj();
  type: string = 'add';
  scoreCategorySchmHId: number = 0;
  title: string = "Score Category Type - Add";
  ScoreTrxTypeObj: Array<KeyValueObj> = new Array<KeyValueObj>();

  ScoreCategorySchmHForm = this.fb.group({
    ScoreCategorySchmHCode: ['', [Validators.required, Validators.maxLength(50)]],
    ScoreCategorySchmHName: ['', [Validators.required, Validators.maxLength(100)]],
    MrScoreTrxTypeCode: ['', [Validators.required, Validators.maxLength(50)]],
    Notes: ['', [Validators.maxLength(4000)]],
    IsActive: [true],
    RowVersion: ['']
  });

  readonly CancelLink: string = NavigationConstant.CS_SCORE_CATEGORY_PAGING;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private service: NGXToastrService,
    private fb: FormBuilder,
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (params['mode'] != null) {
        this.type = params['mode'];
      }
      if (params['ScoreCategorySchmHId'] != null) {
        this.scoreCategorySchmHId = params['ScoreCategorySchmHId'];
      }
    });
  }


  ngOnInit() {   
    var refMasterObj = new RefMasterObj();
    refMasterObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeScoreTrxType;
    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, refMasterObj).subscribe(
      (response) => {
        this.ScoreTrxTypeObj = response[CommonConstant.ReturnObj];
      }
    );

    if (this.type == 'edit') {
      this.title = "Score Category Type - Edit";
      this.scoreCategorySchmHObj.ScoreCategorySchmHId = this.scoreCategorySchmHId;
      this.http.post(this.UrlConstantNew.GetScoreCategorySchmHById, {Id : this.scoreCategorySchmHId}).subscribe(
        (response) => {
          this.ScoreCategorySchmHForm.patchValue({
            ScoreCategorySchmHCode: response["ScoreCategorySchmHCode"],
            ScoreCategorySchmHName: response["ScoreCategorySchmHName"],
            MrScoreTrxTypeCode: response["MrScoreTrxTypeCode"],
            Notes: response["Notes"],
            IsActive: response["IsActive"],
            RowVersion: response["RowVersion"]
          });
        }
      );
    }
  }

  Save() {
    this.scoreCategorySchmHObj = new ScoreCategorySchmHObj();
    this.scoreCategorySchmHObj.ScoreCategorySchmHId = this.scoreCategorySchmHId;
    this.scoreCategorySchmHObj.ScoreCategorySchmHCode = this.ScoreCategorySchmHForm.controls.ScoreCategorySchmHCode.value;
    this.scoreCategorySchmHObj.ScoreCategorySchmHName = this.ScoreCategorySchmHForm.controls.ScoreCategorySchmHName.value;
    this.scoreCategorySchmHObj.MrScoreTrxTypeCode = this.ScoreCategorySchmHForm.controls.MrScoreTrxTypeCode.value;
    this.scoreCategorySchmHObj.Notes = this.ScoreCategorySchmHForm.controls.Notes.value;
    this.scoreCategorySchmHObj.IsActive = this.ScoreCategorySchmHForm.controls.IsActive.value;
    this.scoreCategorySchmHObj.RowVersion = this.ScoreCategorySchmHForm.controls.RowVersion.value;
    //MODE-ADD
    if (this.type == 'add') {
      this.http.post(this.UrlConstantNew.AddScoreCategorySchmH, this.scoreCategorySchmHObj, AdInsConstant.SpinnerOptions).subscribe(
        //SAVE
        (response) => {
          this.service.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_SCORE_CATEGORY_PAGING],{});
        },
        (error) => {
          this.service.typeErrorCustom(error);
        }
      );
    }
    //MODE-EDIT
    else {
      //SAVE
      this.http.post(this.UrlConstantNew.EditScoreCategorySchmH, this.scoreCategorySchmHObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.service.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_SCORE_CATEGORY_PAGING],{});
        },
        (error) => {
          this.service.typeErrorCustom(error);
        }
      );
    }
  }

}
