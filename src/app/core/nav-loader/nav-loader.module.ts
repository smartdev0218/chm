import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavLoaderComponent } from './nav-loader.component';

@NgModule({
  declarations: [NavLoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [NavLoaderComponent]
})
export class NavLoaderModule { }
