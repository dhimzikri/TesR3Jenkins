import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from '../../shared/model/uc-paging-obj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-ref-job-title',
  templateUrl: './ref-job-title.component.html',
  providers: [DecimalPipe] // add NgbPaginationConfig to the component providers

})
export class RefJobTitleComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/search/searchJobTitle.json";
    this.inputPagingObj.pagingJson = "./assets/search/searchJobTitle.json";
  }
}
