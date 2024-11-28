import { NgxRouterService } from '@adins/fe-core';
import { FormDropDownListService } from '@adins/ucform';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { RefMasterObj } from 'app/shared/model/ref-master-obj.model';

@Component({
  selector: 'app-self-custom-attribute-detail',
  templateUrl: './self-custom-attribute-detail.component.html'
})
export class SelfCustomAttributeDetailComponent implements OnInit {

  pageName: string;
  patternCodeList: Array<KeyValueObj> = new Array<KeyValueObj>();
  RefAttrId: number = 0;
  Form: FormGroup = this.fb.group({});

  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew,
    private ddlSvc: FormDropDownListService, private fb: FormBuilder, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);

      if (queryParams["refAttrId"] != null) {
        this.RefAttrId = queryParams["refAttrId"];
      }
    });

    this.pageName = 'Sysattrdetail'
  }

  async ngOnInit() {
    var RefMasterPatternCode = new RefMasterObj();
    RefMasterPatternCode.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeRegularExpression;
    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, RefMasterPatternCode).toPromise().then(
      (response) => {
        this.patternCodeList = response[CommonConstant.ReturnObj];
      });
  }

  onFormCreate(fg: FormGroup)
  {
    this.Form = fg;
  }

  handler = {

    callback: ($event) => this.callback($event)

  };

  waitFor(conditions) {
    const vote = resolve => {
      if (conditions()) resolve();
      else setTimeout(_ => vote(resolve), 250);
    }

    return new Promise(vote);
  }

  async callback(ev) {

    if (ev == "PatternCode")
    {
      await this.waitFor(_ => this.Form.controls.PatternCode != undefined);

      let temp = this.patternCodeList.filter((x) => x.Key == this.Form.controls.PatternCode.value)

      this.Form.patchValue({
        PatternValue: temp[0].Value
      })
    }
  }
}
