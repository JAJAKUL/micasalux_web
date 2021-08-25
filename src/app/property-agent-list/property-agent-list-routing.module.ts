import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyAgentListComponent } from './property-agent-list.component';
const routes: Routes = [{
  path: '',
  component: PropertyAgentListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyAgentListRoutingModule { }
