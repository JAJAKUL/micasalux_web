import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountCustomerRoutingModule } from './my-account-customer-routing.module';
import { MyAccountCustomerComponent } from './my-account-customer.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [MyAccountCustomerComponent],
  imports: [
    CommonModule,
    MyAccountCustomerRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    MatFormFieldModule,
    GooglePlaceModule
  ]
})
export class MyAccountCustomerModule { }
