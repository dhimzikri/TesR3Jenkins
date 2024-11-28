import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerificationQuestionAnswerAddEditComponent } from './verification-question-answer/verification-question-answer-add-edit/verification-question-answer-add-edit.component';
import { VerificationQuestionGroupAddEditComponent } from './verification-question-group/verification-question-group-add-edit/verification-question-group-add-edit.component';
import { VerificationQuestionGroupMemberPagingComponent } from './verification-question-group-member/verification-question-group-member-paging/verification-question-group-member-paging.component';
import { VerificationQuestionGroupMemberEditComponent } from './verification-question-group-member/verification-question-group-member-edit/verification-question-group-member-edit.component';
import { VerificationQuestionGroupMemberAddComponent } from './verification-question-group-member/verification-question-group-member-add/verification-question-group-member-add.component';
import { VerificationQuestionSchemePagingComponent } from './verification-question-scheme/verification-question-scheme-paging/verification-question-scheme-paging.component';
import { VerificationQuestionSchemeAddEditComponent } from './verification-question-scheme/verification-question-scheme-add-edit/verification-question-scheme-add-edit.component';
import { VerificationQuestionSchemeMemberPagingComponent } from './verification-question-scheme-member/verification-question-scheme-member-paging/verification-question-scheme-member-paging.component';
import { VerificationQuestionSchemeMemberAddComponent } from './verification-question-scheme-member/verification-question-scheme-member-add/verification-question-scheme-member-add.component';
import { VerificationQuestionSchemeMemberEditComponent } from './verification-question-scheme-member/verification-question-scheme-member-edit/verification-question-scheme-member-edit.component';
import { VerificationQuestionGroupPagingComponent } from './verification-question-group/verification-question-group-paging/verification-question-group-paging.component';
import { VerificationQuestionAnswerPagingComponent } from './verification-question-answer/verification-question-answer-paging/verification-question-answer-paging.component';
import { PathConstant } from 'app/shared/PathConstant';
import { UcTemplateComponent } from '@adins/uctemplate';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.QA_PAGING,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionAnswer"
        },
        // component: VerificationQuestionAnswerPagingComponent,
        // data: {
        //   title: 'Verification Question Answer Paging'
        // },
      },
      {
        path: PathConstant.QA_ADD,
        component: VerificationQuestionAnswerAddEditComponent,
        data: {
          title: 'Verification Question Answer Add'
        },
      },
      {
        path: PathConstant.QA_EDIT,
        component: VerificationQuestionAnswerAddEditComponent,
        data: {
          title: 'Verification Question Answer Edit'
        },
      },
      {
        path: PathConstant.QA_GRP_PAGING,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionGroup"
        },
        // component: VerificationQuestionGroupPagingComponent,
        // data: {
        //   title: 'Verification Question Group Paging'
        // },
      },
      {
        path: PathConstant.QA_GRP_ADD,
        component: VerificationQuestionGroupAddEditComponent,
        data: {
          title: 'Verification Question Group Edit'
        },
      },
      {
        path: PathConstant.QA_GRP_EDIT,
        component: VerificationQuestionGroupAddEditComponent,
        data: {
          title: 'Verification Question Group Edit'
        },
      },
      {
        path: PathConstant.QA_GRP_MBR_PAGING,
        component: VerificationQuestionGroupMemberPagingComponent,
        data: {
          title: 'Verification Question Group Member Paging'
        },
      },
      {
        path: PathConstant.QA_GRP_MBR_ADD,
        component: VerificationQuestionGroupMemberAddComponent,
        data: {
          title: 'Verification Question Group Member Add'
        },
      },
      {
        path: PathConstant.QA_GRP_MBR_EDIT,
        component: VerificationQuestionGroupMemberEditComponent,
        data: {
          title: 'Verification Question Group Member Edit'
        },
      },
      {
        path: PathConstant.QA_SCHM_PAGING,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionScheme"
        },
        // component: VerificationQuestionSchemePagingComponent,
        // data: {
        //   title: 'Verification Question Scheme Paging'
        // },
      },
      {
        path: PathConstant.QA_SCHM_ADD,
        component: VerificationQuestionSchemeAddEditComponent,
        data: {
          title: 'Verification Question Scheme Add'
        },
      },
      {
        path: PathConstant.QA_SCHM_EDIT,
        component: VerificationQuestionSchemeAddEditComponent,
        data: {
          title: 'Verification Question Scheme Edit'
        },
      },
      {
        path: PathConstant.QA_SCHM_MBR_PAGING,
        component: VerificationQuestionSchemeMemberPagingComponent,
        data: {
          title: 'Verification Question Scheme Member Paging'
        },
      },
      {
        path: PathConstant.QA_SCHM_MBR_ADD,
        component: VerificationQuestionSchemeMemberAddComponent,
        data: {
          title: 'Verification Question Scheme Member Add'
        },
      },
      {
        path: PathConstant.QA_SCHM_MBR_EDIT,
        component: VerificationQuestionSchemeMemberEditComponent,
        data: {
          title: 'Verification Question Scheme Member Edit'
        },
      },

      {
        path: PathConstant.SELF_CUSTOM_QA_PAGING,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionAnswer"
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_QA_ADD,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionAnswerDetail"
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_QA_EDIT,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionAnswerDetail"
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_QA_GRP_PAGING,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionGroup"
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_QA_GRP_ADD,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionGroupDetail"
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_QA_GRP_EDIT,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionGroupDetail"
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_QA_GRP_MBR_PAGING,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionGroupMember"
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_QA_GRP_MBR_ADD,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionGroupMemberAdd"
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_QA_GRP_MBR_EDIT,
        component: UcTemplateComponent,
        data: {
          page: "Verificationquestiongroupmembereditseqno"
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_QA_SCHM_PAGING,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionScheme"
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_QA_SCHM_ADD,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionSchemeDetail"
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_QA_SCHM_EDIT,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionSchemeDetail"
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_QA_SCHM_MBR_PAGING,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionSchemeMember"
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_QA_SCHM_MBR_ADD,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionSchemeMemberAdd"
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_QA_SCHM_MBR_EDIT,
        component: UcTemplateComponent,
        data: {
          page: "VerificationQuestionSchemeMemberEditSeqNo"
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationRoutingModule { }
