import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-surveyor-paging',
  templateUrl: './surveyor-paging.component.html'
})
export class SurveyorPagingComponent implements OnInit {
  readonly AddLink: string = NavigationConstant.SURVEYOR_ADD;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyor.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyor.json";
  }
}