import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PefindoViewOtherLiabilitiesComponent } from './pefindo-view-other-liabilities.component';

const routes: Routes = [
  {
    path: '',
    component: PefindoViewOtherLiabilitiesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewOtherLiabilitiesRoutingModule { }
