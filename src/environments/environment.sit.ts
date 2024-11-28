// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: true,
    navbarColor: 'transparent',
    //losUrl: 'https://localhost:5001',
    //FoundationR3Url: 'https://localhost:5000',
    LosURL: 'https://r3app-server.ad-ins.com/LOS_DEV',
    FoundationR3Url: 'http://kube1.ad-ins.com/api/fou',
    DMSUrl: "https://sky.ad-ins.com/LITEDMS_POC/Integration/ViewDoc.aspx",
    AMSUrl: "https://r3app-server.ad-ins.com/AMS_DEMO", //OPL dah ada
    LMSUrl: "https://r3app-server.ad-ins.com/LMS_DEMO", //OPL dah ada
    lmsWeb: "https://r3impl-websvr.ad-ins.com/LMS", //sementara ku tak tau
    //ApprovalURL: 'https://r3app-server.ad-ins.com/FOUNDATION_R3/Approval',
    ApprovalR3Url: 'https://r3app-server.ad-ins.com/Approval_R3_BE_SPRINGBOOT',
    ApprovalURL: 'https://r3impl-appsvr.ad-ins.com/APPROVAL_DSF_R3_SIT',
    FoundationR3Web: 'https://r3web-server.ad-ins.com/FOUNDATION_DEV',
    losR3Web: 'https://r3web-server.ad-ins.com/LOS_DEV',
    cmsR3Web: 'https://r3web-server.ad-ins.com/CMS_DEV',
    WorkflowR3Url: 'https://R3App-Server.ad-ins.com/WORKFLOW_R3',
    WebSocketURL: 'https://r3app-server.ad-ins.com/FOUNDATION_DEV',
    DashboardURL: 'https://r3app-server.ad-ins.com/Dashboard',
    dmsURL: 'https://kfx-svr/LITEDMS_POC/LiteDMS/pageconfins.aspx',
    WFThingsToDoUrl: 'https://r3impl-appsvr.ad-ins.com/WORKFLOW_OPL/',
    ChipperKeyLocalStorage: "AdInsFOU2020OKOK", // 256 bit atau 16 karakter
    ChipperKeyCookie: "AdInsFOU12345678", // 256 bit atau 16 karakter & harus sama dengan BE
    Module: "FOU",
    isCore: true,
    SpinnerOnHttpPost: false,
    NotificationPublicKey: "BNrodi9AsTlBkNYm_PT-JdpdG549ZLrHc4Emn8sUXSZ-0pncCyoZynVzCvAF7NXtRadF731-aHXIhSv0YupHcjc"
  };
  