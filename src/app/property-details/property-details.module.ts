import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyDetailsRoutingModule } from './property-details-routing.module';
import { PropertyDetailsComponent } from './property-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { CustomPipeModule } from '../custom/custom-pipe/custom-pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
@NgModule({
  declarations: [PropertyDetailsComponent],
  imports: [
    CommonModule,
    PropertyDetailsRoutingModule,
    CarouselModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CustomPipeModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule
  ]
})
export class PropertyDetailsModule { }
