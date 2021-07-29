import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyNewComponent } from './add-property-new.component';

const routes: Routes = [{
  path: '',
  component: AddPropertyNewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPropertyNewRoutingModule { }
