import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagePropertyComponent } from './manage-property.component';
import { ManagePropertyRoutingModule } from './manage-property-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
@NgModule({
  declarations: [ManagePropertyComponent],
  imports: [
    CommonModule,
    ManagePropertyRoutingModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule

  ],
})
export class ManagePropertyModule {}
