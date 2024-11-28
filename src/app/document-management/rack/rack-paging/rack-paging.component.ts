import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CabinetWithListRackObj } from 'app/shared/model/document-management/cabinet-with-list-rack-obj.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-rack-paging',
  templateUrl: './rack-paging.component.html'
})
export class RackPagingComponent implements OnInit {
  Cabinet: CabinetWithListRackObj = new CabinetWithListRackObj();

  readonly CancelLink: string = NavigationConstant.DOC_MNGMNT_CABINET_PAGING;
  readonly AddLink: string = NavigationConstant.DOC_MNGMNT_RACK_ADD_EDIT;
  readonly ViewLink: string = NavigationConstant.DOC_MNGMNT_VIEW_RACK;
  readonly FilingLink: string = NavigationConstant.DOC_MNGMNT_FILING_PAGING;
  readonly EditLink: string = NavigationConstant.BACK_TO_ADD_EDIT;
  constructor(private http: HttpClient,
    private router: Router,
    private activeRoute: ActivatedRoute, 
    private UrlConstantNew: UrlConstantNew) { 
    this.activeRoute.queryParams.subscribe(
      params => {
        if(params['CabinetCode'] !== null){
          this.Cabinet.CabinetCode = params['CabinetCode']
        }
        else{
          this.router.navigateByUrl(NavigationConstant.DOC_MNGMNT_CABINET_PAGING)
        }
      }
    );
  }

  ngOnInit() {
    this.http.post<CabinetWithListRackObj>(this.UrlConstantNew.GetCabinetAndListRackByCabinetCode, {Code: this.Cabinet.CabinetCode}).subscribe(
      (response) => {
        this.Cabinet = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editRack(index){
    let rackCode = this.Cabinet.ListRack[index].RackCode;
    this.router.navigate([NavigationConstant.DOC_MNGMNT_RACK_ADD_EDIT], { queryParams: { RackCode: rackCode, Mode: 'Edit' } });
  }
}