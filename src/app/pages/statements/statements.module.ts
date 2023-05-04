import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementsComponent } from './statements.component';
import { StatementsRoutingModule } from 'app/pages/statements/statements.routes';
import { StatementsService } from 'app/pages/statements/shared/statements.service';
import { AppDataService } from 'app/shared/app-data.service';
import { SharedModule } from 'app/core/shared.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { ConfirmationDialogComponent } from 'app/util/confirmation-dialog/confirmation-dialog.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StatementsFormComponent } from './statements-form/statements-form.component';

@NgModule({
  imports: [
    CommonModule
    , StatementsRoutingModule

    , NgxDatatableModule
    , SharedModule
    , FormsModule
    , ModalModule.forRoot()
  ],
  declarations: [StatementsComponent,
    StatementsFormComponent
]
  , providers: [
    StatementsService, AppDataService
  ], entryComponents: [
    AlertDialogComponent
    , ConfirmationDialogComponent
    , StatementsFormComponent
  ],
})
export class StatementsModule { }
