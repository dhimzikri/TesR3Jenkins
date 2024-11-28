import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';

@Component({
  selector: 'app-office-zipcode-member',
  templateUrl: './office-zipcode-member.component.html'
})
export class OfficeZipcodeMemberComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  constructor(private UrlConstantNew: UrlConstantNew) {
  }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/search/searchOfficeZipcodeMember.json";
    this.inputPagingObj.pagingJson = "./assets/search/searchOfficeZipcodeMemberGridPaging.json"
  }
  
}
