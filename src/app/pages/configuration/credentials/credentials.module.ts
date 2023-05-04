import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialsComponent } from './credentials.component';
import { CredentialsRoutingModule } from 'app/pages/configuration/credentials/credentials.routes';
import { CredentialsService } from 'app/pages/configuration/credentials/shared/credentials.service';
import { AppDataService } from 'app/shared/app-data.service';
import { SharedModule } from 'app/core/shared.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { ConfirmationDialogComponent } from 'app/util/confirmation-dialog/confirmation-dialog.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CredentialFormComponent } from './credential-form/credential-form.component';

@NgModule({
  imports: [
    CommonModule
    , CredentialsRoutingModule

    , NgxDatatableModule
    , SharedModule
    , FormsModule
    , ModalModule.forRoot()
  ],
  declarations: [CredentialsComponent,
    CredentialFormComponent
]
  , providers: [
    CredentialsService, AppDataService
  ], entryComponents: [
    AlertDialogComponent
    , ConfirmationDialogComponent
    , CredentialFormComponent
  ],
})
export class CredentialsModule { }
