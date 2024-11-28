import { Routes } from '@angular/router';
import { PathConstant } from '../PathConstant';
import * as _environment from "../../../assets/config/enviConfig.json";
import { UcTemplateComponent } from '@adins/uctemplate';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { PathConstantX } from 'app/impl/shared/constant/PathConstantX';
import { URLConstant } from '../constant/URLConstant';

export const Full_ROUTES: Routes = [
  {
    path: 'BREAD/:page',
    component: UcTemplateComponent
  },
  {
    path: PathConstant.LR_DASHBOARD,
    loadChildren: () => import('app/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: PathConstant.LR_FORMS,
    loadChildren: () => import('app/forms/forms.module').then(m => m.FormModule)
  },
  {
    path: PathConstant.LR_COMPNT,
    loadChildren: () => import('app/components/ui-components.module').then(m => m.UIComponentsModule)
  },
  {
    path: PathConstant.LR_OFFICE,
    loadChildren: () => import('app/office/office.module').then(m => m.OfficeModule)
  },
  {
    path: PathConstant.LR_EMP,
    loadChildren: () => import('app/employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: PathConstant.LR_EMP,
    loadChildren: () => import('app/impl/impl.module').then(m => m.ImplModule)
  },
  {
    path: PathConstant.LR_ORG,
    loadChildren: () => import('app/organization/organization.module').then(m => m.OrganizationModule)
  },
  {
    path: PathConstant.LR_CUST,
    loadChildren: () => import('app/customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: PathConstant.LR_SYSTEM_SETTING,
    loadChildren: () => import('app/system-setting/system-setting.module').then(m => m.SystemSettingModule)
  },
  {
    path: PathConstant.LR_SYSTEM_SETTING,
    loadChildren: () => import('app/impl/impl.module').then(m => m.ImplModule)
  },
  {
    path: PathConstant.LR_COMMON_SETTING,
    loadChildren: () => import('app/impl/impl.module').then(m => m.ImplModule)
  },  
  {
    path: PathConstant.LR_COMMON_SETTING,
    loadChildren: () => import('app/common-setting/common-setting.module').then(m => m.CommonSettingModule)
  },
  {
    path: PathConstant.LR_PAGES,
    loadChildren: () => import('app/pages/full-pages/full-pages.module').then(m => m.FullPagesModule)
  },
  {
    path: PathConstant.LR_UPLOAD,
    loadChildren: () => import('app/upload/upload.module').then(m => m.UploadModule)
  },
  {
    path: PathConstant.LR_ASSET,
    loadChildren: () => import('app/asset/asset.module').then(m => m.AssetModule)
  },
  {
    path: PathConstant.LR_VENDOR,
    loadChildren: () => import('app/vendor/vendor.module').then(m => m.VendorModule)
  },
  {
    path: PathConstant.LR_VERIF,
    loadChildren: () => import('app/verification/verification.module').then(m => m.VerificationModule)
  },
  {
    path: PathConstant.LR_ERROR,
    loadChildren: () => import('app/error-page/error-page.module').then(m => m.ErrorPageModule)
  },
  {
    path: PathConstant.LR_SRVY,
    loadChildren: () => import('app/survey/survey.module').then(m => m.SurveyModule)
  },
  {
    path: PathConstant.LR_INTEGRATION,
    loadChildren: () => import('app/integration/integration.module').then(m => m.IntegrationModule)
  },
  {
    path: PathConstant.LR_DOC_MNGMNT,
    loadChildren: () => import('app/document-management/document-management.module').then(m => m.DocumentManagementModule)
  },
  {
    path: PathConstant.LR_JOURNAL,
    loadChildren: () => import('app/journal/journal.module').then(m => m.JournalModule)
  },
  {
    path: PathConstant.LR_LICENSE,
    loadChildren: () => import('app/license/license.module').then(m => m.LicenseModule)
  },
  {
    path: PathConstant.LR_SYS_USER,
    loadChildren: () => import('app/system-user/system-user.module').then(m => m.SystemUserModule)
  },
  {
    path: PathConstantX.LR_IMPL,
    loadChildren: () => import('app/impl/impl.module').then(m => m.ImplModule)
  },
  // dynamic import remote module

  // #region LOS
  {
    path: 'Product',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.losR3Web + '/remoteEntry.js',
        exposedModule: './ProductModule'
      })
        .then(m => m.ProductModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'Inquiry',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.losR3Web + '/remoteEntry.js',
        exposedModule: './InquiryModule'
      })
        .then(m => m.InquiryModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'Lead',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.losR3Web + '/remoteEntry.js',
        exposedModule: './LeadModule'
      })
        .then(m => m.LeadModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'Ltkm',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.losR3Web + '/remoteEntry.js',
        exposedModule: './LtkmModule'
      })
        .then(m => m.LtkmModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'Mou',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.losR3Web + '/remoteEntry.js',
        exposedModule: './MouModule'
      })
        .then(m => m.MouModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'Report',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.losR3Web + '/remoteEntry.js',
        exposedModule: './ReportModule'
      })
        .then(m => m.ReportModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'TaskReassignment',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.losR3Web + '/remoteEntry.js',
        exposedModule: './TaskReassignmentModule'
      })
        .then(m => m.TaskReassignmentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'TrialCalculation',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.losR3Web + '/remoteEntry.js',
        exposedModule: './TrialCalculationModule'
      })
        .then(m => m.TrialCalculationModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'Nap',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.losR3Web + '/remoteEntry.js',
        exposedModule: './NapModule'
      })
        .then(m => m.NapModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'SettingLos',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.losR3Web + '/remoteEntry.js',
        exposedModule: './SettingModule'
      })
        .then(m => m.SettingModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion

  //#region AR Module
  {
    path: 'agrmnt',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.arR3Web + '/remoteEntry.js',
        exposedModule: './AgrmntModule'
      })
        .then(m => m.AgreementModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'lmsscheme',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.arR3Web + '/remoteEntry.js',
        exposedModule: './LmsSchmModule'
      })
        .then(m => m.LmsSchemeModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'golive',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.arR3Web + '/remoteEntry.js',
        exposedModule: './GoLiveModule'
      })
        .then(m => m.GoLiveModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'chargereceivable',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.arR3Web + '/remoteEntry.js',
        exposedModule: './ChargeReceivableModule'
      })
        .then(m => m.ChargeReceivableModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'report',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.finopsR3Web + '/remoteEntry.js',
        exposedModule: './Report'
      })
        .then(m => m.ReportModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    },
  },
  {
    path: 'report',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.apR3Web + '/remoteEntry.js',
        exposedModule: './ReportModule'
      })
        .then(m => m.ReportModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    },
  },
  {
    path: 'report',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.arR3Web + '/remoteEntry.js',
        exposedModule: './ReportModule'
      })
        .then(m => m.ReportModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'prepaidpurpose',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.arR3Web + '/remoteEntry.js',
        exposedModule: './RefPrepaidPurposeModule'
      })
        .then(m => m.RefPrepaidPurposeModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion

  //#region ARMNT
  {
    path: 'nonaccrual',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.armntR3Web + '/remoteEntry.js',
        exposedModule: './NonAccModule'
      })
        .then(m => m.NonAccrualModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'writeoff',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.armntR3Web + '/remoteEntry.js',
        exposedModule: './WriteOffModule'
      })
        .then(m => m.WriteOffModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'waived',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.armntR3Web + '/remoteEntry.js',
        exposedModule: './WaivedModule'
      })
        .then(m => m.WaivedModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'reportarmnt',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.armntR3Web + '/remoteEntry.js',
        exposedModule: './ReportModule'
      })
        .then(m => m.ReportModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'reportcashbank',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.cashbankR3Web + '/remoteEntry.js',
        exposedModule: './ReportModule'
      })
        .then(m => m.ReportModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'prepaidtransfer',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.armntR3Web + '/remoteEntry.js',
        exposedModule: './PrepaidTransferModule'
      })
        .then(m => m.PrepaidTransferModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },

  {
    path: 'refund',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.armntR3Web + '/remoteEntry.js',
        exposedModule: './RefundModule'
      })
        .then(m => m.RefundModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion

  //#region Payment
  {
    path: 'payment-channel',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.paymentR3Web + '/remoteEntry.js',
        exposedModule: './PaymentChannel'
      })
        .then(m => m.PaymentChannelModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'payment-channel-receive',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.paymentR3Web + '/remoteEntry.js',
        exposedModule: './PaymentChannel'
      })
        .then(m => m.PaymentChannelModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'payment',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.paymentR3Web + '/remoteEntry.js',
        exposedModule: './PaymentPriority'
      })
        .then(m => m.PaymentPriorityModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'payment-receive',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.paymentR3Web + '/remoteEntry.js',
        exposedModule: './PaymentReceive'
      })
        .then(m => m.PaymentReceiveModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'payment-reversal',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.paymentR3Web + '/remoteEntry.js',
        exposedModule: './PaymentReversal'
      })
        .then(m => m.PaymentReversalModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'receiptform',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.paymentR3Web + '/remoteEntry.js',
        exposedModule: './ReceiptForm'
      })
        .then(m => m.ReceiptFormModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'changewop',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.paymentR3Web + '/remoteEntry.js',
        exposedModule: './ChangeWop'
      })
        .then(m => m.ChangeWopModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'reportpayment',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.paymentR3Web + '/remoteEntry.js',
        exposedModule: './Report'
      })
        .then(m => m.ReportModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'prepaid-alloc',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.paymentR3Web + '/remoteEntry.js',
        exposedModule: './PrepaidAlloc'
      })
        .then(m => m.PrepaidAllocModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },

  //#region Amendment
  {
    path: 'amendment',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './AmendmentModule'
      })
        .then(m => m.AmendmentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'prepayment',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './PrepaymentModule'
      })
        .then(m => m.PrepaymentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'changeduedate',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './ChangeDueDateModule'
      })
        .then(m => m.ChangeDueDateModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'agreement-transfer',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './AgrTransferModule'
      })
        .then(m => m.AgrTransferModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'splitagrmnt',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './SplitAgrmntModule'
      })
        .then(m => m.SplitAgrmntModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'collateralreplacement',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './CollateralReplacementModule'
      })
        .then(m => m.CollateralReplacementModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'partialprepayment',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './PartialPrepaymentModule'
      })
        .then(m => m.PartialPrepaymentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'reportamendment',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './ReportModule'
      })
        .then(m => m.ReportModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion

  //#region Cashbank
  {
    path: 'cashier',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.cashbankR3Web + '/remoteEntry.js',
        exposedModule: './CashierTransactionModule'
      })
        .then(m => m.CashierTransactionModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'cashier-transaction',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.paymentR3Web + '/remoteEntry.js',
        exposedModule: './CashierTransactionModule'
      })
        .then(m => m.CashierTransactionModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'cashbankvoucher',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.cashbankR3Web + '/remoteEntry.js',
        exposedModule: './CashbankModule'
      })
        .then(m => m.CashbankModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'bankreconciliation',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.cashbankR3Web + '/remoteEntry.js',
        exposedModule: './BankReconciliationModule'
      })
        .then(m => m.BankReconciliationModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion
  // #region LBPP & SLIK
  {
    path: 'lbpp',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.gvrmntrgltionR3Web + '/remoteEntry.js',
        exposedModule: './LbppModule'
      })
        .then(m => m.LbppModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  // #endregion

  //#regin AP
  {
    path: 'disbursement',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.apR3Web + '/remoteEntry.js',
        exposedModule: './DisbursementModule'
      })
        .then(m => m.DisbursementModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'editapdestination',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.apR3Web + '/remoteEntry.js',
        exposedModule: './EditApDestinationModule'
      })
        .then(m => m.EditApDestinationModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion

  //#region FINOPS
  {
    path: 'othtrx',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.finopsR3Web + '/remoteEntry.js',
        exposedModule: './OthTrxModule'
      })
        .then(m => m.OthTrxModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'advancepayment',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.finopsR3Web + '/remoteEntry.js',
        exposedModule: './advancepayment'
      })
        .then(m => m.AdvancePaymentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'advance-payment-settlement',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.finopsR3Web + '/remoteEntry.js',
        exposedModule: './AdvPayAllocModule'
      })
        .then(m => m.AdvPayAllocModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'petty-cash',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.finopsR3Web + '/remoteEntry.js',
        exposedModule: './PettycashModule'
      })
        .then(m => m.PettycashModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'transfer-transaction',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.finopsR3Web + '/remoteEntry.js',
        exposedModule: './TrfTrxModule'
      })
        .then(m => m.TrfTrxModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'staff-claim',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.finopsR3Web + '/remoteEntry.js',
        exposedModule: './StaffClaim'
      })
        .then(m => m.StaffClaimModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'reimbursement',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.finopsR3Web + '/remoteEntry.js',
        exposedModule: './Reimbursement'
      })
        .then(m => m.ReimbursementModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'costcontrol',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.finopsR3Web + '/remoteEntry.js',
        exposedModule: './costcontrol'
      })
        .then(m => m.CostControlModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },

  //#endregion

  //#region PDC
  {
    path: 'clearing',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.pdcR3Web + '/remoteEntry.js',
        exposedModule: './ClearingModule'
      })
        .then(m => m.ClearingModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'pdcreceive',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.pdcR3Web + '/remoteEntry.js',
        exposedModule: './PdcReceiveModule'
      })
        .then(m => m.PdcReceiveModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'pdccancel',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.pdcR3Web + '/remoteEntry.js',
        exposedModule: './PdcCancelModule'
      })
        .then(m => m.PdcCancelModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'bounce',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.pdcR3Web + '/remoteEntry.js',
        exposedModule: './BounceModule'
      })
        .then(m => m.BounceModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'deposit',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.pdcR3Web + '/remoteEntry.js',
        exposedModule: './DepositModule'
      })
        .then(m => m.DepositModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'pdctransit',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.pdcR3Web + '/remoteEntry.js',
        exposedModule: './PdcTransitModule'
      })
        .then(m => m.PdcTransitModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'custody',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.pdcR3Web + '/remoteEntry.js',
        exposedModule: './PdcCustodyModule'
      })
        .then(m => m.PdcCustodyModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion

  //#region INTEGRATION
  {
    path: 'integration',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.integrationR3Web + '/remoteEntry.js',
        exposedModule: './IntegrationModule'
      })
        .then(m => m.IntegrationModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'integration-mapping',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.integrationR3Web + '/remoteEntry.js',
        exposedModule: './IntegrationMappingModule'
      })
        .then(m => m.IntegrationMappingModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'uploadintegration',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.integrationR3Web + '/remoteEntry.js',
        exposedModule: './UploadModule'
      })
        .then(m => m.UploadModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'pdc',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.pdcR3Web + '/remoteEntry.js',
        exposedModule: './PdcModule'
      })
        .then(m => m.PdcModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion

  //#region AMS

  {
    path: 'assetdocument',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.assetdocR3Web + '/remoteEntry.js',
        exposedModule: './AssetDocModule'
      })
        .then(m => m.AssetDocumentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'assetdocument',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.assetdocR3Web + '/remoteEntry.js',
        exposedModule: './EditAssetDocumentModule'
      })
        .then(m => m.EditAssetDocumentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'assetdocument',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.assetdocR3Web + '/remoteEntry.js',
        exposedModule: './ImplModule'
      })
        .then(m => m.ImplModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'assetdocument',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.assetdocR3Web + '/remoteEntry.js',
        exposedModule: './AssetDocumentReceiveModule'
      })
        .then(m => m.AssetDocumentReceiveModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'assetdocument',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.assetdocR3Web + '/remoteEntry.js',
        exposedModule: './AssetDocTransferModule'
      })
        .then(m => m.AssetDocTransferModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'assetdisposal',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.storageR3Web + '/remoteEntry.js',
        exposedModule: './StorageModule'
      })
        .then(m => m.AssetDisposalModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'assetdisposal',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.storageR3Web + '/remoteEntry.js',
        exposedModule: './AssetReqReadyToSellModule'
      })
        .then(m => m.AssetRequestReadyToSellModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'assetchange',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.storageR3Web + '/remoteEntry.js',
        exposedModule: './ImplModule'
      })
        .then(m => m.ImplModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'assetmanagement',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.assetR3Web + '/remoteEntry.js',
        exposedModule: './AssetModule'
      })
        .then(m => m.AssetManagementModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'insurance',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.insuranceR3Web + '/remoteEntry.js',
        exposedModule: './InsuranceModule'
      })
        .then(m => m.InsuranceModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'insurance',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.insuranceR3Web + '/remoteEntry.js',
        exposedModule: './NewCoverModule'
      })
        .then(m => m.NewCoverModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'insurance',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.insuranceR3Web + '/remoteEntry.js',
        exposedModule: './InsImplModule'
      })
        .then(m => m.ImplModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'insurance',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.insuranceR3Web + '/remoteEntry.js',
        exposedModule: './PremiEndrModule'
      })
        .then(m => m.PremiEndrModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'filingmanagement',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.filingR3Web + '/remoteEntry.js',
        exposedModule: './FilingModule'
      })
        .then(m => m.FilingManagementModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'assetpricing',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.assetpricingR3Web + '/remoteEntry.js',
        exposedModule: './AssetPricingModule'
      })
        .then(m => m.AssetPricingModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },

  //#endregion
  // #region TMS
  {
    path: 'Setting',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.FacilityMntWeb + '/remoteEntry.js',
        exposedModule: './SettingsModule'
      })
        .then(m => m.SettingModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },

  {
    path: 'Setting',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.FacilityMntWeb + '/remoteEntry.js',
        exposedModule: './ImplModule'
      })
        .then(m => m.ImplModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },

  {
    path: 'Setting',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.PayOutWeb + '/remoteEntry.js',
        exposedModule: './ImplModule'
      })
        .then(m => m.ImplModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },

  {
    path: 'Drawdown',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.FacilityExecWeb + '/remoteEntry.js',
        exposedModule: './DrawdownModule'
      })
        .then(m => m.DrawdownModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'Drawdown',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.FacilityExecWeb + '/remoteEntry.js',
        exposedModule: './ImplDrawdownModule'
      })
        .then(m => m.DrawdownXModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'Undraw',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.FacilityExecWeb + '/remoteEntry.js',
        exposedModule: './UndrawModule'
      })
        .then(m => m.UndrawModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'PaymentOut',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.PayOutWeb + '/remoteEntry.js',
        exposedModule: './PayoutModule'
      })
        .then(m => m.PayoutModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'PaymentOut',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.PayOutWeb + '/remoteEntry.js',
        exposedModule: './ImplModule'
      })
        .then(m => m.ImplModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'Termination',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.PayOutWeb + '/remoteEntry.js',
        exposedModule: './TerminationModule'
      })
        .then(m => m.TerminationModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'Termination',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.PayOutWeb + '/remoteEntry.js',
        exposedModule: './ImplModule'
      })
        .then(m => m.ImplModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'PaymentWo',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.PayOutWeb + '/remoteEntry.js',
        exposedModule: './ImplModule'
      })
        .then(m => m.ImplModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'Buyback',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.PayOutWeb + '/remoteEntry.js',
        exposedModule: './ImplModule'
      })
        .then(m => m.ImplModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'rescheduling',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './RescheduleModule'
      })
        .then(m => m.RescheduleModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'creditinsurance',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './RescheduleModule'
      })
        .then(m => m.RescheduleModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'suspend',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.paymentR3Web + '/remoteEntry.js',
        exposedModule: './SuspdTrxModule'
      })
        .then(m => m.SuspdTrxModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'suspendreverse',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.paymentR3Web + '/remoteEntry.js',
        exposedModule: './SuspdRvsTrxModule'
      })
        .then(m => m.SuspdRvsTrxModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'suspendalloc',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.paymentR3Web + '/remoteEntry.js',
        exposedModule: './SuspdAllocModule'
      })
        .then(m => m.SuspdAllocModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'autodebit',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.arR3Web + '/remoteEntry.js',
        exposedModule: './AutoDebitModule'
      })
        .then(m => m.AutoDebitModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'autodebitpay',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.arR3Web + '/remoteEntry.js',
        exposedModule: './AutoDebitPayModule'
      })
        .then(m => m.AutoDebitPayModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'costallocationmaster',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.finopsR3Web + '/remoteEntry.js',
        exposedModule: './CostAllocMasterModule'
      })
        .then(m => m.CostAllocMasterModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    },

  },
  {
    path: 'limitstaffclaim',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.finopsR3Web + '/remoteEntry.js',
        exposedModule: './LimitStaffClaimModule'
      })
        .then(m => m.LimitStaffClaimModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    },
  },
  {
    path: 'limitoperationalemployee',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.finopsR3Web + '/remoteEntry.js',
        exposedModule: './LimitOperationalEmployeeModule'
      })
        .then(m => m.LimitOperationalEmployeeModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    },
  },
  {
    path: 'costallocationscheme',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.finopsR3Web + '/remoteEntry.js',
        exposedModule: './CostAllocSchmModule'
      })
        .then(m => m.CostAllocSchmModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    },
  },
  {
    path: 'paymentrequest',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.finopsR3Web + '/remoteEntry.js',
        exposedModule: './PaymentRequestModule'
      })
        .then(m => m.PaymentRequestModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    },
  },
  {
    path: 'contractdocument',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.contractDocR3Web + '/remoteEntry.js',
        exposedModule: './ContractDocumentModule'
      })
        .then(m => m.ContractDocumentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    },
  },
  {
    path: 'AssetSelling',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.PayOutWeb + '/remoteEntry.js',
        exposedModule: './AssetSellingModule'
      })
        .then(m => m.AssetSellingModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'AssetSelling',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.PayOutWeb + '/remoteEntry.js',
        exposedModule: './ImplModule'
      })
        .then(m => m.ImplModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'PaymentWo',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.PayOutWeb + '/remoteEntry.js',
        exposedModule: './PaymentWoModule'
      })
        .then(m => m.PaymentWoModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'Buyback',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.PayOutWeb + '/remoteEntry.js',
        exposedModule: './TerminationModule'
      })
        .then(m => m.TerminationModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'LoanFloatingAdjustment',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.FacilityExecWeb + '/remoteEntry.js',
        exposedModule: './LoanFloatingAdjustmentModule'
      })
        .then(m => m.LoanFloatingAdjustmentModule)
        .catch(e => console.log(e))
    }
  },
  {
    path: 'LoanTermination',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.PayOutWeb + '/remoteEntry.js',
        exposedModule: './LoanTerminationModule'
      })
        .then(m => m.LoanTerminationModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'pledging',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.FacilityMntWeb + '/remoteEntry.js',
        exposedModule: './PledgingModule'
      })
        .then(m => m.PledgingModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'LoanPartialPrepayment',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.PayOutWeb + '/remoteEntry.js',
        exposedModule: './LoanPartialPrepaymentModule'
      })
        .then(m => m.LoanPartialPrepaymentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'ReportTms',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.PayOutWeb + '/remoteEntry.js',
        exposedModule: './ReportPayoutModule'
      })
        .then(m => m.ReportPayoutModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    },
  },
  {
    path: 'ReportTms',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.FacilityExecWeb + '/remoteEntry.js',
        exposedModule: './ReportExecModule'
      })
        .then(m => m.ReportExecModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    },
  },
  {
    path: 'ReportTms',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.FacilityMntWeb + '/remoteEntry.js',
        exposedModule: './ReportTmsModule'
      })
        .then(m => m.ReportModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    },
  },
  {
    path: 'ReportTms',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.FacilityMntWeb + '/remoteEntry.js',
        exposedModule: './ReportTmsXModule'
      })
        .then(m => m.ReportXModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    },
  },
  // #endregion
];
