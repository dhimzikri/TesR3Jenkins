import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-journal-item-value',
  templateUrl: './journal-item-value.component.html',
  styleUrls: ['./journal-item-value.component.css']
})
export class JournalItemValueComponent implements OnInit {

  JrMHeaderId = undefined;
  JrMGroupId = undefined;
  SubsystemDesc = undefined;
  TransactionTypeCode = undefined;
  TransactionDescription = undefined;
  GroupName = undefined;

  IsReady = false;

  listItemValue = [];
  ItemValueForm = this.fb.group({
    ItemAlias: ['', [Validators.required]],
    ItemProperty: ['', [Validators.required]],
  })

  readonly CancelLink: string = NavigationConstant.JOURNAL_MEDIA_GROUP;

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
    this.getData();
    this.IsReady = true;
  }

  onAdd(myForm: NgForm) {
    this.listItemValue.push({
      JrMItemValueId: undefined,
      IvAlias: this.ItemValueForm.value.ItemAlias,
      IvProperty: this.ItemValueForm.value.ItemProperty,
    });
    myForm.resetForm();

    this.ItemValueForm.patchValue({
      ItemAlias: '',
      ItemProperty: '',
    })


  }

  onDelete(i) {
    this.listItemValue.splice(i, 1);
  }

  getData() {
    if (this.JrMGroupId != null) {
      this.http.post<any>(this.UrlConstantNew.GetJrMGroupAndJrMItemValueByJrMGroupId, { JrMGroupId: this.JrMGroupId }).subscribe(
        response => {
          this.JrMHeaderId = response.JrMHeaderId
          this.SubsystemDesc = response.SubSystem
          this.TransactionTypeCode = response.TrxTypeCode
          this.TransactionDescription = response.TrxDesc
          this.GroupName = response.GroupName

          let list = response.ListJrMItemValue;
          list.forEach(x => {
            this.listItemValue.push({
              JrMItemValueId: x.JrMItemValueId,
              IvAlias: x.IvAlias,
              IvProperty: x.IvProperty,
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
      ListJrMItemValue: this.listItemValue.map(x => {
        return {
          JrMItemValueId: x.JrMItemValueId,
          IvAlias: x.IvAlias,
          IvProperty: x.IvProperty,
        }
      })
    }

    if (this.JrMGroupId != null) {
      this.http.post<any>(this.UrlConstantNew.SaveJrMItemValue, request, AdInsConstant.SpinnerOptions).subscribe(
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
