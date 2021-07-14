import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAppointmentsByCustomerComponent } from './view-appointments-by-customer.component';

const routes: Routes = [{ path: '', component: ViewAppointmentsByCustomerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAppointmentsByCustomerRoutingModule { }
