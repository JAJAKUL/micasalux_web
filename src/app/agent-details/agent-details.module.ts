import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentDetailsRoutingModule } from './agent-details-routing.module';
import { AgentDetailsComponent } from './agent-details.component';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import { CustomPipeModule } from '../custom/custom-pipe/custom-pipe.module';

@NgModule({
  declarations: [AgentDetailsComponent],
  imports: [
    CommonModule,
    AgentDetailsRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    CustomPipeModule
  ]
})
export class AgentDetailsModule { }
