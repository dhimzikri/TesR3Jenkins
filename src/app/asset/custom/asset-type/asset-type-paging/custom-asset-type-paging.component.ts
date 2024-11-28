import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-custom-asset-type-paging',
  templateUrl: './custom-asset-type-paging.component.html'
})
export class CustomAssetTypePagingComponent implements OnInit {

  pageName: string;

  constructor(private adInsHelperService: AdInsHelperService, private router: Router) {
    this.pageName = "AssetType"
  }

  ngOnInit(): void {
  }

}
