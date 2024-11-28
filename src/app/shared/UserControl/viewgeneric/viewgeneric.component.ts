import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Object } from 'core-js';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-viewgeneric',
  templateUrl: './viewgeneric.component.html',
  styleUrls: ['./viewgeneric.component.scss']
})
export class ViewgenericComponent implements OnInit {

  @Input() viewInput: any;
  viewList: any = "";
  getList: any;
  viewInfoObjList: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private ngxRouter: NgxRouterService) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.getList = queryParams;
    });
  }

  ngOnInit() {
    console.log("viewgeneric");
    this.initiateForm();
  }

  initiateForm() {
    this.getJSON(this.viewInput).subscribe(data => {
      this.viewList = data;
      this.viewInfoObjList = [];

      for (var j = 0; j < this.viewList.subsection.length; j++) {
        this.viewInfoObjList.push(j);
      }

      for (let i = 0; i < this.viewList.subsection.length; i++) {
        if (this.viewList.subsection[i].querystring != null) {
          var queryObj : any;
          this.viewList.subsection[i].querystring.whereQuery = Object.values(this.getList);
          queryObj = {
            querystring: this.viewList.subsection[i].querystring
          }

          this.http.post(this.viewList.subsection[i].mainInfoUrl, queryObj).subscribe(
            (response) => {
              this.viewInfoObjList[i] = response["returnObject"];
            })
        } else {
          this.http.post(this.viewList.subsection[i].mainInfoUrl, this.getList).subscribe(
            (response) => {
              this.viewInfoObjList[i] = response["returnObject"];
            })
        }
      }
    })
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }
  
  genAction(viewObj, param) {
    var arrList = {};

    for (var i = 0; i < param.length; i++) {
      arrList[param[i].property] = viewObj[param[i].property];
    }
    return arrList;
  }
}
