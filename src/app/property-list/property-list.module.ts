import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyListRoutingModule } from './property-list-routing.module';
import { PropertyListComponent } from './property-list.component';


import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { CustomPipeModule } from '../custom/custom-pipe/custom-pipe.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
@NgModule({
  declarations: [PropertyListComponent],
  imports: [
    CommonModule,
    PropertyListRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CustomPipeModule,
    GooglePlaceModule,
    NgxPaginationModule
  ]
})
export class PropertyListModule { }
