import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { AboutUsRoutingModule } from './about-us-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AboutUsModule { }
