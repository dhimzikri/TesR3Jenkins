import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { RefOfficeObj } from 'app/shared/model/ref-office-obj.model';
import { RefCurrObj } from 'app/shared/model/ref-curr-obj.model';
import { OfficeBankAccObj } from 'app/shared/model/common-setting/office-bank-acc.model';
import { RefBankObj } from 'app/shared/model/ref-bank-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-office-bank-account-detail-x',
  templateUrl: './office-bank-account-detail-x.component.html'
})
export class OfficeBankAccountDetailXComponent implements OnInit {
  title: string;
  Mode: string = "Add";
  OfficeBankAccId: number;
  RefOfficeId: number;
  IsCbLegalDocChecked: boolean = false;
  OfficeCode: string;
  BankId: number;
  BankAccType: string;
  BankAccPurpose: string;
  OfficeBankCode: string;
  OfficeBankRowVersion : string;
  
  req : any={};

  readonly CancelLink: string = NavigationConstant.CS_OFFICE_BANK_ACCOUNT_PAGING_X;
  public OfficeNameList: {
    Key: string,
    Value: string
  }[] = [];

  public BankNameList: {
    Key: string,
    Value: string
  }[] = [];

  public BankAccTypeList: {
    Key: string,
    Value: string
  }[] = [];

  public CurrNameList: {
    Key: string,
    Value: string
  }[] = [];

  public BankAccPurposeList: {
    Key: string,
    Value: string
  }[] = [];

  OfficeBankAccObj: OfficeBankAccObj = new OfficeBankAccObj();
  RefOfficeObj: RefOfficeObj = new RefOfficeObj();
  RefCurrObj: RefCurrObj = new RefCurrObj();
  RefBankObj: RefBankObj = new RefBankObj();

  OfficeBankAccForm = this.fb.group({
    AccCode: ['', [Validators.required, Validators.maxLength(10)]],
    AccName: ['', [Validators.required, Validators.maxLength(500)]],
    BankBranch: ['', [Validators.required, Validators.maxLength(100)]],
    BankBranchBiCode: ['', [Validators.maxLength(100)]],
    AccNo: ['', [Validators.required, Validators.maxLength(500)]],
    OfficeName: ['', [Validators.required, Validators.maxLength(100)]],
    BankName: ['', [Validators.required]],
    BankAccType: ['', [Validators.required]],
    CurrCode: ['', [Validators.required]],
    LegalDoc: [false],
    BankAccPurpose: ['', [Validators.required]],
    IsSyariah: [false]
  });

