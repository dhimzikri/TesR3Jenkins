import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { FullPagesRoutingModule } from "app/pages/full-pages/full-pages-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserProfilePageComponent } from "app/pages/full-pages/user-profile/user-profile-page.component";
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';


@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        FormsModule,
        AdInsSharedModule,
        NgbModule,
    ],
    declarations: [       
        UserProfilePageComponent
    ]
})
export class FullPagesModule { }
