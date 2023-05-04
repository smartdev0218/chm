import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsModalRef, ModalModule, TabsModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../core/shared.module';
import { AppDataService } from '../../shared/app-data.service';
import { MessengerRoutingModule, routedComponents } from './messenger.routes';
import { MessengerService } from './shared/messenger.service';
import { MessengerReplyComponent } from './reply/reply.component';
import { InventoryService } from '../inventory/shared/inventory.service';
import { ProductDetailModule } from '../inventory/product-detail/product-detail.module';
import { ConfirmationDialogComponent } from '../../util/confirmation-dialog/confirmation-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        NgxDatatableModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        SharedModule,
        MessengerRoutingModule,
        ProductDetailModule
    ],
    declarations: [
        routedComponents,
        MessengerReplyComponent
    ],
    entryComponents: [
        MessengerReplyComponent,
        ConfirmationDialogComponent
    ],
    providers: [
        AppDataService,
        BsModalRef,
        MessengerService,
        InventoryService
    ]
})
export class MessengerModule {
}
