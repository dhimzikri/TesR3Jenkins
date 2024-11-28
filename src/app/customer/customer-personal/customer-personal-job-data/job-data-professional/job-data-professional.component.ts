import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { CustPersonalJobDataObj } from 'app/shared/model/cust-personal-job-data-obj.model';
import { InputFieldObj } from 'app/shared/model/input-field-obj.model';
import { CustAddrObj } from 'app/shared/model/cust-addr-obj.model';
import { RequestCustPersonalJobDataObj } from 'app/shared/model/request-cust-personal-job-data-obj.model';
import { DatePipe, formatDate } from '@angular/common';
import { RefIndustryTypeObj } from 'app/shared/model/ref-industry-type-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { InputAddressObj } from 'app/shared/model/input-address-obj.model';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { AddressService } from 'app/shared/services/custAddr.service';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { String } from 'typescript-string-operations';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResGetListCustAddrObj, ResListCustAddrObj } from 'app/shared/model/response/res-get-list-cust-addr-obj.model';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-job-data-professional',
  templateUrl: './job-data-professional.component.html',
  styleUrls: []
})
export class JobDataProfessionalComponent implements OnInit {
  @Input() IsReset: boolean = false;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  jobDataId: number;
  jobAddrId: number;
  preJobAddrId: number;
  othBizAddrId: number;
  rowVersion: any;
  typePage: string;
  IdCust: number;
  IdCustPersonal: number;
  inputFieldAddressObj: InputFieldObj;
  tempProfession: number;
  tempRefIndustryType: any;
  professionLookUpObj: InputLookupObj;
  industryLookUpObj: InputLookupObj;
  companyLookupObj: InputLookupObj;
  custPersonalJobDataObj: CustPersonalJobDataObj;
  returnCustJobDataObj: any;
  inputPreJobAddressObj: InputFieldObj;
  jobAddressObj: CustAddrObj;
  preJobAddressObj: CustAddrObj;
  addressObj: CustAddrObj;
  othBizAddrObj: CustAddrObj;
  reqCustPersonalJobDataObj: RequestCustPersonalJobDataObj;
  returnRefProfessionObj: any;
  refIndustryTypeObj: RefIndustryTypeObj;
  returnIndustryTypeObj: any;
  custAddrObj: CustAddrObj;
  preJobAddrObj: CustAddrObj;
  getCustomerAddr: any;
  getPreJobAddr: any;
  UserAccess: CurrentUserContext;
  MaxDate: Date;
  MaxDtValidate: string;
  IsWellknownCoy: boolean = false;
  ArrAddCritCoy: Array<CriteriaObj> = new Array<CriteriaObj>();
  EconomicSectorName: string;
  IndustryTypeCategoryName: string;
  IsShowData: boolean = false;
  JobDataProForm = this.fb.group({
    JobDataType: [''],
    ProfessionName: [''],
    ProfessionalNo: [''],
    JobTitleName: [''],
    IndustryName: ['', Validators.required],
    IsWellknownCoy: [false],
    MrWellknownCoyCode: [''],
    EstablishmentDate: ['', Validators.required],
    Notes: [''],
    LuasBangunan: [''],
    LuasTanah: [''],
    KapasitasListrik: [''],
    LocationClass: [''],
    PriceEstimates: [''],
    StayLength: [''],
    PreviIndustryName: [''],
    PreviEmploymentDate: [''],
    NotesPreJob: [''],
    OtherBusinessName: [''],
    OtherBusinessType: [''],
    OtherBusinessIndustry: [''],
    OtherJobPosition: [''],
    OtherEstablishmentDate: [''],
    EstablishmentDatePro: [''],
    NotesOther: [''],
    CopyAddrFrom: [''],
    CopyPrevAddrFrom: [''],
    CopyOthBizAddrFrom: ['']
  });
  businessDtMin: Date;
  inputAddressObj: InputAddressObj;
  inputPreviousAddressObj: InputAddressObj;
  inputOtherAddressObj: InputFieldObj;
  inputOthBizAddressObj: InputAddressObj;
  otherAddrObj: CustAddrObj;
  custOthBizAddrObj: CustAddrObj;
  otherAddressObj: CustAddrObj;
  getOthBizAddr: any;
  listAddrRequiredOwnership: Array<string> = new Array();
  isReady: boolean = false;

  custAddrObjForCopy: GenericObj = new GenericObj();
  custAddrFromObj: CustAddrObj;
  copyCustomerAddrFrom: any;
  listCustAddr: Array<ResListCustAddrObj> = new Array<ResListCustAddrObj>();

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private cookieService: CookieService, 
    private addressService: AddressService, private UrlConstantNew: UrlConstantNew, 
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["IdCust"] != null) {
        this.IdCust = queryParams["IdCust"];
      }
      if (queryParams["IdCustPersonal"] != null) {
        this.IdCustPersonal = queryParams["IdCustPersonal"];
      }
    });
  }

  getLookUpProfession(event) {
    this.tempProfession = event.RefProfessionId;
  }

  getLookUpIndustry(event) {
    this.tempRefIndustryType = event.RefIndustryTypeId;
    this.EconomicSectorName = event.EconomicSectorName;
    this.IndustryTypeCategoryName = event.RefIndustryTypeCategoryName;
    this.IsShowData = true;
  }

  async ngOnInit() {
    await this.getAddrTypeOwnershipRequired();

    this.custAddrObjForCopy.Id = this.IdCust;
    await this.http.post(this.UrlConstantNew.GetListCustAddr, this.custAddrObjForCopy).toPromise().then(
      (response : ResGetListCustAddrObj) => {
        this.listCustAddr = response[CommonConstant.ReturnObj];
        this.listCustAddr = this.listCustAddr.filter(x => x.MrCustAddrTypeCode != CommonConstant.CustAddrJob && 
                                                          x.MrCustAddrTypeCode != CommonConstant.CustAddrPreJob && 
                                                          x.MrCustAddrTypeCode != CommonConstant.CustAddrOthBiz);
      });

    this.UserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));

    var datePipe = new DatePipe("en-US");
    this.MaxDate = new Date(this.UserAccess.BusinessDt);
    this.MaxDate.setDate(this.MaxDate.getDate() - 1);
    this.MaxDtValidate = datePipe.transform(this.MaxDate, "yyyy-MM-dd");

    this.inputFieldAddressObj = new InputFieldObj(this.UrlConstantNew);
    this.inputFieldAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.inputPreJobAddressObj = new InputFieldObj(this.UrlConstantNew);
    this.inputPreJobAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.inputPreJobAddressObj.inputLookupObj.isRequired = false;

    this.professionLookUpObj = new InputLookupObj(this.UrlConstantNew);
    this.professionLookUpObj.isRequired = true;
    this.professionLookUpObj.urlJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.pagingJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.genericJson = "./assets/lookup/lookupCustomerProfession.json";
    let listCriteriaObj: Array<CriteriaObj> = new Array();
    let criteriaCustObj = new CriteriaObj();
    criteriaCustObj.DataType = "text";
    criteriaCustObj.restriction = AdInsConstant.RestrictionEq;
    criteriaCustObj.propName = 'MR_CUST_MODEL_CODE';
    criteriaCustObj.value = CommonConstant.CUST_MODEL_PROF;
    listCriteriaObj.push(criteriaCustObj);
    this.professionLookUpObj.addCritInput = listCriteriaObj;


    this.industryLookUpObj = new InputLookupObj(this.UrlConstantNew);
    this.industryLookUpObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.industryLookUpObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.industryLookUpObj.genericJson = "./assets/lookup/lookupIndustryType.json";
    this.industryLookUpObj.isRequired = true;

    this.companyLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.companyLookupObj.urlJson = "./assets/uclookup/Customer/lookupCompany.json";
    this.companyLookupObj.pagingJson = "./assets/uclookup/Customer/lookupCompany.json";
    this.companyLookupObj.genericJson = "./assets/uclookup/Customer/lookupCompany.json";
    this.companyLookupObj.isRequired = false;

    this.companyLookupObj.addCritInput = new Array();
    this.ArrAddCritCoy = new Array<CriteriaObj>();
    let critCoyObj = new CriteriaObj();
    critCoyObj.DataType = "text";
    critCoyObj.propName = 'REF_MASTER_TYPE_CODE';
    critCoyObj.restriction = AdInsConstant.RestrictionEq;
    critCoyObj.value = "WELLKNOWN_COY";
    this.ArrAddCritCoy.push(critCoyObj);
    let critCoyObj1 = new CriteriaObj();
    critCoyObj1.DataType = "text";
    critCoyObj1.propName = 'IS_ACTIVE';
    critCoyObj1.restriction = AdInsConstant.RestrictionEq;
    critCoyObj1.value = "1";
    this.ArrAddCritCoy.push(critCoyObj1);
    this.companyLookupObj.addCritInput = this.ArrAddCritCoy;
    this.companyLookupObj.isReady = true;

    this.inputOthBizAddressObj = new InputAddressObj(this.UrlConstantNew);
    this.inputOthBizAddressObj.showSubsection = false;
    this.inputOthBizAddressObj.isRequired = false;
    this.inputOthBizAddressObj.title = "Other Business Address";
    this.inputOthBizAddressObj.showOwnership = true;
    this.inputOthBizAddressObj.requiredOwnership = this.setOwnership(CommonConstant.CustAddrTypeOthBiz);
    

    this.inputOtherAddressObj = new InputFieldObj(this.UrlConstantNew);
    this.inputOtherAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.inputOtherAddressObj.inputLookupObj.isRequired = false;
    this.inputOthBizAddressObj.inputField = this.inputOtherAddressObj;

    this.http.post(this.UrlConstantNew.GetCustPersonalJobDataByCustId, { Id: this.IdCust }).toPromise().then(
      (response: any) => {
        this.returnCustJobDataObj = response;

        if (this.returnCustJobDataObj.CustPersonalJobDataId != 0) {
          this.JobDataProForm.patchValue({
            ProfessionalNo: this.returnCustJobDataObj.ProfessionalNo,
            JobTitleName: this.returnCustJobDataObj.JobTitleName,
            IndustryName: this.returnCustJobDataObj.CoyName,
            IsWellknownCoy: this.returnCustJobDataObj.IsWellknownCoy,
            MrWellknownCoyCode: this.returnCustJobDataObj.MrWellknownCoyCode,
            EstablishmentDate: formatDate(this.returnCustJobDataObj.EmploymentEstablishmentDt, 'yyyy-MM-dd', 'en-US'),
            OtherBusinessName: this.returnCustJobDataObj.OthBizName,
            OtherBusinessType: this.returnCustJobDataObj.OthBizType,
            OtherBusinessIndustry: this.returnCustJobDataObj.OthBizIndustryTypeCode,
            OtherJobPosition: this.returnCustJobDataObj.OthBizJobPosition,
            OtherEstablishmentDate: formatDate(this.returnCustJobDataObj.OthBizEstablishmentDt, 'yyyy-MM-dd', 'en-US'), 
            PreviIndustryName: this.returnCustJobDataObj.PrevCoyName,
            PreviEmploymentDate: formatDate(this.returnCustJobDataObj.PrevEmploymentDt, 'yyyy-MM-dd', 'en-US'),
          });
          this.IsWellknownCoy = this.returnCustJobDataObj.IsWellknownCoy;
          this.companyLookupObj.nameSelect = this.returnCustJobDataObj.CoyName;
          this.companyLookupObj.jsonSelect = { Descr: this.returnCustJobDataObj.CoyName };


          if (!this.IsReset && this.returnCustJobDataObj.RefProfessionId) {
            this.http.post(this.UrlConstantNew.GetRefProfessionById, { Id: this.returnCustJobDataObj.RefProfessionId }).toPromise().then(
              (response) => {
                this.returnRefProfessionObj = response;
                this.professionLookUpObj.nameSelect = this.returnRefProfessionObj.ProfessionName;
                this.professionLookUpObj.jsonSelect = this.returnRefProfessionObj;
                this.tempProfession = this.returnRefProfessionObj.RefProfessionId;
              });
          }


          if (this.returnCustJobDataObj.RefIndustryTypeId != null) {
            this.http.post(this.UrlConstantNew.GetRefIndustryTypeById, { Id: this.returnCustJobDataObj.RefIndustryTypeId }).toPromise().then(
              (response) => {
                this.returnIndustryTypeObj = response;

                this.industryLookUpObj.nameSelect = this.returnIndustryTypeObj.IndustryTypeName;
                this.industryLookUpObj.jsonSelect = this.returnIndustryTypeObj;
                this.tempRefIndustryType = this.returnIndustryTypeObj.RefIndustryTypeId;
              });
          }


          if (this.returnCustJobDataObj.JobAddrId != null) {
            this.custAddrObj = new CustAddrObj();
            this.custAddrObj.CustAddrId = this.returnCustJobDataObj.JobAddrId;
            this.http.post(this.UrlConstantNew.GetCustAddr, { Id: this.custAddrObj.CustAddrId }).toPromise().then(
              (response) => {
                this.getCustomerAddr = response;
                this.JobDataProForm.patchValue({
                  Notes: this.getCustomerAddr.Notes
                });

                this.addressObj = new CustAddrObj();
                this.addressObj.Addr = this.getCustomerAddr.Addr;
                this.addressObj.AreaCode3 = this.getCustomerAddr.AreaCode3;
                this.addressObj.AreaCode4 = this.getCustomerAddr.AreaCode4;
                this.addressObj.AreaCode1 = this.getCustomerAddr.AreaCode1;
                this.addressObj.AreaCode2 = this.getCustomerAddr.AreaCode2;
                this.addressObj.City = this.getCustomerAddr.City;
                this.addressObj.PhnArea1 = this.getCustomerAddr.PhnArea1;
                this.addressObj.Phn1 = this.getCustomerAddr.Phn1;
                this.addressObj.PhnExt1 = this.getCustomerAddr.PhnExt1;
                this.addressObj.PhnArea2 = this.getCustomerAddr.PhnArea2;
                this.addressObj.Phn2 = this.getCustomerAddr.Phn2;
                this.addressObj.PhnExt2 = this.getCustomerAddr.PhnExt2;
                this.addressObj.PhnArea3 = this.getCustomerAddr.PhnArea3;
                this.addressObj.Phn3 = this.getCustomerAddr.Phn3;
                this.addressObj.PhnExt3 = this.getCustomerAddr.PhnExt3;
                this.addressObj.FaxArea = this.getCustomerAddr.FaxArea;
                this.addressObj.Fax = this.getCustomerAddr.Fax;
                this.addressObj.MrHouseOwnershipCode = this.getCustomerAddr.MrBuildingOwnershipCode;

                this.inputFieldAddressObj = new InputFieldObj(this.UrlConstantNew);
                this.inputFieldAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
                this.inputFieldAddressObj.inputLookupObj.nameSelect = this.getCustomerAddr.Zipcode;
                this.inputFieldAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.getCustomerAddr.Zipcode };
                this.inputAddressObj.default = this.addressObj;
                this.inputAddressObj.inputField = this.inputFieldAddressObj;
              });
          }
          if (this.returnCustJobDataObj.PrevJobAddrId != null) {
            this.preJobAddrObj = new CustAddrObj();
            this.preJobAddrObj.CustAddrId = this.returnCustJobDataObj.PrevJobAddrId;
            this.http.post(this.UrlConstantNew.GetCustAddr, { Id: this.preJobAddrObj.CustAddrId }).toPromise().then(
              (response) => {
                this.getPreJobAddr = response;
                this.JobDataProForm.patchValue({
                  NotesPreJob: this.getPreJobAddr.Notes
                });

                this.preJobAddrObj = new CustAddrObj();
                this.preJobAddrObj.Addr = this.getPreJobAddr.Addr;
                this.preJobAddrObj.AreaCode3 = this.getPreJobAddr.AreaCode3;
                this.preJobAddrObj.AreaCode4 = this.getPreJobAddr.AreaCode4;
                this.preJobAddrObj.AreaCode1 = this.getPreJobAddr.AreaCode1;
                this.preJobAddrObj.AreaCode2 = this.getPreJobAddr.AreaCode2;
                this.preJobAddrObj.City = this.getPreJobAddr.City;
                this.preJobAddrObj.PhnArea1 = this.getPreJobAddr.PhnArea1;
                this.preJobAddrObj.Phn1 = this.getPreJobAddr.Phn1;
                this.preJobAddrObj.PhnExt1 = this.getPreJobAddr.PhnExt1;
                this.preJobAddrObj.PhnArea2 = this.getPreJobAddr.PhnArea2;
                this.preJobAddrObj.Phn2 = this.getPreJobAddr.Phn2;
                this.preJobAddrObj.PhnExt2 = this.getPreJobAddr.PhnExt2;
                this.preJobAddrObj.PhnArea3 = this.getPreJobAddr.PhnArea3;
                this.preJobAddrObj.Phn3 = this.getPreJobAddr.Phn3;
                this.preJobAddrObj.PhnExt3 = this.getPreJobAddr.PhnExt3;
                this.preJobAddrObj.FaxArea = this.getPreJobAddr.FaxArea;
                this.preJobAddrObj.Fax = this.getPreJobAddr.Fax;
                this.preJobAddrObj.MrHouseOwnershipCode = this.getPreJobAddr.MrBuildingOwnershipCode;

                this.inputPreJobAddressObj = new InputFieldObj(this.UrlConstantNew);
                this.inputPreJobAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
                this.inputPreJobAddressObj.inputLookupObj.isRequired = false;
                this.inputPreJobAddressObj.inputLookupObj.nameSelect = this.getPreJobAddr.Zipcode;
                this.inputPreJobAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.getPreJobAddr.Zipcode };
                this.inputPreJobAddressObj.inputLookupObj.isReadonly = false;

                this.inputPreviousAddressObj.default = this.preJobAddrObj;
                this.inputPreviousAddressObj.inputField = this.inputPreJobAddressObj;

              });
          }
          if (this.returnCustJobDataObj.OthBizAddrId != null) {
            this.custOthBizAddrObj = new CustAddrObj();
            this.custOthBizAddrObj.CustAddrId = this.returnCustJobDataObj.OthBizAddrId;
            this.http.post(this.UrlConstantNew.GetCustAddr, { Id: this.custOthBizAddrObj.CustAddrId }).toPromise().then(
              (response) => {
                this.getOthBizAddr = response;
                this.JobDataProForm.patchValue({
                  NotesOther: this.getOthBizAddr.Notes
                });

                this.otherAddrObj = new CustAddrObj();
                this.otherAddrObj.Addr = this.getOthBizAddr.Addr;
                this.otherAddrObj.AreaCode3 = this.getOthBizAddr.AreaCode3;
                this.otherAddrObj.AreaCode4 = this.getOthBizAddr.AreaCode4;
                this.otherAddrObj.AreaCode1 = this.getOthBizAddr.AreaCode1;
                this.otherAddrObj.AreaCode2 = this.getOthBizAddr.AreaCode2;
                this.otherAddrObj.City = this.getOthBizAddr.City;
                this.otherAddrObj.PhnArea1 = this.getOthBizAddr.PhnArea1;
                this.otherAddrObj.Phn1 = this.getOthBizAddr.Phn1;
                this.otherAddrObj.PhnExt1 = this.getOthBizAddr.PhnExt1;
                this.otherAddrObj.PhnArea2 = this.getOthBizAddr.PhnArea2;
                this.otherAddrObj.Phn2 = this.getOthBizAddr.Phn2;
                this.otherAddrObj.PhnExt2 = this.getOthBizAddr.PhnExt2;
                this.otherAddrObj.PhnArea3 = this.getOthBizAddr.PhnArea3;
                this.otherAddrObj.Phn3 = this.getOthBizAddr.Phn3;
                this.otherAddrObj.PhnExt3 = this.getOthBizAddr.PhnExt3;
                this.otherAddrObj.FaxArea = this.getOthBizAddr.FaxArea;
                this.otherAddrObj.Fax = this.getOthBizAddr.Fax;
                this.otherAddrObj.MrHouseOwnershipCode = this.getOthBizAddr.MrBuildingOwnershipCode;

                this.inputOtherAddressObj = new InputFieldObj(this.UrlConstantNew);
                this.inputOtherAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
                this.inputOtherAddressObj.inputLookupObj.isRequired = false;
                this.inputOtherAddressObj.inputLookupObj.nameSelect = this.getOthBizAddr.Zipcode;
                this.inputOtherAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.getOthBizAddr.Zipcode };
                this.inputOtherAddressObj.inputLookupObj.isReadonly = false;
                this.inputOthBizAddressObj.default = this.otherAddrObj;
                this.inputOthBizAddressObj.inputField = this.inputOtherAddressObj;
              });
          }
          if (this.returnCustJobDataObj.JobAddrId != 0 && this.returnCustJobDataObj.JobAddrId != null) {
            this.jobAddrId = this.returnCustJobDataObj.JobAddrId;
          }
          if (this.returnCustJobDataObj.OthBizAddrId != 0 && this.returnCustJobDataObj.OthBizAddrId != null) {
            this.othBizAddrId = this.returnCustJobDataObj.OthBizAddrId;
          }
          if (this.returnCustJobDataObj.PrevJobAddrId != 0 && this.returnCustJobDataObj.PrevJobAddrId != null) {
            this.preJobAddrId = this.returnCustJobDataObj.PrevJobAddrId;
          }

          this.preJobAddrId = this.returnCustJobDataObj.PrevJobAddrId;
          this.jobAddrId = this.returnCustJobDataObj.JobAddrId;
          this.othBizAddrId = this.returnCustJobDataObj.OthBizAddrId;
          this.jobDataId = this.returnCustJobDataObj.CustPersonalJobDataId;
          this.rowVersion = this.returnCustJobDataObj.RowVersion;
          this.typePage = "edit";
        }
      });
    this.inputAddressObj = new InputAddressObj(this.UrlConstantNew);
    this.inputAddressObj.showSubsection = false;
    this.inputAddressObj.title = "Job Address";

    this.inputPreviousAddressObj = new InputAddressObj(this.UrlConstantNew);
    this.inputPreviousAddressObj.showSubsection = false;
    this.inputPreviousAddressObj.isRequired = false;
    this.inputPreviousAddressObj.title = "Previous Job Address";
    this.inputPreviousAddressObj.showOwnership = true;
    this.inputPreviousAddressObj.requiredOwnership = this.setOwnership(CommonConstant.CustAddrTypePreJob);
    this.inputPreviousAddressObj.inputField = this.inputPreJobAddressObj;

    this.isReady = true;
  }

  async getAddrTypeOwnershipRequired(){
    this.listAddrRequiredOwnership = await this.addressService.GetListAddrTypeOwnershipMandatory();
  }

  copyAddress()
  {
    if (this.listCustAddr.length < 1) {
      return
    }

    this.custAddrFromObj = new CustAddrObj();
    this.custAddrFromObj.CustAddrId = this.JobDataProForm.controls["CopyAddrFrom"].value;
    if (this.custAddrFromObj.CustAddrId == 0) return;
    this.http.post(this.UrlConstantNew.GetCustAddr, { Id: this.custAddrFromObj.CustAddrId }).subscribe(
      (response) => {
        this.copyCustomerAddrFrom = response;
        this.JobDataProForm.patchValue({
          Notes: this.copyCustomerAddrFrom.Notes
        });

        this.addressObj = new CustAddrObj();
        this.addressObj.Addr = this.copyCustomerAddrFrom.Addr;
        this.addressObj.AreaCode3 = this.copyCustomerAddrFrom.AreaCode3;
        this.addressObj.AreaCode4 = this.copyCustomerAddrFrom.AreaCode4;
        this.addressObj.AreaCode1 = this.copyCustomerAddrFrom.AreaCode1;
        this.addressObj.AreaCode2 = this.copyCustomerAddrFrom.AreaCode2;
        this.addressObj.City = this.copyCustomerAddrFrom.City;
        this.addressObj.PhnArea1 = this.copyCustomerAddrFrom.PhnArea1;
        this.addressObj.Phn1 = this.copyCustomerAddrFrom.Phn1;
        this.addressObj.PhnExt1 = this.copyCustomerAddrFrom.PhnExt1;
        this.addressObj.PhnArea2 = this.copyCustomerAddrFrom.PhnArea2;
        this.addressObj.Phn2 = this.copyCustomerAddrFrom.Phn2;
        this.addressObj.PhnExt2 = this.copyCustomerAddrFrom.PhnExt2;
        this.addressObj.PhnArea3 = this.copyCustomerAddrFrom.PhnArea3;
        this.addressObj.Phn3 = this.copyCustomerAddrFrom.Phn3;
        this.addressObj.PhnExt3 = this.copyCustomerAddrFrom.PhnExt3;
        this.addressObj.FaxArea = this.copyCustomerAddrFrom.FaxArea;
        this.addressObj.Fax = this.copyCustomerAddrFrom.Fax;
        this.addressObj.MrHouseOwnershipCode = this.copyCustomerAddrFrom.MrBuildingOwnershipCode;
        this.addressObj.StayLength = this.copyCustomerAddrFrom.StayLength;
        this.inputFieldAddressObj = new InputFieldObj(this.UrlConstantNew);
        this.inputFieldAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
        this.inputFieldAddressObj.inputLookupObj.nameSelect = this.copyCustomerAddrFrom.Zipcode;
        this.inputFieldAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.copyCustomerAddrFrom.Zipcode };
        this.inputAddressObj.default = this.addressObj;
        this.inputAddressObj.inputField = this.inputFieldAddressObj;
      });
  }

  copyPreviousAddress()
  {
    if (this.listCustAddr.length < 1) {
      return
    }

    this.custAddrFromObj = new CustAddrObj();
    this.custAddrFromObj.CustAddrId = this.JobDataProForm.controls["CopyPrevAddrFrom"].value;
    if (this.custAddrFromObj.CustAddrId == 0) return;
    this.http.post(this.UrlConstantNew.GetCustAddr, { Id: this.custAddrFromObj.CustAddrId }).subscribe(
      (response) => {
        this.copyCustomerAddrFrom = response;
        this.JobDataProForm.patchValue({
          Notes: this.copyCustomerAddrFrom.Notes
        });

        this.addressObj = new CustAddrObj();
        this.addressObj.Addr = this.copyCustomerAddrFrom.Addr;
        this.addressObj.AreaCode3 = this.copyCustomerAddrFrom.AreaCode3;
        this.addressObj.AreaCode4 = this.copyCustomerAddrFrom.AreaCode4;
        this.addressObj.AreaCode1 = this.copyCustomerAddrFrom.AreaCode1;
        this.addressObj.AreaCode2 = this.copyCustomerAddrFrom.AreaCode2;
        this.addressObj.City = this.copyCustomerAddrFrom.City;
        this.addressObj.PhnArea1 = this.copyCustomerAddrFrom.PhnArea1;
        this.addressObj.Phn1 = this.copyCustomerAddrFrom.Phn1;
        this.addressObj.PhnExt1 = this.copyCustomerAddrFrom.PhnExt1;
        this.addressObj.PhnArea2 = this.copyCustomerAddrFrom.PhnArea2;
        this.addressObj.Phn2 = this.copyCustomerAddrFrom.Phn2;
        this.addressObj.PhnExt2 = this.copyCustomerAddrFrom.PhnExt2;
        this.addressObj.PhnArea3 = this.copyCustomerAddrFrom.PhnArea3;
        this.addressObj.Phn3 = this.copyCustomerAddrFrom.Phn3;
        this.addressObj.PhnExt3 = this.copyCustomerAddrFrom.PhnExt3;
        this.addressObj.FaxArea = this.copyCustomerAddrFrom.FaxArea;
        this.addressObj.Fax = this.copyCustomerAddrFrom.Fax;
        this.addressObj.MrHouseOwnershipCode = this.copyCustomerAddrFrom.MrBuildingOwnershipCode;
        this.addressObj.StayLength = this.copyCustomerAddrFrom.StayLength;
        this.inputFieldAddressObj = new InputFieldObj(this.UrlConstantNew);
        this.inputFieldAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
        this.inputFieldAddressObj.inputLookupObj.nameSelect = this.copyCustomerAddrFrom.Zipcode;
        this.inputFieldAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.copyCustomerAddrFrom.Zipcode };
        this.inputPreviousAddressObj.default = this.addressObj;
        this.inputPreviousAddressObj.inputField = this.inputFieldAddressObj;
      });
  }

  copyOthBizAddress()
  {
    if (this.listCustAddr.length < 1) {
      return
    }

    this.custAddrFromObj = new CustAddrObj();
    this.custAddrFromObj.CustAddrId = this.JobDataProForm.controls["CopyOthBizAddrFrom"].value;
    if (this.custAddrFromObj.CustAddrId == 0) return;
    this.http.post(this.UrlConstantNew.GetCustAddr, { Id: this.custAddrFromObj.CustAddrId }).subscribe(
      (response) => {
        this.copyCustomerAddrFrom = response;
        this.JobDataProForm.patchValue({
          Notes: this.copyCustomerAddrFrom.Notes
        });

        this.addressObj = new CustAddrObj();
        this.addressObj.Addr = this.copyCustomerAddrFrom.Addr;
        this.addressObj.AreaCode3 = this.copyCustomerAddrFrom.AreaCode3;
        this.addressObj.AreaCode4 = this.copyCustomerAddrFrom.AreaCode4;
        this.addressObj.AreaCode1 = this.copyCustomerAddrFrom.AreaCode1;
        this.addressObj.AreaCode2 = this.copyCustomerAddrFrom.AreaCode2;
        this.addressObj.City = this.copyCustomerAddrFrom.City;
        this.addressObj.PhnArea1 = this.copyCustomerAddrFrom.PhnArea1;
        this.addressObj.Phn1 = this.copyCustomerAddrFrom.Phn1;
        this.addressObj.PhnExt1 = this.copyCustomerAddrFrom.PhnExt1;
        this.addressObj.PhnArea2 = this.copyCustomerAddrFrom.PhnArea2;
        this.addressObj.Phn2 = this.copyCustomerAddrFrom.Phn2;
        this.addressObj.PhnExt2 = this.copyCustomerAddrFrom.PhnExt2;
        this.addressObj.PhnArea3 = this.copyCustomerAddrFrom.PhnArea3;
        this.addressObj.Phn3 = this.copyCustomerAddrFrom.Phn3;
        this.addressObj.PhnExt3 = this.copyCustomerAddrFrom.PhnExt3;
        this.addressObj.FaxArea = this.copyCustomerAddrFrom.FaxArea;
        this.addressObj.Fax = this.copyCustomerAddrFrom.Fax;
        this.addressObj.MrHouseOwnershipCode = this.copyCustomerAddrFrom.MrBuildingOwnershipCode;
        this.addressObj.StayLength = this.copyCustomerAddrFrom.StayLength;
        this.inputFieldAddressObj = new InputFieldObj(this.UrlConstantNew);
        this.inputFieldAddressObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
        this.inputFieldAddressObj.inputLookupObj.nameSelect = this.copyCustomerAddrFrom.Zipcode;
        this.inputFieldAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.copyCustomerAddrFrom.Zipcode };
        this.inputOthBizAddressObj.default = this.addressObj;
        this.inputOthBizAddressObj.inputField = this.inputFieldAddressObj;
      });
  }

  setOwnership(MrCustAddrTypeCode: string) : boolean {
    if(this.listAddrRequiredOwnership.find(addrType => addrType == MrCustAddrTypeCode)){
      return true;
    }
    return false;
  }

  setJobAddr() {
    this.jobAddressObj.CustId = this.IdCust;
    this.jobAddressObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeJob;
    this.jobAddressObj.Addr = this.JobDataProForm.controls["jobAddress"]["controls"].Addr.value;
    this.jobAddressObj.FullAddr = this.JobDataProForm.controls["jobAddress"]["controls"].Addr.value + " RT: " + this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode4.value + " RW: " + this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode3.value + " " + this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode2.value + ", " + this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode1.value + " " + this.JobDataProForm.controls["jobAddressZipcode"]["controls"].value.value;
    this.jobAddressObj.AreaCode3 = this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode3.value;
    this.jobAddressObj.AreaCode4 = this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode4.value;
    this.jobAddressObj.Zipcode = this.JobDataProForm.controls["jobAddressZipcode"]["controls"].value.value;
    this.jobAddressObj.AreaCode1 = this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode1.value;
    this.jobAddressObj.AreaCode2 = this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode2.value;
    this.jobAddressObj.City = this.JobDataProForm.controls["jobAddress"]["controls"].City.value;
    this.jobAddressObj.PhnArea1 = this.JobDataProForm.controls["jobAddress"]["controls"].PhnArea1.value;
    this.jobAddressObj.Phn1 = this.JobDataProForm.controls["jobAddress"]["controls"].Phn1.value;
    this.jobAddressObj.PhnExt1 = this.JobDataProForm.controls["jobAddress"]["controls"].PhnExt1.value;
    this.jobAddressObj.PhnArea2 = this.JobDataProForm.controls["jobAddress"]["controls"].PhnArea2.value;
    this.jobAddressObj.Phn2 = this.JobDataProForm.controls["jobAddress"]["controls"].Phn2.value;
    this.jobAddressObj.PhnExt2 = this.JobDataProForm.controls["jobAddress"]["controls"].PhnExt2.value;
    this.jobAddressObj.PhnArea3 = this.JobDataProForm.controls["jobAddress"]["controls"].PhnArea3.value;
    this.jobAddressObj.Phn3 = this.JobDataProForm.controls["jobAddress"]["controls"].Phn3.value;
    this.jobAddressObj.PhnExt3 = this.JobDataProForm.controls["jobAddress"]["controls"].PhnExt3.value;
    this.jobAddressObj.FaxArea = this.JobDataProForm.controls["jobAddress"]["controls"].FaxArea.value;
    this.jobAddressObj.Fax = this.JobDataProForm.controls["jobAddress"]["controls"].Fax.value;
    this.jobAddressObj.MrBuildingOwnershipCode = this.JobDataProForm.controls["jobAddress"]["controls"].MrHouseOwnershipCode.value;
    this.jobAddressObj.Notes = this.JobDataProForm.controls["Notes"].value;
  }

  setCustJobData() {
    this.custPersonalJobDataObj.CustId = this.IdCust;
    this.custPersonalJobDataObj.RefProfessionId = this.tempProfession;
    this.custPersonalJobDataObj.ProfessionalNo = this.JobDataProForm.controls["ProfessionalNo"].value;
    this.custPersonalJobDataObj.JobTitleName = this.JobDataProForm.controls["JobTitleName"].value;
    this.custPersonalJobDataObj.CoyName = this.JobDataProForm.controls["IndustryName"].value;
    this.custPersonalJobDataObj.IsWellknownCoy = this.JobDataProForm.controls["IsWellknownCoy"].value;
    this.custPersonalJobDataObj.MrWellknownCoyCode = this.JobDataProForm.controls["MrWellknownCoyCode"].value;
    this.custPersonalJobDataObj.RefIndustryTypeId = this.tempRefIndustryType;
    this.custPersonalJobDataObj.EmploymentEstablishmentDt = this.JobDataProForm.controls["EstablishmentDate"].value;
    this.custPersonalJobDataObj.PrevCoyName = this.JobDataProForm.controls["PreviIndustryName"].value;
    this.custPersonalJobDataObj.PrevEmploymentDt = this.JobDataProForm.controls["PreviEmploymentDate"].value;
    this.custPersonalJobDataObj.OthBizName = this.JobDataProForm.controls["OtherBusinessName"].value;
    this.custPersonalJobDataObj.OthBizType = this.JobDataProForm.controls["OtherBusinessType"].value;
    this.custPersonalJobDataObj.OthBizIndustryTypeCode = this.JobDataProForm.controls["OtherBusinessIndustry"].value;
    this.custPersonalJobDataObj.OthBizJobPosition = this.JobDataProForm.controls["OtherJobPosition"].value;
    this.custPersonalJobDataObj.OthBizEstablishmentDt = this.JobDataProForm.controls["OtherEstablishmentDate"].value;
  }

  setPreJobAddr() {
    this.preJobAddressObj.CustId = this.IdCust;
    this.preJobAddressObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypePreJob;
    this.preJobAddressObj.Addr = this.JobDataProForm.controls["prejobAddress"]["controls"].Addr.value;
    this.preJobAddressObj.FullAddr = this.JobDataProForm.controls["prejobAddress"]["controls"].Addr.value + " RT: " + this.JobDataProForm.controls["prejobAddress"]["controls"].AreaCode4.value + " RW: " + this.JobDataProForm.controls["prejobAddress"]["controls"].AreaCode3.value + " " + this.JobDataProForm.controls["prejobAddress"]["controls"].AreaCode2.value + ", " + this.JobDataProForm.controls["prejobAddress"]["controls"].AreaCode1.value + " " + this.JobDataProForm.controls["prejobAddressZipcode"]["controls"].value.value;
    this.preJobAddressObj.AreaCode3 = this.JobDataProForm.controls["prejobAddress"]["controls"].AreaCode3.value;
    this.preJobAddressObj.AreaCode4 = this.JobDataProForm.controls["prejobAddress"]["controls"].AreaCode4.value;
    this.preJobAddressObj.Zipcode = this.JobDataProForm.controls["prejobAddressZipcode"]["controls"].value.value;
    this.preJobAddressObj.AreaCode1 = this.JobDataProForm.controls["prejobAddress"]["controls"].AreaCode1.value;
    this.preJobAddressObj.AreaCode2 = this.JobDataProForm.controls["prejobAddress"]["controls"].AreaCode2.value;
    this.preJobAddressObj.City = this.JobDataProForm.controls["prejobAddress"]["controls"].City.value;
    this.preJobAddressObj.PhnArea1 = this.JobDataProForm.controls["prejobAddress"]["controls"].PhnArea1.value;
    this.preJobAddressObj.Phn1 = this.JobDataProForm.controls["prejobAddress"]["controls"].Phn1.value;
    this.preJobAddressObj.PhnExt1 = this.JobDataProForm.controls["prejobAddress"]["controls"].PhnExt1.value;
    this.preJobAddressObj.PhnArea2 = this.JobDataProForm.controls["prejobAddress"]["controls"].PhnArea2.value;
    this.preJobAddressObj.Phn2 = this.JobDataProForm.controls["prejobAddress"]["controls"].Phn2.value;
    this.preJobAddressObj.PhnExt2 = this.JobDataProForm.controls["prejobAddress"]["controls"].PhnExt2.value;
    this.preJobAddressObj.PhnArea3 = this.JobDataProForm.controls["prejobAddress"]["controls"].PhnArea3.value;
    this.preJobAddressObj.Phn3 = this.JobDataProForm.controls["prejobAddress"]["controls"].Phn3.value;
    this.preJobAddressObj.PhnExt3 = this.JobDataProForm.controls["prejobAddress"]["controls"].PhnExt3.value;
    this.preJobAddressObj.FaxArea = this.JobDataProForm.controls["prejobAddress"]["controls"].FaxArea.value;
    this.preJobAddressObj.Fax = this.JobDataProForm.controls["prejobAddress"]["controls"].Fax.value;
    this.preJobAddressObj.MrBuildingOwnershipCode = this.JobDataProForm.controls["prejobAddress"]["controls"].MrHouseOwnershipCode.value;
    this.preJobAddressObj.Notes = this.JobDataProForm.controls["NotesPreJob"].value;
  }

  setOthBizAddr() {
    this.otherAddressObj.CustId = this.IdCust;
    this.otherAddressObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeOthBiz;
    this.otherAddressObj.Addr = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].Addr.value;
    this.otherAddressObj.FullAddr = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].Addr.value + " RT: " + this.JobDataProForm.controls["otherBusinessAddress"]["controls"].AreaCode4.value + " RW: " + this.JobDataProForm.controls["otherBusinessAddress"]["controls"].AreaCode3.value + " " + this.JobDataProForm.controls["otherBusinessAddress"]["controls"].AreaCode2.value + ", " + this.JobDataProForm.controls["otherBusinessAddress"]["controls"].AreaCode1.value + " " + this.JobDataProForm.controls["otherBusinessAddressZipcode"]["controls"].value.value;
    this.otherAddressObj.AreaCode3 = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].AreaCode3.value;
    this.otherAddressObj.AreaCode4 = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].AreaCode4.value;
    this.otherAddressObj.Zipcode = this.JobDataProForm.controls["otherBusinessAddressZipcode"]["controls"].value.value;
    this.otherAddressObj.AreaCode1 = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].AreaCode1.value;
    this.otherAddressObj.AreaCode2 = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].AreaCode2.value;
    this.otherAddressObj.City = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].City.value;
    this.otherAddressObj.PhnArea1 = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].PhnArea1.value;
    this.otherAddressObj.Phn1 = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].Phn1.value;
    this.otherAddressObj.PhnExt1 = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].PhnExt1.value;
    this.otherAddressObj.PhnArea2 = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].PhnArea2.value;
    this.otherAddressObj.Phn2 = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].Phn2.value;
    this.otherAddressObj.PhnExt2 = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].PhnExt2.value;
    this.otherAddressObj.PhnArea3 = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].PhnArea3.value;
    this.otherAddressObj.Phn3 = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].Phn3.value;
    this.otherAddressObj.PhnExt3 = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].PhnExt3.value;
    this.otherAddressObj.FaxArea = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].FaxArea.value;
    this.otherAddressObj.Fax = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].Fax.value;
    this.otherAddressObj.MrBuildingOwnershipCode = this.JobDataProForm.controls["otherBusinessAddress"]["controls"].MrHouseOwnershipCode.value;
    this.otherAddressObj.Notes = this.JobDataProForm.controls["NotesOther"].value;
  }

  async SaveForm(IsParent: boolean = false): Promise<boolean> {
    if (this.JobDataProForm.invalid) {
      NewCustSetData.markFormGroupTouched(this.JobDataProForm);
      return false;
    }
    if (this.typePage == "edit") {
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.custPersonalJobDataObj = new CustPersonalJobDataObj;
      this.jobAddressObj = new CustAddrObj;
      this.othBizAddrObj = new CustAddrObj;
      this.setCustJobData();
      this.custPersonalJobDataObj.JobAddrId = this.jobAddrId == null ? 0 : this.jobAddrId;
      this.custPersonalJobDataObj.PrevJobAddrId = this.preJobAddrId == null ? 0 : this.preJobAddrId;
      this.custPersonalJobDataObj.OthBizAddrId = this.othBizAddrId == null ? 0 : this.othBizAddrId;
      this.custPersonalJobDataObj.CustPersonalJobDataId = this.jobDataId;
      this.custPersonalJobDataObj.RowVersion = this.rowVersion;
      this.jobAddressObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeJob;
      this.othBizAddrObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeOthBiz;
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.jobAddressObj = new CustAddrObj;
      this.setJobAddr();
      this.preJobAddressObj = new CustAddrObj;
      this.setPreJobAddr();
      this.otherAddressObj = new CustAddrObj;
      this.setOthBizAddr();
      this.reqCustPersonalJobDataObj.JobAddr = this.jobAddressObj;
      this.reqCustPersonalJobDataObj.PreJobAddr = this.preJobAddressObj;
      this.reqCustPersonalJobDataObj.OthBizAddr = this.otherAddressObj;
      this.reqCustPersonalJobDataObj.CustPersonalJobData.MrCustModelCode = CommonConstant.CUST_MODEL_PROF;

      if(this.custPersonalJobDataObj.EmploymentEstablishmentDt.toString() > this.MaxDtValidate){
        this.toastr.warningMessage(String.Format(ExceptionConstant.EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE));
        return false;
      }

      if(this.custPersonalJobDataObj.OthBizEstablishmentDt.toString() > this.MaxDtValidate){
        this.toastr.warningMessage(String.Format(ExceptionConstant.OTHER_BIZ_EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE));
        return false;
      }

      await this.http.post(this.UrlConstantNew.EditCustPersonalJobData, this.reqCustPersonalJobDataObj).toPromise().then(
        (response) => {
          this.toastr.successMessage(response["message"]);
          if (!IsParent) this.outputTab.emit({ stepMode: "next" });
        }
      );
    } else {
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.custPersonalJobDataObj = new CustPersonalJobDataObj;
      this.setCustJobData();
      this.jobAddressObj = new CustAddrObj;
      this.setJobAddr();
      this.otherAddressObj = new CustAddrObj;
      this.setOthBizAddr();
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.reqCustPersonalJobDataObj.JobAddr = this.jobAddressObj;
      this.reqCustPersonalJobDataObj.OthBizAddr = this.othBizAddrObj;
      this.preJobAddressObj = new CustAddrObj;
      this.setPreJobAddr();
      this.reqCustPersonalJobDataObj.PreJobAddr = this.preJobAddressObj;
      this.reqCustPersonalJobDataObj.OthBizAddr = this.otherAddressObj;
      this.reqCustPersonalJobDataObj.CustPersonalJobData.MrCustModelCode = CommonConstant.CUST_MODEL_PROF;

      if(this.custPersonalJobDataObj.EmploymentEstablishmentDt.toString() > this.MaxDtValidate){
        this.toastr.warningMessage(String.Format(ExceptionConstant.EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE));
        return false;
      }

      if(this.custPersonalJobDataObj.OthBizEstablishmentDt.toString() > this.MaxDtValidate){
        this.toastr.warningMessage(String.Format(ExceptionConstant.OTHER_BIZ_EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE));
        return false;
      }

      await this.http.post(this.UrlConstantNew.AddCustPersonalJobData, this.reqCustPersonalJobDataObj).toPromise().then(
        (response) => {
          this.toastr.successMessage(response["message"]);
          if (!IsParent) this.outputTab.emit({ stepMode: "next" });
        }
      );
    }
    return true;
  }

  onFocusOutEstDate(event){
    if(event.target.value > this.MaxDtValidate){
      this.toastr.warningMessage(String.Format(ExceptionConstant.EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE));
      return;
    }
  }

  onFocusOutOtherBizEstDate(event){
    if(event.target.value > this.MaxDtValidate){
      this.toastr.warningMessage(String.Format(ExceptionConstant.OTHER_BIZ_EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE));
      return;
    }
  }

  isWellknownCoyChecked(checked: boolean) {
    this.IsWellknownCoy = checked;
    if(checked){
      this.companyLookupObj.isRequired = true;
    }
    else{
      this.companyLookupObj.isRequired = false;
    }
  }

  getCoy(event: any) {
    this.JobDataProForm.patchValue({
      MrWellknownCoyCode: event.MasterCode,
      IndustryName: event.Descr
    });
  }

}
