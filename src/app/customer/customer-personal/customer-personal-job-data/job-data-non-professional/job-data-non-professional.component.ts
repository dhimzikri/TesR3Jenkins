import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { CustPersonalJobDataObj } from 'app/shared/model/cust-personal-job-data-obj.model';
import { RequestCustPersonalJobDataObj } from 'app/shared/model/request-cust-personal-job-data-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-job-data-non-professional',
  templateUrl: './job-data-non-professional.component.html',
  styleUrls: []
})
export class JobDataNonProfessionalComponent implements OnInit {
  @Input() IsReset: boolean = false;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  jobDataId: any;
  typePage: string;
  rowVersion: string
  IdCust: number;
  IdCustPersonal: number;
  custObj: any;
  objCust: CustObj;
  tempProfession: number;
  professionLookUpObj: InputLookupObj;
  custPersonalJobDataObj: CustPersonalJobDataObj;
  returnCustJobDataObj: any;
  reqCustPersonalJobDataObj: RequestCustPersonalJobDataObj;
  returnRefProfessionObj: any;
  JobDataNonProForm = this.fb.group({
    JobDataType: [''],
    ProfessionName: [''],
    JobTitleName: ['']
  });

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["IdCust"] != null) {
        this.IdCust = queryParams["IdCust"];
      }
      if (queryParams["IdCustPersonal"] != null) {
        this.IdCustPersonal = queryParams["IdCustPersonal"];
      }
    });
  }

  getLookUpProfession(event) {
    this.tempProfession = event.RefProfessionId;
  }

  ngOnInit() {
    this.professionLookUpObj = new InputLookupObj(this.UrlConstantNew);
    this.professionLookUpObj.isRequired = false;
    this.professionLookUpObj.urlJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.pagingJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.genericJson = "./assets/lookup/lookupCustomerProfession.json";

    let listCriteriaObj: Array<CriteriaObj> = new Array();
    let criteriaCustObj = new CriteriaObj();
    criteriaCustObj.DataType = "text";
    criteriaCustObj.restriction = AdInsConstant.RestrictionEq;
    criteriaCustObj.propName = 'MR_CUST_MODEL_CODE';
    criteriaCustObj.value = CommonConstant.CUST_MODEL_NONPROF;
    listCriteriaObj.push(criteriaCustObj);
    this.professionLookUpObj.addCritInput = listCriteriaObj;


    this.objCust = new CustObj();
    this.objCust.CustId = this.IdCust;
    this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: this.IdCust }).subscribe(
      (response) => {
        this.custObj = response;
      });

    this.http.post(this.UrlConstantNew.GetCustPersonalJobDataByCustId, { Id: this.IdCust }).subscribe(
      (response: any) => {
        this.returnCustJobDataObj = response;

        if (this.returnCustJobDataObj.CustPersonalJobDataId != 0) {
          this.JobDataNonProForm.patchValue({
            JobTitleName: this.returnCustJobDataObj.JobTitleName,
          });


          if (!this.IsReset && this.returnCustJobDataObj.RefProfessionId) {
            this.http.post(this.UrlConstantNew.GetRefProfessionById, { Id: this.returnCustJobDataObj.RefProfessionId }).subscribe(
              (response) => {
                this.returnRefProfessionObj = response;

                this.professionLookUpObj.nameSelect = this.returnRefProfessionObj.ProfessionName;
                this.professionLookUpObj.jsonSelect = this.returnRefProfessionObj;
                this.tempProfession = this.returnRefProfessionObj.RefProfessionId;
              });
          }

          this.jobDataId = this.returnCustJobDataObj.CustPersonalJobDataId;
          this.rowVersion = this.returnCustJobDataObj.RowVersion;
          this.typePage = "edit";
        }
      });
  }

  // back(){
  //   this.outputTab.emit({ stepMode: "previous"});
  // }

  async SaveForm(IsParent: boolean = false): Promise<boolean> {
    if (this.JobDataNonProForm.invalid) {
      NewCustSetData.markFormGroupTouched(this.JobDataNonProForm);
      return false;
    }
    if (this.typePage == "edit") {
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.custPersonalJobDataObj = new CustPersonalJobDataObj;
      this.custPersonalJobDataObj.CustPersonalJobDataId = this.jobDataId;
      this.custPersonalJobDataObj.CustId = this.IdCust;
      this.custPersonalJobDataObj.RefProfessionId = this.tempProfession;
      this.custPersonalJobDataObj.JobTitleName = this.JobDataNonProForm.controls["JobTitleName"].value;
      this.custPersonalJobDataObj.RowVersion = this.rowVersion;
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.reqCustPersonalJobDataObj.CustPersonalJobData.MrCustModelCode = CommonConstant.CUST_MODEL_NONPROF;

      await this.http.post(this.UrlConstantNew.EditCustPersonalJobData, this.reqCustPersonalJobDataObj, AdInsConstant.SpinnerOptions).toPromise().then(
        (response) => {
          this.toastr.successMessage(response["message"]);
          // this.router.navigate(
          //   ["/Customer/CustomerPersonal/Address"], 
          //   { queryParams: { "IdCust": this.IdCust }}
          //   );
          if (!IsParent) this.outputTab.emit({ stepMode: "next" });
        }
      );
    } else {
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.custPersonalJobDataObj = new CustPersonalJobDataObj;
      this.custPersonalJobDataObj.CustId = this.IdCust;
      this.custPersonalJobDataObj.RefProfessionId = this.tempProfession;
      this.custPersonalJobDataObj.JobTitleName = this.JobDataNonProForm.controls["JobTitleName"].value;
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.reqCustPersonalJobDataObj.CustPersonalJobData.MrCustModelCode = CommonConstant.CUST_MODEL_NONPROF;

      await this.http.post(this.UrlConstantNew.AddCustPersonalJobData, this.reqCustPersonalJobDataObj, AdInsConstant.SpinnerOptions).toPromise().then(
        (response) => {
          this.toastr.successMessage(response["message"]);
          // this.router.navigate(
          //   ["/Customer/CustomerPersonal/Address"], 
          //   { queryParams: { "IdCust": this.IdCust }}
          //   );
          if (!IsParent) this.outputTab.emit({ stepMode: "next" });
        }
      );
    }
    return true;
  }
}
