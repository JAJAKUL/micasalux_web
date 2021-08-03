import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageSubscriptionComponent } from './manage-subscription.component';
import { ManageSubscriptionRoutingModule } from './manage-subscription-routing.module';


@NgModule({
  declarations: [ManageSubscriptionComponent],
  imports: [
    CommonModule,
    ManageSubscriptionRoutingModule
  ]
})
export class ManageSubscriptionModule { }
