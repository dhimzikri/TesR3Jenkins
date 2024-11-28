import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-role-paging',
  templateUrl: './role-paging.component.html',
  providers: [NgbPaginationConfig]
})
export class RolePagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.SYSTEM_SETTING_ROLE_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) {
  }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchRefRole.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRefRole.json";
  }
}
