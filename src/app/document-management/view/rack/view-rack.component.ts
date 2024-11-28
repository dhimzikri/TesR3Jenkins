import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-view-rack',
  templateUrl: './view-rack.component.html'
})
export class ViewRackComponent implements OnInit {
  RackCode: string;
  CabinetCode: string;
  responseFiling: Array<any> = new Array();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['RackCode'] != null) {
        this.RackCode = queryParams['RackCode'];
      }
      if (queryParams['CabinetCode'] != null) {
        this.CabinetCode = queryParams['CabinetCode'];
      }
    });

    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/document-management/viewRack.json";

    this.http.post(this.UrlConstantNew.GetListFilingByRackCodeAndCabinetCode, {RackCode: this.RackCode, CabinetCode: this.CabinetCode}).subscribe(
      response => {
        this.responseFiling = response['ReturnObject'];
      },
      error => {
        this.router.navigateByUrl(NavigationConstant.ERROR);
      }
    );
  }
}