import { UcSubsectionModule } from "@adins/uc-subsection";
import { UcaddtotempModule } from "@adins/ucaddtotemp";
import { UcdropdownlistModule } from "@adins/ucdropdownlist";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatRadioModule } from "@angular/material/radio";
import { AdInsModule } from "app/components/adins-module/adins.module";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { SharingModule } from "app/shared/sharing.module";
import { JournalRoutingModule } from "./journal-routing.module";
import { JournalMediaPagingComponent } from './journal-media/journal-media-paging/journal-media-paging.component';
import { JournalMediaDetailComponent } from './journal-media/journal-media-detail/journal-media-detail.component';
import { JournalItemValueComponent } from './journal-media/journal-item-value/journal-item-value.component';
import { JournalHeaderFactComponent } from './journal-media/journal-header-fact/journal-header-fact.component';
import { JournalGroupFactComponent } from './journal-media/journal-group-fact/journal-group-fact.component';
import { JournalResultComponent } from './journal-result/journal-result.component';
import { FailedJournalListPagingComponent } from './failed-journal-list/failed-journal-list-paging/failed-journal-list-paging.component';
import { JournalGroupComponent } from './journal-media/journal-group/journal-group.component';
import { JournalReconcilePagingComponent } from "./journal-reconcile/journal-reconcile-paging/journal-reconcile-paging.component";
import { UploadJournalPagingComponent } from './upload-journal/upload-journal-paging.component';
import {UploadJournalDetailComponent} from './upload-journal/upload-journal-detail.component';
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";
import { SelfCustomUploadJournalPagingComponent } from "./self-custom-upload-journal/self-custom-upload-journal-paging.component";
import { ExecutorService, UcTemplateModule, UcTemplateService } from '@adins/uctemplate';
import { SelfCustomUploadJournalDetailComponent } from "app/journal/self-custom-upload-journal/self-custom-upload-journal-detail.component";
import { AdinsTemplateService } from "app/shared/services/adins-template.service";
import { AdInsExecutorService } from "app/shared/services/adins-executor.service";

@NgModule({
    imports: [
        JournalRoutingModule,
        CommonModule,
        MatRadioModule,
        AdInsModule,
        AdInsSharedModule,
        UcSubsectionModule,
        SharingModule,
        UcaddtotempModule,
        UcdropdownlistModule,
        UcTemplateModule
    ],
    exports: [],
    declarations: [
        
    JournalMediaPagingComponent,
    JournalMediaDetailComponent,
    JournalItemValueComponent,
    JournalHeaderFactComponent,
    JournalGroupFactComponent,
    JournalResultComponent,
    FailedJournalListPagingComponent,
    JournalGroupComponent,
    UploadJournalPagingComponent,
    UploadJournalDetailComponent,
    JournalReconcilePagingComponent,
    SelfCustomUploadJournalPagingComponent,
    SelfCustomUploadJournalDetailComponent],
    providers: [
        // NGXToastrService,
        { provide: UcTemplateService, useClass: AdinsTemplateService },
        { provide: ExecutorService, useClass: AdInsExecutorService },
    ]
})
export class JournalModule { }
