// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  navbarColor: 'lightgray',
  LosURL: 'https://r3web-server.ad-ins.com/LOSR3/',
  WebSocketURL: 'https://r3app-server.ad-ins.com/FOUNDATION_R3',
  DMSUrl: "https://sky.ad-ins.com/LiteDMS_POC/Integration/ViewDoc.aspx",
  FoundationR3Url: 'https://r3app-server.ad-ins.com/FOUNDATION_HTTPS',
  ApprovalURL : 'https://r3app-server.ad-ins.com/APPROVAL',
  FoundationR3Web:'https://r3web-server.ad-ins.com/Foundation',
  losR3Web: 'https://r3web-server/LOSR3',
  lmsWeb: 'https://r3impl-websvr.ad-ins.com/LMS',
  Module:"FOU",
  ChipperKeyLocalStorage: "AdInsFOU2020OKOK", // 256 bit atau 16 karakter
  ChipperKeyCookie: "AdInsFOU12345678", // 256 bit atau 16 karakter & harus sama dengan BE
};