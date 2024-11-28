export class ResContractObj {
    PefindoId: number = 0;
    Name: string = "";
    IdNumber: string = "";
    BirthDt: Date;
    Addr: string = "";

    Creditor: string = "";
    CntrctNegStat: string = "";
    MaturityDt: Date;
    CntrctType: string = "";
    StartDt: Date;
    CntrctStat: string = "";
    TtlAmt: number = 0;
    OsAmt: number = 0;
    PastDueAmt: number = 0;
    PastDueDays: number = 0;
    LastUpdateDt: Date;

    InitialAgrmntDt: Date;
    BankBeneficiary: string = "";
    BranchName: string = "";
    ConditionDt: Date;
    CntrctCode: string = "";
    CntrctCurr: string = "";
    CntrctSubType: string = "";
    CreditCharacteristics: string = "";
    CreditClassification: string = "";
    CreditUsageInLast30DaysAmt: number = 0;
    CreditorType: string = "";
    DefaultDt: Date;
    DefaultReason: string = "";
    DefaultReasonDescr: string = "";
    DeliquencyDt: Date;
    Descr: string = "";
    DisbDt: Date;
    ClsdDsptsNum: number = 0;
    FalseDsptsNum: number = 0;
    EconomicSector: string = "";
    GovernmentProgram: string = "";
    GuarantyDepositAmt: number = 0;
    InitialAgrmntNo: string = "";
    InitialInterestRatePrcnt: number = 0;
    InitialInterestRateType: string = "";
    InitialRestructuringDt: Date;
    InitialTtlAmt: number = 0;
    InterestArrearsAmt: number = 0;
    InterestArrearsFreq: number = 0;
    LastAgrmntDt: Date;
    LastAgrmntNo: string = "";
    LastDeliquency90PlusDaysDt: Date;
    LastInterestRatePrcnt: number = 0;
    LastInterestRateType: string = "";
    NameOfInsured: string = "";
    OrientationOfUse: string = "";

    PastDueInterestAmt: number = 0;
    PenaltyAmt: number = 0;
    CntrctPhase: string = "";
    PrincipalArrearsAmt: number = 0;
    PrincipalArrearsFreq: number = 0;
    PrincipalBalanceAmt: number = 0;
    ProjectLocation: string = "";
    ProjectValueAmt: number = 0;
    ProlongationCounter: number = 0;
    PurposeOfFinancing: string = "";
    RealEndDt: Date;
    RestructuredCount: number = 0;
    RestructuringDt: Date;
    RestructuringReason: string = "";
    ClientRole: string = "";
    SyndicatedLoan: string = "";
    TtlFacilityAmt: number = 0;
    TtlTakenAmt: number = 0;
    WorstPastDueAmt: number = 0;
    WorstPastDueDays: number = 0;

    RPefindoCntrctPymntCalListObjs: Array<RPefindoCntrctPymntCalListObj> = [];
    RPefindoCntrctCltrlListObjs: Array<RPefindoCntrctCltrlListObj> = [];
    RPefindoCntrctDsptsListObjs: Array<RPefindoCntrctDsptsListObj> = [];

    constructor() {
        this.BirthDt = new Date();
        this.MaturityDt = new Date();
        this.StartDt = new Date();
        this.LastUpdateDt = new Date();
        this.InitialAgrmntDt = new Date();
        this.ConditionDt = new Date();
        this.DefaultDt = new Date();
        this.DeliquencyDt = new Date();
        this.DisbDt = new Date();
        this.InitialRestructuringDt = new Date();
        this.LastAgrmntDt = new Date();
        this.LastDeliquency90PlusDaysDt = new Date();
        this.RealEndDt = new Date();
        this.RestructuringDt = new Date();
    }
}


export class RPefindoCntrctPymntCalListObj {

    CntrctSubmittedDt: Date;
    DeliquencyStat: string = "";
    InterestRatePrcnt: number = 0;
    CntrctNegStat: string = "";
    OsAmt: number = 0;
    PastDueAmt: number = 0;
    PastDueDays: number = 0;

    constructor() {
        this.CntrctSubmittedDt = new Date();
    }
}

export class RPefindoCntrctCltrlListObj{
    Addr: string = "";
    AppraisalAmt: number = 0;
    BankAmt: number = 0;
    BankValuationDt: Date;
    BranchName: string = "";
    City: string = "";
    CltrlAcceptanceDt: Date;
    CltrlAmt: number = 0;
    CltrlAppraisalAuthority: string = "";
    CltrlCode: string = "";
    CltrlIsShared: string = "";
    CltrlRating: string = "";
    CltrlStat: string = "";
    CltrlType: string = "";
    Descr: string = "";
    HasMultipleCltrl: string = "";
    Insurance: string = "";
    OwnerName: string = "";
    ProofOfOwnership: string = "";
    RatingAuthority: string = "";
    SecurityAssignmentType: string = "";
    SharedPrprtnPrcnt: number = 0;
    Street: string = "";
    ValuationDt: Date;
    TaxAmt: number = 0;

    constructor() {
        this.BankValuationDt = new Date();
        this.CltrlAcceptanceDt = new Date();
        this.ValuationDt = new Date();
    }
}

export class RPefindoCntrctDsptsListObj {
    Comment: string = "";
    CreateDt: Date;
    DsptsStat: string = "";
    Resolution: string = "";

    constructor() {
        this.CreateDt = new Date();
    }
}