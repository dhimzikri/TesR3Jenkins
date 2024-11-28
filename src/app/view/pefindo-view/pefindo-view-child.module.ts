import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewChildRoutingModule } from './pefindo-view-child-routing.module';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'app/interceptor/httpconfig.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdInsSharedModule,
    PefindoViewChildRoutingModule
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class PefindoViewChildModule { }
