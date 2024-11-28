import { KeyValueObj } from "../../key-value/key-value-obj.model";

export class ResCustListIframeViewObj {
    Title: string;
    Url: string;
    Params: Array<KeyValueObj>;

    constructor() {
        this.Title =  '';
        this.Url =  '';
        this.Params = new Array<KeyValueObj>();
    }
}