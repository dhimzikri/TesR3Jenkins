import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { ListWorkingHourSchmDObj } from 'app/shared/model/list-working-hour-schm-d-obj.model';
import { WorkingHourSchmDObj } from 'app/shared/model/working-hour-schm-d-obj.model';
import { WorkingHourSchmHObj } from 'app/shared/model/working-hour-schm-h-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { String } from 'typescript-string-operations';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-self-custom-container-working-hour-d-detail',
  templateUrl: './self-custom-container-working-hour-d-detail.component.html'
})
export class SelfCustomContainerWorkingHourDDetailComponent implements OnInit {

  workingHourSchmHId: any;
  isActive: boolean = true;
  workingHourSchmHObj: WorkingHourSchmHObj;
  workingHourSchmDObj: WorkingHourSchmDObj;
  listWorkingHourSchmDObj: ListWorkingHourSchmDObj;
  isEdit: boolean = false;
  postUrl: any;
  items: any;

  listOfDay: any = [
    {
      label: 'Sunday',
      workingHourSchmDay: 'Sunday',
      workingHourFrom1: '',
      workingHourTo1: '',
      workingHourFrom2: '',
      workingHourTo2: ''
    },
    {
      label: 'Monday',
      workingHourSchmDay: 'Monday',
      workingHourFrom1: '',
      workingHourTo1: '',
      workingHourFrom2: '',
      workingHourTo2: ''
    },
    {
      label: 'Tuesday',
      workingHourSchmDay: 'Tuesday',
      workingHourFrom1: '',
      workingHourTo1: '',
      workingHourFrom2: '',
      workingHourTo2: ''
    },
    {
      label: 'Wednesday',
      workingHourSchmDay: 'Wednesday',
      workingHourFrom1: '',
      workingHourTo1: '',
      workingHourFrom2: '',
      workingHourTo2: ''
    },
    {
      label: 'Thursday',
      workingHourSchmDay: 'Thursday',
      workingHourFrom1: '',
      workingHourTo1: '',
      workingHourFrom2: '',
      workingHourTo2: ''
    },
    {
      label: 'Friday',
      workingHourSchmDay: 'Friday',
      workingHourFrom1: '',
      workingHourTo1: '',
      workingHourFrom2: '',
      workingHourTo2: ''
    },
    {
      label: 'Saturday',
      workingHourSchmDay: 'Saturday',
      workingHourFrom1: '',
      workingHourTo1: '',
      workingHourFrom2: '',
      workingHourTo2: ''
    }
  ]

  WorkingHourSchmDForm = this.fb.group({
    items: this.fb.array([this.fb.group({
      Label: [''],
      WorkingHourSchmDay: [''],
      WorkingHourFrom1: [''],
      WorkingHourTo1: [''],
      WorkingHourFrom2: [''],
      WorkingHourTo2: ['']
    })])
  });

