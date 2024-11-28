export class HolidayDByYearObj {
    HolidaySchmDId: number;
    HolidaySchmHId: number;
    DictOfDays : string[] = [];
    IsPublicHoliday: boolean;
    UntilYear : number;
    RowVersion : string;

    constructor() { this.HolidaySchmDId = 0; this.RowVersion = ""}
}