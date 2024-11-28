import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { first } from 'rxjs/operators';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { RefCoaObj } from 'app/shared/model/common-setting/ref-coa-obj.model';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { Router } from '@angular/router';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-coa-detail',
  templateUrl: './coa-detail.component.html'
})

export class CoaDetailComponent implements OnInit {
  ListCurr: Array<any> = new Array<any>();
  colHeadTable: Array<any> = new Array<any>();
  ListCOA: Array<any> = new Array<any>();
  ListOfCOA: Array<any> = new Array<any>();;
  ListEntityType: Array<any> = new Array<any>();
  ListPaymentAlloc: Array<any> = new Array<any>();
  ListCurrCode: Array<KeyValueObj> = new Array<KeyValueObj>();
  entityTypeList: any;
  entitySelect: string = "";
  entityTypeSelect: any;
  refCoaObj: RefCoaObj = new RefCoaObj();
  ListRefCoaObj: Array<RefCoaObj> = new Array<RefCoaObj>();
  mode: string = "";
  coaId: string = "";
  CoaForm = this.fb.group({
    ListCoa: this.fb.array([])
  });
  Shows: boolean = false;
  isReady: boolean = true;

  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: NGXToastrService,
    private http: HttpClient,
    private UrlConstantNew: UrlConstantNew) {
  }

  ngOnInit() {
    this.GetDdlCurr();

    let refMasterEntityType: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    refMasterEntityType.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeEntityType;
    this.http.post(this.UrlConstantNew.GetListActiveRefMaster, refMasterEntityType).pipe(first()).subscribe(
      (response) => {
        this.entityTypeList = response["ReturnObject"];
      }
    );

    this.colHeadTable = [];
  }

  GetDdlCurr() {
    this.http.post(this.UrlConstantNew.GetListKvpActiveRefCurr, null).subscribe(
      (response) => {
        this.ListCurrCode = response["ReturnObject"]
      },
      (error) => {
        console.log(error)
      }
    );
  }

  async Add(ev: HTMLInputElement) {
    if (ev.value == "-Select One-") {
      this.toastr.warningMessage(ExceptionConstant.PLEASE_SELECT_ONE);
    }
    else {
      this.isReady = false;
      var ListCurrBeforeAdd = [...this.ListCurr];
      if ((ListCurrBeforeAdd.findIndex(x => x.newCurr === ev.value)) === -1) {
        this.colHeadTable.push({ newHead: 'COA ' + ev.value });
        var reqListCoaObj: Array<RefCoaObj> = [];
        for (let i = 0; i < this.ListCOA.length; i++) {
          var CoaObjForSubmit = new RefCoaObj();
          CoaObjForSubmit.MrEntityCode = this.ListCOA[i].coa[0].EntityCode;
          CoaObjForSubmit.MrEntityType = this.ListCOA[i].coa[0].EntityTypeCode;
          CoaObjForSubmit.PaymentAllocCode = this.ListCOA[i].coa[0].PaymentAllocCode;
          CoaObjForSubmit.CurrCode = ev.value;
          reqListCoaObj.push(CoaObjForSubmit);         
        }
        
        var reqPayload = {"ListRequestRefCoaObjs" : reqListCoaObj};
        var result : Array<RefCoaObj> = [];
        await this.http.post(this.UrlConstantNew.GetRefCoaWithoutCoaSchemeByReqListCoaObj, reqPayload).toPromise().then(
          (response) => {
            if (!response['ListResponseRefCoaObj']) return;
            result = response['ListResponseRefCoaObj'];
          },
          (error) => {
            console.log(error)
          }
        );

        if (!result) return;
        for(let j=0; j<reqListCoaObj.length; j++)
        {
          var ListDataCOA = this.GetListCoaFormArray().get(j.toString()).get("DataCOA") as FormArray;
          let currReqItem = reqListCoaObj[j];
          let resItem = result.find(x => x.MrEntityCode == currReqItem.MrEntityCode && x.MrEntityType == currReqItem.MrEntityType && x.PaymentAllocCode==currReqItem.PaymentAllocCode && x.CurrCode == x.CurrCode);
          if (!resItem) resItem = new RefCoaObj();
          ListDataCOA.push(this.AddListCoaDetailItemFormGroup(resItem.Coa, resItem.RefCoaId));
          if (j === this.ListCOA.length - 1) 
          {
            this.ListCurr.push({ newCurr: ev.value });
          }
        }           

      }
      else {
        this.toastr.warningMessage(ExceptionConstant.ALREADY_EXIST);
      }
      this.isReady = true;
    }
  }

  AddNewDataCoaFormGroup(): FormGroup {
    return this.fb.group({
      DataCOA: this.fb.array([])
    })
  }

  AddListCoaDetailItemFormGroup(Coa: string, CoaId: number): FormGroup {
    if (Coa === '' || Coa === null) {
      return new FormGroup({
        COA: new FormControl(''),
        RefCoaId: new FormControl(0)
      });
    }
    else {
      return new FormGroup({
        COA: new FormControl(Coa),
        RefCoaId: new FormControl(CoaId)
      });
    }
  }

  GetListCoaFormArray(): FormArray {
    return this.CoaForm.get("ListCoa") as FormArray
  }

  GetListCoaInfoDataCOA(idx: number): FormControl {
    let ListCoaInfo: FormArray = this.CoaForm.get("ListCoa") as FormArray;
    let ListCoaInfoIdxAt = ListCoaInfo.get(idx.toString()) as FormGroup;
    return ListCoaInfoIdxAt.get("DataCOA") as FormControl;
  }

  GetListCoa() {
    this.ListOfCOA = new Array<any>();;
    for (let i = 0; i < this.ListCOA.length; i++) {
      for (let j = 0; j < this.ListCurr.length; j++) {
        var coaValue = new Array<any>();
        var DataCoa = this.GetListCoaInfoDataCOA(i);
        coaValue = [
          {
            EntityType: this.ListCOA[i].coa[0].EntityType,
            PaymentAllocCode: this.ListCOA[i].coa[0].PaymentAllocCode,
            EntityCode: this.ListCOA[i].coa[0].EntityCode,
            EntityTypeCode: this.ListCOA[i].coa[0].EntityTypeCode,
            CurrCode: this.ListCurr[j].newCurr,
            Coa: DataCoa.value[j].COA,
            RefCoaId: DataCoa.value[j].RefCoaId
          }
        ];
        this.ListOfCOA.push(coaValue);
      }
    }
  }

  Submit() {
    let CountCoaNull: number = 0;
    this.ListRefCoaObj = new Array<RefCoaObj>();
    this.GetListCoa();
    for (let i = 0; i < this.ListOfCOA.length; i++) {
      this.refCoaObj = new RefCoaObj();
      this.refCoaObj.RefAcctBookId = 1;
      this.refCoaObj.MrEntityCode = this.ListOfCOA[i][0].EntityCode;
      this.refCoaObj.MrEntityType = this.ListOfCOA[i][0].EntityTypeCode;
      this.refCoaObj.CurrCode = this.ListOfCOA[i][0].CurrCode;
      this.refCoaObj.PaymentAllocCode = this.ListOfCOA[i][0].PaymentAllocCode;
      this.refCoaObj.Coa = this.ListOfCOA[i][0].Coa;
      this.refCoaObj.RefCoaId = this.ListOfCOA[i][0].RefCoaId;
      if (this.refCoaObj.Coa === "") {
        CountCoaNull += 1
      }
      this.ListRefCoaObj.push(this.refCoaObj);
    }

    if (this.Shows === false) {
      this.toastr.errorMessage("Can not Submit Coa, Please Select Entity Type First!");
    }
    else if (this.ListCurr.length === 0) {
      this.toastr.errorMessage("Can not Submit Coa, Please Select Currency First!");
    }
    else if (this.ListOfCOA.length === CountCoaNull) {
      this.toastr.errorMessage("Can not Submit Coa, Please input at least one Coa!");
    }
    else {
      var RequestListRefCoa = {
        ListRequestRefCoaObjs: this.ListRefCoaObj
      }
      this.http.post(this.UrlConstantNew.SubmitListCoa, RequestListRefCoa, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.router.navigate([NavigationConstant.CS_COA_PAGING]);
          this.toastr.successMessage(response["Message"]);
        },
        (error) => {
          this.toastr.typeErrorCustom(error);
        }
      );
    }
  }

  async Show(ev: HTMLInputElement) {
    this.entitySelect = ev.value;
    if (ev.value == "") {
      this.toastr.warningMessage(ExceptionConstant.PLEASE_SELECT_ONE);
    }
    else {
      const arr = <FormArray>this.CoaForm.controls.ListCoa;
      arr.controls = [];
      this.ListCOA = new Array<any>();
      this.entityTypeSelect = this.entityTypeList.filter(
        comp => comp.Key == this.entitySelect);

      this.colHeadTable = [];
      this.ListPaymentAlloc = new Array<any>();
      this.ListCurr = new Array<any>();

      if (this.entitySelect == CommonConstant.RefMasterTypeCodeEntityTypePayAlloc) {
        await this.http.post<any>(this.UrlConstantNew.GetListKeyValueRefPaymentAllocActive, {}).toPromise().then(
          (response: any) => {
            this.ListPaymentAlloc = response.ReturnObject
          },
          (error) => {
            console.log(error)
          }
        );
        this.AddToCoa()
      }
      else if (this.entitySelect == CommonConstant.RefMasterTypeCodeEntityTypeBankAcc) {
        await this.http.post<any>(this.UrlConstantNew.GetListKeyValueActiveOfficeBankAcc, {}).toPromise().then(
          (response: any) => {
            this.ListPaymentAlloc = response.ReturnObject
          },
          (error) => {
            console.log(error)
          }
        );
        this.AddToCoa()
      }
      else if (this.entitySelect == CommonConstant.RefMasterTypeCodeEntityTypeSuppl) {
        await this.http.post<any>(this.UrlConstantNew.GetListKvpPayAllocVendorByCategoryCode, { Code: CommonConstant.SUPPLIER }).toPromise().then(
          (response: any) => {
            this.ListPaymentAlloc = response.ReturnObject
          },
          (error) => {
            console.log(error)
          }
        );
        this.AddToCoa()
      }
      else if (this.entitySelect == CommonConstant.RefMasterTypeCodeEntityTypeInsuranceCompany) {
        await this.http.post<any>(this.UrlConstantNew.GetListKvpPayAllocVendorByCategoryCode, { Code: CommonConstant.ASSET_INSCO_BRANCH }).toPromise().then(
          (response: any) => {
            this.ListPaymentAlloc = response.ReturnObject
          },
          (error) => {
            console.log(error)
          }
        );

        this.AddToCoa()
      }
      else if (this.entitySelect == CommonConstant.RefMasterTypeCodeEntityTypeLifeInsuranceCompany) {
        await this.http.post<any>(this.UrlConstantNew.GetListKvpPayAllocVendorByCategoryCode, { Code: CommonConstant.LIFE_INSCO_BRANCH }).toPromise().then(
          (response: any) => {
            this.ListPaymentAlloc = response.ReturnObject
          },
          (error) => {
            console.log(error)
          }
        );

        this.AddToCoa()
      }
      else if (this.entitySelect == CommonConstant.RefMasterTypeCodeEntityTypeFunding) {
        await this.http.post<any>(this.UrlConstantNew.GetListKvpPayAllocVendorByCategoryCode, { Code: CommonConstant.TL_FUNDING_COMPANY }).toPromise().then(
          (response: any) => {
            this.ListPaymentAlloc = response.ReturnObject
          },
          (error) => {
            console.log(error)
          }
        );

        this.AddToCoa()
      }
      else if (this.entitySelect == CommonConstant.RefMasterTypeCodeEntityTypeOffice) {
        await this.http.post<any>(this.UrlConstantNew.GetListKvpPayAllocRefOfficeByMrPayAllocGrpCode, {Code: CommonConstant.MR_PAY_ALLOC_GRP_CODE_OFFICE}).toPromise().then(
          (response: any) => {
            this.ListPaymentAlloc = response.ReturnObject
          },
          (error) => {
            console.log(error)
          }
        );

        this.AddToCoa()
      }
      this.Shows = true;
    }
  }

  AddToCoa() {
    for (let j = 0; j < this.ListPaymentAlloc.length; j++) {
      var coa = new Array<any>();
      if (this.entityTypeSelect[0].Key == CommonConstant.RefMasterTypeCodeEntityTypeBankAcc) {
        coa = [
          {
            EntityType: this.entityTypeSelect[0].Value,
            EntityTypeCode: this.entityTypeSelect[0].Key,
            PaymentAllocCode: "-",
            EntityCode: this.ListPaymentAlloc[j].Key
          }
        ];
      }
       else if (this.entityTypeSelect[0].Key == CommonConstant.RefMasterTypeCodeEntityTypeSuppl || this.entityTypeSelect[0].Key == CommonConstant.RefMasterTypeCodeEntityTypeInsuranceCompany ||this.entityTypeSelect[0].Key == CommonConstant.RefMasterTypeCodeEntityTypeLifeInsuranceCompany || this.entityTypeSelect[0].Key == CommonConstant.RefMasterTypeCodeEntityTypeFunding) {
        coa = [
          {
            EntityType: this.entityTypeSelect[0].Value,
            EntityTypeCode: this.entityTypeSelect[0].Key,
            PaymentAllocCode: this.ListPaymentAlloc[j].Key,
            EntityCode: this.ListPaymentAlloc[j].Value
          }
        ];
      }
      else if (this.entityTypeSelect[0].Key == CommonConstant.RefMasterTypeCodeEntityTypeOffice) {
        coa = [
          {
            EntityType: this.entityTypeSelect[0].Value,
            EntityTypeCode: this.entityTypeSelect[0].Key,
            PaymentAllocCode: this.ListPaymentAlloc[j].Key,
            EntityCode: this.ListPaymentAlloc[j].Value
          }
        ];
      }
      else {
        coa = [
          {
            EntityType: this.entityTypeSelect[0].Value,
            EntityTypeCode: this.entityTypeSelect[0].Key,
            PaymentAllocCode: this.ListPaymentAlloc[j].Key,
            EntityCode: this.entityTypeSelect[0].Key
          }
        ];
      }
      this.ListCOA.push({ coa });
      this.GetListCoaFormArray().push(this.AddNewDataCoaFormGroup());
    }
  }
}