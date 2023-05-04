import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PresetsFormComponent } from '../pages/presets/presets-form/presets-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { ConfirmationDialogComponent } from 'app/util/confirmation-dialog/confirmation-dialog.component';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { DndModule } from 'ng2-dnd';
import { SearchFilter } from 'app/util/search-filter';
import { MercadoLibreSettingsComponent } from '../pages/presets/mercado-libre-settings/mercado-libre-settings.component';


@NgModule({
    declarations: [
        PresetsFormComponent
        , MercadoLibreSettingsComponent
        , ConfirmationDialogComponent
        , AlertDialogComponent
        , SearchFilter
    ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        ReactiveFormsModule,
        NguiDatetimePickerModule

        , DndModule
    ],
    exports: [
        CommonModule,
        TranslateModule,
        PresetsFormComponent
        , MercadoLibreSettingsComponent
        , ConfirmationDialogComponent
        , AlertDialogComponent
        , SearchFilter
        , DndModule
    ]
})

export class SharedModule { }
