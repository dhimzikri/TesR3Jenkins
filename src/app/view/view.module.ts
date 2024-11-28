import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { ViewRoutingModule } from "./view-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SurveyTaskViewModule } from "./survey-task-view/survey-task-view.module";
import { SharedModule } from "app/shared/shared.module";
import { AdInsModule } from "app/components/adins-module/adins.module";
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";
import { SelfCustomCustomerViewCoyComponent } from './self-custom-customer-view-coy/self-custom-customer-view-coy.component';
import { UcTemplateModule } from "@adins/uctemplate";
@NgModule({
    imports: [
        AdInsModule,
        ViewRoutingModule,
        CommonModule,
        NgbModule,
        SharingModule,
        ArchwizardModule,
        SharingComponentModule,
        FormsModule,
        ReactiveFormsModule,
        SurveyTaskViewModule,
        SharedModule,
        AdInsSharedModule,
        UcTemplateModule,
        //   TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: (createTranslateLoader),
        //         deps: [HttpClient]
        //     }
        // }),
    ],
    declarations: [
    SelfCustomCustomerViewCoyComponent
  ]
})
export class ViewModule { }
