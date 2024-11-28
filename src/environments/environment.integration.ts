// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: true,
    navbarColor: 'lightgray',
    LosURL : 'https://r3web-server.ad-ins.com/LOS_INTEGRATION/',
    WebSocketURL : 'https://r3app-server.ad-ins.com/FOUNDATION_INTEGRATION',
    FoundationR3Url: 'https://r3app-server.ad-ins.com/FOUNDATION_INTEGRATION',
    ApprovalURL : 'https://r3app-server.ad-ins.com/APPROVAL_INTEGRATION',
    FoundationR3Web:'https://r3web-server.ad-ins.com/FOUNDATION_INTEGRATION',
    losR3Web: 'https://r3web-server.ad-ins.com/LOSR3',
    lmsWeb: 'https://r3impl-websvr.ad-ins.com/LMS',
    Module:"FOU",
    ChipperKeyLocalStorage: "AdInsFOU2020OKOK", // 256 bit atau 16 karakter
    ChipperKeyCookie: "AdInsFOU12345678", // 256 bit atau 16 karakter & harus sama dengan BE
    DMSUrl: "https://sky.ad-ins.com/LiteDMS_POC/Integration/ViewDoc.aspx",
};