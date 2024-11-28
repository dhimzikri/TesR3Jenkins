import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PefindoViewSubjectInfoCompanyComponent } from './pefindo-view-subject-info-company.component';

const routes: Routes = [
  {
    path: '',
    component: PefindoViewSubjectInfoCompanyComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewSubjectInfoCompanyRoutingModule { }
