import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharingModule } from 'app/shared/sharing.module';
import { UcSubsectionComponent, UcSubsectionModule } from "@adins/uc-subsection";
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";
import { CustomerViewCbasSlikComponent } from "./customer-view-cbas-slik.component";
import { CustomerViewCbasSlikRoutingModule } from "./customer-view-cbas-slik-routing.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpConfigInterceptor } from "app/interceptor/httpconfig.interceptor";
import { UcTemplateModule } from "@adins/uctemplate";


@NgModule({
  exports: [
    CustomerViewCbasSlikComponent
  ],
  imports: [
    CustomerViewCbasSlikRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule,
    AdInsSharedModule,
    SharingModule,
    UcSubsectionModule,
    SharingComponentModule,
    UcTemplateModule,
  ],
  declarations: [
   CustomerViewCbasSlikComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
  ],
  entryComponents: [
    UcSubsectionComponent
  ]

})
export class CustomerViewCbasSlikModule { }
