import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from 'app/pages/inventory/shared/inventory.service';
import { BsModalRef, ModalModule, TabsModule } from 'ngx-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppDataService } from 'app/shared/app-data.service';
import { ProductDetailComponent } from 'app/pages/inventory/product-detail/product-detail.component';
import { SharedModule } from 'app/core/shared.module';

@NgModule({
    imports: [
        CommonModule,
        NgxDatatableModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        SharedModule
    ],
    declarations: [
        ProductDetailComponent
    ],
    entryComponents: [
        ProductDetailComponent
    ],

    providers: [InventoryService, AppDataService, ProductDetailComponent, BsModalRef]
})
export class ProductDetailModule {
}
