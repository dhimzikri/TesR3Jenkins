import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { FormBuilder, Validators } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { DatePipe } from '@angular/common';
import { ResCustCompanyIndustryInfoObj } from 'app/shared/model/res-cust-company-industry-info-obj.model';
import { ReqAddEditCustCompanyIndustryInfoObj } from 'app/shared/model/req-add-edit-cust-company-industry-info-obj.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { CookieService } from 'ngx-cookie';
import { NgxSpinnerService } from 'ngx-spinner';
import { sendXhr } from 'app/shared/function/customer-function';

@Component({
  selector: 'app-self-custom-cust-company-industry-info',
  templateUrl: './self-custom-cust-company-industry-info.component.html',
  styleUrls: []
})
export class SelfCustomCustCompanyIndustryInfo implements OnInit {
  ListCustIndustryInfo: Array<ResCustCompanyIndustryInfoObj> = [];
  ReqCustIndustryInfoObj = new ReqAddEditCustCompanyIndustryInfoObj;
  industryInfo: ResCustCompanyIndustryInfoObj;
  custPersonalId: number;
  mrMaritalStatCode: string;
  currentModal: any;
  lookUpObj: InputLookupObj;
  mode: string;

  @Input() CustId: number;
  @Input() CustNo: string;
  @ViewChild('ModalIndustryList') ModalIndustryList;

