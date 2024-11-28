import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
@Component({
  selector: 'app-industry-type-category-paging',
  templateUrl: './industry-type-category-paging.component.html'
})
export class IndustryTypeCategoryPagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
  this.inputPagingObj._url = "./assets/search/searchIndustryTypeCategory.json";
    this.inputPagingObj.pagingJson = "./assets/search/searchIndustryTypeCategory.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteRefIndustryType;
  }

}
