import { Component, OnInit, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CookieService } from 'ngx-cookie';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgxRouterService } from '@adins/fe-core';
@Component({
  selector: 'app-upload-journal-detail',
  templateUrl: './upload-journal-detail.component.html'
})
export class UploadJournalDetailComponent implements OnInit {
  private userAccess: any;
  //UPLOAD
  uploadObj: Object;
  resetUpload: boolean;
  ApiResponse = new EventEmitter();
  id: number;
  idDate: number = +new Date();
  uploadAPI: string;
  headers: any;
  multiple: boolean;
  reg: RegExp = /(?:\.([^.]+))?$/;
  selectedFiles: Array<any> = [];
  notAllowedList: Array<Object> = [];
  Caption: Array<string> = [];
  singleFile = true;
  progressBarShow = false;
  uploadBtn = false;
  uploadMsg = false;
  afterUpload = false;
  uploadClick = true;
  cancelBtn = true
  uploadMsgText: string;
  uploadMsgClass: string;
  isDownloadTmplt: boolean;
  percentComplete: number;
  theme: string;
  hideResetBtn: boolean;
  hideSelectBtn: boolean;
  hideSize: boolean;
  hideProgressBar: boolean;
  maxSize: number;
  formatsAllowed: string;
  replaceTexts;
  class: any;
  //END UPLOAD

  ListResultInfo: Array<any> = new Array<any>();
  FullPath: string;
  ListSuccessResultInfo: Array<any> = new Array<any>();
  ListFailedResultInfo: Array<any> = new Array<any>();
  isUpload: boolean = false;
  JrSourceFileId: number = 0;
  FileCode: string;
  businessDt: string;
  readonly CancelLink: string = NavigationConstant.UPLOAD_JOURNAL_FILE_PAGING;

  UploadJournalFileForm = this.fb.group({
    IsImmediately: [''],
    Date: ['', [Validators.required]]
  });

  constructor(private toastr: NGXToastrService,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {

    this.route.queryParams.subscribe(
      params => {
        const queryParams = this.ngxRouter.getQueryParams(params);
        if (queryParams['JrSourceFileId'] != null) {
          this.JrSourceFileId = +queryParams['JrSourceFileId'];
        }
        if (queryParams['FileCode'] != null) {
          this.FileCode = queryParams['FileCode'];
        }
      }
    );

    this.userAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));

    this.http.post(this.UrlConstantNew.GetJrSourceFileByJrSourceFileId, { Id: this.JrSourceFileId }).subscribe(
      (response: any) => {
        let startDt = response['StartDate'];
        this.SetbusinessDt(startDt);
      }
    );
    //this.businessDt = new Date(this.userAccess[CommonConstant.BUSINESS_DT]);

    this.uploadObj = {
      title: 'Journal - Upload Files', // Title Paging dan Upload Page
      subsectionId: 'UcUploadFile', // Ga perlu diubah
      formatsAllowed: '.xls', // File yang bisa di upload
      UploadTypeCode: 'UPL_ARTHAJASA', // UploadTypeCode berdasarkan keperluan
      // ErrorDownloadUrl: this.UrlConstantNew.env.lmsUrl + '/UploadBillVatNo/GetUploadBillingVatNoByUploadMonitoringNoAndTrxType', // URL untuk Download Error File
      TemplateUrl: this.UrlConstantNew.env.FoundationR3Url + '/Download/DownloadTemplate', // URL untuk Download Template File
      TemplateName: 'Upload_Arthajasa_Template', // Nama Excel Template File
      FileErrorName: "Upload_Arthajasa_ErrorDownload", // Nama Excel Download Error File

      environmentUrl: this.UrlConstantNew.env.FoundationR3Url,
      apiQryPaging: this.UrlConstantNew.GetPagingObjectBySQL,
      // pagingJson: "./assets/ucpaging/accmnt/billing/general/upload-billing-vat-no/search-upload-billing-vat-no.json",
      url: this.UrlConstantNew.UploadJournalFileV2,
      isDownloadTmplt: false,
      ddlEnvironments: []
    }
    this.ngOnChanges();
    this.hideSize = false;
    this.resetUpload = false;
  }

  private SetbusinessDt(startDt: Date) {
    let newStartDt = new Date(startDt);
    let context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    let bzDt = new Date(context[CommonConstant.BUSINESS_DT]);
    if (!newStartDt) newStartDt = bzDt;
    if (newStartDt < bzDt) newStartDt = bzDt;
    this.businessDt = formatDate(newStartDt, 'yyyy-MM-dd', 'en-US');
  }

  ngOnChanges() {
    this.theme = this.uploadObj['theme'] || '';
    this.id =
      this.uploadObj['id'] ||
      parseInt((this.idDate / 10000).toString().split('.')[1]) +
      Math.floor(Math.random() * 20) * 10000;
    this.hideProgressBar = this.uploadObj['hideProgressBar'] || false;
    this.hideResetBtn = this.uploadObj['hideResetBtn'] || false;
    this.hideSelectBtn = this.uploadObj['hideSelectBtn'] || false;
    this.maxSize = this.uploadObj['maxSize'] || 20;
    this.uploadAPI = this.uploadObj['url'];
    this.formatsAllowed =
      this.uploadObj['formatsAllowed'] || '.xls';
    this.multiple = this.uploadObj['multiple'] || false;
    this.isDownloadTmplt = this.uploadObj['isDownloadTmplt'] || false;
    this.headers = this.uploadObj['headers'] || {};
    const defaultReplaceTextsValues: ReplaceTexts = {
      selectFileBtn: this.multiple ? 'Choose Files' : 'Choose File',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: this.multiple ? 'Attach Files...' : 'Attach File...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    };
    this.replaceTexts = { ...defaultReplaceTextsValues };
    if (this.uploadObj['replaceTexts']) {
      this.replaceTexts = {
        ...defaultReplaceTextsValues,
        ...this.uploadObj['replaceTexts']
      }
    }
  }

  isEffectImmediately(event: boolean) {
    this.UploadJournalFileForm.controls["Date"].enable();
    if (event) {
      this.UploadJournalFileForm.patchValue({
        Date: formatDate(this.businessDt, 'yyyy-MM-dd', 'en-US')
      })
      this.UploadJournalFileForm.controls["Date"].disable();
    }
  }

  onChange(event: any) {
    // console.log(this.maxSize + this.formatsAllowed + this.multiple);
    this.notAllowedList = [];
    // console.log("onchange hit");
    if (this.afterUpload || !this.multiple) {
      this.selectedFiles = [];
      this.Caption = [];
      this.afterUpload = false;
    }
    // FORMATS ALLOWED LIST
    // console.log("FORMATS ALLOWED LIST= "+this.formatsAllowed);
    // NO OF FORMATS ALLOWED
    let formatsCount: any;
    formatsCount = this.formatsAllowed.match(new RegExp('\\.', 'g'));
    formatsCount = formatsCount.length;
    // console.log("NO OF FORMATS ALLOWED= "+formatsCount);
    // console.log("-------------------------------");

    // ITERATE SELECTED FILES
    let file: FileList;
    if (event.type == 'drop') {
      file = event.dataTransfer.files;
      // console.log("type: drop");
    } else {
      file = event.target.files || event.srcElement.files;
      // console.log("type: change");
    }
    // console.log(file);
    let currentFileExt: any;
    let ext: any;
    let frmtAllowed: boolean;
    for (let i = 0; i < file.length; i++) {
      // CHECK FORMAT
      // CURRENT FILE EXTENSION
      currentFileExt = this.reg.exec(file[i].name);
      currentFileExt = currentFileExt[1];
      // console.log(file[i].name);
      frmtAllowed = false;
      // FORMAT ALLOWED LIST ITERATE
      for (let j = formatsCount; j > 0; j--) {
        ext = this.formatsAllowed.split('.')[j];
        // console.log("FORMAT LIST ("+j+")= "+ext.split(",")[0]);
        if (j == formatsCount) {
          ext = this.formatsAllowed.split('.')[j] + ',';
        } // check format
        if (currentFileExt.toLowerCase() == ext.split(',')[0]) {
          frmtAllowed = true;
        }
      }

      if (frmtAllowed) {
        // console.log("FORMAT ALLOWED");
        // CHECK SIZE
        if (file[i].size > this.maxSize * 1024000) {
          // console.log("SIZE NOT ALLOWED ("+file[i].size+")");
          this.notAllowedList.push({
            fileName: file[i].name,
            fileSize: this.convertSize(file[i].size),
            errorMsg: 'Invalid size'
          });
          continue;
        } else {
          // format allowed and size allowed then add file to selectedFile array
          this.selectedFiles.push(file[i]);
        }
      } else {
        // console.log("FORMAT NOT ALLOWED");
        this.notAllowedList.push({
          fileName: file[i].name,
          fileSize: this.convertSize(file[i].size),
          errorMsg: 'Invalid format'
        });
        continue;
      }
    }

    if (this.selectedFiles.length !== 0) {
      this.uploadBtn = true;
      if (this.theme == 'attachPin') { this.uploadFiles(); }
    } else {
      this.uploadBtn = false;
    }
    this.uploadMsg = false;
    this.uploadClick = true;
    this.hideSize = true;
    this.percentComplete = 0;
    event.target.value = null;
  }

  convertSize(fileSize: number) {
    // console.log(fileSize + " - "+ str);
    return fileSize < 1024000
      ? (fileSize / 1024).toFixed(2) + ' KB'
      : (fileSize / 1024000).toFixed(2) + ' MB';
  }

  uploadFiles() {
    if (this.UploadJournalFileForm.controls["Date"].value == "") {
      this.toastr.errorMessage("Please select Start Date first");
    }
    let i: any;
    this.progressBarShow = true;
    this.uploadClick = false;
    this.notAllowedList = [];
    let isError = false;

    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    xhr.open('POST', this.uploadAPI, true);
    for (i = 0; i < this.selectedFiles.length; i++) {
      if (this.Caption[i] == undefined) {
        this.Caption[i] = 'file' + i;
      }
      // Add DATA TO BE SENT
      formData.append(
        this.Caption[i],
        this.selectedFiles[i] /*, this.selectedFiles[i].name*/
      );
      // console.log(this.selectedFiles[i]+"{"+this.Caption[i]+" (Caption)}");
    }

    if (i > 1) {
      this.singleFile = false;
    } else {
      this.singleFile = true;
    }

    xhr.onreadystatechange = evnt => {
      // console.log("onready");
      if (xhr.readyState === 4) {
        if (xhr.status !== 200 && xhr.status !== 201 || xhr.responseText.indexOf("Error:") >= 0) {
          isError = true;
          this.progressBarShow = false;
          this.uploadBtn = false;
          this.uploadMsg = true;
          this.afterUpload = true;
          this.uploadMsgText = this.replaceTexts.afterUploadMsg_error;
          this.uploadMsgClass = 'text-danger lead';
          // console.log(this.uploadMsgText);
          // console.log(evnt);
        }
        else {
          var response = JSON.parse(xhr.response);
          this.ListResultInfo = response["ListResultInfo"];
          this.FullPath = response["FullPath"];
          if (response.StatusCode == '998' || response.StatusCode == '999') {
            isError = true;
            this.progressBarShow = false;
            this.uploadBtn = false;
            this.uploadMsg = true;
            this.afterUpload = true;
            this.uploadMsgText = this.replaceTexts.afterUploadMsg_error + response.Message;
            this.uploadMsgClass = 'text-danger lead';
          }
        }
        this.ApiResponse.emit(xhr);
      }
    };

    xhr.upload.onprogress = evnt => {
      this.cancelBtn = false;
      this.uploadBtn = false; // button should be disabled by process uploading
      if (evnt.lengthComputable) {
        this.percentComplete = Math.round((evnt.loaded / evnt.total) * 100);
      }
      // console.log("Progress..."/*+this.percentComplete+" %"*/);
    };

    xhr.onload = evnt => {
      // console.log("onload");
      // console.log(evnt);
      // this.progressBarShow = false;
      // this.uploadBtn = false;
      // this.uploadMsg = true;
      // this.afterUpload = true;
      // if (!isError) {
      //   this.uploadMsgText = this.replaceTexts.afterUploadMsg_success;
      //   this.uploadMsgClass = 'text-success lead';
      //   console.log(this.uploadMsgText + " " + this.selectedFiles.length + " file");
      // }
    };

    xhr.onerror = evnt => {
      // console.log("onerror");
      // console.log(evnt);
    };


    for (const key of Object.keys(this.headers)) {
      // Object.keys will give an Array of keys
      xhr.setRequestHeader(key, this.headers[key]);
    }
    let value = this.cookieService.get('XSRF-TOKEN');
    let token = this.DecryptString(value, "AdInsFOU12345678");

    xhr.setRequestHeader('AdInsKey', `${token}`);
    formData.append('UploadTypeCode', this.uploadObj['UploadTypeCode'])
    formData.append('JrSourceFileId', this.JrSourceFileId.toString())
    formData.append('JrSourceFileCode', this.FileCode)
    formData.append('StartDate', this.UploadJournalFileForm.controls['Date'].value)
    //formData.append('OfficeBankAccId', this.UploadForm.controls['OfficeBankAccBalanceId'].value)

    xhr.onload = evnt => {
      // console.log("onload");
      // console.log(evnt);
      this.progressBarShow = false;
      this.uploadBtn = false;
      this.cancelBtn = true;
      this.uploadMsg = true;
      this.afterUpload = true;
      if (!isError) {
        this.uploadMsgText = this.replaceTexts.afterUploadMsg_success;
        this.uploadMsgClass = 'text-success lead';
        // console.log(this.uploadMsgText + " " + this.selectedFiles.length + " file");
      }

      console.log(xhr.responseText)
      if (xhr.responseText.indexOf("Error:") >= 0) {
        var errMessage = JSON.parse(xhr.responseText)
        this.toastr.errorMessage(errMessage)
        AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.UPLOAD_JOURNAL_FILE_PAGING], {})
      }
      else if (xhr.responseText.indexOf("Success") >= 0) {
        this.toastr.successMessage('File was uploaded successfully');
        AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.UPLOAD_JOURNAL_FILE_PAGING], {})
      }
    };
    xhr.send(formData);

    this.isUpload = true;
    //this.setList(this.ListResultInfo);
    //at first redirect to paging was here
    // if(xhr.responseText.includes("Error")){
    //   this.toastr.errorMessage(xhr.responseText);
    // }
  }

  private DecryptString(chipperText: string, chipperKey: string) {
    if (
      chipperKey == undefined || chipperKey.trim() == '' ||
      chipperText == undefined || chipperText.trim() == ''
    ) return chipperText;
    var chipperKeyArr = CryptoJS.enc.Utf8.parse(chipperKey);
    var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);
    var decrypted = CryptoJS.AES.decrypt(chipperText, chipperKeyArr, { iv: iv });
    var plainText = decrypted.toString(CryptoJS.enc.Utf8);
    return plainText;
  }

  setList(list) {
    this.ListFailedResultInfo = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].Value.toLowerCase() == "skipped") {

      }
      else {
        var failed;
        failed = { VirtualAccNo: list[i].Key };
        this.ListFailedResultInfo.push(failed);
      }
    }

    if (this.ListFailedResultInfo.length == 0) {
      //this.setResult();
      this.toastr.successMessage('File was uploaded successfully');
    }
    else {
      //this.setResult();
      this.toastr.warningMessage(this.ListFailedResultInfo.length + ' record(s) error when posting to Financore. Please Contact your Administrator');
    }
  }

  downloadTemplate() {

  }

  // setResult() {
  //   this.http.post(this.UrlConstantNew.CheckAccount, null).subscribe(
  //     (response: any) => {
  //       this.CheckAccount = response["ReturnObject"];
  //       this.totalAccount = Number(this.CheckAccount["TotalAccount"]);
  //       this.totalAmount = this.CheckAccount["TotalAmount"];
  //     }
  //   );

  //   this.http.post(this.UrlConstantNew.GetPaymentArthaJasaReconcile, null).subscribe(
  //     (response: any) => {
  //       this.ListSuccessResultInfo = response["ReturnObject"];
  //     }
  //   );
  // }
}

interface ReplaceTexts {
  selectFileBtn: string,
  resetBtn: string,
  uploadBtn: string,
  dragNDropBox: string,
  attachPinBtn: string,
  afterUploadMsg_success: string,
  afterUploadMsg_error: string,
};