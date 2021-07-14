import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'manage-account', pathMatch: 'full' },
  { path: 'manage-account', loadChildren: () => import('../agent/my-account-listing/my-account-listing.module').then(m => m.MyAccountListingModule) },
  { path: '**', redirectTo: 'manage-account', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
