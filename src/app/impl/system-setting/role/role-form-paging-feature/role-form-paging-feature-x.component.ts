import { NgxRouterService } from '@adins/fe-core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-role-form-paging-feature-x',
  templateUrl: './role-form-paging-feature-x.component.html'
})
export class RoleFormPagingFeatureXComponent implements OnInit {
  pageType: string = "";
  RefRoleId: number;

  RefRoldeForm = this.fb.group({
    RefRoleId : [0, [Validators.required]]
  });

  readonly CancelLink: string = NavigationConstant.SYSTEM_SETTING_ROLE_FORM_X;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ngxRouter: NgxRouterService
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["RefRoleId"] != null) {
        this.RefRoleId = queryParams["RefRoleId"];
      }
      if (queryParams["mode"] != null) {
        this.pageType = queryParams["mode"];
      }
    });
   }

  ngOnInit(): void {
    if (this.pageType == "edit") 
    {
      
    }  
  }

  SaveForm(){

  }

}
