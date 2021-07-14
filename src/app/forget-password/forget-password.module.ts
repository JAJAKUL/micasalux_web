import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { ForgetPasswordComponent } from './forget-password.component';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ForgetPasswordComponent],
  imports: [
    CommonModule,
    ForgetPasswordRoutingModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ForgetPasswordModule { }
