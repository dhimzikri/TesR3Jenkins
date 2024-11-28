import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ActivatedRoute } from '@angular/router';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-self-custom-new-cust-header',
  templateUrl: './self-custom-new-cust-header.component.html'

})

export class SelfCustomNewCustHeaderComponent implements OnInit {

  pageName: string;

  from:string;

  @Input() CustId: number = 0;
  @Input() CustType: string = CommonConstant.CustomerPersonal;

  constructor(private UrlConstantNew: UrlConstantNew, private http: HttpClient, private route: ActivatedRoute,
    private ngxRouter: NgxRouterService) {

    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["MrCustTypeCode"] == CommonConstant.CustTypePersonal && (queryParams["From"] == CommonConstant.CustFromCustFamily || queryParams["CustDataMode"] == CommonConstant.CustMainDataModeFamily)) {

        this.pageName = "CustomerFamilyMainDataRegistrationV2"
        return;
      }

      if (queryParams["From"] == CommonConstant.CustFromCustShareholder) {

        this.pageName = "Customershareholderdetail"
        return;
      }

      if (queryParams["From"] != CommonConstant.CustFromCustFamily && queryParams["From"] != CommonConstant.CustFromCustShareholder) {

        this.pageName = "CustomerMainDataRegistrationV2"
        return;
      }
    });
  }

  ngOnInit(): void {
  }
}
