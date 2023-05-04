import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardSalesComponent } from './sales.component';
import { DashboardSalesConfigComponent } from './config/config.component';

import { FormsModule } from '@angular/forms';
import { DashboardSalesService } from 'app/pages/dashboard/widgets/sales/sales.service';
import { SharedModule } from 'app/core/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
    ],
    declarations: [
        DashboardSalesComponent,
        DashboardSalesConfigComponent,
    ],
    entryComponents: [
        DashboardSalesConfigComponent
    ],
    exports: [
        DashboardSalesComponent
    ],
    providers: [
        DashboardSalesService
    ]
})
export class DashboardWidgetSalesModule { }
