import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ColorHelper } from '@swimlane/ngx-charts';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { MultiChartsObj } from 'app/shared/model/charts/multi-charts-obj.model';
import { ResForChartsObj } from 'app/shared/model/charts/res-for-charts-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResViewSubjectInfoCompanyObj } from 'app/shared/model/response/pefindo/res-view-subject-info-company-obj.model';
import { ResViewSubjectInfoPersonalObj } from 'app/shared/model/response/pefindo/res-view-subject-info-personal-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { CookieService } from 'ngx-cookie';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ResViewContractsObj } from 'app/shared/model/response/pefindo/res-view-contracts-obj.model';
import { ResContractObj } from 'app/shared/model/response/pefindo/res-contract-obj.model';
import { ResViewPefindoContractsObj } from 'app/shared/model/response/pefindo/res-view-pefindo-contracts-obj.model';
import { ChartsObj } from 'app/shared/model/charts/charts-obj.model';
import { ResPefindoContractForExportObj } from 'app/shared/model/response/pefindo/res-pefindo-contract-for-export-obj.model';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-pefindo-view-contracts',
  templateUrl: './pefindo-view-contracts.component.html'
})
export class PefindoViewContractsComponent implements OnInit {
  TrxNo: string;
  ResViewContractsObj: ResViewContractsObj = new ResViewContractsObj();
  ResListContractsObj: Array<ResContractObj> = [];
  ResSummaryContractsObj: Array<ResContractObj> = [];
  ViewDetailContract: ResContractObj = new ResContractObj();
  TempDetailContract: ResContractObj = new ResContractObj();
  NoOfFalseDisputes: number = 0;
  NoOfClosedDisputes: number = 0;
  IsViewMode: boolean = false;

  CustNo: string;
  MrCustTypeCode: string;
  CustObj: CustObj = new CustObj();

  constructor(private route: ActivatedRoute, private http: HttpClient, private cookieService: CookieService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["TrxNo"] != null) {
        this.TrxNo = queryParams["TrxNo"];
      }

      if (queryParams["MrCustTypeCode"] != null) {
        this.MrCustTypeCode = queryParams["MrCustTypeCode"];
      }

