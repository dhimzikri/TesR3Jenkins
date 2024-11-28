import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-self-custom-system-user',
  templateUrl: './self-custom-system-user.component.html',
})
export class SelfCustomSystemUserComponent implements OnInit {

  pageName: string;

  constructor(private http: HttpClient, private toastr: NGXToastrService) {
    this.pageName = "SystemUser"
  }

  ngOnInit(): void {
  }

  handler = {
    callback: ($event) => this.callback($event)
  };

  callback(event: any) {
    let username = event.RowObj.username;
    
    if(event.Key === 'regenerate') {
      this.regenerate(username);
    }
    else if(event.Key === 'revoke') {
      this.revoke(username);
    }
  }

  regenerate(username){
    if (confirm("Are you sure to Regenerate this API KEY?")) {
      this.http.post(URLConstant.GenerateAPIKey, {Username : username, TimeToLive : 365}).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          window.location.reload();
        }
      );
    }
  }

  revoke(username){
    if (confirm("Are you sure to Revoke this API KEY?")) {
      this.http.post(URLConstant.RevokeAPIKey, {UserName : username}).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          window.location.reload();
        }
      );
    }
  }
}
