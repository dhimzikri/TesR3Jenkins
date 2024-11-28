import { NgxRouterService } from '@adins/fe-core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorService } from 'app/vendor/vendor.service';

@Component({
  selector: 'app-vendor-ho-info',
  templateUrl: './vendor-ho-info.component.html'
})
export class VendorHoInfoComponent implements OnInit {
  VendorId: any;
  MrVendorCategoryCode: string = "";
  
  constructor(private route: ActivatedRoute, private vendorService: VendorService, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VendorId = queryParams['VendorId'];
    });
  }

  ngOnInit() {
    this.vendorService.GetVendorAndVendorAddrByVendorId({ Id: this.VendorId }).subscribe(
      (response) => {
        this.MrVendorCategoryCode = response["VendorObj"]["MrVendorCategoryCode"];
      }
    );
  }

}
