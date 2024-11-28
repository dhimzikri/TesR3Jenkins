
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'app/app-routing.module';
import { SharedModule } from "app/shared/shared.module";
import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from 'app/app.component';
import { ContentLayoutComponent } from "app/layouts/content/content-layout.component";
import { FullLayoutComponent } from "app/layouts/full/full-layout.component";
import { AuthService } from 'app/shared/auth/auth.service';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import * as $ from 'jquery';
import { HttpConfigInterceptor } from 'app/interceptor/httpconfig.interceptor';
import { ErrorDialogService } from 'app/error-dialog/error-dialog.service';
import { ErrorDialogComponent } from 'app/error-dialog/error-dialog.component';
import { RolepickComponent } from 'app/shared/rolepick/rolepick.component';
import { RolePickService } from 'app/shared/rolepick/rolepick.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CookieModule } from 'ngx-cookie';
import { StorageService } from './shared/services/StorageService';
import { NGXToastrService } from './components/extra/toastr/toastr.service';
import { ClaimTaskService } from './shared/claimTask.service';
import { AdInsSharedModule } from './components/adins-module/adins-shared.module';
import { EnviConfigService } from './shared/services/enviConfig.service';
import { UrlConstantService } from './shared/services/urlConstant.service';
import { UrlConstantNew } from './shared/constant/URLConstantNew';
import { ClipboardModule } from 'ngx-clipboard'
import { ApprovalTaskService } from './shared/services/ApprovalTask.service';
import { AddressService } from './shared/services/custAddr.service';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UcdropdownsearchModule } from '@adins/ucdropdownsearch';
import { AdInsHelperService } from './shared/services/AdInsHelper.service';
import { RolePickNewService } from './shared/rolepick/rolepick-new.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NotFoundComponent } from './not-found-page/not-found.component';
import { ExecutorService, UcTemplateService } from '@adins/uctemplate';
import { AdinsTemplateService } from './shared/services/adins-template.service';
import { UcformModule } from '@adins/ucform';
import { MatTabsModule } from '@angular/material/tabs';
import { AdInsExecutorService } from './shared/services/adins-executor.service';
import { UcformarrayModule } from '@adins/ucformarray';
import { NewCustSetData } from './customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { ThirdPartyUploadService } from './customer/sharing-component/new-cust-component/component/third-party-form/services/ThirdPartyUpload.Service';
import { ExcelService } from './shared/excel-service/excel-service';


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const enviConfig = (config: EnviConfigService) => {
    return () => {
        return config.loadConfig();
    }
}

const urlConstantConfig = (urlConfig: UrlConstantService) => {
    return () => {
        return urlConfig.loadConfig();
    }
}


@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent,
        ErrorDialogComponent,
        RolepickComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        NgxSpinnerModule,
        SharedModule,
        AdInsSharedModule,
        HttpClientModule,
        DragDropModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-right'
        }),
        NgbModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        CookieModule.forRoot(),
        MatDialogModule,
        MatTabsModule,
        BrowserAnimationsModule,
        ClipboardModule,
        FormsModule,
        ReactiveFormsModule,
        UcdropdownsearchModule,
        UcformModule,
        NgMultiSelectDropDownModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        }),
        UcformModule,
        UcformarrayModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        AuthService,
        AuthGuard,
        RolePickService,
        RolePickNewService,
        StorageService,
        NGXToastrService,
        ClaimTaskService,
        ApprovalTaskService,
        AddressService,
        AdInsHelperService,
        UrlConstantNew,
        ExcelService,
        EnviConfigService,
        NewCustSetData,
        FormGroupDirective,
        ThirdPartyUploadService,
        { provide: UcTemplateService, useClass: AdinsTemplateService },
        { provide: ExecutorService, useClass: AdInsExecutorService },
        {
            provide: APP_INITIALIZER, useFactory: enviConfig, multi: true, deps: [EnviConfigService]
        },
        UrlConstantService,
        {
            provide: APP_INITIALIZER, useFactory: urlConstantConfig, multi: true, deps: [UrlConstantService]
        },
        ErrorDialogService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },

        {provide: MAT_DIALOG_DATA, useValue: {}}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
    }
}
