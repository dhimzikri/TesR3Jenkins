export class RefUserObj {
  RefUserId: number;
  Username: string;
  Password: string;
  RefEmpId: number;
  FailPwdCount: number;
  IsLockedOut: boolean;
  IsActive: boolean;
  IsLoggedIn: boolean;
  LastIpAddress: any;
  LastLoggedIn: any;
  LastLoggedOut: any;
  LoggedInMethod: any;
  ExpiredDt: Date;
  Key: any;
  Token: any;
  LockedOutReason: any;
  LockedUntil: any;
  IsSystemUser: boolean;
  APIKey : any;
  RowVersion: string;
  constructor() { this.RefUserId = 0, this.RowVersion = "" }
}
