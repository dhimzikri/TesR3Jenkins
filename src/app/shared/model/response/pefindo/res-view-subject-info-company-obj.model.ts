export class ResViewSubjectInfoCompanyObj {
  CoyName: string;
  CoyNameLocal: string;
  GrpName: string;
  LegalForm: string;
  EstDt: Date;
  EstLoc: string;
  EconomicSector: string;
  Rating: string;
  RatingDt: Date;
  LastDeedNo: string;
  LastDeedDt: Date;
  IsMkListed: boolean;
  Category: string;
  RatingInstitution: string;
  Addr: string;
  MobilePhnNo: string;
  FixedLineNo: string;
  Email: string;
  ClsdDsptsSbjctNum: number;
  FalseDsptsNum: number;
  PefindoId: number;
  IdNo: string;

  constructor() {
    this.CoyName = "";
    this.CoyNameLocal = "";
    this.GrpName = "";
    this.LegalForm = "";
    this.EstDt = new Date();
    this.EstLoc = "";
    this.EconomicSector = "";
    this.Rating = "";
    this.RatingDt = new Date();
    this.LastDeedNo = "";
    this.LastDeedDt = new Date();
    this.IsMkListed = false;
    this.Category = "";
    this.RatingInstitution = "";
    this.Addr = "";
    this.MobilePhnNo = "";
    this.FixedLineNo = "";
    this.Email = "";
    this.ClsdDsptsSbjctNum = 0;
    this.FalseDsptsNum = 0;
    this.PefindoId = 0;
    this.IdNo = "";
  }
}