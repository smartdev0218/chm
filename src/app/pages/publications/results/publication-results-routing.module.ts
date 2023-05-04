import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { PublicationResultsComponent } from './publication-results.component';
import { PublicationResultsListComponent } from 'app/pages/publications/results/publication-results-list/publication-results-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: PublicationResultsListComponent,
                //children: [
              //      { path: '', component: PublicationResultsListComponent }
              //  ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class PublicationResultsRoutingModule {
}
