import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'manage-account', pathMatch: 'full' },
  { path: 'manage-account', loadChildren: () => import('./my-account-customer/my-account-customer.module').then(m => m.MyAccountCustomerModule) },

  // { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  // { path: 'service-provider', loadChildren: () => import('./service-provider/service-provider.module').then(m => m.ServiceProviderModule) },
  // { path: 'my-booking', loadChildren: () => import('./my-booking/my-booking.module').then(m => m.MyBookingModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
