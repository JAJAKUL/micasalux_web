import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProviderAppointmentListComponent } from './provider-appointment-list.component';

const routes: Routes = [{ path: '', component: ProviderAppointmentListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderAppointmentListRoutingModule { }
