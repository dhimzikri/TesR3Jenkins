import { environment } from "environments/environment";
import { UrlConstantNew } from "../constant/URLConstantNew";

export class UcInputApprovalGeneralInfoObj {
    TaskId: number;
    EnvUrl: string;
    PathUrl: string;
    constructor(private UrlConstantNew: UrlConstantNew) { 
        this.TaskId = 0;
        this.EnvUrl = this.UrlConstantNew.env.FoundationR3Url + "/v1";
        this.PathUrl = "";
    }
}  