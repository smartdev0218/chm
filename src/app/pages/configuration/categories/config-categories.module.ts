import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ConfigCategoriesRoutingModule } from './config-categories-routing.module';
import { ConfigCategoriesService } from './shared/config-categories.service';
import { ConfigCategoriesComponent } from './component/config-categories.component';
import { ConfigCategoriesPrimaryModule } from './primary-category-mapper/config-categories-primary.module';
import { ConfigCategoriesSecondaryModule } from './secondary-category-mapper/config-categories-secondary.module';
import { PresetsService } from 'app/pages/presets/shared/presets.service';
import { Data } from './shared/data';

import { DndModule } from 'ng2-dnd';
import { SharedModule } from 'app/core/shared.module';
import { SearchFilter } from 'app/util/search-filter';
import {AccordionModule} from "ng2-accordion";

@NgModule({
    imports: [
        CommonModule,
        ConfigCategoriesRoutingModule,
        NgxDatatableModule,
        RouterModule,
        HttpModule,
        FormsModule,
        DndModule,
        SharedModule,
        ConfigCategoriesPrimaryModule,
        ConfigCategoriesSecondaryModule,
        AccordionModule
    ],
    declarations: [
        ConfigCategoriesComponent
    ],
    providers: [
        ConfigCategoriesService,
        PresetsService,
        Data
    ],
    exports: [DndModule]
})

export class ConfigCategoriesModule {
    constructor() {
        console.log('Lazily Loaded : ConfigCategoriesModule');
    }
}
