import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from '../PathConstant';
import * as _environment from "../../../assets/config/enviConfig.json";
import { URLConstant } from '../constant/URLConstant';
//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const CONTENT_ROUTES: Routes = [
  {
    path: PathConstant.CR_PAGES,
    loadChildren: () => import('app/pages/content-pages/content-pages.module').then(m => m.ContentPagesModule)
  },
  {
    path: PathConstant.CR_VIEW,
    loadChildren: () => import('app/view/view.module').then(m => m.ViewModule)
  },
  {
    path: PathConstant.CR_DOC_MNGMNT_VIEW,
    loadChildren: () => import('app/document-management/document-management.module').then(m => m.DocumentManagementModule)
  },
  {
    path: PathConstant.JOURNAL_RESULT_VIEW,
    loadChildren: () => import('app/journal/journal.module').then(m => m.JournalModule)
  },
  {
    path: PathConstant.STAFF_CLAIM_VIEW,
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
    path: "othtrxview",
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
    path: 'agrmntview',
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
    path: 'lmsschemeview',
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
    path: 'payment-reversal-view',
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
    path: 'prepaid-alloc-view',
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
    path: 'payment-receive-view',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.cashbankR3Web + '/remoteEntry.js',
        exposedModule: './PrepaidAlloc'
      })
        .then(m => m.PrepaidAllocModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'receiptformview',
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
    path: 'amendmentview',
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
    path: 'agreementtransferinfo',
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
    path: 'writeoffview',
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
    path: 'nonaccrualview',
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
    path: 'cashierview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.cashbankR3Web + '/remoteEntry.js',
        exposedModule: './CashierTransactionModule'
      })
        .then(m => m.CashierTransactionModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    },
  },
  {
    path: 'cashbankvoucher-view',
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
    path: 'nonaccrualview',
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
    path: PathConstant.CR_DOC_MNGMNT_VIEW,
    loadChildren: () => import('app/document-management/document-management.module').then(m => m.DocumentManagementModule)
  },
  {
    path: 'agrmntview',
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
    path: 'paymenthistoryview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.arR3Web + '/remoteEntry.js',
        exposedModule: './PaymentHistoryModule'
      })
        .then(m => m.PaymentHistoryModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'lmsschemeview',
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
    path: 'prepaid-alloc-view',
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
    path: 'receiptformview',
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
    path: 'amendmentview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.amendmentR3Web + './remoteEntry.js',
        exposedModule: './AmendmentModule'
      })
        .then(m => m.AmendmentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'writeoffview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.armntR3Web + './remoteEntry.js',
        exposedModule: './WriteOffModule'
      })
        .then(m => m.WriteOffModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'nonaccrualview',
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
    path: 'waivedview',
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
    path: 'prepaidtransferview',
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
    path: 'refundview',
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
  {
    path: 'disbursementview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.apR3Web + '/remoteEntry.js',
        exposedModule: './PayVoucherModule'
      })
        .then(m => m.PayVoucherModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'integrationview',
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
    path: 'chargereceivableview',
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
    path: 'pdccancelview',
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
    path: 'changeduedateview',
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
    path: 'pdcview',
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
  {
    path: 'pdcreceiveview',
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
    path: 'pdctransitview',
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

  //#region AMS
  {
    path: 'assetdocumentview',
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
    path: 'insuranceview',
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
    path: 'filingmanagementview',
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
    path: 'view',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.assetR3Web + '/remoteEntry.js',
        exposedModule: './AssetViewModule'
      })
        .then(m => m.ViewModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'assetmanagementview',
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
    path: 'assetdisposalview',
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
  //#endregion

  //#region TMS
  {
    path: 'View',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.FacilityMntWeb + '/remoteEntry.js',
        exposedModule: './ViewSettingModule'
      })
        .then(m => m.ViewSettingModule)
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
    path: 'ViewAssetSelling',
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
    path: 'ViewPaymentWo',
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
    path: 'ViewTermination',
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
    path: 'View',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.PayOutWeb + '/remoteEntry.js',
        exposedModule: './ViewSettingModule'
      })
        .then(m => m.ViewSettingModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'ViewPaymentOut',
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
    path: 'reschedulingview',
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
    path: 'partialprepaymentview',
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
    path: 'collateralreplacementview',
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
    path: 'suspendview',
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
    path: 'suspendreverseview',
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
    path: 'autodebitview',
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
    path: 'autodebitpayview',
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
    path: 'reimbursement/view',
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
    path: 'advancepaymentview',
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
    path: 'advance-payment-settlement-view',
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
    path: 'ViewBuyback',
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
    // redundant, but needed just in case there are still some pages that uses this path
    path: 'advance-payment-alloc-view',
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
    path: 'paymentrequestview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.finopsR3Web + '/remoteEntry.js',
        exposedModule: './PaymentRequestModule'
      })
        .then(m => m.PaymentRequestModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'petty-cash-view',
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
    path: 'transfer-transaction-view',
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
  //#endregion

  //#region LOS
  {
    path: 'ViewLos',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: URLConstant.env.losR3Web + '/remoteEntry.js',
        exposedModule: './ViewModule'
      })
        .then(m => m.ViewModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion LOS

];