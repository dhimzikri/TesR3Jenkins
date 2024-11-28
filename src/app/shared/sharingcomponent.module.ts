
import { NgModule } from '@angular/core';
import { UcAddressComponent } from 'app/shared/UserControl/ucAddress/ucAddress.component';
import { UcContactInfoComponent } from 'app/shared/UserControl/ucContactInfo/ucContactInfo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UcInfoComponent } from './UserControl/uc-info/uc-info.component';
import { SearchComponent } from './search/search.component';
import { UCGridFooterComponent } from './UserControl/ucgrid-footer/ucgrid-footer.component';
import { UcgridviewComponent } from './UserControl/ucgridview/ucgridview.component';
import { RouterModule } from '@angular/router';
import { LookupgenericComponent } from './UserControl/lookupgeneric/lookupgeneric.component';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { ViewgenericComponent } from './UserControl/viewgeneric/viewgeneric.component';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcpagingModule } from '@adins/ucpaging';
import { ThingsToDoComponent } from './things-to-do/things-to-do.component';
import { UcthingstodoModule } from '@adins/ucthingstodo';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UcaddtotempModule } from '@adins/ucaddtotemp';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';

@NgModule({
    exports: [
        UcAddressComponent,
        UcContactInfoComponent,
        SearchComponent,
        UCGridFooterComponent,
        UcgridviewComponent,
        UcInfoComponent,
        LookupgenericComponent,
        ViewgenericComponent,
        LookupgenericComponent,
        ThingsToDoComponent,
        UcthingstodoModule,
        UcaddtotempModule
    ],
    imports: [
        FormsModule,
        NgbModule,
        RouterModule,
        CommonModule,
        AdInsSharedModule,
        UCSearchModule,
        UcgridfooterModule,
        UcSubsectionModule,
        UclookupgenericModule,
        UcpagingModule,
        ReactiveFormsModule,
        UcthingstodoModule,
        UcShowErrorsModule,
        NgMultiSelectDropDownModule,
        UcaddtotempModule
    ],
    declarations: [
        UcAddressComponent,
        UcContactInfoComponent,
        SearchComponent,
        UCGridFooterComponent,
        UcgridviewComponent,
        UcInfoComponent,
        LookupgenericComponent,
        ViewgenericComponent,
        LookupgenericComponent,
        ThingsToDoComponent,
    ]
})

export class SharingComponentModule { }
