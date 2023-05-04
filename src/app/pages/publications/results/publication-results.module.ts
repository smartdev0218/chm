import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { PublicationResultsRoutingModule } from './publication-results-routing.module';
import { PublicationResultsService } from './shared/publication-results.service';
import { PublicationResultsListComponent } from './publication-results-list/publication-results-list.component';
import { PublicationResultsDetailComponent } from './publication-results-detail/publication-results-detail.component';
import { PublicationResultsDetailTableComponent } from './publication-results-detail/table/publication-results-detail-table.component';
import { Data } from 'app/pages/publications/results/shared/data';
import { ModalModule } from 'ngx-bootstrap';
import { SharedModule } from 'app/core/shared.module';

@NgModule({
    imports: [
        CommonModule,
        PublicationResultsRoutingModule,

        NgxDatatableModule,
        SharedModule,
        RouterModule,
        ModalModule.forRoot(),
        HttpModule
    ],
    declarations: [
        PublicationResultsListComponent,
        PublicationResultsDetailComponent,
        PublicationResultsDetailTableComponent
    ],
    entryComponents: [
        PublicationResultsDetailComponent
    ],
    providers: [
        PublicationResultsService,
        Data
    ]
})

export class PublicationResultsModule {
    constructor() {
        console.log('Lazily Loaded : PublicationResultsModule');
    }
}
