import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeDetailSelfcustomComponent } from "./employee/employee-add/employee-detail-selfcustom.component";
import { PathConstantSelfCustom } from "./shared/constant/PathConstantSelfCustom";
import { UcTemplateComponent } from "@adins/uctemplate";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: PathConstantSelfCustom.EMP_PAGING_CNAF,
        // component: EmployeeDetailSelfcustomComponent,
        component: UcTemplateComponent,
        data: {
          title: "Employee Paging SelfCustom",
          page: "EmployeePagingXCNAFdimasnew",
        },
      },
      {
        path: PathConstantSelfCustom.EMP_DETAIL_CNAF,
        // component: EmployeeDetailSelfcustomComponent,
        component: UcTemplateComponent,
        data: {
          title: "Employee Detail SelfCustom",
          page: "OrganizationemployeedetailCopyXCNAFSelfCustomBriliyan",
        },
      },
      {
        path: PathConstantSelfCustom.REIMB_REQ_CNAF,
        // component: EmployeeDetailSelfcustomComponent,
        component: UcTemplateComponent,
        data: {
          title: "Reimburse Request CNAF",
          page: "ReimburseRequestMenuCNAFSelfCustomDEDI",
        },
      },
      {
        path: PathConstantSelfCustom.REIMB_APV_DETAIL_CNAF,
        // component: EmployeeDetailSelfcustomComponent,
        component: UcTemplateComponent,
        data: {
          title: "Reimburse Detail CNAF",
          page: "ReimburseApprovalDetailMenuCNAFSelfCustomDimas",
        },
      },
      {
        path: PathConstantSelfCustom.REIMB_APV_PAGING_CNAF,
        // component: EmployeeDetailSelfcustomComponent,
        component: UcTemplateComponent,
        data: {
          title: "Reimburse Paging CNAF",
          page: "ReimburseApprovalPagingMenuCNAFSelfCustomDEDI",
        },
      },
      {
        path: PathConstantSelfCustom.RPT_EMP_CNAF,
        // component: EmployeeDetailSelfcustomComponent,
        component: UcTemplateComponent,
        data: {
          title: "Report Employee",
          page: "ReportEmployeeCNAFSelfCustomDimas",
        },
      },
      {
        path: PathConstantSelfCustom.ASSET_TYPE_D_PAGING_CNAF,
        // component: EmployeeDetailSelfcustomComponent,
        component: UcTemplateComponent,
        data: {
          title: "Asset Type SelfCustom",
          page: "AssetTypeSelfCustomDnew",
        },
      },
      {
        path: PathConstantSelfCustom.ASSET_TYPE_DETAIL,
        // component: EmployeeDetailSelfcustomComponent,
        component: UcTemplateComponent,
        data: {
          title: "Asset Type Detail SelfCustom",
          page: "AssetTypeSelfCustomD",
        },
      },
      {
        path: PathConstantSelfCustom.TEST_ZipCode_PAGING,
        // component: EmployeeDetailSelfcustomComponent,
        component: UcTemplateComponent,
        data: {
          title: "Tes ZipCode New",
          page: "TestDBDnewnew",
        },
      },
      {
        path: PathConstantSelfCustom.TES_ZIPCODE_DETAIL,
        // component: EmployeeDetailSelfcustomComponent,
        component: UcTemplateComponent,
        data: {
          title: "Tes ZipCode Detail",
          page: "ZipcodeDetail",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfcustomRoutingModule {}
