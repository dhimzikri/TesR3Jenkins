import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PefindoViewSubjectInfoPersonalComponent } from './pefindo-view-subject-info-personal.component';

const routes: Routes = [
  {
    path: '',
    component: PefindoViewSubjectInfoPersonalComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewSubjectInfoPersonalRoutingModule { }
