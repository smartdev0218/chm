
import { Component, OnInit } from '@angular/core';

import { TopBrand } from './top-brands';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DashboardTopBrandsService } from 'app/pages/dashboard/widgets/top-brands/top-brands.service';
import { StoreService } from 'app/shared/store.service';
import { environment } from 'environments/environment';
import { MOCK_ALERTS } from 'app/mock-api';
import { AppDataService } from 'app/shared/app-data.service';
import { TranslateService } from 'app/services/translate.service';
@Component({
    selector: 'chm-dashboard-top-brands',
    templateUrl: './top-brands.component.html',
    styleUrls: ['./top-brands.component.css']
})
export class DashboardTopBrandsComponent implements OnInit {

    bsModalRef: BsModalRef;
    topBrands = [];

    isLoading = false;

    constructor(
        private modalService: BsModalService,
        private topBrandsService: DashboardTopBrandsService,
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
//            this.topBrands = MOCK_TOP_BRANDS;
            return;
        }

        this.isLoading = true;
        this.topBrandsService.getTopBrands()
            .subscribe(
                res => {
                    this.isLoading = false;
                    this.topBrands = res;
                    console.log('this.topBrands');
                    console.log(this.topBrands);
                },
                err => {
                    console.log(err);
                }
            );
    }

}
