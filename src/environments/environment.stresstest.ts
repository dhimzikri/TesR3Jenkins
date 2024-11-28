// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: true,
    navbarColor: 'lime',
    LosURL : 'https://R3STWEBFE.ad-ins.com/LOS_FE/',
    WebSocketURL : 'https://R3STWEBBE.ad-ins.com/FOUNDATION_BE',
    FoundationR3Url: 'https://R3STWEBBE.ad-ins.com/FOUNDATION_BE',
    ApprovalURL : 'https://r3stengine.ad-ins.com/approval',
    FoundationR3Web:'https://R3STWEBFE.ad-ins.com/FOUNDATION_FE',
    losR3Web: 'https://r3web-server/LOSR3',
    lmsWeb: 'https://r3impl-websvr.ad-ins.com/LMS',
    Module:"FOU",
    ChipperKeyLocalStorage: "AdInsFOU2020OKOK", // 256 bit atau 16 karakter
    ChipperKeyCookie: "AdInsFOU12345678", // 256 bit atau 16 karakter & harus sama dengan BE
    DMSUrl: "https://sky.ad-ins.com/LiteDMS_POC/Integration/ViewDoc.aspx",
};