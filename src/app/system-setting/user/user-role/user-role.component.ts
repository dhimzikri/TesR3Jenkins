import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { RefEmpObj } from 'app/shared/model/ref-emp-obj.model';
import { environment } from 'environments/environment';
import { RefUserObj } from 'app/shared/model/ref-user-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';


@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
 // providers: [NGXToastrService]
})
export class UserRoleComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  resultData: any;
  apiUrl: any;
  refUserObj: RefUserObj;
  refEmpObj: RefEmpObj;
  refUserId: any;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private location: Location, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['refUserId'] != null) {
        this.refUserId = queryParams['refUserId'];
      }
    });
  }

  ngOnInit() {
    this.apiUrl = this.UrlConstantNew.GetRefUserPaging;

    this.initiateForm();
  }

  initiateForm() {
    var urlGetUser: any = this.UrlConstantNew.GetRefUser;
    var urlGetEmp: any = this.UrlConstantNew.GetRefEmployeeById;
    var urlGetListEmpPos: any = this.UrlConstantNew.GetListEmployeebyRefEmpId;
    var empObj: RefEmpObj = new RefEmpObj;

    this.refUserObj = new RefUserObj();
    this.refEmpObj = new RefEmpObj();

    // this.refUserObj.refUserId = this.refUserId;

    this.httpClient.post(urlGetUser, this.refUserObj).subscribe(
      (response) => {
        this.refUserObj = response['returnObject'];
        // this.refEmpObj.refEmpId = +this.refUserObj.refEmpId;
        this.httpClient.post(urlGetEmp, {Id : this.refEmpObj.RefEmpId}).subscribe(
          (response) => {
            this.refEmpObj = response["returnObject"];

            // empObj.refEmpId = this.refEmpObj.refEmpId;
            this.httpClient.post(urlGetListEmpPos, empObj).subscribe(
              (response) => {
                this.resultData = response["returnObject"];
              })
          })
      }
    );
  }


  Back(): void {
    this.location.back();
  }

}
