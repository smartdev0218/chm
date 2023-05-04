import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MethodsComponent } from './methods.component';
import { MethodsRoutingModule } from 'app/pages/configuration/methods/methods.routes';
import { MethodsService } from 'app/pages/configuration/methods/shared/methods.service';
import { AppDataService } from 'app/shared/app-data.service';
import { SharedModule } from 'app/core/shared.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { ConfirmationDialogComponent } from 'app/util/confirmation-dialog/confirmation-dialog.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MethodFormComponent } from './method-form/method-form.component';

@NgModule({
  imports: [
    CommonModule
    , MethodsRoutingModule

    , NgxDatatableModule
    , SharedModule
    , FormsModule
    , ModalModule.forRoot()
  ],
  declarations: [MethodsComponent,
    MethodFormComponent
]
  , providers: [
    MethodsService, AppDataService
  ], entryComponents: [
    AlertDialogComponent
    , ConfirmationDialogComponent
    , MethodFormComponent
  ],
})
export class MethodsModule { }
