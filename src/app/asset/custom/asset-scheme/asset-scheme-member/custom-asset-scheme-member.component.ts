import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-custom-asset-scheme-member',
  templateUrl: './custom-asset-scheme-member.component.html'
})
export class CustomAssetSchemeMemberComponent implements OnInit {

  pageName: string;

  constructor(private adInsHelperService: AdInsHelperService, private router: Router) {
    this.pageName = "AssetSchemeMember"
  }

  ngOnInit(): void {
  }

}
