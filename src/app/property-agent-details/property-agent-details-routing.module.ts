import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyAgentDetailsComponent } from './property-agent-details.component';
const routes: Routes = [{
  path:'',
  component: PropertyAgentDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyAgentDetailsRoutingModule { }
