import { PefindoCntrctRltnCustomObj } from "../../pefindo/pefindo-cntrct-rltn-custom-obj.model";
import { PefindoRltdPartyCustomObj } from "../../pefindo/pefindo-rltd-party-custom-obj.model";

export class ResViewRelationsObj {
    ListRltdParty: Array<PefindoRltdPartyCustomObj>;
    ListCntrctRltd: Array<PefindoCntrctRltnCustomObj>;

    constructor() {
        this.ListRltdParty = new Array<PefindoRltdPartyCustomObj>();
        this.ListCntrctRltd = new Array<PefindoCntrctRltnCustomObj>();
    }
}