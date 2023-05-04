import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplesComponent } from './samples.component';
import { routedComponents, SamplesRoutingModule } from 'app/pages/samples/samples.routes';
import { SharedModule } from 'app/core/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SamplesRoutingModule
  ],
  declarations: [routedComponents]
})
export class SamplesModule { }
