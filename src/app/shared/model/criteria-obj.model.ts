export class CriteriaObj{
    propName:string;
    restriction:string;
    value:any;
    low:number;
    high:number;
    DataType:string;
    listValue : Array<any>;
    constructor()
    {
        this.low=0;
        this.high=0;
        this.DataType='Text';
    }

}