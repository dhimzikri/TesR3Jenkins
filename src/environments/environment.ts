// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in  `.angular-cli.json`.

export const environment = {
  production: false,
  navbarColor: '#FFF9F9',
  ChipperKeyLocalStorage: "AdInsFOU2020OKOK", // 256 bit atau 16 karakter
  ChipperKeyCookie: "AdInsFOU12345678", // 256 bit atau 16 karakter & harus sama dengan BE
  Module: "FOU",
  isCore: true,
  SpinnerOnHttpPost: true,
  isPageFromService: false,
  Golive: true,

  LosURL: 'https://r3app-server.ad-ins.com/LOS_DEV',
  FoundationR3Url: 'http://idjkakb-paa1/api/fou',
  DMSUrl: "https://sky.ad-ins.com/LITEDMS_POC/Integration/ViewDoc.aspx",
  AMSUrl: "https://r3app-server.ad-ins.com/AMS_DEMO", //OPL dah ada
  LMSUrl: "https://r3app-server.ad-ins.com/LMS_DEMO", //OPL dah ada
  lmsWeb: "https://r3impl-websvr.ad-ins.com/LMS", //sementara ku tak tau
  ApprovalR3Url: 'https://r3app-server.ad-ins.com/Approval_R3_BE_SPRINGBOOT',
  ApprovalURL: 'https://r3impl-appsvr.ad-ins.com/APPROVAL_DSF_R3_SIT',
  FoundationR3Web: 'https://r3web-server.ad-ins.com/FOUNDATION_DEV',
  //FoundationR3Web: 'https://localhost:4200',
  losR3Web: 'https://r3web-server.ad-ins.com/LOS_DEV',
  cmsR3Web: 'https://r3web-server.ad-ins.com/CMS_DEV',
  arR3Web: "http://r3web-server.ad-ins.com/LMSAR",
  armntR3Web: "http://r3web-server.ad-ins.com/LMSARMNT",
  paymentR3Web: "http://r3web-server.ad-ins.com/LMSPAYMENT",
  WorkflowR3Url: 'https://R3App-Server.ad-ins.com/WORKFLOW_R3',
  WebSocketURL: 'https://r3app-server.ad-ins.com/FOUNDATION_DEV',
  DashboardURL: 'https://r3app-server.ad-ins.com/Dashboard',
  dmsURL: 'https://kfx-svr/LITEDMS_POC/LiteDMS/pageconfins.aspx',
  WFThingsToDoUrl: 'https://r3impl-appsvr.ad-ins.com/WORKFLOW_OPL/',
  NotificationPublicKey: "BBbkWeKUsFaOoDQxdc3XJ9pJhfSvAypmRhDmRORWaCxTjs6odY0VK58sBcl-0ZLwFHkCs2IcS7GTvpGEPEcZaAE",
  TaxUrl:"https://r3app-server.ad-ins.com/TAX",
  FoundationR3Url_svc: "https://r3app-server.ad-ins.com/FOUNDATION_CORE_DEV",
  ApprovalR3Url_svc: "https://r3app-server.ad-ins.com/Approval_R3_BE_SPRINGBOOT"
};
