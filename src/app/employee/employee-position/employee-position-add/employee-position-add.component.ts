import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RefEmpObj } from 'app/shared/model/ref-emp-obj.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { NgForm, FormBuilder } from '@angular/forms';
import { EmpPositionObj } from 'app/shared/model/emp-position-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefOfficeObj } from 'app/shared/model/ref-office-obj.model';
import { OrgJobTitleObj } from 'app/shared/model/org-job-title-obj.model';
import { formatDate } from '@angular/common';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
    selector: 'app-employee-position',
    templateUrl: './employee-position-add.component.html'
})
export class EmployeePositionAddComponent implements OnInit {

    pageType: string = "add";
    refEmpId: any;
    empPositionId: any;
    empNo: any;
    empName: any;
    isActive: boolean = false;
    allRefOffice: any;
    refOfficeId: any;
    allSupervisor: any;
    superiorRefEmpId: any = '';
    allBiz: any;
    refBizUnitId: any;
    allOrgJobTitle: any;
    orgJobTitleId: any;
    positionStartDt: any;
    positionFinishDt: any;
    empObj: RefEmpObj;
    refOfficeObj: RefOfficeObj
    empPositionObj: EmpPositionObj = new EmpPositionObj();
    orgJobTitleObj: OrgJobTitleObj;
    addUrl: any;
    getEditUrl: any;
    editUrl: any;
    getUrl: any;
    refMasterUrl: any;
    refOfficeUrl: any;
    supervisorUrl: any;
    bizUrl: any;
    orgJobTitleUrl: any;
    empPositionVisible: boolean = true;
    addEditVisible: boolean = false;
    pageNow: any;
    totalData: any;
    pageSize: any = 10;
    resultData: any;
    orderByKey: any = null;
    orderByValue: boolean = true;
    arrCrit: any;
    allSkillLvl: any;
    refMasterTypeCode: any;
    masterCode: any;
    inputLookupObj: any;
    getEmpUrl: any;

    RefEmpPositionForm = this.fb.group({});

    readonly CancelLink: string = NavigationConstant.EMP_POS;
    constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, 
        private toastr: NGXToastrService, private fb: FormBuilder, private cookieService: CookieService, 
        private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
        this.getUrl = this.UrlConstantNew.GetRefEmployeeById;
        this.addUrl = this.UrlConstantNew.AddEmpPosition;
        this.refOfficeUrl = this.UrlConstantNew.GetAllRefOffice;
        this.supervisorUrl = this.UrlConstantNew.GetEmpListByOfficeIdAndIsActive;
        this.refMasterUrl = this.UrlConstantNew.GetRefMasterListDesc;
        this.bizUrl = this.UrlConstantNew.GetRefBizUnitByOffice;
        this.orgJobTitleUrl = this.UrlConstantNew.GetOrgJobTitleByMdlStruc;
        this.getEditUrl = this.UrlConstantNew.GetEmpByEmpPositionId;
        this.editUrl = this.UrlConstantNew.EditEmpPosition;
        this.getEmpUrl = this.UrlConstantNew.GetRefEmployeeById;

