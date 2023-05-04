import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAlertsComponent } from './alerts.component';
import { DashboardAlertsDetailComponent } from './detail/detail.component';
import { DashboardAlertsConfigComponent } from './config/config.component';
import { DashboardAlertsService } from 'app/pages/dashboard/widgets/alerts/alerts.service';
import { SharedModule } from 'app/core/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
        DashboardAlertsComponent,
        DashboardAlertsDetailComponent,
        DashboardAlertsConfigComponent
    ],
    entryComponents: [
        DashboardAlertsDetailComponent,
        DashboardAlertsConfigComponent
    ],
    exports: [
        DashboardAlertsComponent
    ],
    providers: [DashboardAlertsService]
})
export class DashboardWidgetAlertsModule { }
