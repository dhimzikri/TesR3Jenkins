import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "app/layouts/full/full-layout.component";
import { ContentLayoutComponent } from "app/layouts/content/content-layout.component";

import { Full_ROUTES } from "app/shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "app/shared/routes/content-layout.routes";

import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { NotFoundComponent } from './not-found-page/not-found.component';
import { AccessGuard } from './shared/auth/access.guard';
import { ForbiddenComponent } from '@adins/fe-core';
import { NavigationConstant } from './shared/NavigationConstant';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/Pages/Login',
    pathMatch: 'full',
  },
  // { // uncomment for unauthorized access page
  //   path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard],
  //   canActivateChild: [AccessGuard], runGuardsAndResolvers: 'always'
  // },
  {
    path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'Forbidden', 
    component: FullLayoutComponent,
    children: [
      {
        path: '',
        component: ForbiddenComponent,
        data: {
          redirectUrl: NavigationConstant.DASHBOARD
        }
      }
    ]
  },
  { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}