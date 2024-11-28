import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PefindoViewMoSummaryComponent } from './pefindo-view-mo-summary.component';

const routes: Routes = [
  {
    path: '',
    component: PefindoViewMoSummaryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewMoSummaryRoutingModule { }
