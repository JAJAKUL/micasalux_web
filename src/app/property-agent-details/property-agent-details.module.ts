import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyAgentDetailsComponent } from './property-agent-details.component';

import { PropertyAgentDetailsRoutingModule } from './property-agent-details-routing.module';


@NgModule({
  declarations: [PropertyAgentDetailsComponent],
  imports: [
    CommonModule,
    PropertyAgentDetailsRoutingModule
  ]
})
export class PropertyAgentDetailsModule { }
