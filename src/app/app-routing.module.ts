import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
  // { path: 'my-account-customer', loadChildren: () => import('./customer/my-account-customer/my-account-customer.module').then(m => m.MyAccountCustomerModule) },
  // { path: 'my-account-listing', loadChildren: () => import('./agent/my-account-listing/my-account-listing.module').then(m => m.MyAccountListingModule) },
  { path: 'user', loadChildren: () => import('./customer/customer-routing.module').then(m => m.CustomerRoutingModule)},
  { path: 'users', loadChildren: () => import('./agent/agent-routing.module').then( m => m.AgentRoutingModule)},
  { path: 'forget-password', loadChildren: () => import('./forget-password/forget-password.module').then(m => m.ForgetPasswordModule) },
  { path: 'properties', loadChildren: () => import('./properties/properties.module').then(m => m.PropertiesModule) },
  { path: 'property-details', loadChildren: () => import('./property-details/property-details.module').then(m => m.PropertyDetailsModule) },
  { path: 'agent-details', loadChildren: () => import('./agent-details/agent-details.module').then(m => m.AgentDetailsModule) },
  { path: 'property-agent', loadChildren: () => import('./property-agent/property-agent.module').then(m => m.PropertyAgentModule) },
  { path: 'view-appointments-by-customer', loadChildren: () => import('./view-appointments-by-customer/view-appointments-by-customer.module').then(m => m.ViewAppointmentsByCustomerModule) },
  { path: 'wish-list', loadChildren: () => import('./wish-list/wish-list.module').then(m => m.WishListModule) },
  { path: 'view-appointments', loadChildren: () => import('./provider-appointment-list/provider-appointment-list.module').then(m => m.ProviderAppointmentListModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
