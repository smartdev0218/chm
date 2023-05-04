import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationsComponent } from './publications.component';
import { PublicationsListComponent } from './publications-list/publications-list.component';
import { PublicationsRoutingModule, routedComponents } from 'app/pages/publications/publications.routes';
import { PublicationsService } from 'app/pages/publications/shared/publications.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { AppDataService } from 'app/shared/app-data.service';

import { ResultComponent } from 'app/pages/publications/publications-form/result/result.component';
import { WorkflowService } from 'app/pages/publications/publications-form/workflow/workflow.service';
import { FormDataService } from 'app/pages/publications/publications-form/data/formData.service';
import { GeneralComponent } from 'app/pages/publications/publications-form/general/general.component';
import { ProductsComponent } from 'app/pages/publications/publications-form/products/products.component';
import { ModelsComponent } from 'app/pages/publications/publications-form/models/models.component';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { ProductCatalogComponent } from 'app/pages/publications/publications-form/products/product-catalog/product-catalog.component';
import { MyFilterPipe } from 'app/pipes/my-filter.pipe';
import { PresetsFormComponent } from '../presets/presets-form/presets-form.component';
import { PresetsService } from 'app/pages/presets/shared/presets.service';
import { SharedModule } from 'app/core/shared.module';
import { ConfirmationDialogComponent } from 'app/util/confirmation-dialog/confirmation-dialog.component';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    PublicationsRoutingModule,

    NgxDatatableModule,

    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NguiDatetimePickerModule
  ],
  declarations: [routedComponents
    , GeneralComponent, ProductsComponent, ModelsComponent, ResultComponent
    , ProductCatalogComponent
    , MyFilterPipe
  ],
  providers: [
    PublicationsService, AppDataService,

    { provide: FormDataService, useClass: FormDataService },
    { provide: WorkflowService, useClass: WorkflowService }
    , PresetsService
  ],
  exports: [
      PublicationsListComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent, ProductCatalogComponent,
    PresetsFormComponent, AlertDialogComponent
  ]
})
export class PublicationsModule { }
