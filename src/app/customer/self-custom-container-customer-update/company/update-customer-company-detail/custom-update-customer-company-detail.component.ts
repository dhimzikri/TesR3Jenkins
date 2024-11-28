import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { UpdateCustCompanyDetailObj } from 'app/shared/model/update-master-cust/update-cust-company-detail-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CookieService } from 'ngx-cookie';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-custom-update-customer-company-detail',
  templateUrl: './custom-update-customer-company-detail.component.html',
})
export class CustomUpdateCustomerCompanyDetailComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Output() ResponseTab: EventEmitter<any>;
  @Output() next: EventEmitter<any> = new EventEmitter<any>();
  AppCustCompanyDetail: UpdateCustCompanyDetailObj;
  ReqCustDataTrxIdObj: GenericObj = new GenericObj();
  AppIndustryName: string;
  IndustryLookupObj: InputLookupObj;
  businessDtMax: Date;

  CustomerDetailForm = this.fb.group({
    CustCompanyId: [0],
    RefIndustryTypeId: [0, [Validators.required]],
    NumOfEmp: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
    EstablishmentDt: ['', [Validators.required]],
    RowVersion: ['']
  });

  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.AppCustCompanyDetail = new UpdateCustCompanyDetailObj();
    this.ResponseTab = new EventEmitter<any>();
    this.IndustryLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.IndustryLookupObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.IndustryLookupObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.IndustryLookupObj.genericJson = "./assets/lookup/lookupIndustryType.json";
  }

  ngOnInit() {
    var datePipe = new DatePipe("en-US");
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMax = new Date(context[CommonConstant.BUSINESS_DT]);
    this.ReqCustDataTrxIdObj.Id = this.CustDataTrxId;
    this.http.post(this.UrlConstantNew.GetCustCompanyDataForUpdateMasterCustCompany, this.ReqCustDataTrxIdObj).pipe(
      map((response) => {
        response["AppCustCompany"]["EstablishmentDt"] = datePipe.transform(response["AppCustCompany"]["EstablishmentDt"], "yyyy-MM-dd");
        response["MasterCustCompany"]["EstablishmentDt"] = datePipe.transform(response["MasterCustCompany"]["EstablishmentDt"], "yyyy-MM-dd");
        this.AppCustCompanyDetail = {...response["AppCustCompany"]};
        this.CustomerDetailForm.patchValue({...response["MasterCustCompany"]});
        return response;
      }),
      mergeMap((response) => {
        let getMasterIndustry = this.http.post(this.UrlConstantNew.GetRefIndustryTypeById, { Id: response["MasterCustCompany"]["RefIndustryTypeId"] });
        let getAppIndustry = this.http.post(this.UrlConstantNew.GetRefIndustryTypeById, { Id: response["AppCustCompany"]["RefIndustryTypeId"] });
        return forkJoin([getMasterIndustry, getAppIndustry]);
      })
    ).toPromise().then(
      (response) => {
        this.IndustryLookupObj.nameSelect = response[0]["IndustryTypeName"];
        this.AppIndustryName = response[1]["IndustryTypeName"];
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  getIndustry(e){
    this.CustomerDetailForm.patchValue({
      RefIndustryTypeId: e.RefIndustryTypeId
    });
  }

  CopyAllHandler(){
    var obj = new Object();
    for (const key in this.AppCustCompanyDetail) {
      if(key == "CustCompanyId" || key == "RowVersion"){
        continue;
      }
      else{
        // if(this.AppCustCompanyDetail[key]){
          obj[key] = this.AppCustCompanyDetail[key];
        // }
      }
    }
    this.CustomerDetailForm.patchValue(obj);
    this.IndustryLookupObj.isReady = false;
    this.IndustryLookupObj.nameSelect = this.AppIndustryName;
    this.IndustryLookupObj.isReady = true;
    this.CustomerDetailForm.get("IndustryLookup").patchValue({
      value: this.AppIndustryName
    });
  }

  CopyHandler(formControlName){
    var obj = new Object();
    obj[formControlName] = this.AppCustCompanyDetail[formControlName];
    this.CustomerDetailForm.patchValue(obj);

    if(formControlName == "RefIndustryTypeId"){
      this.CustomerDetailForm.get("IndustryLookup").patchValue({
        value: this.AppIndustryName
      });
    }
  }

  back(){
    // this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_UPDATE_DATA_PAGING], {});
  }

  SaveValue(){
    this.http.post(this.UrlConstantNew.UpdateMasterCustCompanyDetail, this.CustomerDetailForm.value, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
        const actions = [
          {
            'result': {
              'type': 'function',
              'target': 'self',
              'alias': '',
              'methodName': 'NextStep',
              'params': []
            },
            'conditions': []
          }
        ];

        this.next.emit({Actions: actions});
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

}