        this.route.queryParams.subscribe(params => {
            const queryParams = this.ngxRouter.getQueryParams(params);
            if (queryParams['param'] != null) {
                this.pageType = queryParams['param'];
            }
            if (queryParams['refEmpId'] != null) {
                this.refEmpId = queryParams['refEmpId'];
            }
            if (queryParams['empNo'] != null) {
                this.empNo = queryParams['empNo'];
            }
            if (queryParams['empName'] != null) {
                this.empName = queryParams['empName'];
            }
            if (queryParams['empPositionId'] != null) {
                this.empPositionId = queryParams['empPositionId'];
            }
            if (queryParams['refBizUnitId'] != null) {
                this.refBizUnitId = queryParams['refBizUnitId'];
            } else {
                this.refBizUnitId = 0;
            }
        });
    }

    ngOnInit() {

        this.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
        this.inputLookupObj.urlJson = "./assets/lookup/lookupSupervisor.json";
        this.inputLookupObj.pagingJson = "./assets/lookup/lookupSupervisor.json";
        this.inputLookupObj.genericJson = "./assets/lookup/lookupSupervisor.json";

        const getuserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        this.refOfficeId = getuserAccess.refOfficeId;
        this.refOfficeObj = new RefOfficeObj();
        this.refOfficeObj.RefOfficeId = this.refOfficeId
        this.httpClient.post(this.refOfficeUrl, null).subscribe(
            (response) => {
                this.allRefOffice = response['returnObject']
            });

        this.refMasterTypeCode = CommonConstant.RefMasterTypeCodeSkillLvl;
        var RefMasterObj = { RefMasterTypeCode: this.refMasterTypeCode, MasterCode: "" };
        this.httpClient.post(this.refMasterUrl, RefMasterObj).subscribe(
            (response) => {
                this.allSkillLvl = response['returnObject'];
                this.masterCode = this.allSkillLvl[0].masterCode;
            });
        // this.httpClient.post(this.supervisorUrl, this.refOfficeObj).subscribe(
        //     (response) => {
        //         this.allSupervisor = response['returnObject']
        //     })
        this.httpClient.post(this.bizUrl, this.refOfficeObj).subscribe(
            (response) => {
                this.allBiz = response['returnObject'];
                this.refBizUnitId = this.allBiz[0].orgMdlStrucId;
                if (this.pageType != "edit") {
                    this.onChangeBiz(this.refBizUnitId);
                }
            })
        if (this.pageType == "edit") {
            this.empPositionObj.empPositionId = this.empPositionId
            this.onChangeBiz(this.refBizUnitId)
            this.httpClient.post(this.getEditUrl, this.empPositionObj).subscribe(
                (response) => {
                    this.resultData = response['returnObject'];
                    this.refOfficeId = response['returnObject']['refOfficeId']
                    this.orgJobTitleId = response['returnObject']['orgJobTitleId']
                    this.positionStartDt = formatDate(response['returnObject']['positionStartDt'], 'yyyy-MM-dd', 'en-US')
                    this.positionFinishDt = formatDate(response['returnObject']['positionFinishDt'], 'yyyy-MM-dd', 'en-US')
                    //this.superiorRefEmpId = response['returnObject']['superiorRefEmpId']

                    var refEmpObj = { RefEmpId: response['returnObject']['superiorRefEmpId'] };
                    this.httpClient.post(this.getEmpUrl, {Id : refEmpObj}).subscribe(
                        (response) => {
                            this.inputLookupObj.nameSelect = response["returnObject"].empName;
                            this.inputLookupObj.jsonSelect = response["returnObject"];
                            this.inputLookupObj.idSelect = response['returnObject'].refEmpId;
                            if (this.resultData.isActive == "1") {
                                this.isActive = true;
                            }
                            else {
                                this.isActive = false;
                            }
                        });
                })
        } else {
        }
    }

    onChangeBiz(bizValue) {
        this.orgJobTitleObj = new OrgJobTitleObj()
        this.orgJobTitleObj.orgMdlStrucId = bizValue
        this.httpClient.post(this.orgJobTitleUrl, this.orgJobTitleObj).subscribe(
            (response) => {
                this.allOrgJobTitle = response['returnObject'];
                this.orgJobTitleId = this.allOrgJobTitle.orgJobTitleId;
                if (this.pageType != "edit") {
                    this.orgJobTitleId = this.allOrgJobTitle[0].orgJobTitleId;
                }
            })
    }

    SaveForm(ReqForm: NgForm) {
        if (this.pageType == 'add') {
            this.empPositionObj = ReqForm.value;
            this.empPositionObj.refEmpId = this.refEmpId;
            this.empPositionObj.skillLvl = this.masterCode;
            this.empPositionObj.superiorRefEmpId = this.inputLookupObj.idSelect;
            if (this.isActive == false) {
                this.empPositionObj.isActive = CommonConstant.FALSE_CONDITION;
            }
            else {
                this.empPositionObj.isActive = CommonConstant.TRUE_CONDITION;
            }

            this.httpClient.post(this.addUrl, this.empPositionObj, AdInsConstant.SpinnerOptions).subscribe(
                (response) => {
                    if (response['isError'] != true) {
                        this.toastr.successMessage(response['message']);
                        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.EMP_POS],{ "refEmpId": this.refEmpId });
                    }
                }
            );
        } else {
            this.empPositionObj = ReqForm.value
            this.empPositionObj.refEmpId = this.refEmpId
            this.empPositionObj.empPositionId = this.empPositionId
            this.empPositionObj.skillLvl = this.masterCode;
            this.empPositionObj.superiorRefEmpId = this.inputLookupObj.idSelect;
            if (this.isActive == false) {
                this.empPositionObj.isActive = CommonConstant.FALSE_CONDITION;
            }
            else {
                this.empPositionObj.isActive = CommonConstant.TRUE_CONDITION;
            }
            this.httpClient.post(this.editUrl, this.empPositionObj, AdInsConstant.SpinnerOptions).subscribe(
                (response) => {
                    this.toastr.successMessage(response['message']);
                    AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.EMP_POS],{ "refEmpId": this.refEmpId });
                }
            );
        }
    }

    toggleActive(e) {
        this.isActive = e.target.checked;
    }

    getLookupResponse(e) {
        this.empPositionObj.superiorRefEmpId = e.RefEmpId
    }
}