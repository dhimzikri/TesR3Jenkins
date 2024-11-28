import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormsRoutingModule } from "./forms-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NGXFormWizardModule } from "./ngx-wizard/ngx-wizard.module";
import { CustomFormsModule } from 'ng2-validation';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { ArchwizardModule } from 'angular-archwizard';

import { ValidationFormsComponent } from "./validation/validation-forms.component";
import { WizardFormsComponent } from "./wizard/wizard-forms.component";
import { BasicComponent } from './layouts/basic/basic.component';
import { HorizontalComponent } from './layouts/horizontal/horizontal.component';
import { HiddenLabelsComponent } from './layouts/hidden-labels/hidden-labels.component';
import { FormActionsComponent } from './layouts/form-actions/form-actions.component';
import { BorderedComponent } from './layouts/bordered/bordered.component';
import { StripedRowsComponent } from './layouts/striped-rows/striped-rows.component';
import { InputsComponent } from './elements/inputs/inputs.component';
import { InputGroupsComponent } from './elements/input-groups/input-groups.component';
import { InputGridComponent } from './elements/input-grid/input-grid.component';
import { ArchwizardComponent } from './archwizard/archwizard.component';
import { SharingModule } from 'app/shared/sharing.module';
import { CustomerModule } from 'app/customer/customer.module';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@NgModule({
    imports: [
        CommonModule,
        FormsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        AdInsSharedModule,
        NGXFormWizardModule,
        ArchwizardModule,
        CustomFormsModule,
        MatchHeightModule,
        NgbModule,
        UCSearchModule,
        UcgridfooterModule,
        SharingComponentModule,
        CustomerModule
    ],
    declarations: [
        ValidationFormsComponent,
        WizardFormsComponent,
        BasicComponent,
        HorizontalComponent,
        HiddenLabelsComponent,
        FormActionsComponent,
        BorderedComponent,
        StripedRowsComponent,
        InputsComponent,
        InputGroupsComponent,
        InputGridComponent,
        ArchwizardComponent,

    ],
    providers: [
      AdInsHelperService,
      UrlConstantNew
    ]

})
export class FormModule { }
