import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/core/shared.module';
import { DndModule } from 'ng2-dnd';
import { SearchFilter } from 'app/util/search-filter';

import { ConfigCategoriesPrimaryComponent } from './config-categories-primary.component';
import { ConfigCategoriesPrimaryService } from 'app/pages/configuration/categories/primary-category-mapper/config-categories-primary.service';

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
        ConfigCategoriesPrimaryComponent
    ],
    entryComponents: [
    ],
    exports: [
        ConfigCategoriesPrimaryComponent
    ],
    providers: [ConfigCategoriesPrimaryService]
})
export class ConfigCategoriesPrimaryModule { }
