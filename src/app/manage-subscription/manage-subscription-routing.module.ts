import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageSubscriptionComponent } from './manage-subscription.component';

const routes: Routes = [{
  path:'',
  component: ManageSubscriptionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageSubscriptionRoutingModule { }
