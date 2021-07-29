import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPropertyNewComponent } from './add-property-new.component';
import { AddPropertyNewRoutingModule } from './add-property-new-routing.module';

import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomPipeModule } from '../custom/custom-pipe/custom-pipe.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  declarations: [ AddPropertyNewComponent ],
  imports: [
    CommonModule,
    AddPropertyNewRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    CarouselModule,
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatNativeDateModule,
    MatFormFieldModule,
    CustomPipeModule,
    GooglePlaceModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule
  ]
})
export class AddPropertyNewModule { }
