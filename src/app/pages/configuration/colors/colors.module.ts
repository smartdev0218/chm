import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorsComponent } from './colors.component';
import { ColorsRoutingModule } from './colors.routes';
import { AppDataService } from 'app/shared/app-data.service';
import { ColorsService } from 'app/pages/configuration/colors/shared/colors.service';
import { SharedModule } from 'app/core/shared.module';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { SearchFilter } from 'app/util/search-filter';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { ModalModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  imports: [
    CommonModule
    , ColorsRoutingModule

    , SharedModule
    , FormsModule
    , ModalModule.forRoot()
    , AccordionModule.forRoot()

  ],
  declarations: [ColorsComponent
    ]
  , providers: [
    ColorsService, AppDataService
  ], entryComponents: [
    AlertDialogComponent
  ],
})
export class ColorsModule { }
