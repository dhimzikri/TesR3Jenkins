import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { FormBuilder, Validators } from '@angular/forms';
import { WorkingHourSchmHObj } from 'app/shared/model/working-hour-schm-h-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-working-hour-h-detail',
  templateUrl: './working-hour-h-detail.component.html',
 // providers: [NGXToastrService]
})

export class WorkingHourHDetailComponent implements OnInit {
  
  pageType: any = "add";
  workingHourSchmHId: any;
  workingHourSchmHObj: WorkingHourSchmHObj;
  resultData: any;

  WorkingHourSchmHForm = this.fb.group({
    WorkingHourSchmCode: ['', [Validators.required, Validators.maxLength(50)]],
    WorkingHourSchmName: ['', [Validators.required, Validators.maxLength(100)]],
    IsActive: [true]
  });

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

  readonly CancelLink: string = NavigationConstant.CS_WORKING_HOUR;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) { 
    
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["param"] != null) {
        this.pageType = queryParams["param"];
      }else{
        this.pageType = "add";
      }
      if (queryParams["workingHourSchmHId"] != null) {
        this.workingHourSchmHId = queryParams["workingHourSchmHId"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.WorkingHourSchmHForm.controls["WorkingHourSchmCode"].disable();
      this.workingHourSchmHObj = new WorkingHourSchmHObj();
      this.workingHourSchmHObj.WorkingHourSchmHId = this.workingHourSchmHId;
      this.http.post(this.UrlConstantNew.GetWorkingHourSchmHById, {Id : this.workingHourSchmHId}).subscribe(
        response => {
          this.resultData = response;
          this.WorkingHourSchmHForm.patchValue({
            WorkingHourSchmCode: this.resultData.WorkingHourSchmCode,
            WorkingHourSchmName: this.resultData.WorkingHourSchmName,
            IsActive: this.resultData.IsActive
          });
        }
      );
      // this.http.post(this.api2Url, this.workingHourSchmHObj).subscribe(
      //   response => {
      //     this.listOfDay = new Array();
      //     for (var i = 0; i < response["returnObject"].length; i++) {
      //       var eachDayDetail = {
      //         label: response["returnObject"][i].workingHourSchmDay,
      //         workingHourSchmDay: response["returnObject"][i].workingHourSchmDay,
      //         workingHourFrom1:response["returnObject"][i].workingHourFrom1,
      //         workingHourTo1: response["returnObject"][i].workingHourTo1,
      //         workingHourFrom2: response["returnObject"][i].workingHourFrom2,
      //         workingHourTo2: response["returnObject"][i].workingHourTo2
      //       }
      //       this.listOfDay.push(eachDayDetail);
      //     }
      //   }
      // );
    }
  }
 
  SaveForm() {
    // var arrWHSchmD = new Array();
    // for (var i = 0; i < this.listOfDay.length; i++) {
    //     var listworkingHourSchmD = new WorkingHourSchmDObj();
    //     listworkingHourSchmD.workingHourSchmHId = this.workingHourSchmHId;
    //     listworkingHourSchmD.workingHourSchmDay = this.listOfDay[i].workingHourSchmDay;
    //     listworkingHourSchmD.workingHourFrom1 = this.listOfDay[i].workingHourFrom1;
    //     listworkingHourSchmD.workingHourTo1 = this.listOfDay[i].workingHourTo1;
    //     listworkingHourSchmD.workingHourFrom2 = this.listOfDay[i].workingHourFrom2;
    //     listworkingHourSchmD.workingHourTo2 = this.listOfDay[i].workingHourTo2;
    //     arrWHSchmD.push(listworkingHourSchmD);
    // }

    if (this.pageType == "add") {
      // var WorkingHourSchm = {
      //   WorkingHourSchmH: this.workingHourSchmHObj,
      //   WorkingHourSchmD: arrWHSchmD
      // };
      this.workingHourSchmHObj = new WorkingHourSchmHObj();
      this.workingHourSchmHObj.WorkingHourSchmCode = this.WorkingHourSchmHForm.controls["WorkingHourSchmCode"].value;
      this.workingHourSchmHObj.WorkingHourSchmName = this.WorkingHourSchmHForm.controls["WorkingHourSchmName"].value;
      this.workingHourSchmHObj.IsActive = this.WorkingHourSchmHForm.controls["IsActive"].value;
      this.http.post(this.UrlConstantNew.AddWorkingHourSchmH, this.workingHourSchmHObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_WORKING_HOUR],{});
        }
      );
    } else {
      this.workingHourSchmHObj = this.resultData;
      this.workingHourSchmHObj.WorkingHourSchmName = this.WorkingHourSchmHForm.controls["WorkingHourSchmName"].value;
      this.workingHourSchmHObj.IsActive = this.WorkingHourSchmHForm.controls["IsActive"].value;
      this.http.post(this.UrlConstantNew.EditWorkingHourSchmH, this.workingHourSchmHObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_WORKING_HOUR],{});
        }
      );
    }
  }
}
