import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DashboardTopService } from './top.service';

import { DashboardTopComponent } from './top.component';
import { DashboardTopConfigComponent } from './config/config.component';
import { SharedModule } from 'app/core/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        SharedModule,
    ],
    declarations: [
        DashboardTopComponent,
        DashboardTopConfigComponent,
    ],
    entryComponents: [
        DashboardTopConfigComponent
    ],
    exports: [
        DashboardTopComponent
    ],
    providers: [
        DashboardTopService
    ]
})
export class DashboardWidgetTopModule { }
