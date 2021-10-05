import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPropertyComponent } from './edit-property.component';

const routes: Routes = [{
  path:'',
  component : EditPropertyComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPropertyRoutingModule { }
