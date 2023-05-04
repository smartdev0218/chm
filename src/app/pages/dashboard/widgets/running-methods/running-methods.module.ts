import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DashboardRunningMethodsComponent } from './running-methods.component';
import { DashboardRunningMethodsService } from 'app/pages/dashboard/widgets/running-methods/running-methods.service';
import { SharedModule } from 'app/core/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        NgxDatatableModule,
    ],
    declarations: [
        DashboardRunningMethodsComponent
    ],
    entryComponents: [
    ],
    exports: [
        DashboardRunningMethodsComponent
    ],
    providers: [DashboardRunningMethodsService]
})
export class DashboardWidgetRunningMethodsModule { }
