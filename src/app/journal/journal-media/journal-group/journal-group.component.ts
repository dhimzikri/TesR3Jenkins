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
  selector: 'app-journal-group',
  templateUrl: './journal-group.component.html',
  styleUrls: ['./journal-group.component.css']
})
export class JournalGroupComponent implements OnInit {

  JrMHeaderId = undefined;
  SubsystemDesc = undefined;
  TransactionTypeCode = undefined;
  TransactionDescription = undefined;

  IsReady = false;

  listGroup = [];

  isEdit = false;

  editId = undefined;
  readonly JournalGroupFactLink: string = NavigationConstant.JOURNAL_MEDIA_GROUP_FACT;
  readonly JournalGroupItemValueLink: string = NavigationConstant.JOURNAL_MEDIA_GROUP_ITEM_VALUE;
  readonly CancelLink: string = NavigationConstant.JOURNAL_MEDIA_PAGING;

  GroupForm = this.fb.group({
    GroupName: ['', [Validators.required]],
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
    this.getData();
    this.IsReady = true;
  }

  onAddEdit(myForm: NgForm) {
    if (this.isEdit) {
      let tempedit = this.listGroup.find(x => x.JrMGroupId == this.editId);
      tempedit.GroupName = this.GroupForm.value.GroupName;
      this.editId = undefined;
      this.isEdit = false;
    } else {
      this.listGroup.push({
        JrMGroupId: undefined,
        GroupName: this.GroupForm.value.GroupName,
      });
    }


    this.GroupForm.patchValue({
      GroupName: '',
    })

    myForm.resetForm();
  }

  onDelete(i) {
    this.listGroup.splice(i, 1);
  }

  onEdit(item) {
    this.editId = item.JrMGroupId;
    this.GroupForm.patchValue({
      GroupName: item.GroupName
    })
    this.isEdit = true;
  }

  getData() {
    if (this.JrMHeaderId != null) {
      this.http.post<any>(this.UrlConstantNew.GetJrMHeaderAndJrMGroupByJrMHeaderId, { JrMHeaderId: this.JrMHeaderId }).subscribe(
        response => {
          this.SubsystemDesc = response.SubSystem
          this.TransactionTypeCode = response.TrxTypeCode
          this.TransactionDescription = response.TrxDesc

          let list = response.ListJrMGroup;
          list.forEach(x => {
            this.listGroup.push({
              JrMGroupId: x.JrMGroupId,
              GroupName: x.GroupName,
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
      JrMHeaderId: this.JrMHeaderId,
      ListJrMGroup: this.listGroup.map(x => {
        return {
          JrMGroupId: x.JrMGroupId,
          GroupName: x.GroupName,
        }
      })
    }

    if (this.JrMHeaderId != null) {
      this.http.post<any>(this.UrlConstantNew.SaveJrMGroup, request, AdInsConstant.SpinnerOptions).subscribe(
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
