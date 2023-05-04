import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule, routedComponents } from './dashboard-routing.module';

// dashboard widget components
import { DashboardWidgetStatusModule } from './widgets/status/status.module';
import { ModalModule } from 'ngx-bootstrap';
import { DashboardWidgetTopModule } from 'app/pages/dashboard/widgets/top/top.module';
import { DashboardWidgetSalesModule } from './widgets/sales/sales.module';
import { DashboardWidgetAlertsModule } from 'app/pages/dashboard/widgets/alerts/alerts.module';
import { DashboardWidgetTopBrandsModule } from 'app/pages/dashboard/widgets/top-brands/top-brands.module';
import { DashboardWidgetTopProductsModule } from 'app/pages/dashboard/widgets/top-products/top-products.module';
import { DashboardWidgetTopCategoriesModule } from 'app/pages/dashboard/widgets/top-categories/top-categories.module';
import { DashboardWidgetRunningMethodsModule } from 'app/pages/dashboard/widgets/running-methods/running-methods.module';
import { DashboardWidgetRecentlyFinishedMethodsModule } from 'app/pages/dashboard/widgets/recently-finished-methods/recently-finished-methods.module';
import { DashboardWidgetAnnouncesModule } from 'app/pages/dashboard/widgets/announces/announces.module';

import { PublicationsModule } from 'app/pages/publications/publications.module';
import { PublicationsComponent } from 'app/pages/publications/publications.component';
import { PublicationsListComponent } from 'app/pages/publications/publications-list/publications-list.component';
import { PublicationsService } from 'app/pages/publications/shared/publications.service';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        DashboardWidgetStatusModule,
        DashboardWidgetAlertsModule,
        DashboardWidgetTopBrandsModule,
        DashboardWidgetTopProductsModule,
        DashboardWidgetTopCategoriesModule,
        DashboardWidgetTopModule,
        DashboardWidgetAnnouncesModule,
        DashboardWidgetSalesModule,
        DashboardWidgetRunningMethodsModule,
        DashboardWidgetRecentlyFinishedMethodsModule,
        PublicationsModule,
        ModalModule.forRoot()
    ],
    declarations: [
        routedComponents,
    ]
})
export class DashboardModule { }
