import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormArray, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CoaSchmObj } from 'app/shared/model/common-setting/coa-schm-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { RefCoaObj } from 'app/shared/model/common-setting/ref-coa-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-coa-scheme-detail',
  templateUrl: './coa-scheme-detail.component.html'
})
export class CoaSchemeDetailComponent implements OnInit {
  ListCoa: FormArray;
  ListDataCOA: FormArray;
  ListCopy: Array<KeyValueObj> = new Array<KeyValueObj>();
  colHeadTable: Array<any> = new Array<any>();
  cekHead: boolean = false;
  ListCurr: Array<KeyValueObj> = new Array<KeyValueObj>();
  ListSelectedCurr: Array<any> = new Array<any>();
  ListGetCoaCurr: Array<any> = new Array<any>();
  ListPaymentAlloc: Array<any> = new Array<any>();
  MrPayAllocGrpCode: string = "PAY_ALLOC_COA_SCHM";

  CountAdd: number = 0;
  CoaValue: string = "";
  SchemeCode: string = "";
  SchemeName: string = "";
  mode: string = "";
  coaSchmId: string = "";
  coaSchmObj: CoaSchmObj = new CoaSchmObj();
  refCoaObj: RefCoaObj = new RefCoaObj();
  isTableReady: boolean = false
  ListRefCoaObj: Array<RefCoaObj> = new Array<RefCoaObj>();

