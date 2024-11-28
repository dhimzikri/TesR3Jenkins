export class RefEmpLeaveMngmntObj {
  RefEmpLeaveMngmntId: number;
  RefEmpId: number;
  StartDt: Date;
  EndDt: Date;
  IsPassed: boolean;
  RowVersion: string;
  constructor() { this.RefEmpLeaveMngmntId = 0 }
}
