import { UrlConstantNew } from "../constant/URLConstantNew";

export class UcUploadObj {
    title: string;
    subsectionId: string;
    formatsAllowed: string;
    UploadTypeCode: string;
    ErrorDownloadUrl: string;
    TemplateUrl: string;
    TemplateName: string;
    FileErrorName: string;
    environmentUrl: string;
    apiQryPaging: string;
    pagingJson: string;
    SheetName: string;
    url: string;
    theme: string;
    id: number;
    hideProgressBar: boolean;
    hideResetBtn: boolean;
    hideSelectBtn: boolean;
    maxSize: number;
    multiple: boolean;
    headers: any;
    resetUpload: boolean;
    replaceTexts: ReplaceTexts;
    isDownloadTmplt: boolean;
    ddlEnvironments: Array<EnviObj>;
    listEnvironments: Array<EnvisObj>;
    additionalPayload: Record<string,string>;

    constructor(private UrlConstantNew: UrlConstantNew) {
        this.title = "";
        this.subsectionId = "UcUploadFile";
        this.formatsAllowed = ".xls, .xlsx, .txt, .TXT";
        this.UploadTypeCode = "";
        this.ErrorDownloadUrl = "";
        this.TemplateUrl = this.UrlConstantNew.DownloadTemplate;
        this.TemplateName = "";
        this.FileErrorName = "";
        this.environmentUrl = this.UrlConstantNew.env.FoundationR3Url + '/v2';
        this.apiQryPaging = this.UrlConstantNew.GetPagingObjectBySQL;
        this.pagingJson = "";
        this.SheetName = "";
        this.url = this.UrlConstantNew.UploadFileV2;
        this.hideProgressBar = false;
        this.hideResetBtn = false;
        this.hideSelectBtn = false;
        this.maxSize = 20;
        this.multiple = false;
        this.headers = {};
        this.resetUpload = false;
        this.isDownloadTmplt = true;
        this.ddlEnvironments = new Array<EnviObj>();
        this.listEnvironments = new Array<EnvisObj>();
        this.listEnvironments.push({ environment: "FOU", url: this.UrlConstantNew.env.FoundationR3Url + '/v1' });
        this.listEnvironments.push({ environment: "FOU_WEB", url: this.UrlConstantNew.env.FoundationR3Web });
        this.additionalPayload = {};
    }
}

export class EnviObj {
    name: string;
    environment: string;

    constructor() {
        this.name = "";
        this.environment = "";
    }
}

export class EnvisObj {
    environment: string;
    url: string;

    constructor() {
        this.environment = "";
        this.url = "";
    }
}

export class ReplaceTexts {
    selectFileBtn: string;
    resetBtn: string;
    uploadBtn: string;
    dragNDropBox: string;
    attachPinBtn: string;
    afterUploadMsg_success: string;
    afterUploadMsg_error: string;
  };