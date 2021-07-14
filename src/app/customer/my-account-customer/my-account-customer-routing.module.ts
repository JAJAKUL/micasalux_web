import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAccountCustomerComponent } from './my-account-customer.component';

const routes: Routes = [{ path: '', component: MyAccountCustomerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountCustomerRoutingModule { }
