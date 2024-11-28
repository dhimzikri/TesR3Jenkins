import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pefindo-view-others',
  templateUrl: './pefindo-view-others.component.html'
})
export class PefindoViewOthersComponent implements OnInit {
  TrxNo: string;

  constructor(private route: ActivatedRoute, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["TrxNo"] != null) {
        this.TrxNo = queryParams["TrxNo"];
      }
    });
  }

  ngOnInit() {
    
  }

}
