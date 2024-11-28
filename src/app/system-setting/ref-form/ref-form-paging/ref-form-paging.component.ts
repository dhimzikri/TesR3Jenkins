import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-ref-form-paging',
  templateUrl: './ref-form-paging.component.html',
  styleUrls: ['./ref-form-paging.component.scss']
})
export class RefFormPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.SYSTEM_SETTING_REF_FORM_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) { }


  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchRefForm.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRefForm.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteRefFormData;
    
  }
}
