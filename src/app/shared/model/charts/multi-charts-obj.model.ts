import { ChartsObj } from "./charts-obj.model";

export class MultiChartsObj {
    name: string;
    series: Array<ChartsObj>;

    constructor() {
        this.name = "";
        this.series = new Array<ChartsObj>();
    }
}