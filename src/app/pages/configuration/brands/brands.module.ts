import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsRoutingModule } from 'app/pages/configuration/brands/brands.routes';
import { BrandsComponent } from 'app/pages/configuration/brands/brands.component';
import { BrandsService } from 'app/pages/configuration/brands/shared/brands.service';
import { AppDataService } from 'app/shared/app-data.service';
import { SharedModule } from 'app/core/shared.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  imports: [
    CommonModule
    , BrandsRoutingModule

    , SharedModule
    , FormsModule
    , ModalModule.forRoot()
    , AccordionModule.forRoot()
  ],
  declarations: [BrandsComponent]
  , providers: [
    BrandsService, AppDataService
  ], entryComponents: [
    AlertDialogComponent
  ],
})
export class BrandsModule { }
