import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountListingRoutingModule } from './my-account-listing-routing.module';
import { MyAccountListingComponent } from './my-account-listing.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomPipeModule } from 'src/app/custom/custom-pipe/custom-pipe.module';

@NgModule({
  declarations: [MyAccountListingComponent],
  imports: [
    CommonModule,
    MyAccountListingRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSelectModule,
    Ng2TelInputModule,
    GooglePlaceModule,
    CustomPipeModule
  ]
})
export class MyAccountListingModule { }
