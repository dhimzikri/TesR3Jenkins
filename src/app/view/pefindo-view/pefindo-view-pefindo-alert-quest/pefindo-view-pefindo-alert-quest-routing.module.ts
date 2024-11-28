import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PefindoViewPefindoAlertQuestComponent } from './pefindo-view-pefindo-alert-quest.component';

const routes: Routes = [
  {
    path: '',
    component: PefindoViewPefindoAlertQuestComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewPefindoAlertQuestRoutingModule { }
