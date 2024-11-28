import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";

@Component({
  selector: 'app-system-user',
  templateUrl: './system-user.component.html',
 // providers: [NGXToastrService]
})
export class SystemUserComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.SYS_DETAIL;
  constructor(private httpClient: HttpClient,
    private UrlConstantNew: UrlConstantNew,
    private toastr: NGXToastrService
    ) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/search/searchSystemUser.json";
    this.inputPagingObj.pagingJson = "./assets/search/searchSystemUser.json";
  }

  getCallback(ev){
    if(ev.Key == "generate"){
      this.regenerate(ev.RowObj.username);
    }else{
      this.revoke(ev.RowObj.username);
    }
  }

  regenerate(username){
    if (confirm("Are you sure to Regenerate this API KEY?")) {
      this.httpClient.post(URLConstant.GenerateAPIKey, {Username : username, TimeToLive : 365}).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  revoke(username){
    if (confirm("Are you sure to Revoke this API KEY?")) {
      this.httpClient.post(URLConstant.RevokeAPIKey, {UserName : username}).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
