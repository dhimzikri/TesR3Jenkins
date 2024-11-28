import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIComponentsRoutingModule } from "./ui-components-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { TagInputModule } from 'ngx-chips';
import { UiSwitchModule } from 'ngx-ui-switch';

import { ToastrComponent } from "./extra/toastr/toastr.component";
import { TypeaheadComponent } from './bootstrap/typeahead/typeahead.component';
import { AdInsSharedModule } from './adins-module/adins-shared.module';

@NgModule({
    imports: [
        CommonModule,
        AdInsSharedModule,
        UIComponentsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        MatchHeightModule,
        TagInputModule,
        UiSwitchModule
    ],
    declarations: [
        ToastrComponent,
        TypeaheadComponent
    ]
})
export class UIComponentsModule { }
