import { UrlConstantNew } from "../constant/URLConstantNew";

export class UcInputApprovalObj {
    TaskId: number;
    EnvUrl: string;
    PathUrlGetLevelVoting: string;
    PathUrlGetPossibleResult: string;
    PathUrlSubmitApproval: string;
    PathUrlGetNextNodeMember: string;
    PathUrlGetReasonActive:string;
    PathUrlGetChangeFinalLevel: string;
    PathUrlReturnToLevel: string;
    PathUrlContinueToLevel: string;
    RequestId: number;
    PathUrlGetHistory: string;
    TrxNo: string;
    EnableRequiredNotes: boolean;
    constructor(private UrlConstantNew: UrlConstantNew) { 
        this.TaskId = 0;
        this.EnvUrl = this.UrlConstantNew.env.FoundationR3Url + "";
        this.PathUrlGetLevelVoting = this.UrlConstantNew.GetLevelVoting;
        this.PathUrlGetPossibleResult = this.UrlConstantNew.GetPossibleResult;
        this.PathUrlSubmitApproval = this.UrlConstantNew.SubmitApproval;
        this.PathUrlGetNextNodeMember = this.UrlConstantNew.GetNextNodeMember;
        this.PathUrlGetReasonActive = this.UrlConstantNew.GetRefReasonActive;
        this.PathUrlGetChangeFinalLevel = this.UrlConstantNew.GetCanChangeMinFinalLevel;
        this.PathUrlReturnToLevel = "";
        this.PathUrlContinueToLevel = "";
        this.TrxNo = "";
        this.RequestId = 0;
        this.PathUrlGetHistory = this.UrlConstantNew.GetTaskHistory;
        this.EnableRequiredNotes = true;
    }
}  