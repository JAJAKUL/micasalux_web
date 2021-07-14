import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesComponent } from './properties.component';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { CustomPipeModule } from '../custom/custom-pipe/custom-pipe.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [PropertiesComponent],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CustomPipeModule,
    GooglePlaceModule
  ]
})
export class PropertiesModule { }
