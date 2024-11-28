import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotifEngineTemplateViewComponent } from './notif-engine-template-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: NotifEngineTemplateViewComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotifEngineTemplateViewRoutingModule { }
