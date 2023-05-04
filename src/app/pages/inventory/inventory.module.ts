import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule, routedComponents } from 'app/pages/inventory/inventory.routes';
import { InventoryService } from 'app/pages/inventory/shared/inventory.service';
import { BsModalRef, ModalModule, TabsModule } from 'ngx-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppDataService } from 'app/shared/app-data.service';
import { ActionConfirmationComponent } from 'app/pages/inventory/action-confirmation/action-confirmation.component';
import { SharedModule } from 'app/core/shared.module';
import { ProductDetailModule } from './product-detail/product-detail.module';

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
        InventoryRoutingModule,
        ProductDetailModule
    ],
    declarations: [
        routedComponents,
        ActionConfirmationComponent
    ],
    entryComponents: [
        ActionConfirmationComponent
    ],
    providers: [
        InventoryService,
        AppDataService,
        BsModalRef,
        ActionConfirmationComponent
    ]
})
export class InventoryModule {
}
