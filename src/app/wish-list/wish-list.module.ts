import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishListRoutingModule } from './wish-list-routing.module';
import { WishListComponent } from './wish-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CustomPipeModule } from '../custom/custom-pipe/custom-pipe.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';


@NgModule({
  declarations: [WishListComponent],
  imports: [
    CommonModule,
    WishListRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CustomPipeModule,
    GooglePlaceModule
  ]
})
export class WishListModule { }
