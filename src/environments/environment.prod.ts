// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: true,
    navbarColor: 'transparent',
    isPageFromService: false,
    useSafeUrl: true,
    isCore: true,
    SpinnerOnHttpPost: true,
    Module:"FOU",
    ChipperKeyLocalStorage: "AdInsFOU2020OKOK", // 256 bit atau 16 karakter
    ChipperKeyCookie: "AdInsFOU12345678", // 256 bit atau 16 karakter & harus sama dengan BE
    NotificationPublicKey: "BBbkWeKUsFaOoDQxdc3XJ9pJhfSvAypmRhDmRORWaCxTjs6odY0VK58sBcl-0ZLwFHkCs2IcS7GTvpGEPEcZaAE",

    LosURL : 'https://r3web-server.ad-ins.com/LOSR3/',
    FoundationR3Url: 'https://r3app-server.ad-ins.com/FOUNDATION_R3',
    WebSocketURL : 'https://r3app-server.ad-ins.com/FOUNDATION_R3',
    DashboardURL: 'https://r3app-server.ad-ins.com/Dashboard',
    losR3Web: 'https://r3web-server.ad-ins.com/LOSR3',
    lmsWeb: 'https://r3impl-websvr.ad-ins.com/LMS',
    ApprovalR3Url: 'https://r3app-server.ad-ins.com/Approval_R3_BE_SPRINGBOOT',
    ApprovalURL : 'https://r3app-server/APPROVAL',
    FoundationR3Web:'https://r3web-server.ad-ins.com/Foundation',
    WFThingsToDoUrl: 'https://r3impl-appsvr.ad-ins.com/WORKFLOW_OPL/',
    DMSUrl: "https://sky.ad-ins.com/LiteDMS_POC/Integration/ViewDoc.aspx"
};
