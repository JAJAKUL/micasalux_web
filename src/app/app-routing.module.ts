import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
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
  { path: 'view-appointments-by-customer', loadChildren: () => import('./view-appointments-by-customer/view-appointments-by-customer.module').then(m => m.ViewAppointmentsByCustomerModule), canActivate: [AuthGuard]  },
  { path: 'wish-list', loadChildren: () => import('./wish-list/wish-list.module').then(m => m.WishListModule), canActivate: [AuthGuard]  },
  { path: 'view-appointments', loadChildren: () => import('./provider-appointment-list/provider-appointment-list.module').then(m => m.ProviderAppointmentListModule), canActivate: [AuthGuard]  },
  { path: 'manage-property', loadChildren: () => import('./manage-property/manage-property.module').then(m => m.ManagePropertyModule), canActivate: [AuthGuard]  },
  { path: 'add-property', loadChildren: () => import('./add-property-new/add-property-new.module').then(m => m.AddPropertyNewModule), canActivate: [AuthGuard]  },
  { path: 'manage-subscription', loadChildren: () => import('./manage-subscription/manage-subscription.module').then(m => m.ManageSubscriptionModule), canActivate: [AuthGuard] },
  { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'contact-us', loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule) },
  { path: 'property-agent-list/:id', loadChildren: () => import('./property-agent-list/property-agent-list.module').then(m => m.PropertyAgentListModule) },
  { path: 'property-agent-details/:id', loadChildren: () => import('./property-agent-details/property-agent-details.module').then(m => m.PropertyAgentDetailsModule) },

];
// useHash: true
@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled', })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
