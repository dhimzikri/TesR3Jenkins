import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-detail-license',
  templateUrl: './detail-license.component.html',
  styleUrls: ['./detail-license.component.css']
})
export class DetailLicenseComponent implements OnInit {

  systemName : any;
  licenseType : any;
  status : any;
  modules : any;
  LicenseData : any;
  readonly CancelLink: string = NavigationConstant.LICENSE_PAGING;
  constructor(private route: ActivatedRoute, private toastr: NGXToastrService, private http: HttpClient, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.systemName = queryParams["systemName"];
      this.licenseType = queryParams["licenseType"];
      this.status = queryParams["status"];   
      this.modules = queryParams["modules"]   
    })
   }

  ngOnInit() {
    var LicenseObj = { SystemName : this.systemName, LicenseType : this.licenseType, Module : ""};

    this.http.post(this.UrlConstantNew.RetrieveLicenseDetail, LicenseObj).subscribe(
      (response) => {
        this.LicenseData = response;
        console.log(this.LicenseData);
        this.toastr.successMessage(response['message']);
      }
    );
  }

}
