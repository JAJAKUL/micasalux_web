import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundImagePipe } from './background-image.pipe';



@NgModule({
  declarations: [BackgroundImagePipe],
  imports: [
    CommonModule
  ],
  exports: [BackgroundImagePipe]
})
export class CustomPipeModule { }
