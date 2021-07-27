import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagePropertyComponent } from "./manage-property.component";
import { ManagePropertyRoutingModule } from './manage-property-routing.module';


@NgModule({
  declarations: [ManagePropertyComponent],
  imports: [
    CommonModule,
    ManagePropertyRoutingModule
  ]
})
export class ManagePropertyModule { }
