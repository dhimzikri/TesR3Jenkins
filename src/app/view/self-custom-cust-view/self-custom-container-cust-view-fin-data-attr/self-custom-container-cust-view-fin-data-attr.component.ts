import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-self-custom-container-cust-view-fin-data-attr',
  templateUrl: './self-custom-container-cust-view-fin-data-attr.component.html'
})
export class SelfCustomContainerCustViewFinDataAttrComponent implements OnInit {

  @Input() CustId: number = 0;

  IsAttrExist: boolean = false;
  responseCustAttr: any;

  constructor(private http: HttpClient,
    private UrlConstantNew: UrlConstantNew) { }

  async ngOnInit() {
    await this.http.post(this.UrlConstantNew.GetCustFinDataAttrContentForCustViewByCustId, { Id : this.CustId }).toPromise().then(
      (response) => {
        this.responseCustAttr = response[CommonConstant.ReturnObj];
        console.log(this.responseCustAttr);
        if (this.responseCustAttr[0] != null){
          this.IsAttrExist = true;
        }
      }
    );
  }

}