  CoaSchemeForm = this.fb.group({
    SchemeCode: ['', Validators.required],
    SchemeName: ['', Validators.required],
    IsActive: [false],
    ListCoa: this.fb.array([])
  });

  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: NGXToastrService,
    private http: HttpClient,
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['CoaSchmId'] != null) {
        this.coaSchmId = queryParams['CoaSchmId'];
      }
      if (queryParams['mode'] != null) {
        this.mode = queryParams['mode'];
      }
    });
  }

  async ngOnInit() {
    this.colHeadTable = [];
    this.GetDdlCurr();
    this.getListCopy();

    if (this.mode === "Edit") {
      this.CoaSchemeForm.controls["SchemeCode"].disable();
      this.GetCoaSchmData();
      await this.GetListPaymentAlloc();
      await this.GetCoaSchmDetail(this.coaSchmId);
    } else {
      this.GetListPaymentAlloc();
      this.isTableReady = true;
      this.ListCoa = this.GetListCoaFormArray();
    }
  }

  GetListCoaInfoDataCoaInfoCoa(idxListCoa: number, idxDtCoa: number): FormControl{
    let ListCoaInfo: FormArray = this.CoaSchemeForm.get("ListCoa") as FormArray;
    let ListCoaInfoIdxAt = ListCoaInfo.get(idxListCoa.toString()) as FormGroup;
    let ListDataCoaInfo = ListCoaInfoIdxAt.get("DataCOA") as FormArray;
    let ListDataCoaInfoIxAt = ListDataCoaInfo.get(idxDtCoa.toString()) as FormGroup;

    return ListDataCoaInfoIxAt.get("COA") as FormControl;
  }

  GetListCoaInfoListDataCoa(idxListCoa: number): FormArray{
    let ListCoaInfo: FormArray = this.CoaSchemeForm.get("ListCoa") as FormArray;
    let ListCoaInfoIdxAt = ListCoaInfo.get(idxListCoa.toString()) as FormGroup;
    let ListDataCoaInfo = ListCoaInfoIdxAt.get("DataCOA") as FormArray;

    return ListDataCoaInfo;
  }

  GetListCoaInfoDataCoaInfoCoaValue(idxListCoa: number, idxDtCoa: number): any{
    let ListCoaInfo: FormArray = this.CoaSchemeForm.get("ListCoa") as FormArray;
    let ListCoaInfoIdxAt = ListCoaInfo.get(idxListCoa.toString()) as FormGroup;
    let ListDataCoaInfo = ListCoaInfoIdxAt.get("DataCOA") as FormArray;
    let ListDataCoaInfoIxAt = ListDataCoaInfo.value[idxDtCoa.toString()].COA;

    return ListDataCoaInfoIxAt;
  }

  GetListCoaFormArray(): FormArray {
    return this.CoaSchemeForm.get("ListCoa") as FormArray
  }

  getListCopy() {
    this.http.post<any>(this.UrlConstantNew.GetListCoaSchmActive, {}).subscribe
      (
        (response: any) => {
          this.ListCopy = response.ReturnObject
        },
        (error) => {
          console.log(error)
        }
      )
  }

  Add(ev) {
    if (ev.value == "null" || ev.value == "" || ev.value == null || ev.value == undefined) {
      this.cekHead = true;
      this.toastr.errorMessage("Can not add Currency Code, Please select currency first!");
      return;
    }
    for (let i = 0; i < this.colHeadTable.length; i++) {
      if (this.colHeadTable[i].newHead == 'COA ' + ev.value) {
        this.toastr.errorMessage("This Currency Code already exists !");
        this.cekHead = true;
        break;
      }

      else { this.cekHead = false; }
    }

    if (!this.cekHead) {
      this.colHeadTable.push({ newHead: 'COA ' + ev.value });
      this.ListSelectedCurr.push({ newCurr: ev.value });
      this.CountAdd = this.CountAdd + 1;

      if (this.CountAdd !== 1) {
        this.ListCoa = this.GetListCoaFormArray();
        for (let i = 0; i < this.ListPaymentAlloc.length; i++) {
          this.ListDataCOA = this.GetListCoaInfoListDataCoa(i);
          this.ListDataCOA.push(this.createDetailItem());
        }
      }
    }
  }

  createItem(): FormGroup {
    return this.fb.group({
      DataCOA: this.fb.array([
        this.createDetailItem()
      ])
    })
  }

  createDetailItem(): FormGroup {
    return new FormGroup({
      COA: new FormControl('')
    });
  }

  copy(ev) {
    this.CoaValue = "COA SHEME";
    if (ev.value == "null" || ev.value == "" || ev.value == null || ev.value == undefined)
    {
      this.toastr.errorMessage("Can not Copy Coa Scheme, Please select Coa Scheme first!");
      return;
    }
    var done = false;
    this.colHeadTable = [];
    this.ListCoa = this.GetListCoaFormArray();
    this.ListCoa = this.fb.array([]);
    this.ListSelectedCurr= [];
    this.GetCoaSchmDetail(ev.value);
  }

  Submit() {
    let CountCoaNull: number = 0;
    this.coaSchmObj.SchmCode = this.CoaSchemeForm.controls["SchemeCode"].value;
    this.coaSchmObj.SchmName = this.CoaSchemeForm.controls["SchemeName"].value;
    this.coaSchmObj.IsActive = this.CoaSchemeForm.controls["IsActive"].value;
    this.coaSchmObj.CoaSchmId = Number(this.coaSchmId);

    this.ListRefCoaObj = new Array<RefCoaObj>();
    for (let i = 0; i < this.ListSelectedCurr.length; i++) {
      for (let j = 0; j < this.ListPaymentAlloc.length; j++) {
        this.refCoaObj = new RefCoaObj();
        this.refCoaObj.RefAcctBookId = 1;
        this.refCoaObj.MrEntityCode = CommonConstant.RefMasterTypeCodeEntityTypePayAlloc;
        this.refCoaObj.MrEntityType = CommonConstant.RefMasterTypeCodeEntityTypePayAlloc;
        this.refCoaObj.CurrCode = this.ListSelectedCurr[i].newCurr;
        this.refCoaObj.PaymentAllocCode = this.ListPaymentAlloc[j].Key;
        this.refCoaObj.Coa = this.GetListCoaInfoDataCoaInfoCoaValue(j, i);
        if(this.refCoaObj.Coa === "" || this.refCoaObj.Coa === null)
        {
          CountCoaNull += 1;
        }
        this.ListRefCoaObj.push(this.refCoaObj);
      }
    }
    this.coaSchmObj.ListRefCoa = this.ListRefCoaObj;

    if(this.ListSelectedCurr.length === 0 )
    {
      this.toastr.errorMessage("Can not Submit Coa Scheme, Please select Currency First!");
    }
    else if(CountCoaNull == this.ListPaymentAlloc.length * this.ListSelectedCurr.length)
    {
      this.toastr.errorMessage("Can not Submit Coa Scheme, Please input at least one Coa!");
    }
    else
    {
      this.http.post(this.UrlConstantNew.SubmitCoaSchm, this.coaSchmObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.router.navigate([NavigationConstant.CS_COA_SCHM_PAGING]);
          this.toastr.successMessage(response["Message"]);
        },
        (error) => {
          this.toastr.typeErrorCustom(error);
        }
      );
    }
  }

  GetDdlCurr() {
    this.http.post<any>(this.UrlConstantNew.GetListKvpActiveRefCurr, {}).subscribe
      (
        (response: any) => {
          this.ListCurr = response.ReturnObject
        },
        (error) => {
          console.log(error)
        }
      )
  }

  async GetListPaymentAlloc() {
    await this.http.post<any>(this.UrlConstantNew.GetListKeyValueRefPaymentAllocByPayAllocGrpCode, { Code: this.MrPayAllocGrpCode }).toPromise().then(
      (response: any) => {
        this.ListPaymentAlloc = response.ReturnObject

        this.ListCoa = this.GetListCoaFormArray();
        for (let i = 0; i < this.ListPaymentAlloc.length; i++) {
          this.ListCoa.push(this.createItem());
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }

  GetCoaSchmData() {
    this.http.post<CoaSchmObj>(this.UrlConstantNew.GetCoaSchmByCoaSchmId, { Id: this.coaSchmId }).subscribe(
      (response) => {
        this.coaSchmObj = response;

        this.CoaSchemeForm.patchValue({
          SchemeCode: this.coaSchmObj.SchmCode,
          SchemeName: this.coaSchmObj.SchmName,
          IsActive: this.coaSchmObj.IsActive
        })
      },
      (error) => {
        this.toastr.typeErrorCustom(error);
      }
    );
  }

  async GetCoaSchmDetail(Id: string) {
    await this.http.post<any>(this.UrlConstantNew.GetListRefCoaByCoaSchmIdV2, { Id: Id }).toPromise().then(
      (response) => {
        this.ListRefCoaObj = response.ReturnObject;
        this.ListGetCoaCurr = this.ListRefCoaObj.map(item => item.CurrCode)
          .filter((value, index, self) => self.indexOf(value) === index);

        this.ListCoa = this.GetListCoaFormArray();
        this.CountAdd = this.ListGetCoaCurr.length;
        for (let i = 0; i < this.ListGetCoaCurr.length; i++) {
          for (let x = 0; x < this.ListPaymentAlloc.length; x++) {
            this.ListDataCOA = this.GetListCoaInfoListDataCoa(x);
            this.ListDataCOA.push(this.createDetailItem());
          }
          this.colHeadTable.push({ newHead: 'COA ' + this.ListGetCoaCurr[i] });
          this.ListSelectedCurr.push({ newCurr: this.ListGetCoaCurr[i] });
        }

        for (let i = 0; i < this.ListRefCoaObj.length; i++) {
          for (let j = 0; j < this.ListPaymentAlloc.length; j++) {
            if (this.ListPaymentAlloc[j].Key === this.ListRefCoaObj[i].PaymentAllocCode) {
              for (let x = 0; x < this.ListSelectedCurr.length; x++) {
                if (this.ListSelectedCurr[x].newCurr === this.ListRefCoaObj[i].CurrCode) {
                  this.ListDataCOA = this.GetListCoaInfoListDataCoa(j);
                  this.ListDataCOA.controls[x].patchValue({
                    COA: this.ListRefCoaObj[i].Coa
                  });
                }
              }
            }
          }
        }
        this.isTableReady = true;
      },
      (error) => {
        this.toastr.typeErrorCustom(error);
      }
    );
  }
}