  IndustryInfoForm = this.fb.group({
    CustCompanyIndustryInfoId: [0],
    BusinessStartDate: ['', [Validators.required]],
    Notes: [''],
    IsMain: [false],
    RefIndustryTypeCode: [],
    RefIndustryTypeName: [],
    RowVersion: [''],
    ByteBase64: [''],
    DocUploadName: [''],
  });
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private UrlConstantNew: UrlConstantNew,
    private cookieService: CookieService,
    private spinner: NgxSpinnerService
  ) { }

  isReady:boolean = false;
  async ngOnInit(): Promise<void> {
    this.lookUpObj = new InputLookupObj(this.UrlConstantNew);
    this.lookUpObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.isReady = true
    await this.getListCustIndustryInfo();
  }

  async getListCustIndustryInfo() {
    this.ListCustIndustryInfo = [];
    await this.http.post(this.UrlConstantNew.GetListCustCompanyIndustryInfoByCustId, { Id: this.CustId }).toPromise().then((response: ResCustCompanyIndustryInfoObj) => {
      this.ListCustIndustryInfo = response['ListCustCompanyIndustryInfoObj'];
    });
    if (this.ListCustIndustryInfo.length === 0) {
      this.IndustryInfoForm.patchValue({
        IsMain: true
      });
      this.IndustryInfoForm.get('IsMain').disable();
    } else {
      this.IndustryInfoForm.patchValue({
        IsMain: false
      });
      this.IndustryInfoForm.get('IsMain').enable();
    }
  }

  showModalIndustryInfo(i: number) {
    this.getSingleIndustryInfo(i);
    this.currentModal = this.modalService.open(this.ModalIndustryList, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });
  }

  getSingleIndustryInfo(i: number) {
    this.industryInfo = this.ListCustIndustryInfo[i];
    var datePipe = new DatePipe("en-US");
    if (!this.industryInfo) {
      this.mode = 'add';
      this.industryInfo = new ResCustCompanyIndustryInfoObj();
      this.lookUpObj.nameSelect = ''
      this.lookUpObj.jsonSelect = { IndustryTypeName: '' }
    } else {
      this.mode = 'edit'
      this.lookUpObj.nameSelect = this.industryInfo.RefIndustryTypeName
      this.lookUpObj.jsonSelect = { IndustryTypeName: this.industryInfo.RefIndustryTypeName }
      this.IndustryInfoForm.patchValue({
        BusinessStartDate: datePipe.transform(this.industryInfo.BusinessStartDate, 'yyyy-MM-dd'),
        Notes: this.industryInfo.Notes,
        IsMain: this.industryInfo.IsMain,
        RefIndustryTypeCode: this.industryInfo.RefIndustryTypeCode,
        CustCompanyIndustryInfoId: this.industryInfo.CustCompanyIndustryInfoId
      });
    }
  }

  getLookUp(ev) {
    this.IndustryInfoForm.patchValue({
      RefIndustryTypeCode: ev.IndustryTypeCode,
      RefIndustryTypeName: ev.IndustryTypeName
    })
  }

  async SaveIndustryInfo() {
    if (this.ListCustIndustryInfo.length == 0) {
      if (this.IndustryInfoForm.controls['IsMain'].value == false) {
        this.toastr.warningMessage("The first input must be the main industry!")
        return;
      }
    } else {
      // let duplicateMainIndustry = this.ListCustIndustryInfo.find(x => x.IsMain === true && x.CustCompanyIndustryInfoId != this.IndustryInfoForm.controls['CustCompanyIndustryInfoId'].value
      //   && this.IndustryInfoForm.controls['IsMain'].value === true);
      // if (duplicateMainIndustry) {
      //   this.toastr.warningMessage("There can only be one main industry!")
      //   return;
      // }
      let duplicateIndustryTypeCode = this.ListCustIndustryInfo.find(x => x.RefIndustryTypeCode === this.IndustryInfoForm.controls['RefIndustryTypeCode'].value && x.CustCompanyIndustryInfoId != this.IndustryInfoForm.controls['CustCompanyIndustryInfoId'].value);
      if (duplicateIndustryTypeCode) {
        this.toastr.warningMessage("Industry type already exists!")
        return;
      }
    }

    this.ReqCustIndustryInfoObj = new ReqAddEditCustCompanyIndustryInfoObj
    this.ReqCustIndustryInfoObj.CustNo = this.CustNo,
      this.ReqCustIndustryInfoObj.RefIndustryTypeCode = this.IndustryInfoForm.controls['RefIndustryTypeCode'].value,
      this.ReqCustIndustryInfoObj.BusinessStartDate = this.IndustryInfoForm.controls['BusinessStartDate'].value,
      this.ReqCustIndustryInfoObj.IsMain = this.IndustryInfoForm.controls['IsMain'].value
    this.ReqCustIndustryInfoObj.Notes = this.IndustryInfoForm.controls['Notes'].value
    if (this.mode === 'edit') {
      this.ReqCustIndustryInfoObj.CustCompanyIndustryInfoId = this.industryInfo.CustCompanyIndustryInfoId;
      this.ReqCustIndustryInfoObj.RowVersion = this.industryInfo.RowVersion;
    }
    await this.http.post(this.UrlConstantNew.AddEditCustCompanyIndustryInfo, this.ReqCustIndustryInfoObj, AdInsConstant.SpinnerOptions).toPromise().then(
      async (response) => {

        if (this.IndustryInfoForm.controls['DocUploadName'].value === "" || this.IndustryInfoForm.controls['DocUploadName'].value === null) {
          this.closeModal();
          this.toastr.successMessage("Success");
          this.getListCustIndustryInfo();
          return;
        }

        let reqObj = {
          CustCompanyIndustryInfoId: response["Id"],
          ByteBase64: this.IndustryInfoForm.controls['ByteBase64'].value,
          DocUploadName: this.IndustryInfoForm.controls['DocUploadName'].value,
        };

        sendXhr(
          reqObj,
          response["Message"],
          this.toastr,
          this.cookieService,
          this.UrlConstantNew.UploadCustCompanyIndustryDoc,
          "",
          "reqObj"
        )
          .then(() => {
            this.closeModal();
            // this.toastr.successMessage("Success");
            this.getListCustIndustryInfo();
          })
          .catch((error) => {
          });
      });
  }

  closeModal() {
    if (this.currentModal) {
      this.currentModal.dismiss('Cross click');
      this.currentModal = null;
      this.IndustryInfoForm.reset();
    }
  }

  async deleteModalIndustryInfo(i: number) {
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
      var ReqIdForDelete = {
        CustCompanyIndustryInfoId: this.ListCustIndustryInfo[i].CustCompanyIndustryInfoId,
        CustNo: this.CustNo
      };
      await this.http.post(this.UrlConstantNew.DeleteCustCompanyIndustryInfo, ReqIdForDelete, AdInsConstant.SpinnerOptions).toPromise().then(
        (response) => {
          if (response['Message'] === 'Success') {
            this.ListCustIndustryInfo.splice(i, 1);
          }
        }
      );
    }
  }

  async onFileChange(event) {
    const file = (event.target as HTMLInputElement).files[0];
    let ByteBase64: any = await this.readFileAsDataURL(file);
    this.IndustryInfoForm.patchValue({
      ByteBase64: ByteBase64.substring(ByteBase64.lastIndexOf(',') + 1),
      DocUploadName: file.name
    });
  }

  async readFileAsDataURL(file) {
    let result_base64 = await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = (e) => resolve(reader.result);
      reader.readAsDataURL(file);
    });
    return result_base64;
  }
}
