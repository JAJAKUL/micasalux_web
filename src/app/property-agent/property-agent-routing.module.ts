import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyAgentComponent } from './property-agent.component';

const routes: Routes = [{ path: '', component: PropertyAgentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyAgentRoutingModule { }
