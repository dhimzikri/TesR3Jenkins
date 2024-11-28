import { NgxRouterService } from '@adins/fe-core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';

@Component({
  selector: 'app-coa-scheme-view',
  templateUrl: './coa-scheme-view.component.html'
})
export class CoaSchemeViewComponent implements OnInit {
  coaSchmId: string = '';
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  ListProd: Array<any> = new Array<any>();

  constructor(private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['CoaSchmId'] != null) {
        this.coaSchmId = queryParams['CoaSchmId'];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/common-setting/view-coa-scheme-information.json";
  }
}