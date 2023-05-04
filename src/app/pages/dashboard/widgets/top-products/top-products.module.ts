import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardTopProductsComponent } from './top-products.component';
import { DashboardTopProductsService } from 'app/pages/dashboard/widgets/top-products/top-products.service';
import { SharedModule } from 'app/core/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
        DashboardTopProductsComponent
    ],
    entryComponents: [
    ],
    exports: [
        DashboardTopProductsComponent
    ],
    providers: [DashboardTopProductsService]
})
export class DashboardWidgetTopProductsModule { }
