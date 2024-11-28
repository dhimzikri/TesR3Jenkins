import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { UcSubsectionModule } from '@adins/uc-subsection';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  exports: [
    CommonModule,
    NgbModule,
    UCSearchModule,
    UcgridfooterModule,
    UcSubsectionModule,
    AngularFileUploaderModule,
    MatStepperModule,
    MatIconModule,
    MatExpansionModule,
    MatTabsModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    UCSearchModule,
    UcgridfooterModule,
    UcSubsectionModule,
    NgMultiSelectDropDownModule,
  ],
  declarations: [
  ]
})

export class SharingModule { }
