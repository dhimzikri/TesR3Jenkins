import { UcPagingObj, WhereValueObj } from "app/shared/model/uc-paging-obj.model";
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";

@Component({
  selector: 'app-vendor-grading-inquiry-paging',
  templateUrl: './vendor-grading-inquiry-paging.component.html',
})
export class VendorGradingInquiryPagingComponent implements OnInit {
  inputPagingObj: any;
  mode: string;
  constructor(
    private route: ActivatedRoute,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.route.queryParams.subscribe((params) => {});
  }

  ngOnInit(): void {
    this.inputPagingObj = new UcPagingObj(this.UrlConstantNew);

    this.inputPagingObj.pagingJson =
      "./assets/ucpaging/dealer-grading/searchDealerGradingInquiry.json";
    this.inputPagingObj._url =
      "./assets/ucpaging/dealer-grading/searchDealerGradingInquiry.json";
  }
}
