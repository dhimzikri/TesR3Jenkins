import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PefindoViewInquiriesComponent } from './pefindo-view-inquiries.component';

const routes: Routes = [
  {
    path: '',
    component: PefindoViewInquiriesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewInquiriesRoutingModule { }
