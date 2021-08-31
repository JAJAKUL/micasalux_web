import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyAgentDetailsComponent } from './property-agent-details.component';

import { PropertyAgentDetailsRoutingModule } from './property-agent-details-routing.module';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { CustomPipeModule } from '../custom/custom-pipe/custom-pipe.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [PropertyAgentDetailsComponent],
  imports: [
    CommonModule,
    PropertyAgentDetailsRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CustomPipeModule,
    GooglePlaceModule
  ]
})
export class PropertyAgentDetailsModule { }
