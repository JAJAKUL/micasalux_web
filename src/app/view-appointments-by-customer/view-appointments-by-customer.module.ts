import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewAppointmentsByCustomerRoutingModule } from './view-appointments-by-customer-routing.module';
import { ViewAppointmentsByCustomerComponent } from './view-appointments-by-customer.component';


@NgModule({
  declarations: [ViewAppointmentsByCustomerComponent],
  imports: [
    CommonModule,
    ViewAppointmentsByCustomerRoutingModule
  ]
})
export class ViewAppointmentsByCustomerModule { }
