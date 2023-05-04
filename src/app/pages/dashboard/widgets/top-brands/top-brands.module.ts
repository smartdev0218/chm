import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardTopBrandsComponent } from './top-brands.component';
import { DashboardTopBrandsService } from 'app/pages/dashboard/widgets/top-brands/top-brands.service';
import { SharedModule } from 'app/core/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
        DashboardTopBrandsComponent
    ],
    entryComponents: [
    ],
    exports: [
        DashboardTopBrandsComponent
    ],
    providers: [DashboardTopBrandsService]
})
export class DashboardWidgetTopBrandsModule { }
