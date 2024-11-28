import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { PaymentAllocGrpObj } from 'app/shared/model/common-setting/payment-alloc-grp-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';

@Component({
  selector: 'app-payment-alloc-group-detail',
  templateUrl: './payment-alloc-group-detail.component.html'
})
export class PaymentAllocGroupDetailComponent implements OnInit {
  RefPaymentAllocGrpId: string = ""
  RefPaymentAllocId: string = ""
  mode: string = "add";
  title: string = "Payment Allocation Group Information";
  Code: string = "";
  Name: string = "-";
  inputLookUpPaymentAllocObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  ListPayAllocGrp: Array<KeyValueObj> = new Array<KeyValueObj>();
  PaymentAllocGrpObj: PaymentAllocGrpObj = new PaymentAllocGrpObj()

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
      if (queryParams['mode'] != null) {
        this.mode = queryParams['mode'];
      }
      if (queryParams['RefPaymentAllocGrpId'] != null) {
        this.RefPaymentAllocGrpId = queryParams['RefPaymentAllocGrpId'];
      }
    });
  }

  PaymentAllocGrpForm = this.fb.group({
    MrPayAllocGrpCode: ['', Validators.required],
    RefPaymentAllocId: ['', Validators.required],
    IsActive: [false]
  });

  ngOnInit() {
    // LookUp Payment Alloc
    this.inputLookUpPaymentAllocObj = new InputLookupObj(this.UrlConstantNew);
    this.inputLookUpPaymentAllocObj.urlJson = "./assets/uclookup/payment-alloc/lookup-payment-alloc.json";
    this.inputLookUpPaymentAllocObj.pagingJson = "./assets/uclookup/payment-alloc/lookup-payment-alloc.json";
    this.inputLookUpPaymentAllocObj.genericJson = "./assets/uclookup/payment-alloc/lookup-payment-alloc.json";
    this.inputLookUpPaymentAllocObj.isRequired = true

    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, { refMasterTypeCode: RefMasterConstant.PAY_ALLOC_GRP }).subscribe(
      (response) => {
        this.ListPayAllocGrp = response["ReturnObject"]
      },
      (error) => {
        console.log(error)
      }
    );

    if (this.mode === 'edit') {
      this.PaymentAllocGrpObj.RefPaymentAllocGrpId = +this.RefPaymentAllocGrpId
      this.http.post(this.UrlConstantNew.GetRefPaymentAllocGrpByRefPaymentAllocGrpIdForUpdate, {Id : +this.RefPaymentAllocGrpId}).subscribe(
        (response) => {
          this.PaymentAllocGrpForm.patchValue({
            MrPayAllocGrpCode: response['MrPayAllocGrpCode'],
            RefPaymentAllocId: response['RefPaymentAllocId'],
            IsActive: response['IsActive']
          });

          
          this.http.post(this.UrlConstantNew.GetRefPaymentAllocByID, {Id : response['RefPaymentAllocId'] }).subscribe(
            (response) => {
              this.inputLookUpPaymentAllocObj.idSelect = response["RefPaymentAllocId"]
              this.inputLookUpPaymentAllocObj.nameSelect = response["PaymentAllocCode"]
              this.Name = response['PaymentAllocName']
            }
          );
        },
        (error) => {
          this.toastr.typeErrorCustom(error);
        }
      );
    }
  }

  getLookupPaymentAllocResponse(e) {
    this.PaymentAllocGrpForm.patchValue({
      RefPaymentAllocId: e.RefPaymentAllocId
    });

    this.Name = e.PaymentAllocName
  }

  SaveForm() {
    this.PaymentAllocGrpObj.RefPaymentAllocId = this.PaymentAllocGrpForm.controls["RefPaymentAllocId"].value;
    this.PaymentAllocGrpObj.MrPayAllocGrpCode = this.PaymentAllocGrpForm.controls["MrPayAllocGrpCode"].value;
    this.PaymentAllocGrpObj.IsActive = this.PaymentAllocGrpForm.controls["IsActive"].value;

    if (this.mode == 'add') {
      this.http.post(this.UrlConstantNew.AddRefPaymentAllocGrp, this.PaymentAllocGrpObj, AdInsConstant.SpinnerOptions).subscribe(
        //SAVE
        (response) => {
          this.router.navigate([NavigationConstant.CS_PAYMENT_ALLOC_GRP_PAGING]);
          this.toastr.successMessage(response["Message"]);
        },
        (error) => {
          this.toastr.typeErrorCustom(error);
        }
      );
    }
    else {
      this.http.post(this.UrlConstantNew.EditRefPaymentAllocGrp, this.PaymentAllocGrpObj, AdInsConstant.SpinnerOptions).subscribe(
        //EDIT
        (response) => {
          this.router.navigate([NavigationConstant.CS_PAYMENT_ALLOC_GRP_PAGING]);
          this.toastr.successMessage(response["Message"]);
        },
        (error) => {
          this.toastr.typeErrorCustom(error);
        }
      );
    }
  }
}