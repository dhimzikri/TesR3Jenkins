import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CabinetWithListRackObj } from 'app/shared/model/document-management/cabinet-with-list-rack-obj.model';
import { RackWithListFilingObj } from 'app/shared/model/document-management/rack-with-list-filing-obj.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-filing-paging',
  templateUrl: './filing-paging.component.html'
})
export class FilingPagingComponent implements OnInit {
  Cabinet: CabinetWithListRackObj = new CabinetWithListRackObj();
  Rack: RackWithListFilingObj = new RackWithListFilingObj();
  GetCabinetAndListRackByCabinetCode: GenericObj = new GenericObj();

  readonly CancelLink: string = NavigationConstant.DOC_MNGMNT_RACK_PAGING;
  readonly AddLink: string = NavigationConstant.DOC_MNGMNT_FILING_ADD_EDIT;
  readonly EditLink: string = NavigationConstant.BACK_TO_ADD_EDIT;
  constructor(private http: HttpClient, private router: Router, private activeRoute: ActivatedRoute, private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew) { 
    this.activeRoute.queryParams.subscribe(
      params => {
        if(params['RackCode'] !== null && params['CabinetCode'] !== null) {
          this.Rack.RackCode = params['RackCode'],
          this.Cabinet.CabinetCode = params['CabinetCode']
        }
        else {
          this.router.navigateByUrl(NavigationConstant.DOC_MNGMNT_RACK_PAGING)
        }
      }
    );
  }

  ngOnInit() {
    this.GetCabinetAndListRackByCabinetCode.Code = this.Cabinet.CabinetCode;
    this.http.post<CabinetWithListRackObj>(this.UrlConstantNew.GetCabinetAndListRackByCabinetCode, this.GetCabinetAndListRackByCabinetCode).subscribe(
      (response) => {
        this.Cabinet = response;
        this.http.post<RackWithListFilingObj>(this.UrlConstantNew.GetRackAndListFilingByRackCodeAndCabinetCode, {RackCode: this.Rack.RackCode, CabinetCode: this.Cabinet.CabinetCode}).subscribe(
          (response) => {
            this.Rack = response;
    
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editRack(index){
    let filingCode = this.Rack.ListFiling[index].FilingCode;
    this.router.navigate([NavigationConstant.DOC_MNGMNT_FILING_ADD_EDIT], { queryParams: { FilingCode: filingCode, Mode: 'Edit' } });
  }
}