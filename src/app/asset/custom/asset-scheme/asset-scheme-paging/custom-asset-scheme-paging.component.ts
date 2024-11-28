  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';
  
  @Component({
    selector: 'app-custom-asset-scheme-paging',
    templateUrl: './custom-asset-scheme-paging.component.html'
  })
  export class CustomAssetSchemePagingComponent implements OnInit {
  
    pageName: string;
  
    constructor(private adInsHelperService: AdInsHelperService, private router: Router) {
      this.pageName = "AssetScheme"
    }
  
    ngOnInit(): void {
    }
  
  }
  