export class CustDocFileObj{
    CustDocFileId: number;
    CustId: number;
    MrCustDocTypeCode: string;
    FileName: string;
    ByteBase64: any;
    constructor(){}
}

export class CustDocFileFormObj{ 
    MrCustDocTypeCode: string;
    DocTypeName: string;
    IsRequired: Boolean;
    File: File;
    constructor(){}
}