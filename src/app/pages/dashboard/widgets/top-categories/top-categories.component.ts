
import { Component, OnInit } from '@angular/core';

import { TopCategory } from './top-categories';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DashboardTopCategoriesService } from 'app/pages/dashboard/widgets/top-categories/top-categories.service';
import { StoreService } from 'app/shared/store.service';
import { environment } from 'environments/environment';
import { MOCK_ALERTS } from 'app/mock-api';
import { AppDataService } from 'app/shared/app-data.service';
import { TranslateService } from 'app/services/translate.service';
@Component({
    selector: 'chm-dashboard-top-categories',
    templateUrl: './top-categories.component.html',
    styleUrls: ['./top-categories.component.css']
})
export class DashboardTopCategoriesComponent implements OnInit {

    bsModalRef: BsModalRef;
    topCategories = [];

    isLoading = false;

    constructor(
        private modalService: BsModalService,
        private topCategoriesService: DashboardTopCategoriesService,
        private storeService: StoreService,
        private appDataService: AppDataService,
        private translate: TranslateService) {
        storeService.siteChanged$.subscribe(id => this.onSiteChanged(id));
    }

    ngOnInit() {
        this.updateStatus();
    }

    onSiteChanged(id: number) {
        //this.updateStatus();
    }

    updateStatus() {

        if (environment.mock) {
//            this.alerts = MOCK_ALERTS;
            return;
        }

        this.isLoading = true;
        this.topCategoriesService.getTopCategories()
            .subscribe(
                res => {
                    this.isLoading = false;
                    this.topCategories = res;
                    console.log('this.topCategories');
                    console.log(this.topCategories);
                },
                err => {
                    console.log(err);
                }
            );
    }

}
