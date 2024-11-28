import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-ho-bank-info',
  templateUrl: './ho-bank-info.component.html'
})
export class HoBankInfoComponent implements OnInit {
VendorId: any;
ListData : any = new Array();

  constructor(private route: ActivatedRoute,  private http: HttpClient, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VendorId = queryParams['VendorId'];
    });
  }

  ngOnInit() {    

    this.http.post(this.UrlConstantNew.GetListVendorBankAccByVendorId, {Id : this.VendorId}).subscribe(
      (response) => {
        this.ListData = response[CommonConstant.ReturnObj];
      }
    ); 
  }
}
