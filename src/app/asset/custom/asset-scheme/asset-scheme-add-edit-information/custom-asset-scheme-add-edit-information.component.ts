  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';
  
  @Component({
    selector: 'app-custom-asset-scheme-add-edit-information',
    templateUrl: './custom-asset-scheme-add-edit-information.component.html'
  })
  export class CustomAssetSchemeAddEditInformationComponent implements OnInit {
  
    pageName: string;
  
    constructor(private adInsHelperService: AdInsHelperService, private router: Router) {
      this.pageName = "AssetSchemeRegistration"
    }
  
    ngOnInit(): void {
    }
  
  }
  