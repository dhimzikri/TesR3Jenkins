import { UcTemplateComponent } from '@adins/uctemplate';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathConstant } from 'app/shared/PathConstant';

const routes: Routes = [
  {
      path: '',
      children: [
        {
          path: PathConstant.SELF_CUSTOM_VIEW_PEFINDO_VIEW,
          component: UcTemplateComponent,
          data: {
            page: 'ViewPefindo'
          },
        },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelfCustomPefindoViewRoutingModule { }
