import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigCategoriesComponent } from './component/config-categories.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ConfigCategoriesComponent,
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
export class ConfigCategoriesRoutingModule {
}
