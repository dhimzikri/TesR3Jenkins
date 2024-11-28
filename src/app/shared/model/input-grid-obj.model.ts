import { NavigationConstant } from "../NavigationConstant";
export class InputGridObj{
    resultData: any;
    searchComp: any;
    apiUrl: any;
    deleteUrl: any;
    pageNow: any;
    pageSize: any;
    pagingJson: any;
    navigationConst: any;
    isSeq: boolean;

    constructor()
    {
        this.navigationConst = NavigationConstant;
        this.isSeq = false;
    }
}