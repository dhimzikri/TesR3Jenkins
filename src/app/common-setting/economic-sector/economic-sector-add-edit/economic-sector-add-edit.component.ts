import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { RefEconomicSectorObj } from 'app/shared/model/ref-economic-sector-obj.model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-economic-sector-add-edit',
  templateUrl: './economic-sector-add-edit.component.html',
})
export class EconomicSectorAddEditComponent implements OnInit {
  title: string = "Economic Sector Add"
  pageType: string = "add";
  RefEconomicSectorId: number;
  refEconomicSectorObj: RefEconomicSectorObj;
  resultData: any;
  RefEconomicSectorForm = this.fb.group({
    EconomicSectorCode: ['', [Validators.required, Validators.maxLength(50)]],
    EconomicSectorName: ['', [Validators.required, Validators.maxLength(100)]],
    RegRptCode: ['', Validators.maxLength(100)],
    IsActive: [true]
  });

  readonly CancelLink: string = NavigationConstant.CS_ECONOMIC_SECTOR_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, 
    private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["mode"] != null) {
        this.pageType = queryParams["mode"];
      }
      if (queryParams["RefEconomicSectorId"] != null) {
        this.RefEconomicSectorId = queryParams["RefEconomicSectorId"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.title = "Economic Sector Edit"
      this.RefEconomicSectorForm.controls["EconomicSectorCode"].disable();
      this.refEconomicSectorObj = new RefEconomicSectorObj();
      this.refEconomicSectorObj.RefEconomicSectorId = this.RefEconomicSectorId;
      this.http.post(this.UrlConstantNew.GetRefEconomicSectorById, {Id: this.RefEconomicSectorId}).subscribe(
        response => {
          this.resultData = response;
          this.RefEconomicSectorForm.patchValue({
            EconomicSectorCode: this.resultData.EconomicSectorCode,
            EconomicSectorName: this.resultData.EconomicSectorName,
            RegRptCode: this.resultData.RegRptCode,
            IsActive: this.resultData.IsActive
          });

        }
      );
    }else{
      this.checkIsAutoFormNoFromSetting('ES');
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.refEconomicSectorObj = new RefEconomicSectorObj();
      this.refEconomicSectorObj.EconomicSectorCode = this.RefEconomicSectorForm.controls["EconomicSectorCode"].value
      this.refEconomicSectorObj.EconomicSectorName = this.RefEconomicSectorForm.controls["EconomicSectorName"].value;
      this.refEconomicSectorObj.RegRptCode = this.RefEconomicSectorForm.controls["RegRptCode"].value;
      this.refEconomicSectorObj.IsActive = this.RefEconomicSectorForm.controls["IsActive"].value;
      this.http.post(this.UrlConstantNew.AddRefEconomicSector, this.refEconomicSectorObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
            this.toastr.successMessage(response["Message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_ECONOMIC_SECTOR_PAGING],{});         
        }
      );
    } else {
      this.refEconomicSectorObj = this.resultData;
      this.refEconomicSectorObj.RefEconomicSectorId = this.RefEconomicSectorId;
      this.refEconomicSectorObj.EconomicSectorName = this.RefEconomicSectorForm.controls["EconomicSectorName"].value;
      this.refEconomicSectorObj.RegRptCode = this.RefEconomicSectorForm.controls["RegRptCode"].value;
      this.refEconomicSectorObj.IsActive = this.RefEconomicSectorForm.controls["IsActive"].value;
      this.http.post(this.UrlConstantNew.EditRefEconomicSector, this.refEconomicSectorObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_ECONOMIC_SECTOR_PAGING],{});  
        }
      );
    }
  }

  
  //check is automatic/not form no 4
  isAuto: boolean = false;
  checkIsAutoFormNoFromSetting(msAutoGenCode: any) {
    var generalSettingObj = {
      rowVersion: "",
      code: "MASTER_AUTO_GNRT_CODE"
    }
    var result: any;
    this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, generalSettingObj).subscribe(
      (response) => {
        result = response;

        if (result.GsValue != undefined && result.GsValue != "") {
          if (result.GsValue.split(';').find(x => x == msAutoGenCode)) {
            this.isAuto = true;
            //patch value form no
            this.RefEconomicSectorForm.patchValue({
              EconomicSectorCode: '-'
            });
          }
        }
      });
  }
  //check is automatic/not form no 4
  
}
