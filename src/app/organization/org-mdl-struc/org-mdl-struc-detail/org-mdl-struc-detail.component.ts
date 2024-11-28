import { BusinessUnitObj } from "app/shared/model/business-unit-obj.model";
import { CriteriaObj } from "app/shared/model/criteria-obj.model";
import { OrgMdlStrucObj } from "app/shared/model/org-mdl-struc-obj";
import { OrgMdlObj } from "app/shared/model/org-mdl-obj.model";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { NgForm } from "@angular/forms";
import { environment } from "environments/environment";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { InputLookupObj } from "app/shared/model/input-lookup-obj.model";
import { CommonConstant } from "app/shared/constant/CommonConstant";
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";
import { NgxRouterService } from "@adins/fe-core";

@Component({
  selector: "app-org-mdl-struc-detail",
  templateUrl: "./org-mdl-struc-detail.component.html"
})
export class OrgMdlStrucDetailComponent implements OnInit {
  inputLookupObj: any;
  inputLookupObj2: any;
  apiUrl: any;
  orgModelObj: OrgMdlObj;
  orgMdlStrucObj: OrgMdlStrucObj;
  type: string = "add";
  resultData: any;

  orgMdlStrucId: any;
  orgMdlId: any;

  orgMdlLvl: any = '1';
  refBizUnitId: any;
  parentId: any;
  isActive: any;

  /* #region  Lookup Biz Unit */
  bizUnitName: any;
  jsonSelectBizUnit: any;
  /* #endregion */

