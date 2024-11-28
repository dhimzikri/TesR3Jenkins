import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from 'app/shared/PathConstant';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.VIEW_SUBJECT_INFO_PERSONAL,
        loadChildren: () => import('./pefindo-view-subject-info-personal/pefindo-view-subject-info-personal.module').then(m => m.PefindoViewSubjectInfoPersonalModule)
      },
      {
        path: PathConstant.VIEW_SUBJECT_INFO_COMPANY,
        loadChildren: () => import('./pefindo-view-subject-info-company/pefindo-view-subject-info-company.module').then(m => m.PefindoViewSubjectInfoCompanyModule)
      },
      {
        path: PathConstant.VIEW_MO_SUMMARY,
        loadChildren: () => import('./pefindo-view-mo-summary/pefindo-view-mo-summary.module').then(m => m.PefindoViewMoSummaryModule)
      },
      {
        path: PathConstant.VIEW_PEFINDO_SCORE,
        loadChildren: () => import('./pefindo-view-pefindo-score/pefindo-view-pefindo-score.module').then(m => m.PefindoViewPefindoScoreModule)
      },
      {
        path: PathConstant.VIEW_CONTRACTS,
        loadChildren: () => import('./pefindo-view-contracts/pefindo-view-contracts.module').then(m => m.PefindoViewContractsModule)
      },
      {
        path: PathConstant.VIEW_PEFINDO_ALERT_QUEST,
        loadChildren: () => import('./pefindo-view-pefindo-alert-quest/pefindo-view-pefindo-alert-quest.module').then(m => m.PefindoViewPefindoAlertQuestModule)
      },
      {
        path: PathConstant.VIEW_SECURITIES,
        loadChildren: () => import('./pefindo-view-securities/pefindo-view-securities.module').then(m => m.PefindoViewSecuritiesModule)
      },
      {
        path: PathConstant.VIEW_OTHER_LIABILITIES,
        loadChildren: () => import('./pefindo-view-other-liabilities/pefindo-view-other-liabilities.module').then(m => m.PefindoViewOtherLiabilitiesModule)
      },
      {
        path: PathConstant.VIEW_INVOLVEMENTS,
        loadChildren: () => import('./pefindo-view-involvements/pefindo-view-involvements.module').then(m => m.PefindoViewInvolvementsModule)
      },
      {
        path: PathConstant.VIEW_RELATIONS,
        loadChildren: () => import('./pefindo-view-relations/pefindo-view-relations.module').then(m => m.PefindoViewRelationsModule)
      },
      {
        path: PathConstant.VIEW_INQUIRIES,
        loadChildren: () => import('./pefindo-view-inquiries/pefindo-view-inquiries.module').then(m => m.PefindoViewInquiriesModule)
      },
      {
        path: PathConstant.VIEW_DISPUTES,
        loadChildren: () => import('./pefindo-view-disputes/pefindo-view-disputes.module').then(m => m.PefindoViewDisputesModule)
      },
      {
        path: PathConstant.VIEW_FINANCIAL_STATEMENTS,
        loadChildren: () => import('./pefindo-view-financial-statements/pefindo-view-financial-statements.module').then(m => m.PefindoViewFinancialStatementsModule)
      },
      {
        path: PathConstant.VIEW_PEFINDO_OTHERS,
        loadChildren: () => import('./pefindo-view-others/pefindo-view-others.module').then(m => m.PefindoViewOthersModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewChildRoutingModule { }
