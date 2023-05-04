import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavLoaderModule } from './nav-loader/nav-loader.module';
import { ExportersModule } from './exporters/exporters.module';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NavLoaderModule,
    ExportersModule
  ]
})
export class CoreModule { }
