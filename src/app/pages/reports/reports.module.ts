import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule, routedComponents } from 'app/pages/reports/reports.routes';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { AppDataService } from 'app/shared/app-data.service';
import { ModalModule } from 'ngx-bootstrap';
import { ReportsService } from 'app/pages/reports/shared/reports.service';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { SharedModule } from 'app/core/shared.module';
import { ConfirmationDialogComponent } from 'app/util/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  imports: [
    SharedModule,
    ReportsRoutingModule,

    NgxDatatableModule,

    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    ModalModule.forRoot(),
    NguiDatetimePickerModule

  ],
  declarations: [routedComponents]
  , entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [
    ReportsService, AppDataService
  ]
})
export class ReportsModule { }

