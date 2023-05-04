
import { Component, OnInit } from '@angular/core';

import { TopProduct } from './top-products';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DashboardTopProductsService } from 'app/pages/dashboard/widgets/top-products/top-products.service';
import { StoreService } from 'app/shared/store.service';
import { environment } from 'environments/environment';
import { MOCK_ALERTS } from 'app/mock-api';
import { AppDataService } from 'app/shared/app-data.service';
import { TranslateService } from 'app/services/translate.service';
@Component({
    selector: 'chm-dashboard-top-products',
    templateUrl: './top-products.component.html',
    styleUrls: ['./top-products.component.css']
})
export class DashboardTopProductsComponent implements OnInit {

    bsModalRef: BsModalRef;
    topProducts = [];

    isLoading = false;

    constructor(
        private modalService: BsModalService,
        private topProductsService: DashboardTopProductsService,
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
//            this.topProducts = MOCK_ALERTS;
            return;
        }

        this.isLoading = true;
        this.topProductsService.getTopProducts()
            .subscribe(
                res => {
                    this.isLoading = false;
                    this.topProducts = res;
                    console.log('this.topProducts');
                    console.log(this.topProducts);
                },
                err => {
                    console.log(err);
                }
            );
    }

}
