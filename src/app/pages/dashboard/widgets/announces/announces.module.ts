import { DashboardAnnouncesService } from './announces.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAnnouncesComponent } from './announces.component';
import { DashboardAnnouncesDetailComponent } from './detail/detail.component';
import { SharedModule } from 'app/core/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
        DashboardAnnouncesComponent,
        DashboardAnnouncesDetailComponent,
    ],
    entryComponents: [
        DashboardAnnouncesDetailComponent
    ],
    exports: [
        DashboardAnnouncesComponent
    ],
    providers: [DashboardAnnouncesService]
})
export class DashboardWidgetAnnouncesModule { }
