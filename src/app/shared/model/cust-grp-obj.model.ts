export class CustGrpObj {
    CustGrpId: number;
    CustId: number;
    CustNo: string;
    CustName: string;
    MemberCustId: number;
    MrCustRelationshipCode: string;
    Relationship: string;
    CustGrpNotes: string;
    IsActive: boolean;
    IsBothWays: boolean;
    RowVersion: any;
    constructor(){this.CustGrpId = 0, this.RowVersion = ""}
}