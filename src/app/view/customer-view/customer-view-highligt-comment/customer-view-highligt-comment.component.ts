import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-customer-view-highligt-comment',
  templateUrl: './customer-view-highligt-comment.component.html'
})
export class CustomerViewHighligtCommentComponent implements OnInit {
  listCustHighlightCommentObj:any;
  CustId:number;
  isView:boolean = false;
  InputDt : any;
  Comment :any;
  InputBy : any;


  constructor(private http: HttpClient ,private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["CustId"] != null) {
        this.CustId = queryParams["CustId"];
        this.GetListCustHighlightComment(this.CustId);
      }
    });

  }

  GetListCustHighlightComment(CustId){
    var DealerCustNoObj = { Id: CustId };
    this.http.post(this.UrlConstantNew.GetCustHighlightCommentByCustId, DealerCustNoObj).subscribe(
      response => {
        this.listCustHighlightCommentObj = response["ReturnObject"];
      }
    );

  }
  ViewHiglight(CustHighlightCommentId){
    for(var any of this.listCustHighlightCommentObj){
      if(any.CustHighlightCommentId ==CustHighlightCommentId){
        this.InputDt = any.InputDt;
        this.Comment =any.Comment;
        this.InputBy = any.InputBy;
        this.isView = true;
        break;
      }
    }
  }
  Back(){
    this.isView = false;
  }
}
