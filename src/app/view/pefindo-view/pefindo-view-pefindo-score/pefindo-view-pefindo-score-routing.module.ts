import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PefindoViewPefindoScoreComponent } from './pefindo-view-pefindo-score.component';

const routes: Routes = [
  {
    path: '',
    component: PefindoViewPefindoScoreComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewPefindoScoreRoutingModule { }
