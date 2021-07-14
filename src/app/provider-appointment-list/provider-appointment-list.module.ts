import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderAppointmentListRoutingModule } from './provider-appointment-list-routing.module';
import { ProviderAppointmentListComponent } from './provider-appointment-list.component';


@NgModule({
  declarations: [ProviderAppointmentListComponent],
  imports: [
    CommonModule,
    ProviderAppointmentListRoutingModule
  ]
})
export class ProviderAppointmentListModule { }
