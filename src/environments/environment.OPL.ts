// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: true,
    navbarColor: 'transparent',
    LosURL: 'https://r3impl-appsvr.ad-ins.com/ROS_BE',
    FoundationR3Url: 'https://r3impl-appsvr.ad-ins.com/FOUNDATION_OPL',
    ApprovalURL: 'https://r3impl-appsvr.ad-ins.com/APPROVAL_OPL_BE_R3',
    FoundationR3Web: 'https://r3impl-websvr.ad-ins.com/Foundation',
    losR3Web: 'https://r3impl-websvr.ad-ins.com/ROS_FE',
    lmsWeb: 'https://r3impl-websvr.ad-ins.com/LMS',
    WorkflowR3Url: 'https://r3impl-appsvr.ad-ins.com/WORKFLOW_OPL',
    WebSocketURL: 'https://r3impl-appsvr.ad-ins.com/FOUNDATION_R3',
    DashboardURL: 'https://r3impl-appsvr.ad-ins.com/Dashboard',
    Module:"FOU",
    ChipperKeyLocalStorage: "AdInsFOU2020OKOK", // 256 bit atau 16 karakter
    ChipperKeyCookie: "AdInsFOU12345678", // 256 bit atau 16 k
    DMSUrl : "https://sky.ad-ins.com/LiteDMS_POC/Integration/ViewDoc.aspx",
    isCore: false
};