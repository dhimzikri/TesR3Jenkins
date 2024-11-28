import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-custom-asset-attribute-paging',
  templateUrl: './custom-asset-attribute-paging.component.html'
})
export class CustomAssetAttributePagingComponent implements OnInit {

  pageName: string;

  constructor(private adInsHelperService: AdInsHelperService, private router: Router) {
    this.pageName = "AssetAttributePaging"
  }

  ngOnInit(): void {
  }

}
