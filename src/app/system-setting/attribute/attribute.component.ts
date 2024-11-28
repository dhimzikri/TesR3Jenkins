 
import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html'
})
export class AttributeComponent implements OnInit {

 
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.SYSTEM_SETTING_ATTR_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchRefAttr.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRefAttr.json";
  }

}
