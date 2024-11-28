import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-journal-header-fact',
  templateUrl: './journal-header-fact.component.html',
  styleUrls: ['./journal-header-fact.component.css']
})
export class JournalHeaderFactComponent implements OnInit {


  JrMHeaderId = undefined;
  SubsystemDesc = undefined;
  TransactionTypeCode = undefined;
  TransactionDescription = undefined;

  IsReady = false;

  listHeaderFact = [];
  listEntityType = [];

  ddlFactTypeIsReady: boolean = false;
  ddlFactTypeGenericList: Array<KeyValueObj>;
  ddlFactTypeObj: UcDropdownListObj = new UcDropdownListObj(this.UrlConstantNew);
  readonly CancelLink: string = NavigationConstant.JOURNAL_MEDIA_PAGING;

  HeaderFactForm = this.fb.group({
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
        if (queryParams['JrMHeaderId'] != null) {
          this.JrMHeaderId = +queryParams['JrMHeaderId'];
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
    let string = this.HeaderFactForm.value.FactProperty.split('.')[0];
    let dotIdx = this.HeaderFactForm.value.FactProperty.indexOf(".");
    let lastdotIdx = this.HeaderFactForm.value.FactProperty.lastIndexOf(".");

    let temp = this.listEntityType.find(x => {
      return x.EntityType == string
    });

    let temp2 = this.listHeaderFact.find(x => {
      return x.HFactAlias == this.HeaderFactForm.value.FactAlias
    });

    if (lastdotIdx >= this.HeaderFactForm.value.FactProperty.length - 1 || dotIdx <= 0) {
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



    this.listHeaderFact.push({
      JrMHeaderFactId: undefined,
      HFactAlias: this.HeaderFactForm.value.FactAlias,
      HFactProperty: this.HeaderFactForm.value.FactProperty,
      HFactType: this.HeaderFactForm.value.FactType,
      TypeDesc: this.ddlFactTypeGenericList.find(x => x.Key === this.HeaderFactForm.value.FactType).Value,
    });
    myForm.resetForm();

    this.HeaderFactForm.patchValue({
      FactAlias: '',
      FactProperty: '',
      FactType: '',
    })

  }

  onDelete(i) {
    this.listHeaderFact.splice(i, 1);
  }

  getData() {
    if (this.JrMHeaderId != null) {
      this.http.post<any>(this.UrlConstantNew.GetJrMHeaderAndJrMHeaderFactAndJrMEntityByJrMHeaderId, { JrMHeaderId: this.JrMHeaderId }).subscribe(
        response => {
          this.SubsystemDesc = response.SubSystem
          this.TransactionTypeCode = response.TrxTypeCode
          this.TransactionDescription = response.TrxDesc
          let list = response.ListJrMHeaderFact;
          list.forEach(x => {
            this.listHeaderFact.push({
              JrMHeaderFactId: x.JrMHeaderFactId,
              HFactAlias: x.HFactAlias,
              HFactProperty: x.HFactProperty,
              HFactType: x.HFactType,
              TypeDesc: this.ddlFactTypeGenericList.find(y => y.Key === x.HFactType).Value,
            })
          });

          this.listEntityType = response.ListJrMEntity;


        },
        error => {
          console.log(error);
        }
      )
    }
  }

  onSubmit() {
    let request = {
      JrMHeaderId: this.JrMHeaderId,
      ListJrMHeaderFact: this.listHeaderFact.map(x => {
        return {
          JrMHeaderFactId: x.JrMHeaderFactId,
          HFactAlias: x.HFactAlias,
          HFactProperty: x.HFactProperty,
          HFactType: x.HFactType,
        }
      })
    }

    if (this.JrMHeaderId != null) {
      this.http.post<any>(this.UrlConstantNew.SaveJrMHeaderFact, request, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage('Success !');
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.JOURNAL_MEDIA_PAGING], {})
        },
        error => {
          console.log(error);
        }
      )
    }

  }

}
