import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-custom-negative-customer-view',
  templateUrl: './custom-negative-customer-view.component.html'
})
export class CustomNegativeCustomerViewComponent implements OnInit {

  pageName: string;

  constructor(private adInsHelperService: AdInsHelperService, private router: Router) {
    this.pageName = "Viewnegativecust"
  }

  ngOnInit(): void {
  }

}
