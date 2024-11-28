
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { UcSubsectionModule } from '@adins/uc-subsection';
import { UcpagingModule } from '@adins/ucpaging';
import { UCSearchModule } from "@adins/ucsearch";
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { UcgridviewModule } from '@adins/ucgridview';
import { UcaddressModule } from '@adins/ucaddress';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UcuploadModule } from '@adins/ucupload';
import { UcdropdownlistModule } from '@adins/ucdropdownlist';
import { UcaddtotempModule } from '@adins/ucaddtotemp';
import { UcDirectiveUpperCaseModule } from '@adins/uc-directive-upper-case';
import { UcDirectiveValidateDateModule } from '@adins/uc-directive-validate-date';
import { UcdropdownsearchModule } from '@adins/ucdropdownsearch';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'app/interceptor/httpconfig.interceptor';

@NgModule({
    exports: [
        UcDirectiveUpperCaseModule,
        UcDirectiveValidateDateModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        UcSubsectionModule,
        UcpagingModule,
        UCSearchModule,
        UcgridfooterModule,
        UclookupgenericModule,
        UcviewgenericModule,
        UcShowErrorsModule,
        UcaddressModule,
        UcgridviewModule,
        MatCheckboxModule,
        UcuploadModule,
        UcdropdownlistModule,
        UcaddtotempModule,
        UcdropdownsearchModule
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        UcSubsectionModule,
        UcpagingModule,
        UCSearchModule,
        UcgridfooterModule,
        UclookupgenericModule,
        UcviewgenericModule,
        UcShowErrorsModule,
        UcaddressModule,
        UcgridviewModule,
        MatCheckboxModule,
        UcuploadModule,
        UcdropdownlistModule,
        UcaddtotempModule,
        UcDirectiveUpperCaseModule,
        UcDirectiveValidateDateModule,
        UcdropdownsearchModule
    ],
    declarations: [
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    ]
})

export class AdInsModule { }
