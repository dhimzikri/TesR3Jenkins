import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-custom-asset-type-add-edit',
  templateUrl: './custom-asset-type-add-edit.component.html'
})
export class CustomAssetTypeAddEditComponent implements OnInit {

  pageName: string;

  constructor(private adInsHelperService: AdInsHelperService, private router: Router) {
    this.pageName = "AssetTypeRegistration"
  }

  ngOnInit(): void {
  }

}
