import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardTopCategoriesComponent } from './top-categories.component';
import { DashboardTopCategoriesService } from 'app/pages/dashboard/widgets/top-categories/top-categories.service';
import { SharedModule } from 'app/core/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
        DashboardTopCategoriesComponent
    ],
    entryComponents: [
    ],
    exports: [
        DashboardTopCategoriesComponent
    ],
    providers: [DashboardTopCategoriesService]
})
export class DashboardWidgetTopCategoriesModule { }