  constructor(private route: ActivatedRoute,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["OfficeBankAccId"] != null) {
        this.OfficeBankAccId = queryParams["OfficeBankAccId"];
      }
    });
  }

  ngOnInit() {
    if (this.OfficeBankAccId !=null && this.OfficeBankAccId != 0)
    {
      this.Mode = "Edit";
    }
    else {this.Mode = "Add";}
    this.route.data.subscribe(
      (data: Data) => {
        this.title = data['title'];
      }
    )

    this.http.post<any>(this.UrlConstantNew.GetListActiveBankName, {}).subscribe(
      (response) => {
        this.BankNameList = response.ReturnObject;
      },
      (error) => {
        console.log(error);
      }
    )

    this.http.post<any>(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: "BANK_ACC_TYPE" }).subscribe(
      (response) => {
        this.BankAccTypeList = response.ReturnObject;
      },
      (error) => {
        console.log(error);
      }
    )

    this.http.post<any>(this.UrlConstantNew.GetListKvpActiveRefCurr, {}).subscribe(
      (response) => {
        this.CurrNameList = response.ReturnObject;
      },
      (error) => {
        console.log(error);
      }
    )

    this.http.post<any>(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: "BANK_ACC_PURPOSE" }).subscribe(
      (response) => {
        this.BankAccPurposeList = response.ReturnObject;
      },
      (error) => {
        console.log(error);
      }
    )

    if (this.Mode == "Add") {
      this.http.post<any>(this.UrlConstantNew.GetListKvpActiveRefOfficeForPaging, {}).subscribe(
        (response) => {
          this.OfficeNameList = response.ReturnObject;
        },
        (error) => {
          console.log(error);
        }
      )
    } else if (this.Mode === "Edit") {
      this.OfficeBankAccObj.OfficeBankAccId = this.OfficeBankAccId;

      this.http.post<OfficeBankAccObj>(this.UrlConstantNew.GetOfficeBankAccByOfficeBankAccId, {Id: this.OfficeBankAccId}).subscribe(
        (response) => {
          this.OfficeBankAccObj = response;
          this.BankAccType = this.OfficeBankAccObj.BankAccType;
          this.BankAccPurpose = this.OfficeBankAccObj.MrBankAccPurposeCode;
          this.OfficeBankCode = this.OfficeBankAccObj.OfficeBankAccCode;
          this.OfficeBankRowVersion = this.OfficeBankAccObj.RowVersion;

          this.OfficeBankAccForm.patchValue({
            AccCode: this.OfficeBankAccObj.OfficeBankAccCode,
            AccName: this.OfficeBankAccObj.OfficeBankAccName,
            BankBranch: this.OfficeBankAccObj.OfficeBankAccBranch,
            BankBranchBiCode: this.OfficeBankAccObj.BankBranchRegRptCode,
            AccNo: this.OfficeBankAccObj.OfficeBankAccNo,
            BankAccType: this.OfficeBankAccObj.BankAccType,
            LegalDoc: this.OfficeBankAccObj.IsLegalDoc,
            BankAccPurpose: this.OfficeBankAccObj.MrBankAccPurposeCode,
          })

          this.OfficeBankAccForm.get('AccCode').disable();

          this.http.post<RefOfficeObj>(this.UrlConstantNew.GetRefOfficeByRefOfficeId, {Id: response.RefOfficeId}).subscribe(
            (response) => {
              this.RefOfficeObj = response;
              this.RefOfficeId = this.RefOfficeObj.RefOfficeId;
              this.OfficeBankAccForm.patchValue(
                {
                  OfficeName : this.RefOfficeObj.OfficeName
                }
              );
              this.OfficeBankAccForm.updateValueAndValidity();
            },
            (error) => {
              console.log(error);
            }
          );

          this.RefCurrObj.RefCurrId = response.RefCurrId;
          this.http.post<RefCurrObj>(this.UrlConstantNew.GetRefCurrById, {Id: response.RefCurrId}).subscribe(
            (response) => {
              this.RefCurrObj = response;
              this.OfficeBankAccForm.patchValue({
                CurrCode: this.RefCurrObj.CurrCode
              })
              this.OfficeBankAccForm.updateValueAndValidity();
            },
            (error) => {
              console.log(error);
            }
          );

          this.RefBankObj.RefBankId = response.RefBankId;
          this.http.post<RefBankObj>(this.UrlConstantNew.GetRefBankByRefBankIdAsync, {Id: response.RefBankId}).subscribe(
            (response) => {
              this.RefBankObj = response;
              this.BankId = this.RefBankObj.RefBankId;

              this.OfficeBankAccForm.patchValue({
                BankName: this.RefBankObj.RefBankId
              })
              this.OfficeBankAccForm.updateValueAndValidity();
            },
            (error) => {
              console.log(error);
            }
          );
          
          //get officebankaccX
          this.http.post<RefBankObj>(this.UrlConstantNew.GetOfficeBankAccXByOfficeBankAccId, {Id:this.OfficeBankAccId}).subscribe(
            (response) => {
              let res = response[CommonConstant.ReturnObj];
              if (res!=null){
                this.OfficeBankAccForm.patchValue({
                  IsSyariah: res.IsSyariah,
                })
              }
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onChangedDdlOfficeName(ev) {
    this.OfficeCode = ev.target.value;
  }

  onChangedDdlBankName(ev) {
    this.BankId = ev.target.value;
  }

  onChangedDdlBankAccType(ev) {
    this.BankAccType = ev.target.value;
  }

  onChangedDdlBankAccPurpose(ev) {
    this.BankAccPurpose = ev.target.value;
  }

  async SaveForm() {
    if (this.Mode == "Add") {
      this.OfficeBankAccObj.OfficeBankAccCode =  this.OfficeBankAccForm.value.AccCode;
    }
    else{
      this.OfficeBankAccObj.OfficeBankAccCode = this.OfficeBankCode;
    }
    
    this.OfficeBankAccObj.OfficeBankAccName = this.OfficeBankAccForm.value.AccName;
    this.OfficeBankAccObj.OfficeBankAccBranch = this.OfficeBankAccForm.value.BankBranch;
    this.OfficeBankAccObj.BankBranchRegRptCode = this.OfficeBankAccForm.value.BankBranchBiCode;
    this.OfficeBankAccObj.OfficeBankAccNo = this.OfficeBankAccForm.value.AccNo;
    this.OfficeBankAccObj.RefBankId = this.BankId;
    this.OfficeBankAccObj.BankAccType = this.BankAccType;
    this.OfficeBankAccObj.RefCurrId = 0;
    this.OfficeBankAccObj.IsLegalDoc = this.IsCbLegalDocChecked;
    this.OfficeBankAccObj.MrBankAccPurposeCode = this.BankAccPurpose;
    this.OfficeBankAccObj.RowVersion = "";
    
    await this.http.post<RefOfficeObj>(this.UrlConstantNew.GetRefCurrByCode, {Code : this.OfficeBankAccForm.controls['CurrCode'].value}).toPromise().then(
      (response) => {
        this.OfficeBankAccObj.RefCurrId = response['RefCurrId'];
      }
    );  
    if (this.Mode == "Add") {
      this.RefOfficeObj.OfficeCode = this.OfficeCode;
      this.http.post<RefOfficeObj>(this.UrlConstantNew.GetRefOfficeByOfficeCode, {Code : this.OfficeCode}).subscribe(
        (response) => {
          this.OfficeBankAccObj.RefOfficeId = response.RefOfficeId;
          this.OfficeBankAccObj.IsActive = true;
          
          this.req.OfficeBankAccObj = this.OfficeBankAccObj;
          this.req.IsSyariah = this.OfficeBankAccForm.controls.IsSyariah.value;
          
          this.http.post(this.UrlConstantNew.AddOfficeBankAccX, this.req, AdInsConstant.SpinnerOptions).subscribe(
            (response) => {
              this.toastr.successMessage("Add Success!");
              this.router.navigateByUrl(NavigationConstant.CS_OFFICE_BANK_ACCOUNT_PAGING_X);
            },
            error => {
              console.log(error);
            }
          )
        },
        (error) => {
          console.log(error);
        }
      );


    } else{
      this.OfficeBankAccObj.OfficeBankAccId = this.OfficeBankAccId;
      this.OfficeBankAccObj.RefOfficeId = this.RefOfficeId;
      this.OfficeBankAccObj.RowVersion = this.OfficeBankRowVersion;

      this.req.OfficeBankAccObj = this.OfficeBankAccObj;
      this.req.IsSyariah = this.OfficeBankAccForm.controls.IsSyariah.value;

      this.http.post(this.UrlConstantNew.EditOfficeBankAccX, this.req, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage("Edit Success!");
          this.router.navigateByUrl(NavigationConstant.CS_OFFICE_BANK_ACCOUNT_PAGING_X);
        },
        error => {
          console.log(error);
        }
      )
    }
  }
}