      if (queryParams["CustNo"] != null) {
        this.CustNo = queryParams["CustNo"];
      }
    });
  }

  async ngOnInit() {
    this.getSubjectInfo();

    this.initYears.push("All");
    this.Quarters.push("All");

    let reqByTrxNo: GenericObj = new GenericObj();
    reqByTrxNo.TrxNo = this.TrxNo;
    await this.http.post(this.UrlConstantNew.GetViewContracts, reqByTrxNo).toPromise().then(
      (response: ResViewContractsObj) => {
        this.ResViewContractsObj = response;
      }
    )

    await this.getData();
    await this.ChangeShowLatestYear();

    this.isReady = true;
  }

  getSubjectInfo()
  {
    if (this.CustNo != null)
    {
      let reqByCustNo: GenericObj = new GenericObj();
      reqByCustNo.CustNo = this.CustNo;
      this.http.post(this.UrlConstantNew.GetCustByCustNo, reqByCustNo).subscribe(
        (response: CustObj) => {
          this.MrCustTypeCode = this.CustObj.MrCustTypeCode;
        })
    }

    let reqByTrxNo: GenericObj = new GenericObj();
    reqByTrxNo.TrxNo = this.TrxNo;

    if (this.MrCustTypeCode == CommonConstant.CustTypePersonal)
    {
      reqByTrxNo.TrxNo = this.TrxNo;
      this.http.post(this.UrlConstantNew.GetViewSubjectInfoPersonal, reqByTrxNo).subscribe(
      (response: ResViewSubjectInfoPersonalObj) => {
        this.TempDetailContract.PefindoId = response.PefindoId;
        this.TempDetailContract.Name = response.FullName;
        this.TempDetailContract.IdNumber = response.IdNo;
        this.TempDetailContract.Addr = response.Addr;
        this.TempDetailContract.BirthDt = response.DateOfBirth;
      })
    }
    else
    {
      this.http.post(this.UrlConstantNew.GetViewSubjectInfoCompany, reqByTrxNo).subscribe(
        (response: ResViewSubjectInfoCompanyObj) => {
          this.TempDetailContract.PefindoId = response.PefindoId;
          this.TempDetailContract.Name = response.CoyName;
          this.TempDetailContract.IdNumber = response.IdNo;
          this.TempDetailContract.Addr = response.Addr;
        }
      )
    }
  }

  async viewOnClick(idx: number)
  {
    this.ViewDetailContract = this.ResListContractsObj[idx];

    this.ViewDetailContract.PefindoId = this.TempDetailContract.PefindoId;
    this.ViewDetailContract.Name = this.TempDetailContract.Name;
    this.ViewDetailContract.IdNumber = this.TempDetailContract.IdNumber;
    this.ViewDetailContract.Addr = this.TempDetailContract.Addr;

    if (this.ViewDetailContract.RPefindoCntrctDsptsListObjs.length > 0)
    {
      this.NoOfClosedDisputes = this.ViewDetailContract.RPefindoCntrctDsptsListObjs.filter(x => x.DsptsStat == "Closed").length;
      this.NoOfFalseDisputes = this.ViewDetailContract.RPefindoCntrctDsptsListObjs.filter(x => x.Resolution == "FalseDispute").length;
    }
    
    this.IsViewMode = true;
  }

  backOnClick()
  {
    this.ViewDetailContract = new ResContractObj();
    this.NoOfClosedDisputes = 0;
    this.NoOfFalseDisputes = 0;
    
    this.IsViewMode = false;
  }

  pascalToSpace(ori:string='')
  {
    if (ori == undefined || ori == null) return '';
    return ori.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
  }

  //#region Charts
  colors: ColorHelper = new ColorHelper('picnic', 'ordinal', [], null);
  colorScheme = {
    domain: this.colors.colorDomain
  };
  schemeType: string = "ordinal"
  xAxisLabel: string = "Years";
  yAxisLabel: string = "Sum of Total";
  legendTitle: string = "";
  barPadding: number = 1;

  tempYear: string = "";
  ShowYears: string = "";
  businessDt: Date = new Date();
  multiCharts: Array<MultiChartsObj> = new Array<MultiChartsObj>();
  initMulti: Array<MultiChartsObj> = new Array<MultiChartsObj>();
  initListResViewPefindoContractsObj: Array<ResViewPefindoContractsObj> = new Array<ResViewPefindoContractsObj>();
  ListResViewPefindoContractsObj: Array<ResViewPefindoContractsObj> = new Array<ResViewPefindoContractsObj>();
  initYears: Array<string> = new Array<string>();
  Years: Array<string> = new Array<string>();
  Quarters: Array<string> = new Array<string>();
  ShowYearsArr: Array<string> = new Array<string>();

  isChartReady: boolean = false;
  isDdlQuartersReady: boolean = false;
  isDdlYearsReady: boolean = false;
  isReady: boolean = false;
  async getData()
  {
    let reqByTrxNo: GenericObj = new GenericObj();
    reqByTrxNo.TrxNo = this.TrxNo;
    await this.http.post(this.UrlConstantNew.GetPefindoContracts, reqByTrxNo).toPromise().then(
      (response: {ReturnObject: Array<ResContractObj>}) => {
        this.ResListContractsObj = response.ReturnObject? response.ReturnObject : [];
        this.ResListContractsObj = this.ResListContractsObj.filter(x => x.ClientRole == 'MainDebtor');
        this.ResListContractsObj.forEach(x => {
          var idx = this.ResSummaryContractsObj.findIndex(y => y.Creditor == x.Creditor);
          if (idx < 0)
          {
            let newItem = new ResContractObj();
            newItem.Creditor = x.Creditor;
            this.ResSummaryContractsObj.push(newItem);
            idx = this.ResSummaryContractsObj.findIndex(y => y.Creditor == x.Creditor);
          }
          let curr = this.ResSummaryContractsObj[idx];
          curr.TtlAmt += x.TtlAmt;
          curr.OsAmt += x.OsAmt;
          curr.PastDueAmt += x.PastDueAmt;
          curr.PastDueDays = x.PastDueDays > curr.PastDueDays ? x.PastDueDays : curr.PastDueDays;
        })

        this.ResListContractsObj.forEach(x => {
          let resViewPefindoContractsObj = new ResViewPefindoContractsObj();
          resViewPefindoContractsObj.Creditor = x['Creditor'];
          resViewPefindoContractsObj.StartDt = x['StartDt'];
          resViewPefindoContractsObj.TtlAmt = x['TtlAmt'];
          resViewPefindoContractsObj.Years = new Date(x['StartDt']).getFullYear();

          let month = new Date(x['StartDt']).getMonth();
          resViewPefindoContractsObj.Month = month;
          resViewPefindoContractsObj.Quarters = month >= 0 && month < 3? 1 : month >= 3 && month < 6? 2 : month >= 6 && month < 9? 3 : 4;

          this.initListResViewPefindoContractsObj.push(resViewPefindoContractsObj);
        });
      })

    this.initListResViewPefindoContractsObj.sort((a, b) => {
      if(a["Years"] < b["Years"]) return -1;
      if(a["Years"] > b["Years"]) return 1;
      if (a["Quarters"] < b["Quarters"]) return -1;
      if (a["Quarters"] > b["Quarters"]) return 1;
      if (a["Month"] < b["Month"]) return -1;
      if (a["Month"] > b["Month"]) return 1;
    });

    await this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, { Code: CommonConstant.GsDefPefindoGraphCntrctYears }).toPromise().then(
      (result: GeneralSettingObj) => {
        let def: Array<string> = result.GsValue != null? result.GsValue.split(";") : ["5","5"];

        if (def.length > 0)
        {
          for (let i = 1; i <= parseInt(def[0]); i++)
          {
            this.ShowYearsArr.push(i.toString())
          }

          this.ShowYears = def[1];
        }
      }
    );

    if(localStorage.getItem(this.TrxNo) != null)
    {
      let tempShowYears = JSON.parse(AdInsHelper.GetLocalStorage(this.TrxNo))

      this.ShowYears = parseInt(tempShowYears) > parseInt(this.ShowYearsArr[this.ShowYearsArr.length-1])? this.ShowYearsArr[this.ShowYearsArr.length-1] : tempShowYears;
    }

    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDt = new Date(context[CommonConstant.BUSINESS_DT]);

    let tempYears: Array<string> = new Array<string>();
    tempYears = this.initListResViewPefindoContractsObj.map(x => x.Years.toString());
    this.initYears.push(...tempYears.filter((item, index, self) => self.indexOf(item) === index))
  }

  async initCharts(data: Array<ResForChartsObj>)
  {
    this.isChartReady = false;
    this.multiCharts = new Array<MultiChartsObj>();

    for (let i = 0; i < data.length; i++)
    {
      let numName = 0
      numName = this.multiCharts.findIndex(x => x.name == data[i].Name);
      if (numName < 0)
      {
        let multi = new MultiChartsObj();
        let one = new ChartsObj();
        one.name = data[i].SeriesName;
        one.value = data[i].Value;
        multi.name = data[i].Name;
        multi.series.push(one);

        this.multiCharts.push(multi)
        continue
      }

      let numSeriesName = this.multiCharts[numName].series.findIndex(x => x.name == data[i].SeriesName);
      if (numSeriesName < 0)
      {
        let one = new ChartsObj();
        one.name = data[i].SeriesName;
        one.value = data[i].Value;
        this.multiCharts[numName].series.push(one); 
      }
      else
      {
        this.multiCharts[numName].series[numSeriesName].value += data[i].Value;
      }
    }

    this.initMulti = this.multiCharts;

    setTimeout (() => {
      this.isChartReady = true
    }, 50);
  }

  async setCharts(year: string, quarter: string)
  {
    //legend by years
    if(year == "All")
    {
      let tempListForChartsObj : Array<ResForChartsObj> = new Array<ResForChartsObj>();
      
      this.ListResViewPefindoContractsObj.forEach(x => {
        let temp = new ResForChartsObj();
        temp.Name = x.Years.toString();
        temp.SeriesName = x.Creditor;
        temp.Value = x.TtlAmt;

        tempListForChartsObj.push(temp);
      });

      this.xAxisLabel = "Years";
      await this.initCharts(tempListForChartsObj);
      return;
    }

    //legend by quarters
    if((year != "" && quarter == "") || (quarter == "All"))
    {
      this.tempYear = year;
      let tempListForChartsObj: Array<ResForChartsObj> = new Array<ResForChartsObj>();
      let tempListResViewPefindoContractsObj: Array<ResViewPefindoContractsObj> = new Array<ResViewPefindoContractsObj>();
      tempListResViewPefindoContractsObj = this.ListResViewPefindoContractsObj.filter(x => x.Years.toString() == year);

      tempListResViewPefindoContractsObj.forEach(x => {
        let temp = new ResForChartsObj();
        temp.Name = "Q" + x.Quarters.toString();
        temp.SeriesName = x.Creditor;
        temp.Value = x.TtlAmt;

        tempListForChartsObj.push(temp);
      });

      this.xAxisLabel = "Quarters";
      await this.initCharts(tempListForChartsObj);
      return;
    }

    //legend by months
    if(quarter != "")
    {
      const monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"];

      let tempListForChartsObj: Array<ResForChartsObj> = new Array<ResForChartsObj>();
      let tempListResViewPefindoContractsObj: Array<ResViewPefindoContractsObj> = new Array<ResViewPefindoContractsObj>();
      tempListResViewPefindoContractsObj = this.ListResViewPefindoContractsObj.filter(x => x.Years.toString() == year && x.Quarters.toString() == quarter[1]);
      
      tempListResViewPefindoContractsObj.forEach(x => {
        let temp = new ResForChartsObj();
        temp.Name = monthNames[x.Month];
        temp.SeriesName = x.Creditor;
        temp.Value = x.TtlAmt;

        tempListForChartsObj.push(temp);
      });

      this.xAxisLabel = "Months";
      await this.initCharts(tempListForChartsObj);
      return;
    }
  }

  async getQuarters(event: any)
  {
    this.isDdlQuartersReady = false;

    this.Quarters = new Array<string>();
    this.Quarters.push("All")

    let temp: Array<ResViewPefindoContractsObj> = new Array<ResViewPefindoContractsObj>();
    temp = this.ListResViewPefindoContractsObj.filter(x => x.Years == event);

    temp.forEach(x => {
      if (!this.Quarters.includes(("Q" + x.Quarters.toString()))) this.Quarters.push("Q" + x.Quarters.toString());
    });

    setTimeout (() => {
      this.isDdlQuartersReady = true
    }, 50);

    await this.setCharts(event, "")
  }

  async ChangeShowLatestYear()
  {
    this.isDdlYearsReady = false;
    this.isDdlQuartersReady = false;
    this.isChartReady = false;
    AdInsHelper.SetLocalStorage(this.TrxNo, JSON.stringify(this.ShowYears));

    let thisYear : number = this.businessDt.getFullYear();
    let temp: number = thisYear - parseInt(this.ShowYears);
    
    this.Years = new Array<string>();
    this.Years.push("All")
    console.log(this.Years)

    for (let i = 1; i < this.initYears.length; i++)
    {
      if (parseInt(this.initYears[i]) > temp)
      {
        this.Years.push(this.initYears[i])
      }
    }

    this.ListResViewPefindoContractsObj = new Array<ResViewPefindoContractsObj>();
    this.initListResViewPefindoContractsObj.forEach(x => {
      if (this.Years.includes(x.Years.toString()))
      {
        this.ListResViewPefindoContractsObj.push(x);
      }
    });

    if (this.ListResViewPefindoContractsObj.length > 0) await this.setCharts("All", "");

    setTimeout (() => {

      if (this.ListResViewPefindoContractsObj.length > 0)
      {
        this.isDdlYearsReady = true
        this.isDdlQuartersReady = true;
      }
    }, 50);
  }

  onSelect(event: any)
  {
    if (this.isLegend(event)) {
      if (this.isDataShown(event)) {
        const tempData = JSON.parse(JSON.stringify(this.multiCharts));
        tempData.forEach(x => {
          x.series.forEach(y => {
            if (y.name === event) {
              y.value = 0;
            }
          });
        });
        this.multiCharts = tempData;
      } else {
        this.initMulti.forEach(x => {
          x.series.forEach(y => {           
             if (y.name === event && y.value !== 0){ 
              this.setChartDataBackToInitData(x.name, y.name, y.value)
             }
          });
        });
      }     
    }
  }

  isLegend = (event) => typeof event === 'string';

  isDataShown(event): boolean {
    let isDataShown = false;
    this.multiCharts.forEach(x => {
      x.series.forEach(y => {
        if (y.name == event && y.value != 0) isDataShown = true;
      });
    });

    return isDataShown;
  }

  setChartDataBackToInitData = (name, creditor, total) => {
    const tempData = JSON.parse(JSON.stringify(this.multiCharts));
    tempData.find(x => x.name === name).series.find(y => y.name === creditor).value = total;
    this.multiCharts = tempData;
  }

  ExcelData: any;
  resPefindoContractForExportObj: Array<ResPefindoContractForExportObj> = new Array<ResPefindoContractForExportObj>();
  async exportAsXLSX()
  {
    await this.selectDataForExport();
    this.ExcelData = this.resPefindoContractForExportObj;

    let filename = "PefindoContract_" + this.TempDetailContract.PefindoId  + "_" + this.TempDetailContract.Name;
    this.exportAsExcelFile(this.ExcelData, filename);
  }

  selectDataForExport()
  {
    this.resPefindoContractForExportObj = new Array<ResPefindoContractForExportObj>();
    this.ResListContractsObj.forEach(x => {
      let temp: ResPefindoContractForExportObj = new ResPefindoContractForExportObj();
      temp.CreditorName = x.Creditor;
      temp.NegativeStatus = x.CntrctNegStat;
      temp.MaturityDate = x.MaturityDt;
      temp.Type = x.CntrctType;
      temp.Opened = x.StartDt;
      temp.Status = x.CntrctStat;
      temp.Total = x.TtlAmt;
      temp.Balance = x.OsAmt;
      temp.PastDue = x.PastDueAmt;
      temp.Arreas = x.PastDueDays;
      temp.LastUpdate = x.LastUpdateDt;

      this.resPefindoContractForExportObj.push(temp);
    });
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    let header = [["Creditor Name", "Negative Status", "Maturity Date", "Type", "Opened", "Status", "Total", "Balance", "Past Due", "Arreas", "Last Update"]];

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(worksheet, header);
    XLSX.utils.sheet_add_json(worksheet, json, {origin: 'A2', skipHeader: true})
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    let date = new Date().getDate() + "_" + (new Date().getMonth() + 1) + "_" + new Date().getFullYear() + "_" + new Date().getTime();
    FileSaver.saveAs(data, fileName + '_export_' + date + EXCEL_EXTENSION);
  }
  //#endregion

}
