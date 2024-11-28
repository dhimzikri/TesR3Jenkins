import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighligtCommentRoutingModule } from './highligt-comment-routing.module';
import { CustomerViewHighligtCommentComponent } from './customer-view-highligt-comment.component';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';

@NgModule({
  declarations: [CustomerViewHighligtCommentComponent],
  imports: [
    CommonModule,
    HighligtCommentRoutingModule,UcSubsectionModule,
    AdInsSharedModule

  ]
})
export class HighligtCommentModule { }

