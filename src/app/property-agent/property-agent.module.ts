import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyAgentRoutingModule } from './property-agent-routing.module';
import { PropertyAgentComponent } from './property-agent.component';


@NgModule({
  declarations: [PropertyAgentComponent],
  imports: [
    CommonModule,
    PropertyAgentRoutingModule
  ]
})
export class PropertyAgentModule { }
