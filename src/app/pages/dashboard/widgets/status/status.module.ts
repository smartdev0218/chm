import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DashboardStatusService } from './status.service';

import { DashboardStatusComponent } from './status.component';
import { DashboardStatusDetailComponent } from './detail/detail.component';
import { DashboardStatusDetailTableComponent } from './detail/table/table.component';
import { DashboardStatusSignComponent } from './status-sign/status-sign.component';
import { DashboardStatusAuthorizationComponent } from './authorization/authorization.component';
import { AppDataService } from 'app/shared/app-data.service';
import { SharedModule } from 'app/core/shared.module';

@NgModule({
    imports: [
        CommonModule,
        NgxDatatableModule,
        SharedModule,
    ],
    declarations: [
        DashboardStatusComponent,
        DashboardStatusDetailComponent,
        DashboardStatusDetailTableComponent,
        DashboardStatusSignComponent,
        DashboardStatusAuthorizationComponent
    ],
    entryComponents: [
        DashboardStatusDetailComponent,
        DashboardStatusAuthorizationComponent
    ],
    exports: [
        DashboardStatusComponent
    ],
    providers: [
        DashboardStatusService, AppDataService
    ]
})
export class DashboardWidgetStatusModule { }
