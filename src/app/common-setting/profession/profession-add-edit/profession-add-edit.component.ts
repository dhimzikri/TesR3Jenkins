import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RefProfessionObj } from 'app/shared/model/ref-profession-obj.model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-profession-add-edit',
  templateUrl: './profession-add-edit.component.html',
  //providers: [NGXToastrService]
})
export class ProfessionAddEditComponent implements OnInit {

  pageType: string = "add";
  refProfessionId: any;
  refProfessionObj: RefProfessionObj;
  resultData: any;
  allRefProfessionMethod: any;
  refCustModelCode: any;
  custModelReqObj: ReqRefMasterByTypeCodeAndMappingCodeObj;
  RefProfessionForm = this.fb.group({
    ProfessionCode: ['', [Validators.required, Validators.maxLength(50)]],
    ProfessionName: ['', [Validators.required, Validators.maxLength(100)]],
    MrCustModelCode: ['', [Validators.required, Validators.maxLength(50)]],
    RegRptCode: ['', Validators.maxLength(50)]
  });

  readonly CancelLink: string = NavigationConstant.CS_PROFESSION_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
   

    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["mode"] != null) {
        this.pageType = queryParams["mode"];
      }
      if (queryParams["refProfessionId"] != null) {
        this.refProfessionId = queryParams["refProfessionId"];
      }
    });
  }

  ngOnInit() {
    this.http.post(this.UrlConstantNew.GetListActiveRefMasterByRefMasterTypeCode, { Code: CommonConstant.RefMasterTypeCodeCustModel }).subscribe(
      (response) => {
        this.allRefProfessionMethod = response["RefMasterObjs"];
        if (this.allRefProfessionMethod.length > 0) {
          this.RefProfessionForm.patchValue({ MrCustModelCode: this.allRefProfessionMethod[0].MasterCode });
        }
      });

    if (this.pageType == "edit") {
      this.RefProfessionForm.controls["ProfessionCode"].disable();
      this.refProfessionObj = new RefProfessionObj();
      this.refProfessionObj.RefProfessionId = this.refProfessionId;
      this.http.post(this.UrlConstantNew.GetRefProfessionById, {Id : this.refProfessionId}).subscribe(
        response => {
          this.resultData = response;
          this.RefProfessionForm.patchValue({
            ProfessionCode: this.resultData.ProfessionCode,
            ProfessionName: this.resultData.ProfessionName,
            MrCustModelCode: this.resultData.MrCustModelCode,
            RegRptCode: this.resultData.RegRptCode
          });

        }
      );
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.refProfessionObj = new RefProfessionObj();
      this.refProfessionObj.ProfessionCode = this.RefProfessionForm.controls["ProfessionCode"].value
      this.refProfessionObj.ProfessionName = this.RefProfessionForm.controls["ProfessionName"].value;
      this.refProfessionObj.MrCustModelCode = this.RefProfessionForm.controls["MrCustModelCode"].value;
      this.refProfessionObj.RegRptCode = this.RefProfessionForm.controls["RegRptCode"].value;
      this.http.post(this.UrlConstantNew.AddRefProfession, this.refProfessionObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_PROFESSION_PAGING],{});
        }
      );
    } else {
      this.refProfessionObj = this.resultData;
      this.refProfessionObj.RefProfessionId = this.refProfessionId;
      this.refProfessionObj.ProfessionName = this.RefProfessionForm.controls["ProfessionName"].value;
      this.refProfessionObj.MrCustModelCode = this.RefProfessionForm.controls["MrCustModelCode"].value;
      this.refProfessionObj.RegRptCode = this.RefProfessionForm.controls["RegRptCode"].value;
      this.http.post(this.UrlConstantNew.EditRefProfession, this.refProfessionObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_PROFESSION_PAGING],{});
        }
      );
    }
  }
}
