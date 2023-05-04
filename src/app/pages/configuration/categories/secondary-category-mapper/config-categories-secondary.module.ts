import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/core/shared.module';
import { DndModule } from 'ng2-dnd';
import { SearchFilter } from 'app/util/search-filter';

import { ConfigCategoriesSecondaryComponent } from './config-categories-secondary.component';
import { ConfigCategoriesSecondaryService } from 'app/pages/configuration/categories/secondary-category-mapper/config-categories-secondary.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonModule,
        RouterModule,
        HttpModule,
        DndModule,
        SharedModule
    ],
    declarations: [
        ConfigCategoriesSecondaryComponent
    ],
    entryComponents: [
    ],
    exports: [
        ConfigCategoriesSecondaryComponent
    ],
    providers: [ConfigCategoriesSecondaryService]
})
export class ConfigCategoriesSecondaryModule { }
