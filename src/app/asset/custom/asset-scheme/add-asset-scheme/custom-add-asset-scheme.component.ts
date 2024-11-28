import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-custom-add-asset-scheme',
  templateUrl: './custom-add-asset-scheme.component.html'
})
export class CustomAddAssetSchemeComponent implements OnInit {

  pageName: string;

  constructor(private adInsHelperService: AdInsHelperService, private router: Router) {
    this.pageName = "AddAssetSchemeMember"
  }

  ngOnInit(): void {
  }

}
