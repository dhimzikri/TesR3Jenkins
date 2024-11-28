import { Component, OnInit } from "@angular/core";
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";
import { UcPagingObj } from "app/shared/model/uc-paging-obj.model";
@Component({
  selector: "app-vendor-grading-request-paging",
  templateUrl: "./vendor-grading-request-paging.component.html",
})
export class VendorGradingRequestPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  mode: string;
  constructor(private UrlConstantNew: UrlConstantNew) {
  }

  ngOnInit(): void {

    this.inputPagingObj.pagingJson = "./assets/ucpaging/dealer-grading/searchDealerGradingRequest.json";
    this.inputPagingObj._url = "./assets/ucpaging/dealer-grading/searchDealerGradingRequest.json";
  }
}
