import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAccountListingComponent } from './my-account-listing.component';

const routes: Routes = [{ path: '', component: MyAccountListingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountListingRoutingModule { }
