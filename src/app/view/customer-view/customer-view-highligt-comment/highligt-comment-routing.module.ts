import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewHighligtCommentComponent } from './customer-view-highligt-comment.component';

const routes: Routes = [{
  path: '',
  component: CustomerViewHighligtCommentComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HighligtCommentRoutingModule { }
