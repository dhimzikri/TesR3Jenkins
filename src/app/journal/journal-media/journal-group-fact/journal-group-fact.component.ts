import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-journal-group-fact',
  templateUrl: './journal-group-fact.component.html',
  styleUrls: ['./journal-group-fact.component.css']
})
export class JournalGroupFactComponent implements OnInit {

  JrMHeaderId = undefined;
  JrMGroupId = undefined;
  SubsystemDesc = undefined;
  TransactionTypeCode = undefined;
  TransactionDescription = undefined;
  GroupName = undefined;

  IsReady = false;

  listGroupFact = [];
  listEntityType = [];

  ddlFactTypeIsReady: boolean = false;
  ddlFactTypeGenericList: Array<KeyValueObj>;
  ddlFactTypeObj: UcDropdownListObj = new UcDropdownListObj(this.UrlConstantNew);
  readonly CancelLink: string = NavigationConstant.JOURNAL_MEDIA_GROUP;

  GroupFactForm = this.fb.group({
    FactAlias: ['', [Validators.required]],
    FactProperty: ['', [Validators.required]],
    FactType: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: NGXToastrService, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        const queryParams = this.ngxRouter.getQueryParams(params);
        if (queryParams['JrMGroupId'] != null) {
          this.JrMGroupId = +queryParams['JrMGroupId'];
        }
      }
    );

    this.http.post<any>(this.UrlConstantNew.GetListActiveRefMasterByRefMasterTypeCode, {
      code: CommonConstant.RefMasterTypeCodeJournalHeaderFactType
    }).subscribe(
      (response) => {
        this.ddlFactTypeObj = new UcDropdownListObj(this.UrlConstantNew);
        this.ddlFactTypeGenericList = response["RefMasterObjs"].map(item => ({
          Key: item.MasterCode,
          Value: item.Descr,
        }));
        this.getData();
        this.ddlFactTypeIsReady = true;
      }
    );

    this.IsReady = true;
  }

  onAdd(myForm: NgForm) {
    let string = this.GroupFactForm.value.FactProperty.split('.')[0];
    let dotIdx = this.GroupFactForm.value.FactProperty.indexOf(".");
    let lastdotIdx = this.GroupFactForm.value.FactProperty.lastIndexOf(".");

    let temp = this.listEntityType.find(x => {
      return x.EntityType == string
    });

    let temp2 = this.listGroupFact.find(x => {
      return x.HFactAlias == this.GroupFactForm.value.FactAlias
    });

    if (lastdotIdx >= this.GroupFactForm.value.FactProperty.length - 1 || dotIdx <= 0) {
      this.toastr.errorMessage('Invalid Fact Property format')
      return;
    }

    if (temp == undefined) {
      this.toastr.errorMessage('Entity Type not found')
      return;
    }

    if (temp2 != undefined) {
      this.toastr.errorMessage('Alias is already been used')
      return;
    }


    this.listGroupFact.push({
      JrMGroupDFactId: undefined,
      DFactAlias: this.GroupFactForm.value.FactAlias,
      DFactProperty: this.GroupFactForm.value.FactProperty,
      DFactType: this.GroupFactForm.value.FactType,
      TypeDesc: this.ddlFactTypeGenericList.find(x => x.Key === this.GroupFactForm.value.FactType).Value,
    });
    myForm.resetForm();

    this.GroupFactForm.patchValue({
      FactAlias: '',
      FactProperty: '',
      FactType: '',
    })


  }

  onDelete(i) {
    this.listGroupFact.splice(i, 1);
  }

  getData() {
    if (this.JrMGroupId != null) {
      this.http.post<any>(this.UrlConstantNew.GetJrMGroupAndJrMGroupDFactByJrMGroupId, { JrMGroupId: this.JrMGroupId }).subscribe(
        response => {
          this.JrMHeaderId = response.JrMHeaderId
          this.SubsystemDesc = response.SubSystem
          this.TransactionTypeCode = response.TrxTypeCode
          this.TransactionDescription = response.TrxDesc
          this.GroupName = response.GroupName
          this.listEntityType = response.ListJrMEntity;
          let list = response.ListJrMGroupDFact;
          list.forEach(x => {
            this.listGroupFact.push({
              JrMGroupDFactId: x.JrMGroupDFactId,
              DFactAlias: x.DFactAlias,
              DFactProperty: x.DFactProperty,
              DFactType: x.DFactType,
              TypeDesc: this.ddlFactTypeGenericList.find(y => y.Key === x.DFactType).Value,
            })
          });

        },
        error => {
          console.log(error);
        }
      )
    }
  }

  onSubmit() {
    let request = {
      JrMGroupId: this.JrMGroupId,
      ListJrMGroupDFact: this.listGroupFact.map(x => {
        return {
          JrMGroupDFactId: x.JrMGroupDFactId,
          DFactAlias: x.DFactAlias,
          DFactProperty: x.DFactProperty,
          DFactType: x.DFactType,
        }
      })
    }

    if (this.JrMGroupId != null) {
      this.http.post<any>(this.UrlConstantNew.SaveJrMGroupDFact, request, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage('Success !');
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.JOURNAL_MEDIA_GROUP], { JrMHeaderId: this.JrMHeaderId })
        },
        error => {
          console.log(error);
        }
      )
    }

  }

}
