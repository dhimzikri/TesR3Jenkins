import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from "app/shared/footer/footer.component";
import { NavbarComponent } from "app/shared/navbar/navbar.component";
import { SidebarComponent } from "app/shared/sidebar/sidebar.component";
import { CustomizerComponent } from 'app/shared/customizer/customizer.component';
import { NotificationSidebarComponent } from 'app/shared/notification-sidebar/notification-sidebar.component';
import { ToggleFullscreenDirective } from "app/shared/directives/toggle-fullscreen.directive";
import { ContextMenuModule } from 'ngx-contextmenu';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DmsIframeComponent } from './dms-iframe/dms-iframe.component';
import { SafePipe } from './pipe/safepipe';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { UcnotificationModule } from '@adins/ucnotification';
import { SelfCustomContainerDmsIframeComponent } from './self-custom-container-dms-iframe/self-custom-container-dms-iframe.component';
import {FormsModule} from '@angular/forms';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        CustomizerComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        NgbModule,
        DmsIframeComponent,
        SelfCustomContainerDmsIframeComponent,
        SafePipe
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        AdInsSharedModule,
        UcnotificationModule,
        ContextMenuModule.forRoot(),
        NgMultiSelectDropDownModule,
        FormsModule,
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        CustomizerComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        DmsIframeComponent,
        SelfCustomContainerDmsIframeComponent,
        SafePipe
    ]
})
export class SharedModule { }
