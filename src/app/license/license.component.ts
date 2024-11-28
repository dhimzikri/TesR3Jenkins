import { Component, OnInit } from '@angular/core';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {

  LicenseData : any;
  Licenses : any;
  IsOverflow: boolean = false;
  readonly AddLink: string = NavigationConstant.UPLOAD_LICENSE;
  readonly DetailLink: string = NavigationConstant.DETAIL_LICENSE;
  constructor(private toastr: NGXToastrService, private http: HttpClient, private router: Router, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {

    var LicenseObj = { SystemName : "", LicenseType :"", Module:""};

    this.http.post(this.UrlConstantNew.GetLicenses, LicenseObj).subscribe(
      (response) => {
        this.LicenseData = response;
        this.Licenses = this.LicenseData.Licenses;
        console.log(this.LicenseData);
        console.log("license", this.Licenses);
        this.toastr.successMessage(response['message']);
      }
    );
  }

}
