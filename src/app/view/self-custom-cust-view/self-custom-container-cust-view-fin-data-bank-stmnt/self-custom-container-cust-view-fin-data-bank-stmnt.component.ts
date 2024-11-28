import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-self-custom-container-cust-view-fin-data-bank-stmnt',
  templateUrl: './self-custom-container-cust-view-fin-data-bank-stmnt.component.html'
})
export class SelfCustomContainerCustViewFinDataBankStmntComponent implements OnInit {
  
  @Input() CustId: number = 0;
  responseCBAObj: any;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, 
    private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.http.post(this.UrlConstantNew.GetCBAForCustFinDataByCustId, { Id : this.CustId }).subscribe(
      response => {
        this.responseCBAObj = response['ListCBAForCustFinData'];
      }
    );
  }

}