  /* #region  Addition Criteria Lookup */
  addCrit: Array<any>;
  /* #endregion */

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private service: NGXToastrService, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["mode"] != null) {
        this.type = queryParams["mode"];
      }
      if (queryParams["orgMdlId"] != null) {
        this.orgMdlId = queryParams["orgMdlId"];
      }
      if (queryParams["orgMdlStrucId"] != null) {
        this.orgMdlStrucId = queryParams["orgMdlStrucId"];
      }
      if (queryParams["refBizUnitId"] != null) {
        this.refBizUnitId = queryParams["refBizUnitId"];
      }
    });
  }

  ngOnInit() {
    this.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.inputLookupObj.urlJson = "./assets/lookup/lookupOrgMdlStruc.json";
    this.inputLookupObj.urlQryPaging = this.UrlConstantNew.GetOrgMdlStrucPaging;
    this.inputLookupObj.urlEnviPaging = this.UrlConstantNew.env.FoundationR3Url;
    this.inputLookupObj.pagingJson = "./assets/form-setting/orgMdlStrucDetailPaging.json";
    this.inputLookupObj.genericJson = "./assets/form-setting/orgMdlStrucDetailGeneric.json";

    this.inputLookupObj2 = new InputLookupObj(this.UrlConstantNew);
    this.inputLookupObj2.urlJson = "./assets/lookup/lookupBizUnit.json";
    this.inputLookupObj2.urlQryPaging = this.UrlConstantNew.GetBusinessUnitPaging;
    this.inputLookupObj2.urlEnviPaging = this.UrlConstantNew.env.FoundationR3Url;
    this.inputLookupObj2.pagingJson = "./assets/form-setting/bizUnitPaging.json";
    this.inputLookupObj2.genericJson = "./assets/form-setting/bizUnitGeneric.json";
    this.inputLookupObj2.isRequired = true;

    this.orgMdlStrucObj = new OrgMdlStrucObj();
    this.InitForm();
    if (this.type == "edit") {
      this.apiUrl = this.UrlConstantNew.GetOrgMdlStrucById;
      this.orgMdlStrucObj = new OrgMdlStrucObj();
      this.orgMdlStrucObj.orgMdlStrucId = +this.orgMdlStrucId;
      this.http.post(this.apiUrl, this.orgMdlStrucObj).subscribe(
        response => {
          this.orgMdlStrucObj = response["returnObject"];
          //this.orgMdlLvl = response["returnObject"]["orgMdlLvl"];
          this.inputLookupObj2.idSelect = response["returnObject"]["refBizUnitId"];
          this.inputLookupObj.idSelect = response["returnObject"]["parentId"];
          if (response["returnObject"]["isActive"] == CommonConstant.TRUE_CONDITION) {
            this.isActive = true;
          } else {
            this.isActive = false;
          }

          /* #region Fill Lookup Mdl Struct */
          if (this.parentId != 0) {
            var orgMdlStruc: OrgMdlStrucObj = new OrgMdlStrucObj();
            var getOrgMdlSructUrl = this.UrlConstantNew.GetOrgMdlStrucById;
            var getBizUnitUrl: any = this.UrlConstantNew.GetRefBizUnit;
            orgMdlStruc.orgMdlStrucId = +this.inputLookupObj2.idSelect;
            this.http
              .post(getOrgMdlSructUrl, orgMdlStruc)
              .subscribe(response => {
                this.inputLookupObj.jsonSelect = response["returnObject"];
                var bizUnit: BusinessUnitObj = new BusinessUnitObj();
                bizUnit.RefBizUnitId = response["returnObject"]["refBizUnitId"];
                this.http
                  .post(getBizUnitUrl, {Id : bizUnit.RefBizUnitId})
                  .subscribe(response => {
                    this.inputLookupObj.nameSelect = response["returnObject"]["bizUnitName"];
                  });
              });
          }
          /* #endregion */

          /* #region Fill Lookup Biz Unit */
          var bizUnitObj: BusinessUnitObj = new BusinessUnitObj();
          var getBizUnitUrl: any = this.UrlConstantNew.GetRefBizUnit;
          bizUnitObj.RefBizUnitId = this.refBizUnitId;
          this.http
            .post(getBizUnitUrl, {Id : bizUnitObj.RefBizUnitId})
            .subscribe(response => {
              bizUnitObj = response["returnObject"];
              this.inputLookupObj2.nameSelect = response["returnObject"]['bizUnitName'];
              this.inputLookupObj2.jsonSelect = response["returnObject"];
            });
          /* #endregion */
        }
      );
    }
  }

  Back(): void {
    this.location.back();
  }

  Save(OrgMdlForm: NgForm, lookupBizUnit: any, lookupMdlStruc: any): void {
    this.spinner.show();

    if (OrgMdlForm.value.orgMdlLvl > 1 && this.inputLookupObj2.idSelect == undefined) {
      this.service.typeSuccess();
      this.service.typeErrorCustom('Must Have Parent');
      this.spinner.hide();
    }
    else {
      /* #region  Have Parent */
      if (this.inputLookupObj2.idSelect != undefined) {
        var orgMdlStrucCheck: OrgMdlStrucObj = new OrgMdlStrucObj();
        var getOrgMdlSructCheckUrl = this.UrlConstantNew.GetOrgMdlStrucById;
        orgMdlStrucCheck.orgMdlStrucId = +this.inputLookupObj2.idSelect;
        this.http
          .post(getOrgMdlSructCheckUrl, orgMdlStrucCheck)
          .subscribe(response => {
            var lvlMust: number = + response['returnObject']['orgMdlLvl'] + 1;
            if (+OrgMdlForm.value.orgMdlLvl != lvlMust) {
              this.service.typeErrorCustom(
                "Level Must Be " + lvlMust
              );
            } else {
              //MODE-ADD
              if (this.type != "edit") {
                this.apiUrl = this.UrlConstantNew.AddOrgMdlStruc;
                this.orgMdlStrucObj = new OrgMdlStrucObj();
                this.orgMdlStrucObj.orgMdlId = +this.orgMdlId;
                this.orgMdlStrucObj.orgMdlLvl = OrgMdlForm.value.orgMdlLvl;
                this.orgMdlStrucObj.refBizUnitId = this.inputLookupObj2.idSelect;
                this.orgMdlStrucObj.parentId = this.inputLookupObj.idSelect;
                if (OrgMdlForm.value.isActive) {
                  this.orgMdlStrucObj.isActive = CommonConstant.TRUE_CONDITION;
                } else {
                  this.orgMdlStrucObj.isActive = CommonConstant.FALSE_CONDITION;
                }

                this.http.post(this.apiUrl, this.orgMdlStrucObj, AdInsConstant.SpinnerOptions).subscribe(
                  response => {
                    this.service.typeSave(response["message"]);
                    this.location.back();
                  },
                  error => {
                    this.service.typeErrorCustom(error);
                  }
                );
              }
              //MODE-EDIT
              else {
                this.apiUrl = this.UrlConstantNew.EditOrgMdlStruc;
                this.orgMdlStrucObj.orgMdlStrucId = +this.orgMdlStrucId;
                this.orgMdlStrucObj.orgMdlId = +this.orgMdlId;
                this.orgMdlStrucObj.orgMdlLvl = OrgMdlForm.value.orgMdlLvl;
                this.orgMdlStrucObj.refBizUnitId = this.inputLookupObj.idSelect;
                this.orgMdlStrucObj.parentId = this.inputLookupObj2.idSelect;
                if (OrgMdlForm.value.isActive) {
                  this.orgMdlStrucObj.isActive = CommonConstant.TRUE_CONDITION;
                } else {
                  this.orgMdlStrucObj.isActive = CommonConstant.FALSE_CONDITION;
                }
                this.http.post(this.apiUrl, this.orgMdlStrucObj, AdInsConstant.SpinnerOptions).subscribe(
                  response => {
                    this.service.typeSave(response["message"]);
                    this.location.back();
                    this.spinner.hide();
                  },
                  error => {
                    this.service.typeErrorCustom(error);
                    this.spinner.hide();
                  }
                );
              }
            }
          });
      }
      /* #endregion */
      /* #region  Dont Have Parent */
      else {
        //MODE-ADD
        if (this.type != "edit") {
          this.apiUrl = this.UrlConstantNew.AddOrgMdlStruc;
          this.orgMdlStrucObj = new OrgMdlStrucObj();
          this.orgMdlStrucObj.orgMdlId = +this.orgMdlId;
          this.orgMdlStrucObj.orgMdlLvl = OrgMdlForm.value.orgMdlLvl;
          this.orgMdlStrucObj.refBizUnitId = this.inputLookupObj2.idSelect;
          if (OrgMdlForm.value.isActive) {
            this.orgMdlStrucObj.isActive = CommonConstant.TRUE_CONDITION;
          } else {
            this.orgMdlStrucObj.isActive = CommonConstant.FALSE_CONDITION;
          }

          this.http.post(this.apiUrl, this.orgMdlStrucObj, AdInsConstant.SpinnerOptions).subscribe(
            response => {
              this.service.typeSave(response["message"]);
              this.location.back();
            },
            error => {
              this.service.typeErrorCustom(error);
            }
          );
        }
        //MODE-EDIT
        else {
          this.apiUrl = this.UrlConstantNew.EditOrgMdlStruc;
          this.orgMdlStrucObj.orgMdlStrucId = +this.orgMdlStrucId;
          this.orgMdlStrucObj.orgMdlId = +this.orgMdlId;
          this.orgMdlStrucObj.orgMdlLvl = OrgMdlForm.value.orgMdlLvl;
          this.orgMdlStrucObj.refBizUnitId = this.inputLookupObj2.idSelect;
          if (OrgMdlForm.value.isActive) {
            this.orgMdlStrucObj.isActive = CommonConstant.TRUE_CONDITION;
          } else {
            this.orgMdlStrucObj.isActive = CommonConstant.FALSE_CONDITION;
          }
          this.http.post(this.apiUrl, this.orgMdlStrucObj, AdInsConstant.SpinnerOptions).subscribe(
            response => {
              this.service.typeSave(response["message"]);
              this.location.back();
              this.spinner.hide();
            },
            error => {
              this.service.typeErrorCustom(error);
              this.spinner.hide();
            }
          );
        }
      }
      /* #endregion */
    }
  }
  InitForm() {
    var getOrgMdlUrl = this.UrlConstantNew.GetOrgMdlByOrgMdlId;
    this.orgModelObj = new OrgMdlObj();
    this.orgModelObj.orgMdlId = +this.orgMdlId;
    this.http.post(getOrgMdlUrl, this.orgModelObj).subscribe(
      response => {
        this.orgModelObj = response["returnObject"];
      },
      error => {
        this.service.typeErrorCustom(error);
      }
    );

    /* #region  Additional Criteria */
    this.addCrit = new Array();
    var critOrgMdlId = new CriteriaObj();
    critOrgMdlId.propName = "orgMdlId";
    critOrgMdlId.value = this.orgMdlId;
    critOrgMdlId.restriction = AdInsConstant.RestrictionEq;
    critOrgMdlId.DataType = "numeric";

    var critOrgMdlStrucId = new CriteriaObj();
    critOrgMdlStrucId.propName = "orgMdlStrucId";
    critOrgMdlStrucId.value = this.orgMdlStrucId;
    critOrgMdlStrucId.restriction = 'Neq';
    critOrgMdlStrucId.DataType = "numeric";

    var critParentId = new CriteriaObj();
    critParentId.propName = "parentId";
    critParentId.value = this.orgMdlStrucId;
    critParentId.restriction = 'Neq';
    critParentId.DataType = "numeric";

    this.addCrit.push(critOrgMdlId);
    this.addCrit.push(critParentId);
    this.addCrit.push(critOrgMdlStrucId);
    this.inputLookupObj.addCritInput = this.addCrit;

    /* #endregion */
  }
}
