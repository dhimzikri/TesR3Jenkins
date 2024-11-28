import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { Router } from '@angular/router';
import { ReqAddEditBouwheerCompanyIndustryInfoObj } from 'app/shared/model/req-add-edit-bouwheer-company-industry-info-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { DatePipe } from '@angular/common';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { ResBouwheerCompanyIndustryInfoObj } from 'app/shared/model/res-bouwheer-company-industry-info-obj.model';
import { CookieService } from 'ngx-cookie';
import { NgxSpinnerService } from 'ngx-spinner';
import { downloadDmsDocument, sendXhr } from 'app/shared/function/customer-function';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { String } from 'typescript-string-operations';
@Component({
  selector: 'app-self-custom-bouwheer-company-industry-info',
  templateUrl: './self-custom-bouwheer-company-industry-info.component.html',
  styleUrls: ['./self-custom-bouwheer-company-industry-info.component.css']
})
export class SelfCustomBouwheerCompanyIndustryInfo implements OnInit {
  ListBouwheerIndustryInfo: Array<ResBouwheerCompanyIndustryInfoObj> = [];
  ReqBouwheerIndustryInfoObj = new ReqAddEditBouwheerCompanyIndustryInfoObj;
  industryInfo: ResBouwheerCompanyIndustryInfoObj;
  custPersonalId: number;
  CustId: number;
  BouwheerNo: string;
  mrMaritalStatCode: string;
  currentModal: any;
  lookUpObj: InputLookupObj;
  mode: string;
  showDownload: boolean = false;
  Id: number = 0;

  readonly FileExtAllowed: Array<string> = [CommonConstant.FileExtensionPdf, CommonConstant.FileExtensionJpg, CommonConstant.FileExtensionJpeg, CommonConstant.FileExtensionGif, CommonConstant.FileExtensionPng]
  readonly ExtStr: string = String.Join(", ", this.FileExtAllowed);

  @Input() BwrNo: string;
  @Input() BwrId: number;
  @Input() dicts: Record<string, any>;
  @ViewChild('ModalPersonalFinData') ModalPersonalFinData;
  @ViewChild('ModalIndustryList') ModalIndustryList;

  IndustryInfoForm = this.fb.group({
    BouwheerCompanyIndustryInfoId: [0],
    BusinessStartDate: ['', [Validators.required]],
    Notes: [''],
    IsMain: [false],
    RefIndustryTypeCode: [],
    RefIndustryTypeName: [],
    ByteBase64: [''],
    DocUploadName: [''],
    RowVersion: [''],
    index: [0]
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

  async ngOnInit(): Promise<void> {
    this.lookUpObj = new InputLookupObj(this.UrlConstantNew);
    this.lookUpObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.isReady = true
    if (this.BwrId > 0) {
      this.showDownload = true;
    }
    await this.getListBouwheerIndustryInfo();
  }


  async getListBouwheerIndustryInfo() {
    this.ListBouwheerIndustryInfo = [];
    await this.http.post(this.UrlConstantNew.GetBouwheerCompanyIndustryInfoByBouwheerNo, { Code: this.BwrNo }).toPromise().then((response: ResBouwheerCompanyIndustryInfoObj) => {
      this.ListBouwheerIndustryInfo = response['ListBouwheerCompanyIndustryInfo'];
      if (this.ListBouwheerIndustryInfo.length === 0) {
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
    })
  }

  showModalIndustryInfo(i: number) {
    this.getSingleIndustryInfo(i);
    this.currentModal = this.modalService.open(this.ModalIndustryList, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });
  }

  getSingleIndustryInfo(i: number) {
    this.industryInfo = this.ListBouwheerIndustryInfo[i];
    var datePipe = new DatePipe("en-US");
    if (!this.industryInfo) {
      this.mode = 'add';
      this.industryInfo = new ResBouwheerCompanyIndustryInfoObj();
      this.lookUpObj.nameSelect = ''
      this.lookUpObj.jsonSelect = { IndustryTypeName: '' }
      this.IndustryInfoForm.patchValue({
        index: i
      });
    } else {
      this.mode = 'edit'
      this.lookUpObj.nameSelect = this.industryInfo.RefIndustryTypeName
      this.lookUpObj.jsonSelect = { IndustryTypeName: this.industryInfo.RefIndustryTypeName }
      this.IndustryInfoForm.patchValue({
        BusinessStartDate: datePipe.transform(this.industryInfo.BusinessStartDate, 'yyyy-MM-dd'),
        Notes: this.industryInfo.Notes,
        IsMain: this.industryInfo.IsMain,
        RefIndustryTypeCode: this.industryInfo.RefIndustryTypeCode,
        RefIndustryTypeName: this.industryInfo.RefIndustryTypeName,
        BouwheerCompanyIndustryInfoId: this.industryInfo.BouwheerCompanyIndustryInfoId,
        index: i
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
    if (this.BwrId > 0) {
      this.ReqBouwheerIndustryInfoObj = new ReqAddEditBouwheerCompanyIndustryInfoObj
      this.ReqBouwheerIndustryInfoObj.BouwheerId = this.BwrId,
        this.ReqBouwheerIndustryInfoObj.RefIndustryTypeCode = this.IndustryInfoForm.controls['RefIndustryTypeCode'].value,
        this.ReqBouwheerIndustryInfoObj.BusinessStartDate = this.IndustryInfoForm.controls['BusinessStartDate'].value,
        this.ReqBouwheerIndustryInfoObj.IsMain = this.IndustryInfoForm.controls['IsMain'].value
      this.ReqBouwheerIndustryInfoObj.Notes = this.IndustryInfoForm.controls['Notes'].value
      if (this.mode === 'edit') {
        this.ReqBouwheerIndustryInfoObj.BouwheerCompanyId = this.industryInfo.BouwheerCompanyId;
        this.ReqBouwheerIndustryInfoObj.BouwheerCompanyIndustryInfoId = this.industryInfo.BouwheerCompanyIndustryInfoId;
        this.ReqBouwheerIndustryInfoObj.RowVersion = this.industryInfo.RowVersion;
      }
      await this.http.post(this.UrlConstantNew.AddEditBouwheerCompanyIndustryInfo, this.ReqBouwheerIndustryInfoObj, AdInsConstant.SpinnerOptions).toPromise().then(
        async (response) => {
          // this.toastr.successMessage(response["Message"]);

          if (this.IndustryInfoForm.controls['DocUploadName'].value === "" || this.IndustryInfoForm.controls['DocUploadName'].value === null) {
            this.closeModal();
            this.toastr.successMessage("Success");
            this.getListBouwheerIndustryInfo();
            return;
          }

          let reqObj = {
            BouwheerId: this.BwrId,
            uploadIndustryDocs: [
              {
                RefIndustryTypeCode: this.ReqBouwheerIndustryInfoObj.RefIndustryTypeCode,
                ByteBase64: this.IndustryInfoForm.controls['ByteBase64'].value,
                DocUploadName: this.IndustryInfoForm.controls['DocUploadName'].value,
              }
            ]
          };
          sendXhr(
            reqObj,
            response["Message"],
            this.toastr,
            this.cookieService,
            this.UrlConstantNew.UploadBouwheerCompanyIndustryDoc,
            "",
            "reqObj"
          )
            .then(() => {
              this.closeModal();
              // this.toastr.successMessage("Success");
              this.getListBouwheerIndustryInfo();
            })
            .catch((error) => {
            });
        });
    } else {
      if (this.mode == 'edit') {
        let index = this.IndustryInfoForm.controls['index'].value
        if (this.ListBouwheerIndustryInfo.length == 0) {
          if (this.IndustryInfoForm.controls['IsMain'].value == false) {
            this.toastr.warningMessage("The first input must be the main industry!")
            return;
          }
        } else {

          let duplicateIndustryTypeCode = this.ListBouwheerIndustryInfo.find(x => x.RefIndustryTypeCode === this.IndustryInfoForm.controls['RefIndustryTypeCode'].value && x.BouwheerCompanyIndustryInfoId != this.IndustryInfoForm.controls['BouwheerCompanyIndustryInfoId'].value);
          if (duplicateIndustryTypeCode) {
            this.toastr.warningMessage("Industry type already exists!")
            return;
          }
          let duplicateMainIndustry = this.ListBouwheerIndustryInfo.find(x => x.IsMain === true && x.BouwheerCompanyIndustryInfoId != this.IndustryInfoForm.controls['BouwheerCompanyIndustryInfoId'].value);
          if (duplicateMainIndustry && this.IndustryInfoForm.controls['IsMain'].value == true) {
            // this.toastr.warningMessage("There can only be one main industry!")
            // return;
            //upd older data is main = false
            this.ListBouwheerIndustryInfo.forEach(element => {
              element.IsMain = false;
            });
          }
        }
        this.ListBouwheerIndustryInfo[index].RefIndustryTypeCode = this.IndustryInfoForm.controls['RefIndustryTypeCode'].value
        this.ListBouwheerIndustryInfo[index].BusinessStartDate = this.IndustryInfoForm.controls['BusinessStartDate'].value
        this.ListBouwheerIndustryInfo[index].IsMain = this.IndustryInfoForm.controls['IsMain'].value
        this.ListBouwheerIndustryInfo[index].Notes = this.IndustryInfoForm.controls['Notes'].value
        this.ListBouwheerIndustryInfo[index].RefIndustryTypeName = this.IndustryInfoForm.controls['RefIndustryTypeName'].value
      }
      else {
        if (this.ListBouwheerIndustryInfo.length == 0) {
          if (this.IndustryInfoForm.controls['IsMain'].value == false) {
            this.toastr.warningMessage("The first input must be the main industry!")
            return;
          }
        } else {
          let duplicateIndustryTypeCode = this.ListBouwheerIndustryInfo.find(x => x.RefIndustryTypeCode == this.IndustryInfoForm.controls['RefIndustryTypeCode'].value);
          if (duplicateIndustryTypeCode) {
            this.toastr.warningMessage("Industry type already exists!")
            return;
          }
          // let duplicateMainIndustry = this.ListBouwheerIndustryInfo.find(x => x.IsMain == true);
          // if (duplicateMainIndustry && this.IndustryInfoForm.controls['IsMain'].value == true) {
          //   this.toastr.warningMessage("There can only be one main industry!")
          //   return;
          // }
        }
        this.Id = this.Id + 1;
        this.ListBouwheerIndustryInfo.push({
          RefIndustryTypeCode: this.IndustryInfoForm.controls['RefIndustryTypeCode'].value,
          BusinessStartDate: this.IndustryInfoForm.controls['BusinessStartDate'].value,
          IsMain: this.IndustryInfoForm.controls['IsMain'].value,
          Notes: this.IndustryInfoForm.controls['Notes'].value,
          BouwheerCompanyIndustryInfoId: this.Id,
          BouwheerCompanyId: 0,
          RefIndustryTypeName: this.IndustryInfoForm.controls['RefIndustryTypeName'].value,
          ByteBase64: this.IndustryInfoForm.controls['ByteBase64'].value,
          DocUploadName: this.IndustryInfoForm.controls['DocUploadName'].value,
          DocDmsId: 0,
          RowVersion: undefined
        });
      }
      this.dicts['ListBouwheerIndustryInfo'] = this.ListBouwheerIndustryInfo;
      this.closeModal();
      this.toastr.successMessage("Success");
      if (this.ListBouwheerIndustryInfo.length === 0) {
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
  }

  async readFileAsDataURL(file) {
    let result_base64 = await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = (e) => resolve(reader.result);
      reader.readAsDataURL(file);
    });
    return result_base64;
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
      // if (this.ListBouwheerIndustryInfo[i].IsMain == true && this.ListBouwheerIndustryInfo.length > 1) {
      //   this.toastr.warningMessage("Cannot Delete Main Industry");
      // } else {
      if (this.BwrId > 0) {
        var ReqIdForDelete = {
          BouwheerCompanyIndustryInfoId: this.ListBouwheerIndustryInfo[i].BouwheerCompanyIndustryInfoId,
          IsMain: this.ListBouwheerIndustryInfo[i].IsMain
        };
        await this.http.post(this.UrlConstantNew.DeleteBouwheerCompanyIndustryInfo, ReqIdForDelete, AdInsConstant.SpinnerOptions).toPromise().then(
          (response) => {
            this.ListBouwheerIndustryInfo.splice(i, 1);
          }
        );
      }
      else {
        this.ListBouwheerIndustryInfo.splice(i, 1);
      }
      // }
    }
  }

  file : File
  async onFileChange(files: FileList) {
    this.file = files.item(0);
    files.item(0)
    let ByteBase64: any = await this.readFileAsDataURL(this.file);
    this.IndustryInfoForm.patchValue({
      ByteBase64: ByteBase64.substring(ByteBase64.lastIndexOf(',') + 1),
      DocUploadName: this.file.name
    });
  }
  
  DownloadFileIndustryInfo(i: number) {
    downloadDmsDocument(this.http, this.toastr, this.ListBouwheerIndustryInfo[i]);
  }

  ConvertSize(fileSize: number) {
    return fileSize < 1024000
      ? (fileSize / 1024).toFixed(2) + ' KB'
      : (fileSize / 1024000).toFixed(2) + ' MB';
  }
}
