import { NgModule } from '@angular/core';
import { PresetsRoutingModule, routedComponents } from 'app/pages/presets/presets.routes';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { AppDataService } from 'app/shared/app-data.service';
import { ModalModule } from 'ngx-bootstrap';
import { PresetsService } from 'app/pages/presets/shared/presets.service';
import { PresetsFormComponent } from 'app/pages/presets/presets-form/presets-form.component';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { SharedModule } from 'app/core/shared.module';
import { ConfirmationDialogComponent } from 'app/util/confirmation-dialog/confirmation-dialog.component';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { MercadoLibreSettingsComponent } from './mercado-libre-settings/mercado-libre-settings.component';


@NgModule({
  imports: [
    SharedModule,
    PresetsRoutingModule,

    NgxDatatableModule,

    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    ModalModule.forRoot(),
    NguiDatetimePickerModule

  ],
  declarations: [routedComponents]
  , entryComponents: [
    PresetsFormComponent
    , ConfirmationDialogComponent
    , AlertDialogComponent
    , MercadoLibreSettingsComponent
  ],
  providers: [
    PresetsService, AppDataService
  ]
})
export class PresetsModule { }

