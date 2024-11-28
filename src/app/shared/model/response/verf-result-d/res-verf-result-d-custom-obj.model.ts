export class ResVerfResultDCustomObj{
    VerfResultDId: number;
    VerfResultHId: number;
    VerfQuestionAnswerId: number;
    VerfQuestionText: string;
    Answer: string;
    Notes: string;
    SeqNo: number;
    Score: number;
    VerfQuestionGrpCode: string;
    VerfQuestionGrpName: string;

    constructor(){
        this.VerfResultDId = 0;
        this.VerfResultHId = 0;
        this.VerfQuestionAnswerId = 0;
        this.Answer ="";
        this.Notes = "";
        this.SeqNo = 0;
        this.Score = 0;
        this.VerfQuestionGrpCode ="";
        this.VerfQuestionGrpName ="";
    }
}