  readonly CancelLink: string = NavigationConstant.CS_SELF_CUSTOM_WORKING_HOUR;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.postUrl = this.UrlConstantNew.AddListWorkingHourSchmD;

    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["WorkingHourSchmHId"] != null) {
        this.workingHourSchmHId = queryParams["WorkingHourSchmHId"];
      }
    });
  }

  ngOnInit() {
    this.workingHourSchmHObj = new WorkingHourSchmHObj();
    this.workingHourSchmHObj.WorkingHourSchmHId = this.workingHourSchmHId;
    this.items = this.WorkingHourSchmDForm.get('items') as FormArray;
    this.http.post(this.UrlConstantNew.GetListWorkingHourSchmDByWorkingHourHId, {Id : this.workingHourSchmHId}).subscribe(
      response => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.isEdit = true;
          for (var i = 0; i < response[CommonConstant.ReturnObj].length; i++) {
            var eachDayDetail = this.fb.group({
              Label: response[CommonConstant.ReturnObj][i].WorkingHourSchmDay,
              WorkingHourSchmDay: response[CommonConstant.ReturnObj][i].WorkingHourSchmDay,
              WorkingHourFrom1: response[CommonConstant.ReturnObj][i].WorkingHourFrom1,
              WorkingHourTo1: response[CommonConstant.ReturnObj][i].WorkingHourTo1,
              WorkingHourFrom2: response[CommonConstant.ReturnObj][i].WorkingHourFrom2,
              WorkingHourTo2: response[CommonConstant.ReturnObj][i].WorkingHourTo2
            }) as FormGroup;
            this.items.push(eachDayDetail);
          }
        } else {
          for (var i = 0; i < this.listOfDay.length; i++) {
            var eachDayDetail = this.fb.group({
              Label: this.listOfDay[i].workingHourSchmDay,
              WorkingHourSchmDay: this.listOfDay[i].workingHourSchmDay,
              WorkingHourFrom1: this.listOfDay[i].workingHourFrom1,
              WorkingHourTo1: this.listOfDay[i].workingHourTo1,
              WorkingHourFrom2: this.listOfDay[i].workingHourFrom2,
              WorkingHourTo2: this.listOfDay[i].workingHourTo2
            }) as FormGroup;
            this.items.push(eachDayDetail);
          }
        }
        this.items.removeAt(0);
      }
    );
  }

  invalidInput = [];
  onTimeChange(event, day)
  {
    if (event.target.validity == undefined || event.target.validity.valid == undefined) return;
    
    if (!event.target.validity.valid && !this.invalidInput.includes(day)) this.invalidInput.push(day);
    else if (event.target.validity.valid) this.invalidInput = this.invalidInput.filter(function(e) { return e !== day })
  }

  SaveForm() {
    if (this.invalidInput.length)
    {
      this.toastr.errorMessage(String.Format(ExceptionConstant.WORKING_HOUR_AT_DAY_MUST_COMPLETE, this.invalidInput[0]))
      return;
    }

    for (var i = 0; i < 7; i++) {
      if (this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo1"].value != "" && this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom1"].value == "")
      {
        this.toastr.errorMessage(String.Format(ExceptionConstant.WORKING_HOUR_FROM_CAN_NOT_BE_EMPTY_WHEN_THERE_IS_WORKING_HOUR_TO, CommonConstant.FROM, 1, CommonConstant.TO, 1))
        return false;
      }
      if (this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo2"].value != "" && this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value == "")
      {
        this.toastr.errorMessage(String.Format(ExceptionConstant.WORKING_HOUR_FROM_CAN_NOT_BE_EMPTY_WHEN_THERE_IS_WORKING_HOUR_TO, CommonConstant.FROM, 2, CommonConstant.TO, 2))
        return false;
      }
      if (this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom1"].value > this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo1"].value) {
        this.toastr.errorMessage(String.Format(ExceptionConstant.WORKING_HOUR_CHECKING, CommonConstant.FROM, 1, CommonConstant.GTE, CommonConstant.TO, 2))
        return false;
      }
      if (this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value > this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo2"].value) {
        this.toastr.errorMessage(String.Format(ExceptionConstant.WORKING_HOUR_CHECKING, CommonConstant.FROM, 2, CommonConstant.GTE, CommonConstant.TO, 2))
        return false;
      }

      if (this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value < this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom1"].value) {
        this.toastr.errorMessage(String.Format(ExceptionConstant.WORKING_HOUR_CHECKING, CommonConstant.FROM, 2, CommonConstant.LT, CommonConstant.FROM, 1))
        return false;
      }

      if (this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo2"].value < this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo1"].value) {
        this.toastr.errorMessage(String.Format(ExceptionConstant.WORKING_HOUR_CHECKING, CommonConstant.TO, 2, CommonConstant.LT, CommonConstant.TO, 1))
        return false;
      }
      if (this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value > this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom1"].value && this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value < this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo1"].value) {
        this.toastr.errorMessage(String.Format(ExceptionConstant.WORKING_HOUR_CHECKING, CommonConstant.FROM, 2, CommonConstant.BETWEEN, '', 1))
        return false;
      }
      if (this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom1"].value < this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value) {
        continue;
      }
    }

    this.listWorkingHourSchmDObj = new ListWorkingHourSchmDObj();
    this.listWorkingHourSchmDObj.WorkingHourSchmDObj = new Array();
    for (var i = 0; i < 7; i++) {
      this.workingHourSchmDObj = new WorkingHourSchmDObj();
      this.workingHourSchmDObj.WorkingHourSchmHId = this.workingHourSchmHId;
      this.workingHourSchmDObj.WorkingHourSchmDay = this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourSchmDay"].value;
      this.workingHourSchmDObj.WorkingHourFrom1 = this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom1"].value;
      this.workingHourSchmDObj.WorkingHourTo1 = this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo1"].value;
      this.workingHourSchmDObj.WorkingHourFrom2 = this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value;
      this.workingHourSchmDObj.WorkingHourTo2 = this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo2"].value;
      this.listWorkingHourSchmDObj.WorkingHourSchmDObj.push(this.workingHourSchmDObj);
    }
    if (this.isEdit) {
      this.postUrl = this.UrlConstantNew.EditListWorkingHourSchmD;
    }
    this.http.post(this.postUrl, this.listWorkingHourSchmDObj, AdInsConstant.SpinnerOptions).subscribe(
      response => {
        this.toastr.successMessage(response["message"]);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_SELF_CUSTOM_WORKING_HOUR],{});
      }
    );
  }

}
