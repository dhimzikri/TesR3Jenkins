import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PathConstant } from "app/shared/PathConstant";
import { FailedJournalListPagingComponent } from "./failed-journal-list/failed-journal-list-paging/failed-journal-list-paging.component";
import { JournalGroupFactComponent } from "./journal-media/journal-group-fact/journal-group-fact.component";
import { JournalGroupComponent } from "./journal-media/journal-group/journal-group.component";
import { JournalHeaderFactComponent } from "./journal-media/journal-header-fact/journal-header-fact.component";
import { JournalItemValueComponent } from "./journal-media/journal-item-value/journal-item-value.component";
import { JournalMediaDetailComponent } from "./journal-media/journal-media-detail/journal-media-detail.component";
import { JournalMediaPagingComponent } from "./journal-media/journal-media-paging/journal-media-paging.component";
import { JournalReconcilePagingComponent } from "./journal-reconcile/journal-reconcile-paging/journal-reconcile-paging.component";
import { JournalResultComponent } from "./journal-result/journal-result.component";
import { UploadJournalPagingComponent } from './upload-journal/upload-journal-paging.component';
import {UploadJournalDetailComponent} from './upload-journal/upload-journal-detail.component';
import { UcTemplateComponent } from '@adins/uctemplate';
import { SelfCustomUploadJournalPagingComponent} from './self-custom-upload-journal/self-custom-upload-journal-paging.component';
import { SelfCustomUploadJournalDetailComponent } from './self-custom-upload-journal/self-custom-upload-journal-detail.component';

const routes: Routes = [
    { path: PathConstant.JOURNAL_MEDIA_PAGING, component: UcTemplateComponent, data: { page: "JournalMediaSetting" } /*component: JournalMediaPagingComponent*/ },
    { path: PathConstant.JOURNAL_MEDIA_DETAIL, component: JournalMediaDetailComponent },
    { path: PathConstant.JOURNAL_MEDIA_HEADER_FACT, component: JournalHeaderFactComponent },
    { path: PathConstant.JOURNAL_MEDIA_GROUP, component: JournalGroupComponent },
    { path: PathConstant.JOURNAL_MEDIA_GROUP_FACT, component: JournalGroupFactComponent },
    { path: PathConstant.JOURNAL_MEDIA_GROUP_ITEM_VALUE, component: JournalItemValueComponent },
    { path: PathConstant.FAILED_JOURNAL_RESULT_LIST_PAGING, component: UcTemplateComponent, data: { page: "FailedJournalResultList" } /*component: FailedJournalListPagingComponent*/ },
    { path: PathConstant.JOURNAL_RESULT, component: JournalResultComponent },
    { path: PathConstant.JOURNAL_RECONCILE_PAGING, component: UcTemplateComponent, data: { page: "JournalReconcile" } /*component: JournalReconcilePagingComponent*/ },
    { path: PathConstant.UPLOAD_JOURNAL_FILE_PAGING, component: SelfCustomUploadJournalPagingComponent, data: { page: "JournalExcelFiles" } /*component: UploadJournalPagingComponent*/ },
    { path: PathConstant.UPLOAD_JOURNAL_FILE_DETAIL, component: UploadJournalDetailComponent },

    { path: PathConstant.SELF_CUSTOM_JOURNAL_MEDIA_PAGING, component: UcTemplateComponent, data: { page: "JournalMediaSetting" } },
    { path: PathConstant.SELF_CUSTOM_JOURNAL_MEDIA_DETAIL, component: UcTemplateComponent, data: { page: "JournalMediaEntitySetting" } },
    { path: PathConstant.SELF_CUSTOM_JOURNAL_MEDIA_HEADER_FACT, component: UcTemplateComponent, data: { page: "JournalMediaHeaderFactSetting" } },
    { path: PathConstant.SELF_CUSTOM_JOURNAL_MEDIA_GROUP, component: UcTemplateComponent, data: { page: "JournalMediaGroupSetting" } },
    { path: PathConstant.SELF_CUSTOM_JOURNAL_MEDIA_GROUP_FACT, component: UcTemplateComponent, data: { page: "JournalMediaGroupFactSetting" } },
    { path: PathConstant.SELF_CUSTOM_JOURNAL_MEDIA_GROUP_ITEM_VALUE, component: UcTemplateComponent, data: { page: "JournalMediaItemValueSetting" } },
    { path: PathConstant.SELF_CUSTOM_FAILED_JOURNAL_RESULT_LIST_PAGING, component: UcTemplateComponent, data: { page: "FailedJournalResultList" } },
    { path: PathConstant.SELF_CUSTOM_JOURNAL_RESULT, component: UcTemplateComponent, data: { page: "JournalResult"} },
    { path: PathConstant.SELF_CUSTOM_JOURNAL_RECONCILE_PAGING, component: UcTemplateComponent, data: { page: "JournalReconcile" } },
    { path: PathConstant.SELF_CUSTOM_UPLOAD_JOURNAL_FILE_PAGING, component: SelfCustomUploadJournalPagingComponent, data: { page: "JournalExcelFiles" } },
    { path: PathConstant.SELF_CUSTOM_UPLOAD_JOURNAL_FILE_DETAIL, component: SelfCustomUploadJournalDetailComponent, data: { page: "JournalExcelFilesDetail" } }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class JournalRoutingModule { }
