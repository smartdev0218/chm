import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportersComponent } from './exporters.component';

@NgModule({
  declarations: [ExportersComponent],
  imports: [
    CommonModule
  ],
  exports: [ExportersComponent]
})
export class ExportersModule { }
