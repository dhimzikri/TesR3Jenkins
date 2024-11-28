import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { RefPaymentAllocObj } from 'app/shared/model/common-setting/ref-payment-alloc-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { PaymentAllocDetailAttributeComponent } from './payment-alloc-detail-attribute/payment-alloc-detail-attribute.component';
import { value } from 'app/shared/data/dropdowns';
import { PaymentAllocAttr, RefPaymentAllocWithAttrObj } from 'app/shared/model/common-setting/ref-payment-alloc-with-attr-obj.model';
import { forEach } from 'core-js/core/array';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { NgxRouterService } from '@adins/fe-core';
@Component({
  selector: 'app-payment-alloc-detail-new',
  templateUrl: './payment-alloc-detail-new.component.html',
  styles: ["input, select, textarea {height: 31px !important; border-radius: 8px  !important;border: 1px solid var(--gray-line, #DFE6E9);background: var(--white-1, #FDFEFF);}",
  ".header-title {padding-left: 20px!important;margin-bottom: 15px!important;}"]
})
export class PaymentAllocDetailNewComponent implements OnInit {
  mode: string = "add";
  title: string = "Payment Allocation";
  RefPaymentAllocId: number = 0;
  listKeyValueType: any = {};
  RefPaymentAllocObj: RefPaymentAllocWithAttrObj = new RefPaymentAllocWithAttrObj();

  readonly BackLink: string = NavigationConstant.CS_PAYMENT_ALLOC_PAGING;
  listAttributes: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private modalService: NgbModal,
    private toastr: NGXToastrService,
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["RefPaymentAllocId"] != null) {
        this.RefPaymentAllocId = queryParams["RefPaymentAllocId"];
      }
      if (queryParams["mode"] != null) {
        this.mode = queryParams["mode"];
      }
    });
  }

  PaymentAllocForm = this.fb.group({
    PaymentAllocCode: ['', [Validators.required, , Validators.maxLength(50)]],
    PaymentAllocName: ['', [Validators.required, , Validators.maxLength(100)]],
    IsSystem: [false],
    IsActive: [false],
    PaymentAllocAttr: this.fb.array([])
  });

  ngOnInit() {
    if (this.mode === "edit") {
      this.PaymentAllocForm.controls['PaymentAllocCode'].disable();
      this.RefPaymentAllocObj.RefPaymentAllocId = this.RefPaymentAllocId;
      this.GetListActiveRefMaster();
      this.GetRefPaymentAllocByID();
      this.GetRefPaymentAllocAttrByRefPaymentAllocId();
    }
    else this.PaymentAllocForm.controls['PaymentAllocCode'].enable();

    console.log(this.PaymentAllocForm)
  }

  findValueByKey(key: string, data) {
    for (const item of data) {
      if (item.Key === key) {
        return item.Value;
      }
    }
    return null;
  }


  get getPaymentAllocAttr(){
    return this.PaymentAllocForm.controls["PaymentAllocAttr"] as FormArray
  }

  SaveForm() {
    const RawVal = this.PaymentAllocForm.getRawValue();
    console.log(RawVal);
    this.RefPaymentAllocObj.PaymentAllocCode = this.PaymentAllocForm.controls['PaymentAllocCode'].value;
    this.RefPaymentAllocObj.PaymentAllocName = this.PaymentAllocForm.value.PaymentAllocName;
    this.RefPaymentAllocObj.IsActive = this.PaymentAllocForm.value.IsActive;
    this.RefPaymentAllocObj.IsSystem = this.PaymentAllocForm.value.IsSystem;
    this.RefPaymentAllocObj.PaymentAllocAttr = RawVal.PaymentAllocAttr;

    console.log(this.RefPaymentAllocObj)

    if (this.mode === "add") {
      this.RefPaymentAllocObj.RowVersion = "";
      this.http.post(this.UrlConstantNew.SubmitAddRefAttr, this.RefPaymentAllocObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.router.navigateByUrl(NavigationConstant.CS_PAYMENT_ALLOC_PAGING);
        },
        error => {
          console.log(error);
        }
      )
    }
    else if (this.mode === "edit") {
      this.http.post(this.UrlConstantNew.SubmitEditRefAttr, this.RefPaymentAllocObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.router.navigateByUrl(NavigationConstant.CS_PAYMENT_ALLOC_PAGING);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  GetListActiveRefMaster(){
    this.http.post(this.UrlConstantNew.GetListActiveRefMaster,{ RefMasterTypeCode : CommonConstant.RefMasterTypeCodeAttrInputType}).subscribe(
      response => {
        const listKeyValueType = response['ReturnObject'];
        
        listKeyValueType.forEach(element => {
          this.listKeyValueType[element.Key] = element.Value
        });
      }
    );

  }

  GetRefPaymentAllocAttrByRefPaymentAllocId(){
    this.http.post(this.UrlConstantNew.GetRefPaymentAllocAttrByRefPaymentAllocId, {
      id: this.RefPaymentAllocId
    }).subscribe(
      response => {
        const listAttr = response["ReturnObject"];
        const listControl = this.fb.array([]);

        listAttr.forEach(el => {
          const TypeName = this.listKeyValueType[el.AttrInputType];
          const fbGrp = this.fb.group({
            PaymentAllocAttrCode: [el.PaymentAllocAttrCode, [Validators.required]],
            PaymentAllocAttrName: [el.PaymentAllocAttrName, [Validators.required]],
            AttrInputType: [el.AttrInputType, [Validators.required]],
            attributeTypeName: [TypeName, [Validators.required]]
          });

          listControl.push(fbGrp);
        })

        this.PaymentAllocForm.setControl('PaymentAllocAttr', listControl);
      }
    );
  }

  GetRefPaymentAllocByID(){
    this.http.post<RefPaymentAllocWithAttrObj>(this.UrlConstantNew.GetRefPaymentAllocByID, {Id : this.RefPaymentAllocId}).subscribe(
      (response) => {
        this.RefPaymentAllocObj = response;
        this.PaymentAllocForm.patchValue({
          PaymentAllocCode: response.PaymentAllocCode,
          PaymentAllocName: response.PaymentAllocName,
          IsSystem: false,
          IsActive: response.IsActive
        })
      },
      (error) => {
        console.log(error);
      }
    )
  }

  delete(index){
    const formArr = this.getPaymentAllocAttr.controls;
    formArr.splice(index,1);
  }

  open(index = null){
    const formArr = this.getPaymentAllocAttr.controls;
    const mode = index !== null ? 'edit' : 'add';
    const modalRef = this.modalService.open(PaymentAllocDetailAttributeComponent);
    modalRef.componentInstance.index = index ? index : 0;

    console.log(mode, index)

    if(mode == 'edit'){
      const valueOfIndex = formArr[index].value;
      console.log('value', valueOfIndex)
      modalRef.componentInstance.AttrObj = valueOfIndex;
    }

    modalRef.result.then(
      result => {
        console.log(result)

        if(result) {
          const fbGrp = this.fb.group({
            PaymentAllocAttrCode: [result["PaymentAllocAttrCode"], [Validators.required]],
            PaymentAllocAttrName: [result["PaymentAllocAttrName"], [Validators.required]],
            AttrInputType: [result["AttrInputType"], [Validators.required]],
            attributeTypeName: [result["attributeTypeName"], [Validators.required]]
          });

          if(mode == 'add') formArr.push(fbGrp)
          if(mode == 'edit') formArr[index] = fbGrp;

          console.log('TEST', this.getPaymentAllocAttr.getRawValue())
        }
      }
    )

  }
}