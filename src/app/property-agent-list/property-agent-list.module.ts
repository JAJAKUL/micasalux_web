import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyAgentListComponent } from './property-agent-list.component';

import { PropertyAgentListRoutingModule } from './property-agent-list-routing.module';


@NgModule({
  declarations: [PropertyAgentListComponent],
  imports: [
    CommonModule,
    PropertyAgentListRoutingModule
  ]
})
export class PropertyAgentListModule { }
