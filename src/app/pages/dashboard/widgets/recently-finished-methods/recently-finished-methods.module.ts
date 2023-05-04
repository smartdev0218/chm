import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DashboardRecentlyFinishedMethodsComponent } from './recently-finished-methods.component';
import { DashboardRecentlyFinishedMethodsService } from 'app/pages/dashboard/widgets/recently-finished-methods/recently-finished-methods.service';
import { SharedModule } from 'app/core/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        NgxDatatableModule,
    ],
    declarations: [
        DashboardRecentlyFinishedMethodsComponent
    ],
    entryComponents: [
    ],
    exports: [
        DashboardRecentlyFinishedMethodsComponent
    ],
    providers: [DashboardRecentlyFinishedMethodsService]
})
export class DashboardWidgetRecentlyFinishedMethodsModule { }
